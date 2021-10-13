const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "comments_likes",
    {
      like_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      task_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      is_positive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
