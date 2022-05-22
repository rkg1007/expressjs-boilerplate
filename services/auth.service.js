const crypto = require("crypto");
const User = require("../models/user.model");
const Token = require("../models/token.model");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { jwt } = require("../utils");

const register = async ({ name, email, password }) => {
  const isEmailAlreadyRegistered = await User.findOne({ email });
  if (isEmailAlreadyRegistered) {
    throw new CustomError.CustomError(
      "email is already registered",
      StatusCodes.CONFLICT
    );
  }

  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({ name, email, password, verificationToken });
  return { verificationToken };
};

const verifyEmail = async ({ email, verificationToken }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.NotFound("user not found");
  }

  if (user.verificationToken !== verificationToken) {
    throw new CustomError.Unauthenticated("verification failed. invalid token");
  }

  user.verificationToken = "";
  user.isVerified = true;
  user.verifiedAt = Date.now();

  await user.save();
  return "email verified";
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.BadRequest("user is not registered");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.Unauthenticated("wrong password");
  }

  if (!user.isVerified) {
    throw new CustomError.Unauthenticated("you are not verified");
  }

  const refreshTokenString = crypto.randomBytes(40).toString("hex");
  const token = await Token.create({
    token: refreshTokenString,
    user: user._id,
  });

  const accessToken = jwt.createAccessToken({ id: user._id, role: user.role });
  const refreshToken = jwt.createRefreshToken({
    id: user._id,
    role: user.role,
    token: refreshTokenString,
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken
  };
};

const logout = async (userId) => {
  await Token.findOneAndDelete({ user: userId });
  return "token deleted";
};

module.exports = {
  register,
  login,
  verifyEmail,
  logout,
};
