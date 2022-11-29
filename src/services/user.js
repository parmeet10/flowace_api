const wrapperService = require("./wrapper");
const status = require("../configs/status");

const userModel = require("../models/user");

const createUser = async (params) => {
  if (!params.name || !params.password || !params.email) {
    throw new Error("input_missing");
  }

  let getUserParams = {};
  getUserParams.email = params.email;

  const userData = await getUsers(getUserParams);
  if (userData.data.userDetails && userData.data.userDetails.length > 0) {
    throw new Error("user_duplicate");
  }

  let userModelParams = {};
  userModelParams.name = params.name;
  userModelParams.password = params.password;
  userModelParams.email = params.email;

  const userId = await userModel.createUser(userModelParams);

  let response = status.getStatus("success");
  response.data = {};
  response.data.userId = userId;

  return response;
};

const getUsers = async (params) => {
  let userModelParams = {};
  params.userId ? (userModelParams.userId = params.userId) : null;
  params.email ? (userModelParams.email = params.email) : null;
  params.name ? (userModelParams.name = params.name) : null;

  const userDetails = await userModel.getUsers(userModelParams);

  let response = status.getStatus("success");
  response.data = {};
  response.data.userDetails = userDetails;

  return response;
};

module.exports = {
  createUser: wrapperService.wrap(createUser),
  getUsers: wrapperService.wrap(getUsers),
};
