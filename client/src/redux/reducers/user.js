import { createAction, createReducer } from "@reduxjs/toolkit";

const type = localStorage.getItem("type");
const username = localStorage.getItem("username");
const password = localStorage.getItem("password");
const token = localStorage.getItem("token");
const is_admin = localStorage.getItem("is_admin");

const initialState = username
  ? {
      type: type,
      username: username,
      password: password,
      token: token,
      is_admin: is_admin
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
      state.is_admin = action.payload.is_admin;
      localStorage.setItem("type", action.payload.type);
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("password", action.payload.password);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("is_admin", action.payload.is_admin);
    }
  },
  [logOut]: function (state, action) {
    delete state.type;
    delete state.username;
    delete state.password;
    delete state.token;
    delete state.is_admin;
    localStorage.removeItem("type");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");
  },
});
