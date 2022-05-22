const CustomError = require("../errors");
const User = require("../models/user.model");

const getUsers = async () => {
  const allUsers = await User.find().select({
    password: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  });
  return allUsers;
};

const getUser = async (userId) => {
  const user = await User.findById(userId).select({
    name: 1,
    email: 1,
    role: 1,
    createdAt: 1,
    updatedAt: 1,
  });
  if (!user) {
    throw new CustomError.NotFound("user is not found");
  }
  return user;
};

const updatePassword = async ({ userId, oldPassword, newPassword }) => {
  const user = await User.findById(userId);

  if (!user.comparePassword(oldPassword)) {
    throw new CustomError.Unauthenticated("invalid password");
  }

  user.password = newPassword;
  await user.save();

  return { id: user._id, name: user.name, email: user.email };
};

const updateUser = async ({ userId, name, email }) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true }
  );
  return { id: user._id, name: user.name, email: user.email, role: user.role };
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndRemove(userId);
  return "user deleted";
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  updatePassword,
};
