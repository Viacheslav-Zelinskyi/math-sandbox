const { Sequelize } = require("sequelize");

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
const DB_DATABASE = process.env.DB_DATABASE;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  { freezeTableName: true }
);

const Users = require("./users")(sequelize);
const Tasks = require("./tasks")(sequelize);
const TasksViews = require("./tasks_views")(sequelize);
const TasksResponse = require("./tasks_response")(sequelize);
const Comments = require("./comments")(sequelize);
const CommentsLikes = require("./comments_likes")(sequelize);
const UsersAnswers = require('./users_answers')(sequelize);
const Themes = require('./themes')(sequelize);

Comments.belongsTo(Users, { foreignKey: "user_id" });

module.exports = {
  sequelize: sequelize,
  users: Users,
  tasks: Tasks,
  tasks_views: TasksViews,
  tasks_response: TasksResponse,
  comments: Comments,
  comments_likes: CommentsLikes,
  users_answers: UsersAnswers,
  themes: Themes
};
