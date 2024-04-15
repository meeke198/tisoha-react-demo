
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./post.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createPost, editPost, fetchPost } from "./postSlice";


const PostForm = () => {
 const { id } = useParams();
 const editStatus = useSelector((state) => state.posts.editStatus);
 const [message, setMessage] = useState(null);
 const [title, setTitle] = useState("");
 const [body, setBody] = useState("");
 const dispatch = useDispatch();

 useEffect(() => {
   if (editStatus && id) {
     dispatch(fetchPost(id)).then((action) => {
       setTitle(action.payload.title);
       setBody(action.payload.body);
     });
   }
 }, [dispatch, editStatus, id]);

 const handleSubmit = async (event) => {
   event.preventDefault();
   if (editStatus) {
     const updatedPost = { id, title, body };
     const response = await dispatch(editPost(updatedPost));
     setMessage(response.payload.message);
   } else {
     const newPost = { title, body };
     await dispatch(createPost(newPost));
     setTitle("");
     setBody("");
   }
 };
  return (
    <div className="form-container">
      {message ? (
        <>
          <Typography
            sx={{ color: "green", height: "5rem" }}
            component="h1"
            variant="h5"
          >
            {message}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            <Link style={{color: "black"}} to="/">Back to home</Link>
          </Button>
        </>
      ) : (
        <>
          <Typography className="typography" component="h1" variant="h5">
            {editStatus ? "Edit Post" : "Create new post"}
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
              placeholder="Enter post title here"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="body"
              type="text"
              id="body"
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
        </>
      )}
    </div>
  );
};

export default PostForm;