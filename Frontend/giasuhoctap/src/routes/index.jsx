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
import PageNewByModerator from "../pages/NewsPage/PageNewByModerator";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><HomePage /></RoleBasedGuard>,
    errorElement: <Error />,
  },
  { path: "login", element: <GuestAuth><LoginPage /></GuestAuth>, errorElement: <ErrorException /> },
  { path: "registerParents", element: <RegisterPage />, errorElement: <ErrorException /> },
  { path: "registerTutors", element: <RegisterTutorPage />, errorElement: <ErrorException /> },
  { path: "dashboard", errorElement: <ErrorException />, element: <RoleBasedGuard accessibleRoles={['Admin', 'Moderator']} status="Active"><DashboardPage /></RoleBasedGuard> },
  { path: "tutor", element: <RoleBasedGuard accessibleRoles={['Admin']} status="Active"><TutorPage /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "forgot-password", element: <ForgotPasswordPage />, errorElement: <ErrorException /> },
  { path: "RegisterTutor", element: <RegisterTutor />, errorElement: <ErrorException /> },
  { path: "BookTutorOnline", element: <RequireAuth><BookTutorPage /></RequireAuth>, errorElement: <ErrorException /> },
  { path: "BookTutorOffline", element: <RequireAuth><BookTutorOfflinePage /></RequireAuth>, errorElement: <ErrorException /> },
  { path: "Profile", element: <RequireAuth><Profile /></RequireAuth>, errorElement: <ErrorException /> },
  { path: "send-otp/:email", element: <GuestAuth><SendOtpPage /></GuestAuth>, errorElement: <ErrorException /> },
  { path: "ParentPage", element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><ParentPage /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "tutor-detail/:email", element: <TutorDetailPage />, errorElement: <ErrorException /> },
  { path: "request-tutor", element: <RoleBasedGuard accessibleRoles={['Tutor']} status="Active"><RequestTutorPage /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "personal-profile", element: <RoleBasedGuard accessibleRoles={['Tutor', 'Admin', 'Moderator']} status="Active"><UserProfilePage /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "buycoin", element: <RequireAuth><BuyCoinPage /></RequireAuth>, errorElement: <ErrorException /> },
  { path: "ParentHistory", element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><ParentHistory /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "user-management", element: <RoleBasedGuard accessibleRoles={['Admin']} status="Active"><UserPage /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "home-tutor", element: <RoleBasedGuard accessibleRoles={['Tutor']} status="Active"><HomeTutorPage /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "tutor-profile", element: <RoleBasedGuard accessibleRoles={['Tutor']} status="Active"><TutorProfilePage /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "request-tutor-offline", element: <RoleBasedGuard accessibleRoles={['Tutor']} status="Active"><RequestTutorOfflinePage /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "payment", element: <Checkout />, errorElement: <ErrorException /> },
  { path: "waiting-checkout", element: <WaitingCheckout />, errorElement: <ErrorException /> },
  { path: "transaction", element: <RoleBasedGuard accessibleRoles={['Admin', 'Moderator']} status="Active"><TransactionPage /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "transaction-user", element: <TransactionPageByUser />, errorElement: <ErrorException /> },
  { path: "view-notification", element: <RoleBasedGuard accessibleRoles={['Moderator']} status="Active"><NotificationPage /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "view-feedback", element: <RoleBasedGuard accessibleRoles={['Moderator']} status="Active"><FeedbackPage /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "view-report", element: <RoleBasedGuard accessibleRoles={['Moderator']} status="Active"><ReportPage /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "ParentRequest", element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><ParentRequest /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "ParentComplete", element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><ParentComplete /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "ParentCancelled", element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><ParentCancelled /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "ParentRequestOffline", element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><ParentRequestOffline /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "ParentCompleteOffline", element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><ParentCompleteOffline /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "ParentCancelledOffline", element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><ParentCancelledOffline /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "ParentHistoryOffline", element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><ParentHistoryOffline /></RoleBasedGuard>, errorElement: <ErrorException /> },
  // { path: "NotificationPage", element: <NotificationPage /> },
  { path: "ParentHistoryTransaction", element: <RoleBasedGuard accessibleRoles={['Parents']} status="Active"><ParentHistoryTransaction /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "NewsPage", element: <NewsPage /> },
  { path: "/news/:newsId", element: <NewDetailPage />, errorElement: <ErrorException /> },
  { path: "/time-table/:email", element: <RoleBasedGuard accessibleRoles={['Tutor']} status="Active"><TimetablePage /></RoleBasedGuard>, errorElement: <ErrorException /> },
  { path: "checking-page", element: <CheckingPageTutor />, errorElement: <ErrorException /> },
  { path: "view-new-moderator", element: <RoleBasedGuard accessibleRoles={['Moderator']} status="Active"><PageNewByModerator /></RoleBasedGuard>, errorElement: <ErrorException /> },
]);

