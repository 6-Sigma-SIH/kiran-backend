const PatientsController = require("./patient.controller");
const config = require("../../../../configs/configs").portal.baseApiUrl;

module.exports = function (app, express) {
  const router = express.Router();

  router.post("/addPatient", (req, res) => {
    return new PatientsController().boot(req, res).addPatient();
  });

  app.use(config, router);
};
