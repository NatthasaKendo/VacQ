const express = require("express");
const {
  getHospitals,
  getHospital,
  deleteHospital,
  createHospital,
  updateHospital,
} = require("../controller/hospitals");

//* Include other resource routers
const appointmentRouter = require("./appointments");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

//* Re-route into other resource routers
router.use("/:hospitalId/appointments", appointmentRouter);

// const app = express();

router.route("/").get(getHospitals).post(protect, authorize("admin"), createHospital);
router
  .route("/:id")
  .get(getHospital)
  .put(protect, authorize("admin"), updateHospital)
  .delete(protect, authorize("admin"), deleteHospital);

module.exports = router;
