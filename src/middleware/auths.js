const wrapperService = require("../services/wrapper");

const jwt = require("./jwt");

const middleware = async (req, res, next) => {
  let skip = false;

  let whiteListedRoutes = [
    {
      methods: ["GET"],
      uri: "/authentication",
    },
  ];

  whiteListedRoutes.map((route) => {
    if (route.uri == req.path && route.methods == req.method) {
      skip = true;
    }
  });

  if (skip) {
    let jwtParams = {};
    jwtParams.payload = new Date().toString(); // DANGEROUS ASSUMPTION (for encryption)

    const token = jwt.sign(jwtParams);

    return res.json({ token: token });
  }

  if (!req.headers["x-auth"]) {
    throw new Error("headers_missing");
  }

  let jwtParams = {};
  jwtParams.token = req.headers["x-auth"];

  const decode = jwt.decode(jwtParams);

  if (!decode || decode == null) {
    throw new Error("invalid_token");
  }

  return next();
};

module.exports = wrapperService.wrap(middleware);