const db = require("../db");

class UserService {
  changeAdminStatus(is_admin, users_id) {
    return new Promise((res, rej) => {
      db.users.update({ is_admin: is_admin }, { where: { user_id: users_id } }).then(()=>res("User updated"));
    });
  }

  changeBlockedStatus(is_blocked, users_id) {
    return new Promise((res, rej) => {
      db.users.update({ is_blocked: is_blocked }, { where: { user_id: users_id } }).then(()=>res("User updated"));
    });
  }

  deleteUsers(users_id) {
    return new Promise((res, rej) => {
      db.users
        .destroy({ where: { user_id: users_id } })
        .then(() => res("User deleted"));
    });
  }

  getUsers(from, interval) {
    return new Promise((res, rej) => {
      db.users
        .findAll({
          offset: from,
          limit: interval,
          attributes: ["user_id", "user_name", "is_admin", "is_blocked"],
        })
        .then((result) => res(result));
    });
  }

  getUserById(user_id) {
    return new Promise((res, rej) => {
      db.users
        .findOne({
          where: {user_id: user_id},
          attributes: ["user_id", ["user_name", "username"], "is_admin", "is_blocked"],
        })
        .then((result) => res(result));
    });
  }
}

module.exports = new UserService();
