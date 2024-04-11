import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./redux/features/pages/Home";
import NavBar from "./redux/features/navbar/NavBar";
import {PostRoutes} from "./routes/PostRoutes";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/*" element={<PostRoutes />} />
      </Routes>
    </>
  );
}

export default App;
