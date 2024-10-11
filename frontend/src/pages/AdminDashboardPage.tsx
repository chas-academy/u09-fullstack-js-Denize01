import React from "react";
import AdminCrudComponent from "../components/admin/AdminCrudComponent";

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <AdminCrudComponent />
    </div>
  );
};

export default AdminDashboardPage;
