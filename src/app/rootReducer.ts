import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "../features/users/userSlice";
import authReducer from "../features/auth/authSlice";
import postsReducer from "../features/posts/postSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  posts: postsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
