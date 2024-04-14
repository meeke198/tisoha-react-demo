import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./post.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, editPost, fetchPost } from "./postSlice";
const PostForm = () => {
  // const navigate = useNavigate();
    const { id } = useParams();
  const editStatus = useSelector((state) => state.posts.editStatus);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  console.log("id params:", id);
 useEffect(() => {
   if (editStatus) {
   console.log("IN USE EFFECT");
   const fetchPostData = async () => {
     let postData = await dispatch(fetchPost(id));
     setTitle(postData.payload?.title);
     setBody(postData.payload?.body);
   };
   fetchPostData();
  }
 }, [dispatch]);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (editStatus) {
      console.log("in the else");
      // const updatePost = {
      //   ...post,
      //   title: title,
      //   body: body,
      // };
      // dispatch(editPost(updatePost));
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
    // navigate("/posts");
  };

  return (
    <div className="form-container">
      <Typography component="h1" variant="h5">
        {editStatus ? "" : "Create new post"}
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
          {editStatus ? "Edit post" : "Create post"}
        </Button>
      </Box>
    </div>
  );
};

export default PostForm;
