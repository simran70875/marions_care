const bcrypt = require("bcryptjs");
const Carer = require("../models/Carer");
const User = require("../models/User");
const generatePassword = require("../utils/generatePassword");
const sendMail = require("../utils/sendMail");

exports.createCarer = async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      ...carerData
    } = req.body;

    // 1️⃣ generate password
    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // 2️⃣ create user
    const user = await User.create({
      fullName: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      role: "carer",
    });

    // 3️⃣ create carer
    const carer = await Carer.create({
      ...carerData,
      firstName,
      lastName,
      email,
      userId: user._id,
    });

    // 4️⃣ send email
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
    res.status(400).json({ message: err.message });
  }
};

exports.getCarers = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

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

    const [carers, total] = await Promise.all([
      Carer.find(query)
        .populate("userId", "isActive role")
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 }),

      Carer.countDocuments(query),
    ]);

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
  const carer = await Carer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(carer);
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
    { new: true }
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
    { new: true }
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
      { new: true }
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
      { new: true }
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
