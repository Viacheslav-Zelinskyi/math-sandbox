const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "tasks",
    {
      task_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      task_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      task_theme: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      task_condition: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      task_tags: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      task_images: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      task_answer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
