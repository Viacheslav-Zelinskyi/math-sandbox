import { createAction, createReducer } from "@reduxjs/toolkit";

const type = localStorage.getItem("type");
const username = localStorage.getItem("username");
const password = localStorage.getItem("password");
const token = localStorage.getItem("token");

const initialState = username
  ? {
      type: type,
      username: username,
      password: password,
      token: token,
    }
  : {};

export const logIn = createAction("LOG_IN");
export const logOut = createAction("LOG_OUT");

export default createReducer(initialState, {
  [logIn]: function (state, action) {
    if (action.payload) {
      state.type = action.payload.type;
      state.username = action.payload.username;
      state.password = action.payload.password || null;
      state.token = action.payload.token || null;
      localStorage.setItem("type", action.payload.type);
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("password", action.payload.password);
      localStorage.setItem("token", action.payload.token);
    }
  },
  [logOut]: function (state, action) {
    delete state.type;
    delete state.username;
    delete state.password;
    delete state.token;
    localStorage.removeItem("type");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("token");
  },
});
