const PatientsController = require("./patient.controller");
const config = require("../../../../configs/configs").portal.baseApiUrl;

module.exports = function (app, express) {
  const router = express.Router();

  router.post("/registerPatient", (req, res) => {
    return new PatientsController().boot(req, res).registerPatient();
  });

  router.post("/loginPatient", (req, res) => {
    return new PatientsController().boot(req, res).loginPatient();
  });

  router.post('/editProfile', (req, res) => {
    return new PatientsController().boot(req, res).editProfile();
  })



  app.use(config, router);
};
