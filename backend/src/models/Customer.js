// models/Customer.js
const mongoose = require('mongoose');

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

const customerSchema = new mongoose.Schema(
    {
        // 🔗 Optional login link
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        // 🆔 IDs
        clientIdNo: { type: String, unique: true },
        councilIdNo: { type: String },
        jobType: { type: String },

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

        contractHours: Number,
        contractFee: Number,

        // 📍 Address
        address: addressSchema,

        // 💰 Finance
        finance: financeSchema,

        // 📝 Other
        additionalInformation: String,
        dataSharing: String,

        status: {
            type: String,
            enum: ["active", "Inactive", "pending", "archived", "in-hospital"],
            default: "active",
        },
        // in Customer schema
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

customerSchema.pre(/^find/, function (next) {
    this.where({ isDeleted: false });
    next();
});

module.exports = mongoose.model("Customer", customerSchema);
