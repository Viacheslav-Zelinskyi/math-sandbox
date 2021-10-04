const AuthService = require("../services/auth.service");

class AuthController {
  async authorization(req, res) {
    if (req.user?.is_blocked) {
      res.send({ error: "Account blocked" });
      return;
    }
    switch (req.body.type) {
      case "auth":
        if (!req.user?.hasOwnProperty("user_id")) {
          res.send({ error: "User doesn't exist" });
          break;
        }
        const checkPassword = await AuthService.checkPassword(
          req.body.password,
          req.user.user_password
        );
        res.send(checkPassword ? { loggedin: true } : { loggedin: false });
        break;
      case "register":
        if (req.user?.hasOwnProperty("user_id")) {
          res.send({ error: "User exist" });
          break;
        }
        const passwordHash = await AuthService.hashPassword(req.body.password);
        AuthService.createUser(req.body.user_name, passwordHash);
        res.send({ status: "User created" });
        break;
      case "facebook":
        const tokenCheck = await AuthService.facebookAuth(req.body.token);
        if (!tokenCheck.hasOwnProperty("id")) {
          res.send({ error: "Wrong token" });
          break;
        }
        if (req.user?.user_social_id === tokenCheck.id) {
          res.send({ loggedin: true });
          break;
        }
        AuthService.createUser(tokenCheck.name, null, tokenCheck.id);
        res.send({ loggedin: true });
        break;
      case "google":
        const ticket = await AuthService.googleAuth(req.body.token);
        if (!ticket.hasOwnProperty("id")) {
          res.send({ error: "Wrong token" });
          break;
        }
        if (req.user?.user_social_id === ticket.id) {
          res.send({ loggedin: true });
          break;
        }
        AuthService.createUser(ticket.name, null, ticket.id);
        res.send({ loggedin: true });
        break;
    }
  }
}

module.exports = new AuthController();
