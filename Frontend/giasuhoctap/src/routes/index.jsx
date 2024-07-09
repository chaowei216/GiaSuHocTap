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
import ParentRequest from "../pages/ParentPage/ParentRequest";
import ParentComplete from "../pages/ParentPage/ParentComplete";
import ParentCancelled from "../pages/ParentPage/ParentCancelled";
import ParentRequestOffline from "../pages/ParentPage/ParentRequestOffline";
import ParentCompleteOffline from "../pages/ParentPage/ParentCompleteOffline";
import ParentCancelledOffline from "../pages/ParentPage/ParentCancelledOffline";
import ParentHistoryOffline from "../pages/ParentPage/ParentHistoryOffline";
// import NotificationPage from "../pages/ParentPage/NotificationPage";
import Checkout from "../pages/PaymentPage/CheckOut";
import WaitingCheckout from "../pages/PaymentPage/WaitingCheckout";
import TransactionPage from "../pages/TransactionPage/TransactionPage";
import TransactionPageByUser from "../pages/TransactionPage/TransactionPageByUser";
import NotificationPage from "../pages/NotificationPage/NotificationPage";
import ParentHistoryTransaction from "../pages/ParentPage/ParentHistoryTransaction";
import NewsPage from "../pages/NewsPage/NewsPage";
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
  { path: "request-tutor-offline", element: <RequestTutorOfflinePage /> },
  { path: "payment", element: <Checkout /> },
  { path: "waiting-checkout", element: <WaitingCheckout /> },
  { path: "transaction", element: <TransactionPage /> },
  { path: "transaction-user", element: <TransactionPageByUser /> },
  { path: "request-tutor-offline", element: <RequestTutorOfflinePage /> },
  { path: "ParentRequest", element: <ParentRequest /> },
  { path: "ParentComplete", element: <ParentComplete /> },
  { path: "ParentCancelled", element: <ParentCancelled /> },
  { path: "ParentRequestOffline", element: <ParentRequestOffline /> },
  { path: "ParentCompleteOffline", element: <ParentCompleteOffline /> },
  { path: "ParentCancelledOffline", element: <ParentCancelledOffline /> },
  { path: "ParentHistoryOffline", element: <ParentHistoryOffline /> },
  // { path: "NotificationPage", element: <NotificationPage /> },
  { path: "ParentHistoryTransaction", element: <ParentHistoryTransaction /> },
  { path: "NewsPage", element: <NewsPage /> },
  { path: "view-notification", element: <NotificationPage /> }
]);

