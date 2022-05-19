const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { authService } = require("../services");
const { asyncWrapper } = require("../utils");

const register = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomError.BadRequest(
      "please provide all details i.e name, email and password"
    );
  }

  const { user, token } = await authService.register({ name, email, password });
  res.status(StatusCodes.CREATED).json({ user, token });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequest(
      "please provide all details i.e email and password"
    );
  }

  const { user, token } = await authService.login({ email, password });
  res.status(StatusCodes.CREATED).json({ user, token });
});

module.exports = {
  register,
  login,
};
