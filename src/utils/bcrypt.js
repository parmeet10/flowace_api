const bcrypt = require("bcrypt");

const wrapperService = require("../services/wrapper");

const saltRounds = 5;

const encrypt = async (password) => {
  if (!password) {
    throw new Error("input_missing");
  }
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

// we are not logging in therefore, decrypt function is not needed here!!!

module.exports = {
  encrypt: wrapperService.wrap(encrypt),
};
