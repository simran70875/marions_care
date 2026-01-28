const mongoose = require('mongoose');

/* -------------------- Address Sub Schema -------------------- */
const addressSchema = new mongoose.Schema({
  address: String,
  town: String,
  county: String,
  postcode: String,
  country: { type: String, default: "england" },
});

/* -------------------- Carer Schema -------------------- */
const carerSchema = new mongoose.Schema(
  {
    // 🔗 Optional login account
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // 🆔 IDs
    carerIdNo: {
      type: String,
      unique: true,
      required: true,
    },

    // 👤 Basic info
    title: String,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    knownAs: String,
    gender: String,
    nationality: String,

    // 📧 Contact
    email: String,
    secondaryEmail: String,
    primaryContactNo: String,
    secondaryContactNo: String,
    workPhone: String,

    // 🪪 Identity
    niNumber: String,

    // 💼 Work details
    position: String,
    startDate: Date,
    recruitmentSource: String,
    area: { type: String, required: true },

    // 🚗 Travel & transport
    drivingLicense: {
      type: Boolean,
      default: false,
    },
    transportType: {
      type: String,
      required: true, // required for travel calculations
    },

    // 🎂 Personal details
    dateOfBirth: Date,

    // 📍 Address
    address: [addressSchema],

    // ⚙️ Status & settings
    status: {
      type: String,
      enum: ["active", "anactive", "archived"],
      default: "active",
    },

    sendActivationEmail: {
      type: Boolean,
      default: false,
    },
    // inside Carer schema
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

carerSchema.pre(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});

module.exports = mongoose.model("Carer", carerSchema);
