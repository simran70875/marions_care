const Customer = require("../models/Customer");
const Shift = require("../models/Shift");

/* =========================================================
   CREATE SHIFT (Admin)
========================================================= */
exports.createShift = async (req, res) => {
  try {
    const shift = await Shift.create({
      customerId: req.body.customerId,
      carerId: req.body.carerId || null,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      tags: req.body.tags || [],
      status: req.body.status || "Scheduled",
      isRecurring: req.body.isRecurring || false,
      createdBy: req.user._id,
      remarks: req.body.remarks,
    });

    res.status(201).json({
      success: true,
      message: "Shift created successfully",
      data: shift,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =========================================================
   GET SHIFTS FOR CUSTOMER (Calendar View)
   /api/shifts/customer/:customerId?month=2025-10
========================================================= */
exports.getCustomerShifts = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { month } = req.query;

    let filter = { customerId };

    if (month) {
      const start = new Date(`${month}-01`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);

      filter.date = { $gte: start, $lt: end };
    }

    const shifts = await Shift.find(filter).populate("carerId", "firstName lastName").populate("customerId", "firstName lastName").sort({ date: 1, startTime: 1 });

    res.json({ success: true, data: shifts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =========================================================
   GET SHIFTS FOR CARER (Carer Dashboard)
   /api/shifts/carer/:carerId
========================================================= */
exports.getCarerShifts = async (req, res) => {
  try {
    const { carerId } = req.params;

    const shifts = await Shift.find({ carerId })
      .populate("customerId", "firstName lastName address")
      .sort({ date: 1, startTime: 1 });

    res.json({ success: true, data: shifts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =========================================================
   UPDATE SHIFT (Admin)
========================================================= */
exports.updateShift = async (req, res) => {
  try {
    const { id } = req.params;

    const shift = await Shift.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true },
    )
      .populate("carerId", "firstName lastName")
      .populate("customerId", "firstName lastName");

    if (!shift) {
      return res
        .status(404)
        .json({ success: false, message: "Shift not found" });
    }

    res.json({
      success: true,
      message: "Shift updated",
      data: shift,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* =========================================================
   DELETE SHIFT (Hard Delete)
========================================================= */
exports.deleteShift = async (req, res) => {
  try {
    const { id } = req.params;

    const shift = await Shift.findByIdAndDelete(id);

    if (!shift) {
      return res
        .status(404)
        .json({ success: false, message: "Shift not found" });
    }

    res.json({
      success: true,
      message: "Shift deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


/* =========================================================
   GET SHIFTS FOR CUSTOMER (Calendar View)
   /api/shifts/customer get userid from token 
========================================================= */
exports.getPrivateCustomerShifts = async (req, res) => {
  try {
    const { userId } = req.user;
    const { month } = req.query;

    const customer = await Customer.findOne({ userId: userId });
    if (!customer) {
      return res.status(404).json({ success: false, message: "customer not found" });
    }

    console.log("customer ", customer);
    

    const customerId = customer?._id;

    let filter = { customerId };

    if (month) {
      const start = new Date(`${month}-01`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);

      filter.date = { $gte: start, $lt: end };
    }

    const shifts = await Shift.find({customerId: customerId}).populate("carerId", "firstName lastName").populate("customerId", "firstName lastName").sort({ date: 1, startTime: 1 });

    res.json({ success: true, data: shifts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};