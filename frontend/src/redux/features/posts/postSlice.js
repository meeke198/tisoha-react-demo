
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URI = "http://localhost:5001/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(URI);
  return response.data;
});

export const fetchPost = createAsyncThunk("posts/fetchPost", async (id) => {
  const response = await axios.get(`${URI}/${id}`);
  return response.data;
});

export const createPost = createAsyncThunk("posts/createPost", async (newPost) => {
  const response = await axios.post(URI, newPost);
  return response.data;
});

export const editPost = createAsyncThunk("posts/editPost", async (updatedPost) => {
  const response = await axios.put(`${URI}/${updatedPost.id}`, updatedPost);
  return response.data;
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await axios.delete(`${URI}/${id}`);
  return id;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    editStatus: false,
    posts: [],
    error: null,
  },
  reducers: {
    setEditStatus: (state, action) => {
      state.editStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const updatedPostIndex = state.posts.findIndex((post) => post._id === action.payload._id);
        if (updatedPostIndex !== -1) {
          state.posts[updatedPostIndex] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      });
  },
});

export const { setEditStatus } = postsSlice.actions;
export default postsSlice.reducer;