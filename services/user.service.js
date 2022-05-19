const User = require("../models/user.model");
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

  const user = await User.create({ name, email, password });
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

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.BadRequest("user is not registered");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.Unauthenticated("wrong password");
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
};
