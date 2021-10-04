const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "users",
    {
      user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      is_blocked: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      user_social_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
