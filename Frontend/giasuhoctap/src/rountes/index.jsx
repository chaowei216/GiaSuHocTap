import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Public/Error";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/AuthenPage/LoginPage";
import RegisterPage from "../pages/AuthenPage/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
  },
  { path: "login", element: <LoginPage /> },
  { path: "register", element: <RegisterPage /> },
]);
