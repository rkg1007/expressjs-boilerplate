const express = require("express");
const userContoller = require("../controllers/user.controller");
const { authenticate } = require("../middlewares/authentication");

const router = express.Router();

router.route("/").get(authenticate("admin"), userContoller.getUsers);

router
  .route("/me/update-password")
  .patch(authenticate(), userContoller.updateMyPassword);

router
  .route("/me")
  .get(authenticate(), userContoller.showMe)
  .patch(authenticate(), userContoller.updateMe)
  .delete(authenticate(), userContoller.deleteMe);

router.route("/:id").get(authenticate("admin"), userContoller.getUser);

module.exports = router;
