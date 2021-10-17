export const addCommentLikeFetch = async (commentData) => {
  const response = await fetch(
    window.location.protocol +
      "//" +
      window.location.host +
      `/api/task/comment/${commentData.comment_id}`,
    {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.json();
};

export const changeAdminStatusFetch = async (userData) => {
  const response = await fetch(
    window.location.protocol + "//" + window.location.host + `/api/user/admin`,
    {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.json();
};

export const changeBlockedStatusFetch = async (userData) => {
  const response = await fetch(
    window.location.protocol + "//" + window.location.host + `/api/user/block`,
    {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.json();
};

export const logInFetch = async (authData) => {
  const response = await fetch(
    window.location.protocol + "//" + window.location.host + `/api/auth`,
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
    window.location.protocol + "//" + window.location.host + `/api/task/answer`,
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
    window.location.protocol +
      "//" +
      window.location.host +
      `/api/task?from=${from}&interval=${interval}`
  );
  return response.json();
};

export const getAllUsersFetch = async () => {
  const response = await fetch(
    window.location.protocol + "//" + window.location.host + `/api/user`
  );
  return response.json();
};

export const getUserByIdFetch = async (user_id) => {
  const response = await fetch(
    window.location.protocol +
      "//" +
      window.location.host +
      `/api/user?user_id=${user_id}`
  );
  return response.json();
};

export const getTaskByIdFetch = async (id) => {
  const response = await fetch(
    window.location.protocol +
      "//" +
      window.location.host +
      `/api/task/id/${id}`
  );
  return response.json();
};

export const getPopularTaskFetch = async () => {
  const response = await fetch(
    window.location.protocol + "//" + window.location.host + "/api/task/popular"
  );
  return response.json();
};

export const getPopularTagsFetch = async () => {
  const response = await fetch(
    window.location.protocol + "//" + window.location.host + "/api/task/tags"
  );
  return response.json();
};

export const getNewTaskFetch = async () => {
  const response = await fetch(
    window.location.protocol + "//" + window.location.host + "/api/task/last"
  );
  return response.json();
};

export const getNumberOfCompletedTask = async (user_name) => {
  const response = await fetch(
    window.location.protocol +
      "//" +
      window.location.host +
      `/api/task/completed?user_name=${user_name}`
  );
  return response.json();
};

export const getMyTasksFetch = async (user_name, from, interval) => {
  const response = await fetch(
    window.location.protocol +
      "//" +
      window.location.host +
      `/api/task/writed?user_name=${user_name}&from=${from}&interval=${interval}`
  );
  return response.json();
};

export const getCommentsLikes = async (task_id, username) => {
  const response = await fetch(
    window.location.protocol +
      "//" +
      window.location.host +
      `/api/task/comment?task_id=${task_id}&user_name=${username}`
  );
  return response.json();
};

export const getThemesFetch = async () => {
  const response = await fetch(
    window.location.protocol + "//" + window.location.host + `/api/task/themes`
  );
  return response.json();
};

export const deleteTask = async (taskData) => {
  const response = await fetch(
    window.location.protocol + "//" + window.location.host + "/api/task",
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
    window.location.protocol +
      "//" +
      window.location.host +
      `/api/task/comment/${commentData.comment_id}`,
    {
      method: "DELETE",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.json();
};

export const deleteUserFetch = async (userData) => {
  const response = await fetch(
    window.location.protocol + "//" + window.location.host + `/api/user`,
    {
      method: "DELETE",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.json();
};

export const createNewTaskFetch = async (taskData) => {
  const response = await fetch(
    window.location.protocol + "//" + window.location.host + "/api/task",
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
    window.location.protocol +
      "//" +
      window.location.host +
      "/api/task/comment",
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
    window.location.protocol +
      "//" +
      window.location.host +
      `/api/task/id/${responseData.task_id}`,
    {
      method: "POST",
      body: JSON.stringify(responseData),
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.json();
};

export const searchTaskFetch = async (searchStr, theme, from, interval) => {
  const response = await fetch(
    window.location.protocol +
      "//" +
      window.location.host +
      `/api/task/search?searchStr=${searchStr || ""}&theme=${
        theme || ""
      }&from=${from}&interval=${interval}`
  );
  return response.json();
};

export const updateTask = async (taskData) => {
  const response = await fetch(
    window.location.protocol + "//" + window.location.host + "/api/task",
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
