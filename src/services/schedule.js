const wrapperService = require("./wrapper");
const status = require("../configs/status");

const userService = require("./user");
const scheduleModel = require("../models/schedule");

const createSchedule = async (params) => {
  if (!params.start || !params.end || !params.userId || !params.sportName) {
    throw new Error("input_missing");
  }

  let userServiceParams = {};
  userServiceParams.userId;

  const user = await userService.getUsers(userServiceParams);

  if (!user.data.userDetails.length) {
    throw new Error("authn_fail");
  }

  let getScheduleParams = {};
  getScheduleParams.start = params.start;
  getScheduleParams.end = params.end;

  const schedules = await getSchedules(getScheduleParams);

  const duplicateUserSchedule = schedules.data.schedules.filter(
    (schedule) => schedule.userId == params.userId
  );
  if (duplicateUserSchedule.length > 0) {
    throw new Error("self_overlap");
  }

  let createScheduleParams = {};
  createScheduleParams.userId = params.userId;
  createScheduleParams.sportName = params.sportName;
  createScheduleParams.start = new Date(params.start).toISOString();
  createScheduleParams.end = new Date(params.end).toISOString();

  //   const scheduleId = await scheduleModel.createSchedule(createScheduleParams);

  return true;
};

const getSchedules = async (params) => {
  let scheduleModelParams = {};
  params.start
    ? (scheduleModelParams.start = new Date(params.start).toISOString())
    : null;
  params.end
    ? (scheduleModelParams.end = new Date(params.end).toISOString())
    : null;
  params.userId ? (scheduleModelParams.userId = params.userId) : null;

  const schedules = await scheduleModel.getSchedules(scheduleModelParams);

  schedules.forEach(async (schedule) => {
    if (schedule.end < new Date()) {
      let updateScheduleParams = {};
      updateScheduleParams.active = 0;
      updateScheduleParams.scheduleId = schedule.id;

      await updateSchedule(updateScheduleParams);
    }
  });

  scheduleModelParams.active = 1;

  const verfiedSchedules = await scheduleModel.getSchedules(
    scheduleModelParams
  );

  let response = status.getStatus("success");
  response.data = {};
  response.data.schedules = verfiedSchedules;

  return response;
};

const updateSchedule = async (params) => {
  if (!params.scheduleId) {
    throw new Error("input_missing");
  }
  let updateScheduleModelParams = {};
  updateScheduleModelParams.scheduleId = params.scheduleId;
  params.hasOwnProperty("active")
    ? (updateScheduleModelParams.active = params.active)
    : null;

  await scheduleModel.updateSchedule(updateScheduleModelParams);

  return;
};

module.exports = {
  createSchedule: wrapperService.wrap(createSchedule),
  getSchedules: wrapperService.wrap(getSchedules),
};
