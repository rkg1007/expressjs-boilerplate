const jwtTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: process.env.COOKIE_LIFETIME,
    secure: process.env.ENV === "prod",
    signed: true
  });
}

const logoutCookie = (res) => {
  res.cookie("token", "logging out", {
    httpOnly: true,
    maxAge: 0,
    secure: process.env.ENV === "prod",
    signed: true
  });
}

module.exports = {
  jwtTokenCookie,
  logoutCookie
}