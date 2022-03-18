const mongoose = require("mongoose");
const Controller = require("../../Base/Controller");
const FrequentUtility = require("../../../services/Frequent");
const frequentUtility = new FrequentUtility();
const Patient = mongoose.model("Patient");
const bcrypt = require("bcrypt");
class PatientsController extends Controller {
  async registerPatient() {
    try {
      let newPatient = this.req.body;
      newPatient["patientId"] = await this.verifyAndPreparePatientId();

      if (!newPatient.hasOwnProperty("email")) {
        return this.res.send({
          success: false,
          message: `email is required`,
        });
      }
      if (!newPatient.hasOwnProperty("password")) {
        return this.res.send({
          success: false,
          message: `password is required`,
        });
      }
      const patient = new Patient({
        ...newPatient,
      }).save();

      return this.res.status(200).json({
        success: true,
        message: "Patient Added Successfully",
        data: patient,
      });
    } catch (error) {
      console.error(error);
      return this.res.status(500).json({
        success: false,
        message: "P101: Error in adding patient",
        error: error,
      });
    }
  }

  async loginPatient() {
    try {
      const loginDetail = this.req.body;
      if (!loginDetail.hasOwnProperty("email")) {
        return this.res.send({
          success: false,
          message: `email is required`,
        });
      }
      if (!loginDetail.hasOwnProperty("password")) {
        return this.res.send({
          success: false,
          message: `password is required`,
        });
      }

      let { email, password } = loginDetail;

      const patient = await Patient.findOne({ email: email }).exec();
      if (!patient) {
        return this.res.status(400).json({
          success: false,
          message: `patient not found`,
        });
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          password = hash;
        });
      });
      const isMatch = await patient.comparePassword(password);
      if (!isMatch) {
        return this.res.status(400).json({
          success: false,
          message: `password does not match`,
        });
      }
      return this.res.send({
        success: true,
        message: `Login succesful`,
        data: patient,
        token: await frequentUtility.createAuthToken({
          ...patient,
          isAdmin: true,
        }),
      });
    } catch (error) {
      console.log(error);
      this.res.json({
        success: false,
        message: "Error Logging-in Patient",
      });
    }
  }

  async verifyAndPreparePatientId(initial = "PT") {
    let newId = await frequentUtility.generateNumber(6);
    let isUnique = false;
    while (!isUnique) {
      let patientRecord = await Patient.findOne({
        patientId: initial + newId,
      }).countDocuments();
      if (!patientRecord) {
        isUnique = true;
      } else {
        newId = await frequentUtility.generateNumber(6);
      }
    }
    return initial + newId;
  }
}
module.exports = PatientsController;
