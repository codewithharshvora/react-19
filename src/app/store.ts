import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

// read saved auth token/user from localStorage if present
const token = localStorage.getItem("token");
const userJson = localStorage.getItem("user");
let preloadedState = {};
if (token) {
  preloadedState = {
    auth: {
      token,
      user: userJson ? JSON.parse(userJson) : null,
    },
  };
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
