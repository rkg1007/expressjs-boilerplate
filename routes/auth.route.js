const express = require("express");
const authController = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/authentication");

const router = express.Router();

router.route("/register").post(authController.register);
router.route("/verify-email").post(authController.verifyEmail);
router.route("/login").post(authController.login);
router.route("/logout").delete(authenticate(), authController.logout);

module.exports = router;