const wrapperService = require("../services/wrapper");
const hashingUtil = require("../utils/bcrypt");

const userService = require("../services/user");

const createUser = async (req, res, next) => {
  if (!req.body.name || !req.body.password || !req.body.email) {
    throw new Error("input_missing");
  }

  payloadValidator(req.body.name, req.body.password, req.body.email);

  const hashedPassword = await hashingUtil.encrypt(req.body.password);

  let createUserParams = {};
  createUserParams.name = req.body.name.toLowerCase();
  createUserParams.password = hashedPassword;
  createUserParams.email = req.body.email;

  let userId = await userService.createUser(createUserParams);

  return res.json(userId);
};

module.exports = {
  createUser: wrapperService.wrap(createUser),
};

// VALIDATOR FUNCTION(INTERNAL USE ONLY)
const payloadValidator = (name, password, email) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) throw new Error("invalid_email");
  if (name.length < 2 || name.length > 64) throw new Error("invalid_name");
  if (password.length < 2 || password.length > 64)
    throw new Error("invalid_password");

  return;
};
