import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "./postSlice";
import PostShow from "./PostShow";

const PostIndex = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePost(id)).then(() => {
      dispatch(fetchPosts());
    });
  };

  return (
    <>
      <div>This is the post index page</div>
      <div>
        {posts?.map((post) => (
          <PostShow key={post?._id} post={post} onDelete={handleDelete} />
        ))}
      </div>
    </>
  );
};

export default PostIndex;