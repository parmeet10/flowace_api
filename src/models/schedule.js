const wrapperService = require("../services/wrapper");

const database = require("../database/mysql");

const createSchedule = async (params) => {
  if (!params.start || !params.end || !params.userId || !params.sportName) {
    throw new Error("input_missing");
  }

  let _insert = {
    user_id: params.userId,
    start: params.start,
    end: params.end,
    sport_name: params.sportName,
  };

  let createScheduleQuery = database.knex
    .insert(_insert)
    .into("sport_schedules");

  const scheduleId = await createScheduleQuery;

  return scheduleId;
};

const getSchedules = async (params) => {
  let getSchedulesQuery = database.knex
    .select("s.id")
    .select("s.user_id as userId")
    .select("s.start")
    .select("s.end")
    .select("s.sport_name as sportName")
    .select("s.active")
    .from("sport_schedules as s");

  params.hasOwnProperty("active")
    ? getSchedulesQuery.where("s.active", params.active)
    : null;
  params.userId ? getSchedulesQuery.where("s.user_id", params.userId) : null;
  params.start
    ? getSchedulesQuery.whereBetween("s.start", [params.start, params.end])
    : null;
  params.start
    ? getSchedulesQuery.orWhereBetween("s.end", [params.start, params.end])
    : null;
  params.hasOwnProperty("active")
    ? getSchedulesQuery.where("s.active", params.active)
    : null;

  console.log(getSchedulesQuery.toString());
  const schedules = await getSchedulesQuery;

  return _translateToJson(schedules);
};

const updateSchedule = async (params) => {
  if (!params.scheduleId) {
    throw new Error("input_missing");
  }

  let _update = {};
  params.hasOwnProperty("active") ? (_update["active"] = params.active) : null;

  let updateScheduleQuery = database
    .knex("sport_schedules")
    .update(_update)
    .where("id", params.scheduleId);

  let result = await updateScheduleQuery;

  return true;
};

const _translateToJson = (schedules) => {
  let scheduleIds = Array.from(
    new Set(schedules.map((schedule) => schedule.id))
  );

  let result = [];

  scheduleIds.forEach((scheduleId) => {
    let _schedules = schedules.filter((schedule) => schedule.id === scheduleId);
    let _schedule = _schedules[0];

    let _result = {};
    _result.id = _schedule.id;
    _result.userId = _schedule.userId;
    _result.start = _schedule.start;
    _result.end = _schedule.end;
    _result.active = _schedule.active;
    _result.sportName = _schedule.sportName;

    result.push(_result);
  });

  return result;
};
module.exports = {
  createSchedule: wrapperService.wrap(createSchedule),
  getSchedules: wrapperService.wrap(getSchedules),
  updateSchedule: wrapperService.wrap(updateSchedule),
};
