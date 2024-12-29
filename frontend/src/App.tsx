import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AdminRoute from "./components/admin/AdminRoute";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="#">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboardPage />
                </AdminRoute>
              }
            />
            <Route path="/notfound" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
