import { createBrowserRouter, RouterProvider } from "react-router-dom";
import clientRoutes from "./clientRoutes";

const router = createBrowserRouter([...clientRoutes]);
const AppRoute = () => {
  return <RouterProvider router={router} />;
};
export default AppRoute;
