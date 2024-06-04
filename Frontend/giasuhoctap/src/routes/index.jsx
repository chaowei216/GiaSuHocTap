import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Public/Error";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/AuthenPage/LoginPage";
import RegisterPage from "../pages/AuthenPage/RegisterPage";
import RequireAuth from "../components/partial/Authen/RequireAuth";
import GuestAuth from "../components/partial/Authen/GuestAuth";
export const router = createBrowserRouter([
  {
    path: "login",
    element: (
      <GuestAuth>
        <LoginPage />
      </GuestAuth>
    ),
  },
  { path: "register", element: <RegisterPage /> },
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
  }
]);
