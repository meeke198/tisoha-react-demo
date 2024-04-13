import { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { fetchPosts, deletePost } from "./postSlice";
import Button from "@mui/material/Button";
import "./post.css";
import PostForm from "./PostForm";

const PostIndex = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editingPost, setEditingPost] = useState({});
//   console.log({ posts });
  useEffect(() => {
    console.log("IN USE EFFECT");
    const fetchPostsData = async () => {
      let postsData = await dispatch(fetchPosts());
    //   console.log({ postsData });
      setPosts(postsData.payload);
    };
    fetchPostsData();
  }, [dispatch]);
  const renderedPosts = posts?.map((post, index) => (
    <article className="post-article" key={`${index}`}>
      <h3>{post?.title}</h3>
      <p className="post-content">{post?.body}</p>
      <Button
        onClick={() => handleEdit(post._id)}
        sx={{ marginRight: "1rem" }}
        variant="contained"
      >
        Edit
      </Button>
      <Button onClick={() => handleDelete(post._id)} variant="outlined" color="error">
        Delete
      </Button>
    </article>
  ));
  const handleEdit = (id) => {
    console.log({ id });
    setIsEdit(true);
    // handleUseRef();
   let updatePost = posts.find((post) => post._id === id);
    // setContent(updatePost.body);
    // setTitle(updatePost.title);
    console.log({ updatePost });
    setEditingPost(updatePost);
  };
  const handleDelete = (id) => {
    dispatch(deletePost);
  };
  return (
    <>
      <div>This is post index page</div>
      <div>{renderedPosts}</div>
      {isEdit && <PostForm isEdit={isEdit} post={editingPost} />}
    </>
  );
};

export default PostIndex;
