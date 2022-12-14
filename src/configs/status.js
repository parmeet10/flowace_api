const getStatus = (code) => {
  let status = null;

  switch (code) {
    case "success":
      status = {
        code: code,
        error: false,
        message: "Successful",
      };
      break;

    case "url_missing":
      status = {
        code: code,
        error: true,
        message: "URL not found",
      };
      break;

    case "input_missing":
      status = {
        code: code,
        error: true,
        message: "Mandatory inputs missing.",
      };
      break;
    case "user_duplicate":
      status = {
        code: code,
        error: true,
        message: "user already existing. Try using new Email-Id",
      };
      break;

    case "headers_missing":
      status = {
        code: code,
        error: true,
        message: "Mandatory headers missing.",
      };
      break;

    case "authn_fail":
      status = {
        code: code,
        error: true,
        message: "Authorisation failed.",
      };
      break;
    case "invalid_email":
      status = {
        code: code,
        error: true,
        message: "email is invalid",
      };
      break;
    case "invalid_name":
      status = {
        code: code,
        error: true,
        message: "name is invalid",
      };
      break;
    case "invalid_password":
      status = {
        code: code,
        error: true,
        message: "password is invalid",
      };
      break;
    case "invalid_token":
      status = {
        code: code,
        error: true,
        message: "Invalid token",
      };
      break;

    case "invalid_date":
      status = {
        code: code,
        error: true,
        message: "Invalid Date",
      };
      break;
    case "self_overlap":
      status = {
        code: code,
        error: true,
        message: "user trying to overlap his own schedule",
      };
      break;
    case "schedule_inbound":
      status = {
        code: code,
        error: true,
        message:
          "user trying to schedule an event inside another event. Try new time setting",
      };
      break;
    case "unable_to_process":
      status = {
        code: code,
        error: true,
        message:
          "Too many schedules aligned during this period. Try some new time",
      };
      break;

    case "generic_fail":
    default:
      status = {
        code: "generic_fail",
        error: true,
        message: "Generic failure: Something went wrong.",
      };
      break;
  }

  return status;
};

module.exports = {
  getStatus: getStatus,
};
