import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditStatus } from "./postSlice";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./post.css";

const PostShow = ({ post, onDelete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    dispatch(setEditStatus(true));
    navigate(`/posts/form/${post._id}`);
  };

  return (
    <article className="post-article" key={post?._id}>
      <h3>{post?.title}</h3>
      <p className="post-content">{post?.body}</p>
      <Button onClick={handleEdit} sx={{ marginRight: "1rem" }} variant="contained">
        Edit post
      </Button>
      <Button onClick={() => onDelete(post?._id)} variant="outlined" color="error">
        Delete
      </Button>
    </article>
  );
};

export default PostShow;