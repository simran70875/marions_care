
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

// Create a new admin
exports.createAdmin = async (req, res) => {
    try {
        const { fullName, phoneNumber, address, email, password } = req.body;

        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "Full name, email, and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: "Email already in use" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await User.create({
            fullName,
            phoneNumber,
            address,
            email,
            password: hashedPassword,
            role: "admin",
        });

        res.status(201).json({
            message: "Admin created successfully",
            admin: {
                id: admin._id,
                fullName: admin.fullName,
                email: admin.email,
                role: admin.role,
                phoneNumber: admin.phoneNumber,
                address: admin.address,
                createdAt: admin.createdAt,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all admins with pagination & search
exports.getAdmins = async (req, res) => {
  try {
    let { page = 1, limit = 10, q = "" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    // Base filter
    const filter = {
      role: "admin",
      isActive: true,
    };

    // Search logic
    if (q) {
      filter.$or = [
        { fullName: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { phoneNumber: { $regex: q, $options: "i" } },
      ];
    }

    // Execute queries in parallel
    const [admins, total] = await Promise.all([
      User.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(filter),
    ]);

    res.json({
      data: admins,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get single admin by ID
exports.getAdminById = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id).select("-password");
        if (!admin || admin.role !== "admin") {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json(admin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update admin
exports.updateAdmin = async (req, res) => {
    try {
        const { fullName, phoneNumber, address, email, password } = req.body;

        const updateData = { fullName, phoneNumber, address, email };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const admin = await User.findOneAndUpdate(
            { _id: req.params.id, role: "admin" },
            updateData,
            { new: true }
        ).select("-password");

        if (!admin) return res.status(404).json({ message: "Admin not found" });

        res.json({ message: "Admin updated successfully", admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Soft delete admin
exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await User.findOneAndUpdate(
            { _id: req.params.id, role: "admin" },
            { isActive: false },
            { new: true }
        );

        if (!admin) return res.status(404).json({ message: "Admin not found" });

        res.json({ message: "Admin soft deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Restore soft-deleted admin
exports.restoreAdmin = async (req, res) => {
    try {
        const admin = await User.findOneAndUpdate(
            { _id: req.params.id, role: "admin" },
            { isActive: true },
            { new: true }
        );

        if (!admin) return res.status(404).json({ message: "Admin not found" });

        res.json({ message: "Admin restored successfully", admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
