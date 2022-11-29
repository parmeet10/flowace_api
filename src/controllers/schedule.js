const wrapperService = require("../services/wrapper");

const scheduleService = require("../services/schedule");
const createSchedule = async (req, res, next) => {
  //  date = "2022-11-29T14:15:28.525Z"; //HH:MM:SSz
  if (
    !req.body.userId ||
    !req.body.start ||
    !req.body.end ||
    !req.body.sportName
  ) {
    throw new Error("input_missing");
  }

  if (
    new Date(req.body.start).toISOString() < new Date().toISOString() ||
    new Date(req.body.end).toISOString() < new Date().toISOString()
  ) {
    throw new Error("authn_fail");
  }

  let scheduleServiceParams = {};
  scheduleServiceParams.start = req.body.start;
  scheduleServiceParams.end = req.body.end;
  scheduleServiceParams.userId = req.body.userId;
  scheduleServiceParams.sportName = req.body.sportName;

  const schedule = await scheduleService.createSchedule(scheduleServiceParams);

  return res.json(schedule);
};

module.exports = {
  createSchedule: wrapperService.wrap(createSchedule),
};
