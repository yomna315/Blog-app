import { Routes, Route, Navigate } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddPost from "./pages/AddPost";
import Register from "./pages/Register";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/edit-post/:id" element={<AddPost />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
