
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { fetchPost, setEditStatus, editPost, deletePost } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";

import "./post.css";

const PostShow = ({post}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editStatus = useSelector((state)=> state.posts?.editStatus);
  const handleSubmit = () => {
    dispatch(setEditStatus(true));
    navigate(`./form/${post._id}`);
  };
  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };
  return (
    <article className="post-article" key={`${post?._id}`}>
      <h3>{post?.title}</h3>
      <p className="post-content">{post?.body}</p>
      <Button onClick={handleSubmit} sx={{ marginRight: "1rem" }} variant="contained">
        Edit post
      </Button>
      <Button
        onClick={() => handleDelete(post?._id)}
        variant="outlined"
        color="error"
      >
        Delete
      </Button>
    </article>
  );
};

export default PostShow;
