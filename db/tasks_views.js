const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "tasks_views",
    {
      view_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      task_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
