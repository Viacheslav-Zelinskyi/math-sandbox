const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "themes",
    {
      theme_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      theme: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
