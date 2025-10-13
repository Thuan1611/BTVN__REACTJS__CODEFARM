import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";

const LayoutClient = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/6 h-full bg-gray-100 text-white">
        <Sidebar />
      </div>

      {/* Nội dung chính */}
      <div className="flex-grow bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutClient;
