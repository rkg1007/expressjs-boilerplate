const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const authService = require("../services/auth.service");
const { asyncWrapper, attachCookie } = require("../utils");

const register = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomError.BadRequest(
      "please provide all details i.e name, email and password"
    );
  }

  const { verificationToken } = await authService.register({
    name,
    email,
    password,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "please verify your email", verificationToken });
});

const verifyEmail = asyncWrapper(async (req, res) => {
  const { email, verificationToken } = req.body;

  if (!email || !verificationToken) {
    throw new CustomError.BadRequest(
      "please provide all details i.e email and verification token"
    );
  }

  const msg = await authService.verifyEmail({ email, verificationToken });
  res.status(StatusCodes.OK).json({ msg });
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

const logout = asyncWrapper(async (req, res) => {
  attachCookie.logoutCookie(res);
  res.status(StatusCodes.OK).json({ msg: "success" });
});

module.exports = {
  register,
  verifyEmail,
  login,
  logout,
};
