const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { jwt, attachCookie } = require("../utils");

const authenticate = (role) => {
  return function (req, res, next) {
    if (!role) {
      role = "user";
    }

    const { accessToken, refreshToken } = req.signedCookies;

    if (accessToken) {
      const payload = jwt.verifyToken(accessToken);
      if (payload.role == role) {
        req.user = { ...payload };
        next();
        return;
      }
    }

    const payload = jwt.verifyToken(refreshToken);
    if (payload.role !== role) {
      throw new CustomError.CustomError(
        "you are not authorized to access this route",
        StatusCodes.FORBIDDEN
      );
    }

    req.user = { id: payload.id, role: payload.role };
    const newAccessToken = jwt.createAccessToken(req.user);
    attachCookie.accessTokenCookie(res, newAccessToken);
    next();
  };
};

module.exports = {
  authenticate,
};
