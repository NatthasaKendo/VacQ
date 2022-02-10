const express = require("express");
const {
  getHospitals,
  getHospital,
  deleteHospital,
  createHospital,
  updateHospital,
} = require("../controller/hospitals");
const router = express.Router();

// const app = express();

router.route("/").get(getHospitals).post(createHospital);
router
  .route("/:id")
  .get(getHospital)
  .put(updateHospital)
  .delete(deleteHospital);

module.exports = router;
