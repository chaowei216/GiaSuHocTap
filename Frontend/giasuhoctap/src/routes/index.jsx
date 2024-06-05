import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Public/Error";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/AuthenPage/LoginPage";
import RegisterPage from "../pages/AuthenPage/RegisterPage";
import RequireAuth from "../components/partial/Authen/RequireAuth";
import GuestAuth from "../components/partial/Authen/GuestAuth";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
  },
  {
    path: "login",
    element: (
      <GuestAuth>
        <LoginPage />
      </GuestAuth>
    ),
  },
  {
    path: "register",
    element: (
      <RequireAuth>
        <RegisterPage />
      </RequireAuth>
    ),
  },
  { path: "test", element: <DashboardPage /> },
]);
