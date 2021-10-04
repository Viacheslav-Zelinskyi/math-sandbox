const db = require("../db");
const bcrypt = require("bcrypt");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const googleAuthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class AuthService {
  getUserByUsername(username) {
    return new Promise((res, rej) => {
      db.users
        .findAll({
          where: { user_name: username },
        })
        .then((result) => res(result));
    });
  }

  getUserBySocialId(social_id) {
    return new Promise((res, rej) => {
      db.users
        .findAll({
          where: { user_social_id: social_id },
        })
        .then((result) => res(result));
    });
  }

  checkPassword(password, passwordHash) {
    return new Promise((res, rej) => {
      bcrypt.compare(password, passwordHash, (error, result) => {
        return res(result || {error: "Wrong password"});
      });
    });
  }

  hashPassword(password) {
    return new Promise((res, rej) => {
      bcrypt.hash(password, 10, (err, hash) => {
        return res(hash || err);
      });
    });
  }

  createUser(username, password, id) {
    return new Promise((res, rej) => {
      db.users.create({
        user_social_id: id ? id : null,
        user_name: username,
        user_password: password,
        is_admin: false,
        is_blocked: false,
      });
    });
  }

  facebookAuth(token) {
    return new Promise((res, rej) => {
      axios
        .get(`https://graph.facebook.com/me?access_token=${token}`)
        .then((response) => {
          return res(response.data);
        })
        .catch((error) => {
          return res({ error: "Wrong access token" });
        });
    });
  }

  googleAuth(token) {
    return new Promise((res, rej) => {
      googleAuthClient.verifyIdToken(
        {
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
        },
        (error, ticket) => {
          return res(
            ticket
              ? {
                  id: ticket.getPayload().sub,
                  name: ticket.getPayload().name,
                }
              : { error: "Wrong token" }
          );
        }
      );
    });
  }
}

module.exports = new AuthService();
