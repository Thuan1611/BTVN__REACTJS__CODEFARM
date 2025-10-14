import { createBrowserRouter, RouterProvider } from "react-router-dom";
import clientRoutes from "./clientRoutes";
import NotFound from "../components/NotFound";

const router = createBrowserRouter([
  ...clientRoutes,
  {
    path: "*",
    Component: NotFound ,
  },
]);
const AppRoute = () => {
  return <RouterProvider router={router} />;
};
export default AppRoute;
