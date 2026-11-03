
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "./components/common/ThemeContext";

import AuthLayout from "./components/auth/AuthLayout";
import AuthVerification from "./components/auth/AuthVerification";

import Login from "./components/forms/Login";
import Signup from "./components/forms/Signup";

import Navbar from "./components/Navbar/Navbar";
import VerifyEmail from "./components/auth/VerifyEmail";
import ForgotPass from "./components/auth/ForgotPass";
import ResetPass from "./components/auth/ResetPass";

import Home from "./pages/Home";
import Footer from "./pages/Footer";
import About from "./pages/About";
import Profile from "./pages/Profile";

import Events from "./pages/Event";
import Announcement from "./pages/Annoucement";
import Resource from "./pages/Resource";
import Gallery from "./pages/Gallery";
import MyApplication from "./pages/MyApplication"


export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Public Pages */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <Footer />
              </>
            }
          />

          <Route
            path="/about"
            element={
              <>
                <About />
                <Footer />
              </>
            }
          />

          <Route
            path="/events"
            element={
              <>
                <Events />
                <Footer />
              </>
            }
          />

          <Route
            path="/announcements"
            element={
              <>
                <Announcement />
                <Footer />
              </>
            }
          />

          <Route
            path="/resources"
            element={
              <>
                <Resource />
                <Footer />
              </>
            }
          />

          <Route
            path="/gallery"
            element={
              <>
                <Gallery />
                <Footer />
              </>
            }
          />

          <Route path="/my-applications" element={<><MyApplication /><Footer /></>} />

          {/* Authentication Pages */}
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

          {/* Protected Pages */}
          <Route element={<AuthVerification />}>
            <Route
              path="/profile"
              element={
                <>
                  <Profile />
                  <Footer />
                </>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
