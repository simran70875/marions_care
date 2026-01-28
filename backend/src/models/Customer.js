// models/Customer.js
const mongoose = require("mongoose");

/* ================= Address ================= */
const addressSchema = new mongoose.Schema({
  addressLine1: String,
  addressLine2: String,
  town: String,
  county: String,
  postcode: String,
  country: { type: String, default: "England" },
  unit: String,
  area: { type: String, required: true },
});

/* ================= Finance ================= */
const financeSchema = new mongoose.Schema({
  councilIdNo: String,
  billingCode: String,
  contractHours: Number,
  contractFee: Number,
  invoiceDiscount: Number,
  invoiceCycle: String,
  payForTravel: {
    type: String,
    enum: ["Yes", "No"],
  },
  travelDeduction: Number,
  commission: Number,
  jobType: String,
});

/* ================= Customer ================= */
const customerSchema = new mongoose.Schema(
  {
    // 🔗 Optional login link
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // 🆔 IDs
    clientIdNo: { type: String},
    clientBio: { type: String, },

    // 🏥 Health identifiers
    nhsNumber: String,
    localPatientIdentifier: String,
    healthAndCareNumber: String,
    communityHealthIndexNumber: String,

    // 👤 Personal info
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    knownAs: String,
    fullNameOfficial: String,
    gender: String,
    maritalStatus: String,
    spouseName: String,
    nationality: String,
    dateOfBirth: Date,

    // 📞 Contact
    email: String,
    contactNumber: String,
    mobileNumber: String,
    preferredContactMethod: String,

    // 📅 Service & referral
    firstContactDate: Date,
    serviceCommenced: Date,
    referralBy: String,
    referralReason: String,
    referralNote: String,
    referralDate: Date,

    // 📍 Address
    address: addressSchema,

    // 💰 Finance (single source of truth)
    finance: financeSchema,

    // 📝 Other
    additionalInformation: String,
    dataSharing: String,

    // ⚙️ Status & soft delete
    status: {
      type: String,
      enum: ["active", "Inactive", "pending", "archived", "in-hospital"],
      default: "active",
    },

    contacts: [
      {
        name: { type: String },
        contact: { type: String }
      }
    ],

    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

/* ================= Soft delete filter ================= */
customerSchema.pre(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});

module.exports = mongoose.model("Customer", customerSchema);
