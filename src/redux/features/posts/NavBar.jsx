import { Link, Outlet } from "react-router-dom"

const NavBar = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <br />
      <Link to="/posts">Posts</Link>
      <br />
      <Link to="/posts/create">Create</Link>
      <Outlet/>
    </>
  );
}

export default NavBar
