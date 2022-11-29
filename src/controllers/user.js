const wrapperService = require("../services/wrapper");
const hashingUtil = require("../utils/bcrypt");

const userService = require("../services/user");

const createUser = async (req, res, next) => {
  if (!req.body.name || !req.body.password || !req.body.email) {
    throw new Error("input_missing");
  }

  let validationParams = {};
  validationParams.name = req.body.name;
  validationParams.email = req.body.email;
  validationParams.password = req.body.password;

  payloadValidator(validationParams);

  const hashedPassword = await hashingUtil.encrypt(req.body.password);

  let createUserParams = {};
  createUserParams.name = req.body.name.toLowerCase();
  createUserParams.password = hashedPassword;
  createUserParams.email = req.body.email;

  let userId = await userService.createUser(createUserParams);

  return res.json(userId);
};

const getUsers = async (req, res, next) => {
  let validationParams = {};
  req.body.email ? (validationParams.email = req.body.email) : null;
  req.body.name ? (validationParams.name = req.body.name) : null;

  payloadValidator(validationParams);

  let getUserParams = {};
  req.body.email ? (getUserParams.email = req.body.email) : null;
  req.body.name ? (getUserParams.name = req.body.name) : null;
  req.query.userId ? (getUserParams.userId = req.query.userId) : null;

  const userDetails = await userService.getUsers(getUserParams);

  return res.json(userDetails);
};

module.exports = {
  createUser: wrapperService.wrap(createUser),
  getUsers: wrapperService.wrap(getUsers),
};

const payloadValidator = (params) => {
  if (params.email) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(params.email)) throw new Error("invalid_email");
  }
  if (params.name) {
    if (params.name.length < 2 || params.name.length > 64)
      throw new Error("invalid_name");
  }
  if (params.password) {
    if (params.password.length < 2 || params.password.length > 64)
      throw new Error("invalid_password");
  }

  return;
};
