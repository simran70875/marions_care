const bcrypt = require("bcryptjs");
const Customer = require("../models/Customer");
const User = require("../models/User");
const generatePassword = require("../utils/generatePassword");
const sendMail = require("../utils/sendMail");
const mongoose = require("mongoose");
const XLSX = require("xlsx");
const fs = require("fs");

exports.createCustomer = async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      ...customerData
    } = req.body;

    if (!email || !firstName) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // 1️⃣ Check existing user
    const existingUser = await User.findOne({ email, role: "client" });
    if (existingUser) {
      return res.status(409).json({ message: "Customer already exists" });
    }

    // 2️⃣ Generate password
    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // 3️⃣ Create user
    const user = await User.create({
      fullName: `${firstName} ${lastName || ""}`.trim(),
      email,
      password: hashedPassword,
      role: "client",
    });

    // 4️⃣ Create customer
    const customer = await Customer.create({
      ...customerData,
      firstName,
      lastName,
      email,
      userId: user._id,
      status: "active",
    });

    // 5️⃣ Send email
    await sendMail({
      to: email,
      subject: "Your Customer Account Credentials",
      html: `
        <p>Hello ${firstName},</p>
        <p>Your customer account has been created.</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Password:</b> ${plainPassword}</p>
        <p>Please change your password after first login.</p>
      `,
    });

    res.status(201).json({
      message: "Customer created and credentials sent",
      customer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= Utils ================= */
const generateClientId = () => `CLI-${new mongoose.Types.ObjectId().toString().slice(-6)}`;
const generateRandomEmail = () => {
  return `cli-${Math.floor(1000 + Math.random() * 9000)}@dummy.local`;
};

exports.bulkUploadCustomers = async (req, res) => {
  const session = await mongoose.startSession();
  let transactionCommitted = false;

  try {
    session.startTransaction();

    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    /* ===== Read Excel ===== */
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!rows.length) {
      return res.status(400).json({ message: "File is empty" });
    }

    const usersToInsert = [];
    const customersToInsert = [];

    rows.forEach((row, index) => {
      if (!row.Name || !row.Phone) return;

      /* ===== Name handling ===== */
      const nameParts = row.Name.trim().split(" ");
      const firstName = nameParts.shift();
      const lastName = nameParts.join(" ") || " ";
      console.log(`Processing row ${index + 2}: ${firstName} ${lastName}`);

      const hashedPassword = bcrypt.hashSync(generatePassword(), 10);

      usersToInsert.push({
        fullName: row.Name,
        email: generateRandomEmail(row.Name),
        password: hashedPassword,
        role: "client",
      });

      const phoneRaw = row.Phone ? String(row.Phone) : "";

      const rawPhones = phoneRaw
        .split(",")
        .map(p => p.trim())
        .filter(Boolean);

      const contacts = rawPhones.map((entry, index) => {
        if (entry.includes("-")) {
          const [name, phone] = entry.split("-").map(v => v.trim());

          return {
            name: name || (index === 0 ? "Primary" : "Secondary"),
            contact: phone || "",
          };
        }

        return {
          name: index === 0 ? "Primary" : "Secondary",
          contact: entry,
        };
      });


      customersToInsert.push({
        clientIdNo: row["No."] ? row["No."] : generateClientId(),

        firstName,
        lastName,
        knownAs: row.Name,
        fullNameOfficial: row.Name,

        contactNumber: contacts[0]?.contact || "",
        mobileNumber: contacts[1]?.contact || "",

        contacts,

        dateOfBirth: row.DOB ? new Date(row.DOB) : null,

        status: row.Status.toLowerCase(),

        additionalInformation: row.Details,

        /* ===== Address ===== */
        address: {
          addressLine1: row.Address || "",
          area: row.Area || "",
          country: row.County || "",
        },

        /* ===== Finance ===== */
        finance: {
          councilIdNo: row["Council ID"],
          jobType: row["Job Type"],
        },

        tags: row.Tags ? row.Tags.split('|').map(tag => tag.trim()) : [],

        /* ===== Metadata ===== */
        referralReason: row.Tags,
        referralBy: row.Schedule,
      });
    });

    if (!customersToInsert.length) {
      return res.status(400).json({ message: "No valid rows found" });
    }

    /* ===== DB Insert ===== */
    const createdUsers = await User.insertMany(usersToInsert, {
      session,
      ordered: true,
    });

    createdUsers.forEach((user, index) => {
      customersToInsert[index].userId = user._id;
    });

    await Customer.insertMany(customersToInsert, {
      session,
      ordered: true,
    });

    /* ===== Commit ===== */
    await session.commitTransaction();
    transactionCommitted = true;
    session.endSession();

    /* ===== Cleanup ===== */
    fs.unlink(req.file.path, () => { });

    return res.status(201).json({
      message: "Customer bulk upload completed",
      totalRows: rows.length,
      created: customersToInsert.length,
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


exports.getCustomers = async (req, res) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 10,
      status, // 👈 from tabs
    } = req.query;

    const query = {
      isDeleted: false,
    };

    // 🔍 Search
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { clientIdNo: { $regex: search, $options: "i" } },
      ];
    }

    // 📌 Status filter
    if (status && status !== "all") {
      query.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [customers, total] = await Promise.all([
      Customer.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),

      Customer.countDocuments(query),
    ]);

    res.json({
      data: customers,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate("userId", "email status role").lean();

    if (!customer || customer.isDeleted) {
      return res.status(404).json({ message: "Customer not found" });
    }


    const data = {
      ...customer,
      adminComments: [],
      aboutMe: [],
      preferredCarers: [],
      totalPreferredCarerHours: [],
    }
    console.log(data)

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer updated successfully", customer });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
        deletedAt: new Date(),
        status: "inactive",
      },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer soft deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.statusUpdate = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    res.json({ message: "Status Updated", customer });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.restoreCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: false,
        deletedAt: null,
        status: "active",
      },
      { new: true }
    );

    res.json({ message: "Customer restored", customer });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.archiveCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
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

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer archived successfully", customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.restoreArchivedCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
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

    if (!customer) {
      return res.status(404).json({ message: "Archived customer not found" });
    }

    res.json({ message: "Customer restored successfully", customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateCustomerContacts = async (req, res) => {
  try {
    const { id } = req.params;
    const { contact } = req.body;

    if (!contact || !contact.name || !contact.contact) {
      return res.status(400).json({ message: "Invalid contact data" });
    }

    let customer;

    // 🔁 UPDATE EXISTING CONTACT
    if (contact._id) {
      customer = await Customer.findOneAndUpdate(
        {
          _id: id,
          "contacts._id": contact._id,
          isDeleted: false,
        },
        {
          $set: {
            "contacts.$.name": contact.name,
            "contacts.$.contact": contact.contact,
          },
        },
        { new: true }
      );
    }
    // ➕ ADD NEW CONTACT
    else {
      customer = await Customer.findOneAndUpdate(
        { _id: id, isDeleted: false },
        {
          $push: {
            contacts: {
              name: contact.name,
              contact: contact.contact,
            },
          },
        },
        { new: true }
      );
    }

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({
      message: "Contact saved successfully",
      contacts: customer.contacts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


