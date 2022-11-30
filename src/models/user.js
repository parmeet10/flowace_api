const wrapperService = require("../services/wrapper");

const database = require("../database/mysql");

const createUser = async (params) => {
  if (!params.name || !params.password || !params.email) {
    throw new Error("input_missing");
  }

  let _insert = {
    name: params.name,
    password: params.password,
    email: params.email,
  };

  let createUserQuery = database.knex.insert(_insert).into("users");

  const userId = await createUserQuery;

  return userId[0];
};

const getUsers = async (params) => {
  let getUsersQuery = database.knex
    .select("u.id")
    .select("u.name")
    .select("u.email")
    .select("u.created_at")
    .from("users as u");

  params.userId ? getUsersQuery.where("u.id", params.userId) : null;
  params.email ? getUsersQuery.where("u.email", params.email) : null;
  params.name ? getUsersQuery.where("u.name", params.name) : null;

  const userDetails = await getUsersQuery;

  return userDetails;
};

module.exports = {
  createUser: wrapperService.wrap(createUser),
  getUsers: wrapperService.wrap(getUsers),
};
