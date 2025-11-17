import React from "react";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <div className="flex min-h-screen">
      {/* Nội dung chính */}
      <div className="flex-grow bg-gray-100">
        <Outlet/>
      </div>
    </div>
  );
};

export default LayoutAdmin;
