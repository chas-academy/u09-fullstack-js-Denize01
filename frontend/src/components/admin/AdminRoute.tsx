import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const roles = localStorage.getItem("roles");
  if (roles !== "admin") {
    return <Navigate to="/notfound" />;
  }
  return <>{children}</>;
};

export default AdminRoute;
