const accessTokenCookie = (res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: process.env.ACCESS_TOKEN_COOKIE_LIFETIME,
    secure: process.env.ENV === "prod",
    signed: true,
  });
};

const refreshTokenCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: process.env.REFRESH_TOKEN_COOKIE_LIFETIME,
    secure: process.env.ENV === "prod",
    signed: true,
  });
};

const logoutCookie = (res) => {
  res.cookie("accessToken", "logging out", {
    httpOnly: true,
    maxAge: 0,
    secure: process.env.ENV === "prod",
    signed: true,
  });
  res.cookie("refreshToken", "logging out", {
    httpOnly: true,
    maxAge: 0,
    secure: process.env.ENV === "prod",
    signed: true,
  });
};

module.exports = {
  accessTokenCookie,
  refreshTokenCookie,
  logoutCookie,
};
