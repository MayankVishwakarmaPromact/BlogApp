import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "../components/layout";
import { Login } from "../pages/Login";
import Home from "../pages/Home";
import PostView from "../pages/PostView";

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        index: "index",
        element: <Navigate to={'posts'} />,
      },
      {
        index: "index",
        path: "posts",
        element: <Home />,
      },
      {
        path: "posts/:post",
        element: <PostView />,
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
