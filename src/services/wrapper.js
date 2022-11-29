const status = require("../configs/status");

const wrap = (inputFunction) => {
  return async function () {
    try {
      return await inputFunction.apply(this, arguments);
    } catch (e) {
           console.log(e);
      let cb;

      if (arguments.length !== 1) {
        cb = arguments[arguments.length - 1];
      }

      if (e.hasOwnProperty("message")) {
        console.log(new Date().toISOString(), status.getStatus(e.message));
        return cb
          ? cb(status.getStatus(e.message))
          : status.getStatus(e.message);
      } else {
        console.log(e);
        return cb
          ? cb(status.getStatus("generic_fail"))
          : status.getStatus("generic_fail");
      }
    }
  };
};

module.exports = {
  wrap: wrap,
};