import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./postSlice";
import "./post.css";
const PostIndex = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  console.log({ posts });
  useEffect(() => {
    console.log("IN USE EFFECT");
    const fetchPostsData = async () => {
      const postsData = await dispatch(fetchPosts());
      console.log({ postsData });
      setPosts(postsData.payload);
    };
    fetchPostsData();
  }, [dispatch]);
  const renderedPosts = posts?.map((post, index) => (
    <article className="post-article" key={`${index}`}>
      <h3>{post?.title}</h3>
      {/* {console.log("IN RENDER POST")}
      {console.log(post)} */}
      <p className="post-content">{post?.body}</p>
    </article>
  ));
  return (
    <>
      <div>This is post index page</div>
      <div>{renderedPosts}</div>
    </>
  );
};

export default PostIndex;
