const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { authService } = require("../services");
const { asyncWrapper, attachCookie } = require("../utils");

const register = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomError.BadRequest(
      "please provide all details i.e name, email and password"
    );
  }

  const { user, token } = await authService.register({ name, email, password });
  attachCookie.jwtTokenCookie(res, token);
  res.status(StatusCodes.CREATED).json({ user });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequest(
      "please provide all details i.e email and password"
    );
  }

  const { user, token } = await authService.login({ email, password });
  attachCookie.jwtTokenCookie(res, token);
  res.status(StatusCodes.CREATED).json({ user });
});

module.exports = {
  register,
  login,
};
