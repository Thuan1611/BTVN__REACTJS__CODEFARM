import { Component } from "react";
import ClientLayout from "../layouts/LayoutClient";
import { Navigate } from "react-router-dom";
import RegisterTodos from "../pages/RegisterTodos";
import LoginTodos from "../pages/LoginTodos";
import LayoutAdmin from "../layouts/LayoutAdmin";

const authRoutes = [
  {
    path: "/",
    Component: LayoutAdmin,
    children: [
      { index: true, element: <Navigate to="login" /> },
      { path: "register", Component: RegisterTodos },
      { path: "login", Component: LoginTodos },

    ],
  },
];
export default authRoutes;
