const XLSX = require("xlsx");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Carer = require("../models/Carer");
const User = require("../models/User");
const generatePassword = require("../utils/generatePassword");
const sendMail = require("../utils/sendMail");
const fs = require("fs");

exports.createCarer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, firstName, lastName, address, ...carerData } = req.body;

    // 1️⃣ generate password
    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // 2️⃣ create user within transaction
    const [user] = await User.create(
      [
        {
          fullName: `${firstName} ${lastName}`,
          email,
          password: hashedPassword,
          role: "carer",
        },
      ],
      { session },
    );

    // 3️⃣ Prepare address array for Carer schema
    // If address is sent as single object, wrap it in array
    const addresses =
      Array.isArray(address) && address.length > 0 ? address : [address];

    // 4️⃣ create carer within transaction
    const [carer] = await Carer.create(
      [
        {
          ...carerData,
          firstName,
          lastName,
          email,
          userId: user._id,
          address: addresses, // ✅ save into addressSchema
        },
      ],
      { session },
    );

    // 5️⃣ commit transaction
    await session.commitTransaction();
    session.endSession();

    // 6️⃣ send email outside transaction
    await sendMail({
      to: email,
      subject: "Your Carer Account Credentials",
      html: `
        <p>Hello ${firstName},</p>
        <p>Your account has been created.</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Password:</b> ${plainPassword}</p>
        <p>Please change your password after login.</p>
      `,
    });

    res.status(201).json({
      message: "Carer created and credentials sent via email",
      carer,
    });
  } catch (err) {
    // abort transaction if anything fails
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: err.message });
  }
};

exports.bulkUploadCarers = async (req, res) => {
  const session = await mongoose.startSession();
  let transactionCommitted = false;

  try {
    session.startTransaction();

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    // --- Read Excel ---
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!rows.length) {
      return res.status(400).json({ message: "File is empty" });
    }

    const usersToInsert = [];
    const carersToInsert = [];

    rows.forEach((row, index) => {
      if (!row.Name || !row["Carer Account"]) return;

      const nameParts = row.Name.trim().split(" ");
      const firstName = nameParts.shift();
      const lastName = nameParts.join(" ") || " ";

      const hashedPassword = bcrypt.hashSync(generatePassword(), 10);

      usersToInsert.push({
        fullName: row.Name,
        username: row["Carer Account"],
        password: hashedPassword,
        role: "carer",
      });

      carersToInsert.push({
        carerIdNo: `CAR-${Date.now()}-${index}`,
        firstName,
        lastName,
        gender: row.Gender,
        primaryContactNo: row.Phone,
        position: row.Position,
        recruitmentSource: row.Schedule,
        knownAs: row.Details,
        area: "default-area",
        transportType: "none",
        address: [{ address: row.Address }],
      });
    });

    // --- DB Inserts ---
    const createdUsers = await User.insertMany(usersToInsert, {
      session,
      ordered: false,
    });

    createdUsers.forEach((user, index) => {
      carersToInsert[index].userId = user._id;
    });

    await Carer.insertMany(carersToInsert, { session, ordered: false });

    // ✅ Commit only once
    await session.commitTransaction();
    transactionCommitted = true;
    session.endSession();

    // --- Post-commit actions (SAFE) ---
    fs.unlink(req.file.path, () => {});

    return res.status(201).json({
      message: "Bulk upload completed",
      totalRows: rows.length,
      created: carersToInsert.length,
    });
  } catch (err) {
    if (!transactionCommitted) {
      await session.abortTransaction();
    }
    session.endSession();

    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.getCarers = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 100, status } = req.query;

    const query = {
      isDeleted: false,
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { carerIdNo: { $regex: search, $options: "i" } },
      ],
    };

    const skip = (page - 1) * limit;

    let carersQuery = Carer.find(query)
      .populate({
        path: "userId",
        select: "isActive role",
        ...(status && {
          match: {
            isActive: status === "active",
          },
        }),
      })
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    let carers = await carersQuery;

    // 🔹 remove carers whose user didn't match status filter
    if (status) {
      carers = carers.filter((c) => c.userId);
    }

    const total = status ? carers.length : await Carer.countDocuments(query);

    res.json({
      data: carers,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCarerById = async (req, res) => {
  const carer = await Carer.findById(req.params.id);
  res.json(carer);
};

exports.updateCarer = async (req, res) => {
  const carer = await Carer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(carer);
};

exports.statusUpdate = async (req, res) => {
  try {
    const carer = await Carer.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true },
    );

    res.json({ message: "Status Updated", carer });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteCarer = async (req, res) => {
  const carer = await Carer.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: new Date(),
      status: "Inactive",
      deletedBy: req.user.userId,
    },
    { new: true },
  );

  if (!carer) {
    return res.status(404).json({ message: "Carer not found" });
  }

  res.json({ message: "Carer soft deleted" });
};

exports.restoreCarer = async (req, res) => {
  const carer = await Carer.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: false,
      deletedAt: null,
      status: "Active",
      deletedBy: null,
    },
    { new: true },
  );

  res.json({ message: "Carer restored", carer });
};

exports.archiveCarer = async (req, res) => {
  try {
    const carer = await Carer.findOneAndUpdate(
      {
        _id: req.params.id,
        status: { $ne: "archived" },
        isDeleted: false,
      },
      {
        status: "archived",
        archivedAt: new Date(),
        archivedBy: req.user.userId,
      },
      { new: true },
    );

    if (!carer) {
      return res.status(404).json({ message: "Carer not found" });
    }

    res.json({ message: "Carer archived successfully", carer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.restoreArchivedCarer = async (req, res) => {
  try {
    const carer = await Carer.findOneAndUpdate(
      {
        _id: req.params.id,
        status: "archived",
      },
      {
        status: "active",
        archivedAt: null,
        archivedBy: null,
      },
      { new: true },
    );

    if (!carer) {
      return res.status(404).json({ message: "Archived carer not found" });
    }

    res.json({ message: "Carer restored successfully", carer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
