const jwtTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: process.env.COOKIE_LIFETIME,
    secure: process.env.ENV === "prod",
    signed: true
  });
}

module.exports = {
  jwtTokenCookie,
}