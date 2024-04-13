import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./post.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost, editingPost } from "./postSlice";
const PostForm = ({ isEdit, post }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  console.log("IS EDIT:", isEdit);
  useEffect(() => {
    if (isEdit) {
      setTitle(post.title);
      setBody(post.body);
    }

    console.log("IN USE EFFECT");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEdit) {
      console.log("in the else");
      const editPost = {
        id: post?.id,
        title: title,
        body: body,
      };
      dispatch(editingPost(editPost));
    } else {
      const newPost = {
        title: title,
        body: body,
      };
      console.log({ newPost });
      dispatch(createPost(newPost));
       setTitle("");
       setBody("");
    }
    navigate("/posts");
  };

  return (
    <div className="form-container">
      <Typography component="h1" variant="h5">
        {isEdit ? "" : "Create new post"}
      </Typography>
      <Box
        className="form-container"
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          name="title"
          placeholder="Enter post content here"
          //   autoComplete="title"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="content"
          type="text"
          id="content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter post content here"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {isEdit ? "Edit post" : "Create post"}
        </Button>
      </Box>
    </div>
  );
};

export default PostForm;
