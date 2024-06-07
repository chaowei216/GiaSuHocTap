import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Public/Error";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/AuthenPage/LoginPage";
import Register from "../components/partial/Authen/register";
import 'bootstrap/dist/css/bootstrap.min.css';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
  },
  { path: "login", element: <LoginPage /> },
  { path: "Register", element: <Register /> },
]);
