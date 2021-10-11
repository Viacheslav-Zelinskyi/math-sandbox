const express = require("express"),
  router = express.Router(),
  AuthController = require("../controllers/auth.controller"),
  AuthService = require("../services/auth.service");

router.use(async (req, res, next) => {
  let users = {};
  if (req.body.token) {
    users = await AuthService.getUserBySocialId(req.body.user_social_id);
  } else {
    users = await AuthService.getUserByUsername(req.body.user_name);
  }
  req.user = users[0]?.dataValues;
  next();
});

router.route("/").post(AuthController.authorization);

module.exports = router;
