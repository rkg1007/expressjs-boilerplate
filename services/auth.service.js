const crypto = require("crypto");
const User = require("../models/user.model");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { jwt } = require("../utils");
const { use } = require("express/lib/application");

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
}

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

  const token = jwt.createToken({ id: user._id, role: user.role });
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

module.exports = {
  register,
  login,
  verifyEmail
};
