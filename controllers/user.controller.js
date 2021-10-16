const UserService = require("../services/user.service"),
  AuthService = require("../services/auth.service");

class UserController {
  async changeAdminStatus(req, res) {
    let authData = {};
    if (!req.user.is_admin) res.send({ error: "User is not an administrator" });
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
    const result = await UserService.changeAdminStatus(
      req.body.is_admin,
      req.body.users_id
    );
    res.send({ response: result });
  }

  async changeBlockedStatus(req, res) {
    let authData = {};
    if (!req.user.is_admin) res.send({ error: "User is not an administrator" });
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
    const result = await UserService.changeBlockedStatus(
      req.body.is_blocked,
      req.body.users_id
    );
    res.send({ response: result });
  }

  async deleteUsers(req, res) {
    let authData = {};
    if (!req.user.is_admin) res.send({ error: "User is not an administrator" });
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
    const result = await UserService.deleteUsers(req.body.users_id);
    res.send({ response: result });
  }

  async getAllUsers(req, res) {
    if (req.query.user_id) {
      const user = await UserService.getUserById(req.query.user_id);
      res.send(user);
    } else {
      const users = await UserService.getUsers(
        req.query.from,
        req.query.interval
      );
      res.send(users);
    }
  }
}

module.exports = new UserController();
