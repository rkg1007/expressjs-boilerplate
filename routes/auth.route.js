const express = require("express");
const { route } = require("express/lib/router");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.route("/register").post(authController.register);
router.route("/verify-email").post(authController.verifyEmail);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

module.exports = router;