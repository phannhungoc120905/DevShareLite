import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import "./App.css";
import { AuthProvider } from "./hooks/useAuth";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CreatePost from "./components/posts/CreatePost";
import PostDetail from "./components/posts/PostDetail";
import Navigation from "./components/common/Navigation";
import Dashboard from "./components/dashboard/Dashboard";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Box minH="100vh" bg="gray.50">
          <Navigation />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
}
