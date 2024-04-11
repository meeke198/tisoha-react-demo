import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import './navbar.css'
const NavBar = () => {
  return (
    <>
      <Box>
        <AppBar
          position="fixed"
          sx={{
            width: "100vw",
            margin: 0,
            marginTop: 0,
            backgroundColor: "#77B0AA",
          }}
        >
          <Toolbar>
            <MenuIcon sx={{ color: "black" }} />
            <div className="navbar-buttons">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/posts">
                Posts
              </Link>
              <Link className="nav-link" to="/posts/create">
                Create post
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;
