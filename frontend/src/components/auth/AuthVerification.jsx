
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import api from "../../services/api";

export default function AuthVerification() {
  const location = useLocation();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let cancelled = false;

    const verifySession = async () => {
      const accessToken =
        localStorage.getItem("access") ||
        sessionStorage.getItem("access");

      const refreshToken =
        localStorage.getItem("refresh") ||
        sessionStorage.getItem("refresh");

      if (!accessToken && !refreshToken) {
        if (!cancelled) setStatus("unauthenticated");
        return;
      }

      try {
        await api.get("/auth/me/");

        if (!cancelled) {
          setStatus("authenticated");
        }
      } catch (error) {
        console.error(
          "Session verification failed:",
          error.response?.data || error.message
        );

        if (!cancelled) {
          setStatus("unauthenticated");
        }
      }
    };

    verifySession();

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-slate-600">
          Verifying your session...
        </p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}
