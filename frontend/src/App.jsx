import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/common/ThemeContext";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./components/forms/Login";
import Signup from "./components/forms/Signup";
import Navbar from "./components/Navbar/Navbar";
import VerifyEmail from "./components/auth/VerifyEmail";
import Home from "./pages/Home";
import Footer from "./pages/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* Public home page */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <Footer />
              </>
            }
          />

          {/* Authentication pages */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Route>

          {/* Unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
