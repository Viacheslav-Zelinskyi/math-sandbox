const express = require("express"),
  router = express.Router(),
  TaskController = require("../controllers/task.controller"),
  AuthService = require("../services/auth.service");

router.use(async (req, res, next) => {
  let users = await AuthService.getUserByUsername(req.body.user_name);
  req.user = users[0]?.dataValues;
  next();
});

router
  .route("/")
  .post(TaskController.createTask)
  .get(TaskController.getAllTasks);

router
  .route("/id/:id")
  .get(TaskController.getTask)
  .post(TaskController.addResponse);

router.route("/last").get(TaskController.getLastTasks);

router.route("/popular").get(TaskController.getPopularTask);

router.route("/comment").post(TaskController.addComment);

router
  .route("/comment/:id")
  .post(TaskController.addCommentLike)
  .delete(TaskController.deleteCommentLike);

module.exports = router;
