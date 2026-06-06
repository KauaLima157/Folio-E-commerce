import { createBrowserRouter } from "react-router-dom";

import { PublicLayout } from "../layouts/publicLayout";
import { PrivateLayout } from "../layouts/privateLayout";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { BookDetails } from "../pages/BookDetails";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/register", element: <Register /> },
      { path: "/book/:id", element: <BookDetails /> },
    ],
  },

  {
    element: <PrivateLayout />,
    children: [
      // { path: "/profile", element: <Profile /> },
    ],
  },

  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
]);