const jwt = require("jsonwebtoken");
const CustomError = require("../errors");

const createAccessToken = (payload) => {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtAccessTokenLifetime = process.env.JWT_ACCESS_TOKEN_LIFETIME;
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtAccessTokenLifetime,
  });
  return token;
};

const createRefreshToken = (payload) => {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtRefreshTokenLifetime = process.env.JWT_REFRESH_TOKEN_LIFETIME;
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtRefreshTokenLifetime,
  });
  return token;
};

const verifyToken = (token) => {
  const jwtSecret = process.env.JWT_SECRET;
  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
  } catch (error) {
    throw new CustomError.Unauthenticated("invalid token");
  }
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyToken,
};
