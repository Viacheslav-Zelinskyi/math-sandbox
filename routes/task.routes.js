const express = require("express"),
  router = express.Router(),
  TaskController = require("../controllers/task.controller"),
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

router
  .route("/")
  .post(TaskController.createTask)
  .get(TaskController.getAllTasks)
  .patch(TaskController.updateTask)
  .delete(TaskController.deleteTask);

router
  .route("/id/:id")
  .get(TaskController.getTask)
  .post(TaskController.addResponse);

router.route("/answer").post(TaskController.checkAnswer)

router.route("/last").get(TaskController.getLastTasks);

router.route("/completed").get(TaskController.countCompletedTask);

router.route("/writed").get(TaskController.getWritedTask);

router.route("/popular").get(TaskController.getPopularTask);

router
  .route("/comment")
  .get(TaskController.getCommentsLikes)
  .post(TaskController.addComment);

router
  .route("/comment/:id")
  .post(TaskController.addCommentLike)
  .delete(TaskController.deleteCommentLike);

module.exports = router;
