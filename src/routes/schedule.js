const express = require("express");
const router = express.Router();

const scheduleController = require("../controllers/schedule");

router.post("/", scheduleController.createSchedule);
// router.get("/", userController.getUsers);

module.exports = router;
