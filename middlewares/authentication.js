const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { jwt } = require("../utils");

const authenticate = (role) => {
  return function (req, res, next) {
    if (!role) {
      role = "user";
    }

    const { token } = req.signedCookies;
    const payload = jwt.verifyToken(token);

    if (payload.role !== role) {
      throw new CustomError.CustomError(
        "you are not authorized to access this route",
        StatusCodes.FORBIDDEN
      );
    }

    req.user = { ...payload };
    next();
  };
};

module.exports = {
  authenticate,
};
