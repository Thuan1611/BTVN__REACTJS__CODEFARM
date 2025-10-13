import { Component } from "react";
import ClientLayout from "../layouts/LayoutClient";
import { Navigate } from "react-router-dom";
import Tbody from "../components/Tbody";
import TodosList from "../pages/TodosList";
import TodoImportant from "../components/TodoImportant";

const clientRoutes = [
    {
        path: "/",
        Component: ClientLayout,
        children: [
            {index: true, element: <Navigate to="todos"/>},
            {path: "todos",Component: TodosList},
            // {path: "todos/:id",Component: <Tbody/>},
            {path: "important",Component: TodoImportant}
        ]
    }
]
export default clientRoutes