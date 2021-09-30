CREATE TABLE users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  user_name char(50) NOT NULL,
  user_password TEXT,
  is_admin BOOLEAN,
  is_blocked BOOLEAN
);

CREATE TABLE tasks (
  task_id SERIAL PRIMARY KEY NOT NULL,
  user_id int NOT NULL,
  task_name char(50) NOT NULL,
  task_title char(50) NOT NULL,
  task_condition TEXT NOT NULL,
  task_tags TEXT NOT NULL,
  task_images TEXT NOT NULL,
  task_answer TEXT NOT NULL
);

CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY NOT NULL,
  user_id int NOT NULL,
  task_id int NOT NULL,
  comment TEXT
);

CREATE TABLE comments_likes (
  like_id SERIAL PRIMARY KEY NOT NULL,
  user_id int NOT NULL,
  comment_id int NOT NULL,
  is_positive BOOLEAN
);

CREATE TABLE tasks_response (
  response_id SERIAL PRIMARY KEY NOT NULL,
  user_id int NOT NULL,
  task_id int NOT NULL,
  response_ranking int NOT NULL
);