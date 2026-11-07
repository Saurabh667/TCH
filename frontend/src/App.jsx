
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { ThemeProvider } from "./components/common/ThemeContext";

// Existing website components
import Navbar from "./components/navbar/Navbar";
import Footer from "./pages/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Event";
import Announcement from "./pages/Annoucement";
import Resource from "./pages/Resource";
import Gallery from "./pages/Gallery";
import MyApplication from "./pages/MyApplication";
import Profile from "./pages/Profile";

// Authentication
import AuthLayout from "./components/auth/AuthLayout";
import AuthVerification from "./components/auth/AuthVerification";

import Login from "./components/forms/Login";
import Signup from "./components/forms/Signup";
import VerifyEmail from "./components/auth/VerifyEmail";
import ForgotPass from "./components/auth/ForgotPass";
import ResetPass from "./components/auth/ResetPass";

// Admin layout
import AdminLayout from "./layouts/AdminLayout";

// Admin event management pages
import EventDashboard from "./admin/events/EventDashboard";
import ManageEvents from "./admin/events/ManageEvents";
import CreateEvent from "./admin/events/CreateEvent";
import EditEvent from "./admin/events/EditEvent";
import EventOverview from "./admin/events/EventOverview";
import Participants from "./admin/events/Participants";
import Organizers from "./admin/events/Organizers";
import Attendance from "./admin/events/Attendance";
import EventGallery from "./admin/events/EventGallery";
import EventAnalytics from "./admin/events/EventAnalytics";

// Member event pages
import EventDetails from "./admin/events/EventDetails";
import MyRegistrations from "./admin/events/MyRegistrations";
import MyAttendance from "./admin/events/MyAttendance";

function AppContent() {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}

      <Routes>
        {/* PUBLIC WEBSITE ROUTES */}

        <Route
          path="/"
          element={<><Home /><Footer /></>}
        />

        <Route
          path="/about"
          element={<><About /><Footer /></>}
        />

        <Route
          path="/events"
          element={<><Events /><Footer /></>}
        />

        <Route
          path="/announcements"
          element={<><Announcement /><Footer /></>}
        />

        <Route
          path="/resources"
          element={<><Resource /><Footer /></>}
        />

        <Route
          path="/gallery"
          element={<><Gallery /><Footer /></>}
        />

        <Route
          path="/my-applications"
          element={<><MyApplication /><Footer /></>}
        />

        {/* AUTHENTICATION ROUTES */}

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPass />} />

          <Route
            path="/reset-password/:uid/:token"
            element={<ResetPass />}
          />
        </Route>

        {/* PROTECTED ROUTES */}

        <Route element={<AuthVerification />}>

          <Route
            path="/profile"
            element={<><Profile /><Footer /></>}
          />

          {/* MEMBER EVENT ROUTES */}

          <Route
            path="/events/:eventId"
            element={<><EventDetails /><Footer /></>}
          />

          <Route
            path="/my-registrations"
            element={<><MyRegistrations /><Footer /></>}
          />

          <Route
            path="/my-attendance"
            element={<><MyAttendance /><Footer /></>}
          />

          {/* ADMIN / CORE TEAM ROUTES */}

          <Route element={<AdminLayout />}>

            <Route
              path="/dashboard/events"
              element={<EventDashboard />}
            />

            <Route
              path="/dashboard/events/manage"
              element={<ManageEvents />}
            />

            <Route
              path="/dashboard/events/create"
              element={<CreateEvent />}
            />

            <Route
              path="/dashboard/events/analytics"
              element={<EventAnalytics />}
            />

            <Route
              path="/dashboard/events/:eventId/edit"
              element={<EditEvent />}
            />

            <Route
              path="/dashboard/events/:eventId/participants"
              element={<Participants />}
            />

            <Route
              path="/dashboard/events/:eventId/organizers"
              element={<Organizers />}
            />

            <Route
              path="/dashboard/events/:eventId/attendance"
              element={<Attendance />}
            />

            <Route
              path="/dashboard/events/:eventId/gallery"
              element={<EventGallery />}
            />

            <Route
              path="/dashboard/events/:eventId"
              element={<EventOverview />}
            />

          </Route>
        </Route>

        {/* UNKNOWN ROUTES */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}
