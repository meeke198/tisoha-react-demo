import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  status: "",
  posts: [],
  error: null,
};
export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const posts = response.data;
  let firstTen = posts.slice(0, 10)
  console.log({ posts });
  return firstTen;
});

export const createPost = createAsyncThunk("post/createPost", async (newPost) => {
  await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
});
export const editingPost = createAsyncThunk(
  "post/editingPost",
  async (updatedPost) => {
    console.log("in editingPost Slice");
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: updatedPost.id,
          title: updatedPost.title,
          body: updatedPost.body,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const json = await response.json();
    console.log({ json });
    return json;
  }
);
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await fetch(`https://jsonplaceholder.typicode.com/posts/{id}`, {
    method: "DELETE",
  });
  return id;
});
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // editPost: (state, action) => {
    //   state.posts.map((post) => {
    //     if (post.id === action.payload.id) {
    //       post.title = action.payload.title;
    //       post.body = action.payload.body;
    //     }
    //   });
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(editingPost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) => {
          if (post.id === action.payload.id) {
            post = action.payload;
          }
        })
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});
// export const { editPost } = postsSlice.actions;
export default postsSlice.reducer;
