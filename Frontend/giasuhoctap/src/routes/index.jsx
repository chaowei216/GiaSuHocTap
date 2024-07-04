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
import BuyCoinPage from "../pages/BuyCoinPage/BuyCoinPage";
import ParentHistory from "../pages/ParentPage/ParentHistory";
import UserPage from "../pages/UserPage/UserPage";
import HomeTutorPage from "../pages/TutorPage/HomeTutorPage"
import TutorProfilePage from "../pages/TutorPage/TutorProfilePage";
import RequestTutorOfflinePage from "../pages/RequestPage/RequestTutorOfflinePage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
  },
  { path: "login", element: <GuestAuth><LoginPage /></GuestAuth> },
  { path: "registerParents", element: <RegisterPage /> },//<RequireAuth></RequireAuth> },
  { path: "registerTutors", element: <RegisterTutorPage /> },
  { path: "dashboard", element: <DashboardPage /> },
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
  { path: "personal-profile", element: <UserProfilePage /> },
  { path: "buycoin", element: <BuyCoinPage /> },
  { path: "ParentHistory", element: <ParentHistory /> },
  { path: "user-management", element: <UserPage /> },
  { path: "home-tutor", element: <HomeTutorPage /> },
  { path: "tutor-profile", element: <TutorProfilePage /> },
  { path: "request-tutor-offline", element: <RequestTutorOfflinePage /> }
]);
