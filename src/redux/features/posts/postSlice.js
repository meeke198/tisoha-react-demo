import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  fetching: false,
  message: "",
  isSuccess: false,
  posts: [
    // { id: "1", title: "First Post!", content: "Hello!" },
    // { id: "2", title: "Second Post", content: "More text" },
  ],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    },
});

export default postsSlice.reducer;
