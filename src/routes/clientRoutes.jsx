import FormTodos from "../pages/ClientPage/FormTodos/FormTodos";
import DetailTodos from "../pages/ClientPage/DetailTodos/DetailTodos";
import ImportantTodos from "../pages/ClientPage/ImportantTodo/ImportantTodos";
import TodosList from "../pages/ClientPage/TodosList/TodosList";
import LayoutClient from "../layouts/LayoutClient";
import PrivateRoutes from "../routes/protected/PivateRoutes";

const clientRoutes = [
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <LayoutClient />
      </PrivateRoutes>
    ),
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
