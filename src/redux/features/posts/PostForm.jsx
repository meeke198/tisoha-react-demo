import { useState } from "react";
import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./post.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "./postSlice";
const PostForm = () => {
  const navigate = useNavigate();
  const [newId, setNewId] = useState(11);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();


  console.log({title});
  console.log({content});
  console.log({newId});
  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      id: newId,
      title: title,
      content: content,
    };
    console.log({ newPost });
    dispatch(createPost(newPost));
    setNewId((prev) => prev + 1);
    navigate("/posts");
  };
  return (
    <div className="form-container">
      <Typography component="h1" variant="h5">
        Create new post
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter post content here"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create post
        </Button>
      </Box>
    </div>
  );
};

export default PostForm;
