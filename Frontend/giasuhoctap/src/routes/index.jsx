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
import FeedbackPage from "../pages/FeedbackPage/FeedbackPage";
import ReportPage from "../pages/ReportPage/ReportPage";
import ParentHistoryTransaction from "../pages/ParentPage/ParentHistoryTransaction";
import NewsPage from "../pages/NewsPage/NewsPage";
import RoleBasedGuard from "../components/partial/Authen/RoleBaseGuard";
import NewDetailPage from "../pages/NewsPage/NewDetailPage";
import TimetablePage from "../pages/TimeTable/TimetablePage";
import CheckingPageTutor from "../pages/Public/CheckingPageTutor";
import ErrorException from "../pages/Public/ErrorException";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><HomePage /></RoleBasedGuard>,
    errorElement: <Error />,
  },
  { path: "login", element: <GuestAuth><LoginPage /></GuestAuth> },
  { path: "registerParents", element: <RegisterPage /> },//<RequireAuth></RequireAuth> },
  { path: "registerTutors", element: <RegisterTutorPage /> },
  { path: "dashboard", element: <RoleBasedGuard accessibleRoles={['Admin', 'Moderator']} status="Active"><DashboardPage /></RoleBasedGuard> },
  { path: "tutor", element: <RoleBasedGuard accessibleRoles={['Admin']} status="Active"><TutorPage /></RoleBasedGuard> },
  { path: "forgot-password", element: <ForgotPasswordPage /> },
  { path: "RegisterTutor", element: <RegisterTutor /> },
  { path: "BookTutorOnline", element: <RequireAuth><BookTutorPage /></RequireAuth> },
  { path: "BookTutorOffline", element: <RequireAuth><BookTutorOfflinePage /></RequireAuth> },
  { path: "Profile", element: <RequireAuth><Profile /></RequireAuth> },
  { path: "send-otp/:email", element: <GuestAuth><SendOtpPage /></GuestAuth> },
  { path: "ParentPage", element: <RequireAuth><ParentPage /></RequireAuth> },
  { path: "tutor-detail/:email", element: <TutorDetailPage />, errorElement: <ErrorException /> },
  { path: "request-tutor", element: <RequestTutorPage /> },
  { path: "personal-profile", element: <RoleBasedGuard accessibleRoles={['Tutor', 'Admin', 'Moderator']} status="Active"><UserProfilePage /></RoleBasedGuard> },
  { path: "buycoin", element: <RequireAuth><BuyCoinPage /></RequireAuth> },
  { path: "ParentHistory", element: <RequireAuth><ParentHistory /></RequireAuth> },
  { path: "user-management", element: <RoleBasedGuard accessibleRoles={['Admin']} status="Active"><UserPage /></RoleBasedGuard> },
  { path: "home-tutor", element: <RoleBasedGuard accessibleRoles={['Tutor']} status="Active"><HomeTutorPage /></RoleBasedGuard> },
  { path: "tutor-profile", element: <TutorProfilePage /> },
  { path: "request-tutor-offline", element: <RequestTutorOfflinePage /> },
  { path: "payment", element: <Checkout /> },
  { path: "waiting-checkout", element: <WaitingCheckout /> },
  { path: "transaction", element: <RoleBasedGuard accessibleRoles={['Admin', 'Moderator']} status="Active"><TransactionPage /></RoleBasedGuard> },
  { path: "transaction-user", element: <TransactionPageByUser /> },
  { path: "view-notification", element: <RoleBasedGuard accessibleRoles={['Moderator']} status="Active"><NotificationPage /></RoleBasedGuard> },
  { path: "view-feedback", element: <RoleBasedGuard accessibleRoles={['Moderator']} status="Active"><FeedbackPage /></RoleBasedGuard> },
  { path: "view-report", element: <RoleBasedGuard accessibleRoles={['Moderator']} status="Active"><ReportPage /></RoleBasedGuard> },
  { path: "ParentRequest", element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><ParentRequest /></RoleBasedGuard> },
  { path: "ParentComplete", element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><ParentComplete /></RoleBasedGuard> },
  { path: "ParentCancelled", element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><ParentCancelled /></RoleBasedGuard> },
  { path: "ParentRequestOffline", element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><ParentRequestOffline /></RoleBasedGuard> },
  { path: "ParentCompleteOffline", element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><ParentCompleteOffline /></RoleBasedGuard> },
  { path: "ParentCancelledOffline", element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><ParentCancelledOffline /></RoleBasedGuard> },
  { path: "ParentHistoryOffline", element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><ParentHistoryOffline /></RoleBasedGuard> },
  // { path: "NotificationPage", element: <NotificationPage /> },
  { path: "ParentHistoryTransaction", element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><ParentHistoryTransaction /></RoleBasedGuard> },
  { path: "NewsPage", element: <NewsPage /> },
  { path: "/news/:newsId", element: <NewDetailPage /> },
  { path: "/time-table/:email", element: <TimetablePage /> },
  { path: "checking-page", element: <CheckingPageTutor /> },
]);

