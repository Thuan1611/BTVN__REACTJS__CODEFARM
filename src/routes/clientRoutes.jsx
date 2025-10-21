import { Component } from "react";
import ClientLayout from "../layouts/LayoutClient";
import { Navigate } from "react-router-dom";
import LayoutClient from "../layouts/LayoutClient";
import FormTodos from "../pages/ClientPage/FormTodos/FormTodos";
import DetailTodos from "../pages/ClientPage/DetailTodos/DetailTodos";
import ImportantTodos from "../pages/ClientPage/ImportantTodo/ImportantTodos";
import TodosList from "../pages/ClientPage/TodosList/TodosList"


const clientRoutes = [
  {
    path: "/",
    Component: LayoutClient,
    children: [
      { path: "todos", Component: TodosList },
      { path: "form/:id", Component: FormTodos },
      { path: "form", Component: FormTodos },
      { path: "todos/:id", Component: DetailTodos },
      { path: "important", Component: ImportantTodos },
    ],
  },
];
export default clientRoutes;
