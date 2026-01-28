const bcrypt = require("bcryptjs");
const Customer = require("../models/Customer");
const User = require("../models/User");
const generatePassword = require("../utils/generatePassword");
const sendMail = require("../utils/sendMail");

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


