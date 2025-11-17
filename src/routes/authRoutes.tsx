import { Component } from "react";
import ClientLayout from "../layouts/LayoutClient";
import { Navigate } from "react-router-dom";
import LoginTodos from "../pages/LoginTodos";
import LayoutAdmin from "../layouts/LayoutAdmin";
import AuthProtected from "./protected/AuthProtected";
import RegisterTodos from "../pages/RegisterTodos";

const authRoutes = [
  {
    path: "/",
    element : (
      <AuthProtected>
        <LayoutAdmin />
      </AuthProtected>
    ),
    children: [
      { index: true, element: <Navigate to="/todos" /> },
      { path: "register", Component: RegisterTodos },
      { path: "login", Component: LoginTodos },
    ],
  },
];
export default authRoutes;
