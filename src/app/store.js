import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../redux/features/posts/postSlice";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
