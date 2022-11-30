const express = require("express");
const router = express.Router();

const scheduleController = require("../controllers/schedule");

router.post("/", scheduleController.createSchedule);
router.get("/", scheduleController.getSchedules);

module.exports = router;
