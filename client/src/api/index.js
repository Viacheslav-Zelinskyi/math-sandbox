export const logInFetch = async (authData) => {
  const response = await fetch(
    "http://localhost:5000/api/auth",
    // window.location.protocol + "//" + window.location.host + "/api/auth",
    {
      method: "POST",
      body: JSON.stringify(authData),
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.json();
};

export const getAllTaskFetch = async (from, interval) => {
  const response = await fetch(
    `http://localhost:5000/api/task?from=${from}&interval=${interval}`
    // window.location.protocol + "//" + window.location.host + `/api/task?from=${from}&interval=${interval}`,
  );
  return response.json();
};

export const getTaskByIdFetch = async (id) => {
  const response = await fetch(
    `http://localhost:5000/api/task/id/${id}`
    // window.location.protocol + "//" + window.location.host + `/api/task${id}`,
  );
  return response.json();
};

export const getPopularTaskFetch = async () => {
  const response = await fetch(
    "http://localhost:5000/api/task/popular"
    // window.location.protocol + "//" + window.location.host + "/api/task/popular",
  );
  return response.json();
};

export const getNewTaskFetch = async () => {
  const response = await fetch(
    "http://localhost:5000/api/task/last"
    // window.location.protocol + "//" + window.location.host + "/api/task/last",
  );
  return response.json();
};

export const getNumberOfCompletedTask = async (user_name) => {
  const response = await fetch(
    `http://localhost:5000/api/task/completed?user_name=${user_name}`
    // window.location.protocol + "//" + window.location.host + `/api/task/completed/${user_id}`,
  );
  return response.json();
};

export const getMyTasksFetch = async (user_name, from, interval) => {
  const response = await fetch(
    `http://localhost:5000/api/task/writed?user_name=${user_name}&from=${from}&interval=${interval}`
    // window.location.protocol + "//" + window.location.host + `/api/task/writed?user_name=${user_name}&from=${from}&interval=${interval}`,
  );
  return response.json();
};

export const deleteTask = async (taskData) => {
  const response = await fetch(
    "http://localhost:5000/api/task",
    // window.location.protocol + "//" + window.location.host + "/api/task",
    {
      method: "DELETE",
      body: JSON.stringify(taskData),
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.json();
};

export const createNewTaskFetch = async (taskData) => {
  const response = await fetch(
    "http://localhost:5000/api/task",
    // window.location.protocol + "//" + window.location.host + "/api/task",
    {
      method: "POST",
      body: JSON.stringify(taskData),
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.json();
};

export const addCommentFetch = async (commentData) => {
  const response = await fetch(
    "http://localhost:5000/api/task/comment",
    // window.location.protocol + "//" + window.location.host + "/api/task/comment",
    {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.json();
};

export const updateTask = async (taskData) => {
  const response = await fetch(
    "http://localhost:5000/api/task",
    // window.location.protocol + "//" + window.location.host + "/api/task",
    {
      method: "PATCH",
      body: JSON.stringify(taskData),
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.json();
};
