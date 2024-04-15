// import { useState, useEffect } from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import "./post.css";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { createPost, editPost, fetchPost } from "./postSlice";
// const PostForm = () => {
//   // const navigate = useNavigate();
//   const { id } = useParams(null);
//   const editStatus = useSelector((state) => state.posts.editStatus);
//   console.log({editStatus});
//   const [message, setMessage] = useState("");
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const dispatch = useDispatch();
//  useEffect(() => {
//    if (editStatus) {
//    console.log("IN USE EFFECT");
//    const fetchPostData = async () => {
//      let postData = await dispatch(fetchPost(id));
//      setTitle(postData.payload?.title);
//      setBody(postData.payload?.body);
//    };
//    fetchPostData();
//   }
//  }, [dispatch]);
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (editStatus) {
//       console.log("in the if");
//       const updatePost = {
//         id: id,
//         title: title,
//         body: body,
//       };
//       console.log({updatePost});
//      const response = dispatch(editPost(updatePost));
//       setMessage(response.message)
//     } else {
//       const newPost = {
//         title: title,
//         body: body,
//       };
//       console.log({ newPost });
//       dispatch(createPost(newPost));
//     }
//     setTitle("");
//     setBody("");
//     // navigate("/posts");
//   };

//   return (
//     <div className="form-container">
//       { message ? (<Typography component="h1" variant="h5">
//         {message}
//       </Typography>) : (<Typography component="h1" variant="h5">
//         {editStatus ? "" : "Create new post"}
//       </Typography>
//       <Box
//         className="form-container"
//         component="form"
//         onSubmit={handleSubmit}
//         noValidate
//         sx={{ mt: 1 }}
//       >
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           id="title"
//           name="title"
//           placeholder="Enter post content here"
//           //   autoComplete="title"
//           autoFocus
//         />
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           name="content"
//           type="text"
//           id="content"
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//           placeholder="Enter post content here"
//         />
//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           sx={{ mt: 3, mb: 2 }}
//         >
//           {editStatus ? "Edit post" : "Create post"}
//         </Button>
//       </Box>)} 
//     </div>
//   );
// };

// export default PostForm;
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./post.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createPost, editPost, fetchPost } from "./postSlice";
import { Modal } from "@mui/material";

const PostForm = () => {
  const { id } = useParams();
  const editStatus = useSelector((state) => state.posts.editStatus);
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
console.log({message});
  useEffect(() => {
    if (editStatus) {
      const fetchPostData = async () => {
        let postData = await dispatch(fetchPost(id));
        setTitle(postData.payload?.title);
        setBody(postData.payload?.body);
      };
      fetchPostData();
    }
  }, [dispatch, editStatus, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editStatus) {
      const updatePost = {
        id: id,
        title: title,
        body: body,
      };
      const response = await dispatch(editPost(updatePost));
      const ee = response.payload.message;
     console.log("inpostform", ee);
      setMessage(ee);
    } else {
      const newPost = {
        title: title,
        body: body,
      };
      dispatch(createPost(newPost));
    }
    setTitle("");
    setBody("");
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