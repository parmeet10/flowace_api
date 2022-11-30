const wrapperService = require("../services/wrapper");

const scheduleService = require("../services/schedule");
const createSchedule = async (req, res, next) => {
  if (
    !req.body.userId ||
    !req.body.start ||
    !req.body.end ||
    !req.body.sportName
  ) {
    throw new Error("input_missing");
  }

  if (
    new Date(req.body.start) < new Date() ||
    new Date(req.body.end) < new Date()
  ) {
    throw new Error("authn_fail");
  }

  let scheduleServiceParams = {};
  scheduleServiceParams.start = new Date(req.body.start);
  scheduleServiceParams.end = new Date(req.body.end);
  scheduleServiceParams.userId = req.body.userId;
  scheduleServiceParams.sportName = req.body.sportName;

  const schedule = await scheduleService.createSchedule(scheduleServiceParams);

  return res.json(schedule);
};

const getSchedules = async (req, res, next) => {
  let scheduleServiceParams = {};

  req.body.start
    ? (scheduleServiceParams.start = new Date(req.body.start))
    : null;
  req.body.end ? (scheduleServiceParams.end = new Date(req.body.end)) : null;
  req.query.userId ? (scheduleServiceParams.userId = req.query.userId) : null;

  const schedules = await scheduleService.getSchedules(scheduleServiceParams);

  return res.json(schedules);
};

module.exports = {
  createSchedule: wrapperService.wrap(createSchedule),
  getSchedules: wrapperService.wrap(getSchedules),
};
