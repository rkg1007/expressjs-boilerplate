const { asyncWrapper } = require("../utils");
const userService = require("../services/user.service");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getUsers = asyncWrapper(async (req, res) => {
  const users = await userService.getUsers();
  res.status(StatusCodes.OK).json({ users });
});

const getUser = asyncWrapper(async (req, res) => {
  const userId = req.params.id;
  const user = await userService.getUser(userId);
  res.status(StatusCodes.OK).json({ user });
});

const updateMyPassword = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequest("please old and new password both");
  }

  const user = await userService.updatePassword({
    userId,
    oldPassword,
    newPassword,
  });
  res.status(StatusCodes.OK).json({ user });
});

const showMe = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  const user = await userService.getUser(userId);
  res.status(StatusCodes.OK).json({ user });
});

const updateMe = (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;

  if (!name || !email) {
    throw new CustomError.BadRequest("please provide all details i.e name and email");
  }

  const user = await userService.updateMe({ userId, name, email });
  res.status(StatusCodes.OK).json({ user });
};

const deleteMe = asyncWrapper(async (req, res) => {
  const userId = req.user.id;
  const msg = await userService.deleteUser(userId);
  res.status(StatusCodes.OK).json({ msg });
});

module.exports = {
  getUsers,
  getUser,
  showMe,
  updateMe,
  updateMyPassword,
  deleteMe,
};
