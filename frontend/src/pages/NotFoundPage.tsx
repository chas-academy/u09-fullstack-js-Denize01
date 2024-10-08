import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-96 text-center">
        <strong className="font-bold">404</strong>
        <span className="block sm:inline"> Page Not Found</span>
      </div>
    </div>
  );
};

export default NotFoundPage;
