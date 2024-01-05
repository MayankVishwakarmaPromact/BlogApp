import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "../components/layout";
import { Login } from "../pages/Login";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/posts"} />,
  },
  {
    path: "/posts",
    element: <Layout />,
    children:[
      {
        index: "index",
        element: <Home />,
      },

    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
