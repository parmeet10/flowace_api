const wrapperService = require("./wrapper");
const status = require("../configs/status");

const userModel = require("../models/user");

const createUser = async (params) => {
  if (!params.name || !params.password || !params.email) {
    throw new Error("input_missing");
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



module.exports = {
  createUser: wrapperService.wrap(createUser), 
};
