export const addCommentLikeFetch = async (commentData) => {
  const response = await fetch(
    `http://localhost:5000/api/task/comment/${commentData.comment_id}`,
    // window.location.protocol + "//" + window.location.host + `/api/task/comment/${commentData.comment_id}`,
    {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.json();
};

export const logInFetch = async (authData) => {
  const response = await fetch(
    `http://localhost:5000/api/auth`,
    // window.location.protocol + "//" + window.location.host + `/api/auth`,
    {
      method: "POST",
      body: JSON.stringify(authData),
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.json();
};

export const checkAnswerFetch = async (answerData) => {
  const response = await fetch(
    `http://localhost:5000/api/task/answer`,
    // window.location.protocol + "//" + window.location.host + `/api/task/answer`,
    {
      method: "POST",
      body: JSON.stringify(answerData),
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

export const getPopularTagsFetch = async () => {
  const response = await fetch(
    "http://localhost:5000/api/task/tags"
    // window.location.protocol + "//" + window.location.host + "/api/task/tags",
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

export const getCommentsLikes = async (task_id, username) => {
  const response = await fetch(
    `http://localhost:5000/api/task/comment?task_id=${task_id}&user_name=${username}`
    // window.location.protocol + "//" + window.location.host + `/api/task/comment?task_id=${task_id}&user_name=${user_name}`,
  );
  return response.json();
};

export const getThemesFetch = async() => {
  const response = await fetch(
    `http://localhost:5000/api/task/themes`
    // window.location.protocol + "//" + window.location.host + `/api/task/themes`,
  );
  return response.json();
}

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

export const deleteCommentLikeFetch = async (commentData) => {
  const response = await fetch(
    `http://localhost:5000/api/task/comment/${commentData.comment_id}`,
    // window.location.protocol + "//" + window.location.host + `/api/task/comment/${commentData.comment_id}`,
    {
      method: "DELETE",
      body: JSON.stringify(commentData),
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

export const addResponseFetch = async (responseData) => {
  const response = await fetch(
    `http://localhost:5000/api/task/id/${responseData.task_id}`,
    // window.location.protocol + "//" + window.location.host + `/api/task/id/${responseData.task_id}`,
    {
      method: "POST",
      body: JSON.stringify(responseData),
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

export const uploadImagesFetch = async (files) => {
  const cloud_name = "dr34h6nxe";
  const upload_preset = "gi0ouabe";
  const images = [];
  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    fetch(`https://api.Cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => images.push(result.secure_url))
      .catch((error) => console.log(error));
  }
  return images;
};
