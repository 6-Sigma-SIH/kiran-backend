const mongoose = require("mongoose");
const schema = mongoose.Schema;

const PatientSchema = new schema({
  patientId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  location: {
    latitude: { type: String, default: 0 },
    longitude: { type: String, default: 0 },
  },
  medicalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MedicalDetails",
    default: null,
  },
  gender: { type: String, enum: ["Male", "Female","Others"], required: true },
  phoneNo: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

mongoose.model("Patient", PatientSchema, "Patient");

const ResultSchema = new schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  testId: { type: String, required: true },
  testName: { type: String, required: true },
  testResult: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

mongoose.model("Result", ResultSchema, "Result");

const MedicalDetailsSchema = new schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  mentalHealthHistory: { type: String, required: true },
  physicalHealthHistory: { type: String, required: true },
  familyMentalHealthHistory: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

mongoose.model("MedicalDetails", MedicalDetailsSchema, "MedicalDetails");
