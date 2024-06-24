import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Public/Error";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/AuthenPage/LoginPage";
import RegisterPage from "../pages/AuthenPage/RegisterPage";
import RegisterTutorPage from "../pages/AuthenPage/RegisterTutorPage"
import RequireAuth from "../components/partial/Authen/RequireAuth";
import GuestAuth from "../components/partial/Authen/GuestAuth";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import TutorPage from "../pages/TutorPage/TutorPage";
import ForgotPasswordPage from "../pages/ForgotPassword/ForgotPasswordPage";
import RegisterTutor from "../pages/RegisterTutor/RegisterTutor";
import BookTutorPage from "../pages/BookTutorPage/BookTutorPage";
import BookTutorOfflinePage from "../pages/BookTutorOfflinePage/BookTutorOfflinePage";

import Profile from "../components/partial/HomePage/Profile/Profile";
import SendOtpPage from "../pages/AuthenPage/SendOtpPage";
import ParentPage from "../pages/ParentPage/ParentPage";
import TutorDetailPage from "../pages/TutorPage/TutorDetailPage";
import RequestTutorPage from "../pages/RequestPage/RequestTutorPage";
import UserProfilePage from "../pages/UserProfile/UserProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
  },
  { path: "login", element: <GuestAuth><LoginPage /></GuestAuth> },
  { path: "registerParents", element: <RegisterPage /> },//<RequireAuth></RequireAuth> },
  { path: "registerTutors", element: <RegisterTutorPage /> },
  { path: "test", element: <DashboardPage /> },
  { path: "tutor", element: <TutorPage /> },
  { path: "forgot-password", element: <ForgotPasswordPage /> },
  { path: "RegisterTutor", element: <RegisterTutor /> },
  { path: "BookTutorOnline", element: <BookTutorPage /> },
  { path: "BookTutorOffline", element: <BookTutorOfflinePage /> },
  { path: "Profile", element: <Profile /> },
  { path: "send-otp/:email", element: <GuestAuth><SendOtpPage /></GuestAuth> },
  { path: "ParentPage", element: <ParentPage /> },
  { path: "tutor-detail/:email", element: <TutorDetailPage /> },
  { path: "request-tutor", element: <RequestTutorPage /> },
  { path: "personal-profile", element: <UserProfilePage /> }
]);
