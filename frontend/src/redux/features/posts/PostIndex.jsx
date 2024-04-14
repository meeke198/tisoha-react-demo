// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { fetchPosts } from "./postSlice";
// import Button from "@mui/material/Button";
// import "./post.css";
// // import PostForm from "./PostForm";
// // import { Link } from "react-router-dom";
// import PostShow from "./PostShow";
// // const URI = "http://localhost:3000/posts";
// const PostIndex = () => {
//   const dispatch = useDispatch();
//   const [posts, setPosts] = useState([]);
//   const [isEdit, setIsEdit] = useState(false);
//   //   console.log({ posts });
//   useEffect(() => {
//     console.log("IN USE EFFECT");
//     const fetchPostsData = async () => {
//       let postsData = await dispatch(fetchPosts());
//       //   console.log({ postsData });
//       setPosts(postsData.payload);
//     };
//     fetchPostsData();
//   }, [dispatch]);
//    const renderedPosts = posts?.map((post) => (
//      <PostShow key={post.id} post={post} isEdit={isEdit} setEdit={setIsEdit} />
//    ));

//   return (
//     <>
//       <div>This is post index page</div>
//       <div>{renderedPosts}</div>
//     </>
//   );
// };

// export default PostIndex;
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./postSlice";
import PostShow from "./PostShow";

const PostIndex = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
console.log({posts});

  useEffect(() => {
    console.log("IN USE EFFECT");
    const fetchPostsData = async () => {
      let postsData = await dispatch(fetchPosts());
      setPosts(postsData.payload);
    };
    fetchPostsData();
  }, [dispatch]);
  const renderedPosts = posts?.map((post) => (
    <PostShow key={post._id} post={post} />
  ));

  return (
    <>
      <div>This is the post index page</div>
      <div>{renderedPosts}</div>
    </>
  );
};

export default PostIndex;