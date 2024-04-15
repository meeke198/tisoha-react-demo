
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