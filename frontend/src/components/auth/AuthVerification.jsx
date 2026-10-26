import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import api from "../../services/auth";

export default function AuthVerification() {
  const location = useLocation();

  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let cancelled = false;

    const verifyAccessToken = async () => {
      const accessToken =
        localStorage.getItem("access") ||
        sessionStorage.getItem("access");

      if (!accessToken) {
        if (!cancelled) setStatus("unauthenticated");
        return;
      }

      try {
        // Django validates the token through an authenticated endpoint.
        await api.get("/auth/me/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!cancelled) setStatus("authenticated");
      } catch {
        if (!cancelled) setStatus("unauthenticated");
      }
    };

    verifyAccessToken();

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-slate-600">Verifying your session...</p>
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