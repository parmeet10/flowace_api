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

  // check existing user or not
  const user = await userService.getUsers(userServiceParams);

  if (!user.data.userDetails.length) {
    throw new Error("authn_fail");
  }

  let getScheduleParams = {};
  getScheduleParams.start = params.start;
  getScheduleParams.end = params.end;
  //checking if there is any overlaping in the schedules
  const schedules = await getSchedules(getScheduleParams);

  if (schedules.data.schedules.length > 0) {
    //filtering same user schedule
    const duplicateUserSchedule = schedules.data.schedules.filter(
      (schedule) => schedule.userId == params.userId
    );
    if (duplicateUserSchedule.length > 0) {
      throw new Error("self_overlap");
    }
    if (schedules.data.schedules.length > 1) {
      throw new Error("unable_to_process");
    }
    if (
      params.start >= schedules.data.schedules[0].start &&
      params.start <= schedules.data.schedules[0].end &&
      params.end >= schedules.data.schedules[0].start &&
      params.end <= schedules.data.schedules[0].end
    ) {
      throw new Error("schedule_inbound");
      //aligning new slots to the schedule
    } else if (
      params.start > schedules.data.schedules[0].start &&
      params.end > schedules.data.schedules[0].end
    ) {
      params.start = schedules.data.schedules[0].end;
    } else if (
      params.start < schedules.data.schedules[0].start &&
      params.end > schedules.data.schedules[0].start
    ) {
      params.end = schedules.data.schedules[0].start;
    }
  }

  let createScheduleParams = {};
  createScheduleParams.userId = params.userId;
  createScheduleParams.sportName = params.sportName;
  createScheduleParams.start = params.start;
  createScheduleParams.end = params.end;

  const scheduleId = await scheduleModel.createSchedule(createScheduleParams);

  let response = status.getStatus("success");
  response.data = {};
  response.data.scheduleId = scheduleId;

  return response;
};

const getSchedules = async (params) => {
  let scheduleModelParams = {};
  scheduleModelParams.active = 1;
  params.start ? (scheduleModelParams.start = new Date(params.start)) : null;
  params.end ? (scheduleModelParams.end = new Date(params.end)) : null;
  params.userId ? (scheduleModelParams.userId = params.userId) : null;

  const schedules = await scheduleModel.getSchedules(scheduleModelParams);

  let response = status.getStatus("success");
  response.data = {};
  response.data.schedules = schedules;

  return response;
};
// Not in use (hold)
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
