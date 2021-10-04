const TaskService = require("../services/task.service");
const AuthService = require("../services/auth.service");

class TaskController {
  async getAllTasks(req, res) {
    const tasks = await TaskService.getAllTasks(
      req.query.from,
      req.query.interval
    );
    const tasksNumber = await TaskService.countTasks();
    res.send({ tasksNumber: tasksNumber, tasks: tasks });
  }

  async getTask(req, res) {
    const task = await TaskService.getOneTask(req.params.id);
    await TaskService.markAsRead(req.params.id);
    const views = await TaskService.getViews(req.params.id);
    const comments = await TaskService.getComments(req.params.id);
    res.send({ ...task.dataValues, views: views, comments: comments });
  }

  async addCommentLike(req, res) {
    let authData = {};
    switch (req.body.type) {
      case "google":
        authData = await AuthService.googleAuth(req.body.token);
        break;
      case "facebook":
        authData = await AuthService.facebookAuth(req.body.token);
        break;
      case "native":
        authData = await AuthService.checkPassword(
          req.body.password,
          req.user.user_password
        );
        break;
    }
    if (authData.hasOwnProperty("error"))
      return res.send({ error: "User not authorized" });
    const isLikeExist = await TaskService.addCommentLike(
      req.body.user_id,
      req.params.id,
      req.body.is_positive
    );
    if (isLikeExist)
      TaskService.updateCommentLike(
        req.body.user_id,
        req.params.id,
        req.body.is_positive
      );
    res.send(
      isLikeExist ? { status: "Like updated" } : { status: "Like added" }
    );
  }

  async deleteCommentLike(req, res) {
    const result = await TaskService.deleteCommentLike(
      req.body.user_id,
      req.params.id
    );

    res.send(result);
  }

  async addResponse(req, res) {
    let authData = {};
    switch (req.body.type) {
      case "google":
        authData = await AuthService.googleAuth(req.body.token);
        break;
      case "facebook":
        authData = await AuthService.facebookAuth(req.body.token);
        break;
      case "native":
        authData = await AuthService.checkPassword(
          req.body.password,
          req.user.user_password
        );
        break;
    }
    if (authData.hasOwnProperty("error"))
      return res.send({ error: "User not authorized" });

    const isResponseExist = await TaskService.addResponse(
      req.body.user_id,
      req.params.id,
      req.body.response_ranking
    );
    if (isResponseExist)
      TaskService.updateResponse(
        req.body.user_id,
        req.params.id,
        req.body.response_ranking
      );
    res.send(
      isResponseExist
        ? { status: "Response updated" }
        : { status: "Response added" }
    );
  }

  async getLastTasks(req, res) {
    const tasks = await TaskService.getAllTasks(0, 7, true);
    res.send(tasks);
  }

  async getPopularTask(req, res) {
    const tasksId = await TaskService.getPopularTasksId();
    const tasks = await TaskService.getTasksById(tasksId);
    res.send(tasks);
  }

  async createTask(req, res) {
    let authData = {};
    switch (req.body.type) {
      case "google":
        authData = await AuthService.googleAuth(req.body.token);
        break;
      case "facebook":
        authData = await AuthService.facebookAuth(req.body.token);
        break;
      case "native":
        authData = await AuthService.checkPassword(
          req.body.password,
          req.user.user_password
        );
        break;
    }
    if (authData.hasOwnProperty("error"))
      return res.send({ error: "User not authorized" });
    const taskData = {
      user_id: req.user.user_id,
      task_name: req.body.task_name,
      task_theme: req.body.task_theme,
      task_condition: req.body.task_condition,
      task_tags: req.body.task_tags,
      task_images: req.body.task_images,
      task_answer: req.body.task_answer,
    };
    const result = await TaskService.createTask(taskData);
    res.send(result);
  }

  async addComment(req, res) {
    let authData = {};
    switch (req.body.type) {
      case "google":
        authData = await AuthService.googleAuth(req.body.token);
        break;
      case "facebook":
        authData = await AuthService.facebookAuth(req.body.token);
        break;
      case "native":
        authData = await AuthService.checkPassword(
          req.body.password,
          req.user.user_password
        );
        break;
    }
    if (authData.hasOwnProperty("error"))
      return res.send({ error: "User not authorized" });
    const result = await TaskService.addComment(
      req.body.task_id,
      req.body.comment,
      req.body.user_id
    );
    res.send(result);
  }
}

module.exports = new TaskController();
