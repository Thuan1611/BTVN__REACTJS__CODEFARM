import { Component } from "react";
import ClientLayout from "../layouts/LayoutClient";
import { Navigate } from "react-router-dom";
import FormTodos from "../pages/FormTodos/FormTodos";
import DetailTodos from "../pages/DetailTodos/DetailTodos";
import ImportantTodos from "../pages/ImportantTodo/ImportantTodos";
import TodosList from "../pages/TodosList/TodosList";

const clientRoutes = [
  {
    path: "/",
    Component: ClientLayout,
    children: [
      { index: true, element: <Navigate to="todos" /> },
      { path: "todos", Component: TodosList },
      { path: "form/:id", Component: FormTodos },
      { path: "form", Component: FormTodos },
      { path: "todos/:id", Component: DetailTodos },
      { path: "important", Component: ImportantTodos },
    ],
  },
];
export default clientRoutes;
