const mongoose = require("mongoose");
const Controller = require("../../Base/Controller");
const FrequentUtility = require("../../../services/Frequent");
const frequentUtility = new FrequentUtility();
const Patients = mongoose.model("Patients");

class PatientsController extends Controller {
  async addPatient() {
    try {
      let newPatient = this.req.body;
      newPatient["patientId"] = await this.verifyAndPreparePatientId();
      const patient = new Patients({
        ...newPatient,
      });
      await patient.save();
      return this.res.status(200).json({
        success: true,
        message: "Patient Added Successfully",
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

  async verifyAndPreparePatientId(initial = "PT") {
    let newId = await frequentUtility.generateNumber(6);
    let isUnique = false;
    while (!isUnique) {
      let patientRecord = await Patients.findOne({
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
