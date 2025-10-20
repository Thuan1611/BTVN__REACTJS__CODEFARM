import { createBrowserRouter, RouterProvider } from "react-router-dom";
import clientRoutes from "./clientRoutes";
import NotFound from "../components/NotFound";
import authRoutes from "./authRoutes";

const router = createBrowserRouter([
  ...clientRoutes,
  ...authRoutes,
  {
    path: "*",
    Component: NotFound ,
  },
]);
const AppRoute = () => {
  return <RouterProvider router={router} />;
};
export default AppRoute;
