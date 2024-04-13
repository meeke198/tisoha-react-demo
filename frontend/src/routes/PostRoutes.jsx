import { Routes, Route } from "react-router-dom";
import PostIndex from "../redux/features/posts/PostIndex";
import PostShow from "../redux/features/posts/PostShow";
import PostForm from "../redux/features/posts/PostForm";

export function PostRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PostIndex />} />
      <Route path=":id" element={<PostShow />} />
      <Route path="form" element={<PostForm />} />
    </Routes>

  );
}
