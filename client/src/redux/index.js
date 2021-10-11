import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";

const rootReducers = combineReducers({
    user: userReducer
});

const store = configureStore({
  reducer: rootReducers,
});

export default store;
