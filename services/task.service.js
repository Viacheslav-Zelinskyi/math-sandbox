const db = require("../db");
const { Sequelize: sequelize } = require("sequelize");

class TaskService {
  getAllTasks(from, interval, fromEnd, user_id) {
    return new Promise((res, rej) => {
      db.tasks
        .findAll({
          offset: from,
          limit: interval,
          order: fromEnd ? [["task_id", "DESC"]] : null,
          where: user_id ? { user_id: user_id } : {},
        })
        .then((result) => res(result));
    });
  }

  getOneTask(task_id) {
    return new Promise((res, rej) => {
      db.tasks
        .findOne({ where: { task_id: task_id } })
        .then((result) => res(result));
    });
  }

  getPopularTasksId() {
    return new Promise((res, rej) => {
      db.tasks_views
        .findAll({
          attributes: [
            "task_id",
            [sequelize.fn("COUNT", sequelize.col("view_id")), "views"],
          ],
          group: "task_id",
          order: sequelize.literal("views DESC"),
          limit: 7,
        })
        .then((result) => res(result.map((item) => item.task_id)));
    });
  }

  getTasksById(tasksId) {
    return new Promise((res, rej) => {
      db.tasks
        .findAll({ where: { task_id: tasksId } })
        .then((result) => res(result));
    });
  }

  getViews(task_id) {
    return new Promise((res, rej) => {
      db.tasks_views
        .count({ where: { task_id: task_id } })
        .then((result) => res(result));
    });
  }

  getComments(task_id) {
    return new Promise((res, rej) => {
      db.comments
        .findAll({
          where: { task_id: task_id },
          include: [{ model: db.users, attributes: ["user_name"] }],
        })
        .then((result) => res(result));
    });
  }

  getCommentLikes(comment_id) {
    return new Promise((res, rej) => {
      db.comments_likes
        .findAll({ where: { comment_id: comment_id } })
        .then((result) => res(result));
    });
  }

  countCompletedTask(user_id) {
    return new Promise((res, rej) => {
      db.users_answers
        .count({ where: { user_id: user_id } })
        .then((result) => res({ count: result }));
    });
  }

  countWritedTask(user_id) {
    return new Promise((res, rej) => {
      db.tasks
        .count({ where: { user_id: user_id } })
        .then((result) => res(result));
    });
  }

  addComment(task_id, comment, user_id) {
    return new Promise((res, rej) => {
      db.comments
        .create({
          task_id: task_id,
          comment: comment,
          user_id: user_id,
        })
        .then(() => res({ status: "Comment Created" }))
        .catch(() => res({ status: "Error" }));
    });
  }

  addCommentLike(user_id, comment_id, is_positive) {
    return new Promise((res, rej) => {
      db.comments_likes
        .findOrCreate({
          where: { user_id: user_id, comment_id: comment_id },
          defaults: {
            user_id: user_id,
            comment_id: comment_id,
            is_positive: is_positive,
          },
        })
        .then((result) => res(!result[1]));
    });
  }

  addResponse(user_id, task_id, response_ranking) {
    return new Promise((res, rej) => {
      db.tasks_response
        .findOrCreate({
          where: { user_id: user_id, task_id: task_id },
          defaults: {
            user_id: user_id,
            task_id: task_id,
            response_ranking: response_ranking,
          },
        })
        .then((result) => res(!result[1]));
    });
  }

  updateTask(taskData, task_id, user_id, is_admin) {
    return new Promise((res, rej) => {
      console.log(task_id, user_id, is_admin)
      db.tasks
        .update(taskData, {
          where: is_admin
            ? { task_id: task_id }
            : { task_id: task_id, user_id: user_id },
        })
        .then((result) => res(result));
    });
  }

  updateCommentLike(user_id, comment_id, is_positive) {
    return new Promise((res, rej) => {
      db.comments_likes
        .update(
          { is_positive: is_positive },
          { where: { user_id: user_id, comment_id: comment_id } }
        )
        .then(() => res({ status: "Like updated" }))
        .catch(() => res({ error: "Like don't updated" }));
    });
  }

  updateResponse(user_id, task_id, response_ranking) {
    return new Promise((res, rej) => {
      db.tasks_response
        .update(
          { response_ranking: response_ranking },
          { where: { user_id: user_id, task_id: task_id } }
        )
        .then(() => res({ status: "Response updated" }))
        .catch(() => res({ error: "Response don't updated" }));
    });
  }

  deleteTask(task_id, user_id, is_admin) {
    return new Promise((res, rej) => {
      db.tasks
        .destroy({
          where: is_admin
            ? { task_id: task_id }
            : { task_id: task_id, user_id: user_id },
        })
        .then((result) => res(result));
    });
  }

  deleteCommentLike(user_id, comment_id) {
    return new Promise((res, rej) => {
      db.comments_likes
        .destroy({
          where: { user_id: user_id, comment_id: comment_id },
        })
        .then(() => res({ status: "Like deleted" }))
        .catch(() => res({ error: "Like don't deleted" }));
    });
  }

  markAsRead(task_id) {
    return new Promise((res, rej) => {
      db.tasks_views
        .create({
          task_id: task_id,
        })
        .then(() => res({ status: "Task readed" }))
        .catch(() => res({ status: "Error" }));
    });
  }

  countTasks() {
    return new Promise((res, rej) => {
      db.tasks.count().then((result) => res(result));
    });
  }

  createTask(taskData) {
    return new Promise((res, rej) => {
      db.tasks
        .create(taskData)
        .then(() => res({ status: "Task Created" }))
        .catch((err) => res({ status: err }));
    });
  }
}

module.exports = new TaskService();
