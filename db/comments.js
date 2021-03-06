const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  const Comments = sequelize.define(
    "comments",
    {
      comment_id: {
        type: Sequelize.UUID,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      task_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      underscored: true
    }
  );

  return Comments;
};
