const jwt = require("jsonwebtoken");
const CustomError = require("../errors");

const createToken = (payload) => {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtLifetime = process.env.JWT_LIFETIME;
  const token = jwt.sign(payload, jwtSecret, {expiresIn: jwtLifetime});
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
}

module.exports = {
  createToken,
  verifyToken
}