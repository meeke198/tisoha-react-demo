import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
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
            backgroundColor: "pink",
          }}
        >
          <Toolbar>
            <MenuIcon sx={{ color: "black" }} />
            <div
              className="navbar-buttons"
              style={{
                display: "flex",
                flex: "1",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              <Link style={{ color: "black" }} to="/">
                Home
              </Link>
              <Link style={{ color: "black" }} to="/posts">
                Posts
              </Link>
              <Link style={{ color: "black" }} to="/posts/create">
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
