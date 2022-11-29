const jwt = require("jsonwebtoken");

//SECRET
const secret = process.env.SECRET || "1shc@ahsgc#0198293";

const sign = (payload) => {
  if (!payload) throw new Error("input_mising");
  if (typeof payload !== "object") throw new Error("generic_failure");
  const token = jwt.sign(payload, secret, { algorithm: "HS256" });
  return token;
};

const decode = (payload) => {
  try {
    if (!payload) throw new Error("input_mising");
    const decoded = jwt.verify(payload.token, secret, { algorithms: "HS256" });
    return decoded;
  } catch (err) {
    return null;
  }
};

module.exports = {
  sign,
  decode,
};