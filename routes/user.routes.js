const express = require("express"),
  router = express.Router(),
  UserController = require("../controllers/user.controller"),
  AuthService = require("../services/auth.service");

router.use(async (req, res, next) => {
  let users =
    req.body.user_name || req.query.user_name
      ? await AuthService.getUserByUsername(
          req.body.user_name || req.query.user_name
        )
      : [];
  req.user = users[0]?.dataValues;
  next();
});

router.route("/").get(UserController.getAllUsers).delete(UserController.deleteUsers);

router.route("/admin").patch(UserController.changeAdminStatus);

router.route("/block").patch(UserController.changeBlockedStatus);

module.exports = router;
