import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/HomePage.tsx/Home";
import Login from "../pages/LoginPage";
import Signup from "../pages/SignupPage";
import App from "../App";
import CreatePost from "../pages/CreatePost";
import PostDetails from "../pages/PostDetails";
import ProtectedLayout from "../components/layout/ProtectedLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create-post",
        element: (
          <ProtectedLayout>
            <CreatePost />,
          </ProtectedLayout>
        ),
      },
      {
        path: "/post/:id",
        element: (
          <ProtectedLayout>
            <PostDetails />,
          </ProtectedLayout>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);
export default router;
