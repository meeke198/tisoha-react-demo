import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URI = "http://localhost:5001/posts";
const initialState = {
  editStatus: false,
  posts: [],
  error: null,
};
export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const response = await axios.get(URI);
  const posts = response.data;
  console.log({ posts });
  return posts;
});

export const fetchPost = createAsyncThunk("post/fetchPost", async (id) => {
  const response = await axios.get(`${URI}/${id}`);
  const post = response.data;
  console.log({ post });
  return post;
});
//?
export const createPost = createAsyncThunk("post/createPost", async (newPost) => {
  await fetch(URI, {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
});
export const editPost = createAsyncThunk(
  "post/editPost",
  async (updatedPost) => {
    const response = await axios.put(
      `${URI}/${updatedPost._id}`,
      updatedPost
    );
    return response.data;
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await fetch(`${URI}/${id}`, {
    method: "DELETE",
  });
  console.log(`post ${id} is deleted`);
  return id;
});
export const postsSlice = createSlice({
  name: "posts",
  initialState,
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
        const updatedPostIndex = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        state.posts[updatedPostIndex] = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});
export const { setEditStatus } = postsSlice.actions;
export default postsSlice.reducer;
