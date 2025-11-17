import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const AuthProtected = ({ children }:{children: ReactNode}) => {
  const token =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");
  if (token) return <Navigate to={"/todos"} />;
  return children;
};

export default AuthProtected;
