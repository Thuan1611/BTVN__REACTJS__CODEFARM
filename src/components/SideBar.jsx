import { FolderKanban, Home, ListTodo, LogOut, Settings } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const sideBarItem = [
    {
      label: "TodoList",
      path: "/todos",
    },
    {
      label: "Important ",
      path: "/important",
    },
  ];

  return (
    <>
      <div className="h-screen w-64 bg-indigo-600 text-white flex flex-col shadow-lg">
        <div className="p-6 text-2xl font-semibold border-b border-gray-700 text-center">
          My Tasks
        </div>

        <ul className="flex-1 mt-6 space-y-2 px-4">
          {sideBarItem?.map((item, index) => {
            return (
              <div key={index}>
                <Link
                  to={item.path}
                  className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                  {item.label}
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
