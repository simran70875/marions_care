// models/Shift.js
const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    carerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carer", // role = CARER
      default: null,
    },

    date: {
      type: Date,
      required: true,
    },

    startTime: String, // "07:25"
    endTime: String, // "08:10"

    tags: {
      type: [String],
      default: [],
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },
    
    status: {
      type: String,
      enum: ["Scheduled", "Medication", "Overnight", "NoCarer", "Cancelled"],
      default: "Scheduled",
    },

    isRecurring: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Shift", shiftSchema);
