const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "Frist Name Required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name Required"],
    },
    phone: {
      type: String,
      required: [true, "Phone Number Required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    specilization: {
      type: String,
      required: [true, "Specilization is required"],
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
    },
    feesPerCunsaltation: {
      type: Number,
      required: [true, "Fees is required"],
    },
    status: {
      type: String,
      default: "Pending",
    },
    timing: {
      type: Object,
      required: [true, "Work Timing is required"],
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema);

module.exports = doctorModel;
