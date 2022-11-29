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

  let userId = await createUserQuery;

  return userId[0];
};

module.exports = {
  createUser: wrapperService.wrap(createUser),
};
