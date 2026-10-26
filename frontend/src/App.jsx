import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./components/forms/Login";
import Signup from "./components/forms/Signup";
import Navbar from "./components/Navbar/Navbar";
import VerifyEmail from "./components/auth/VerifyEmail.jsx";
import Home from "./pages/Home.jsx";
import AuthVerification from "./components/auth/AuthVerification.jsx";


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Route>
          <Route element={<AuthVerification />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
