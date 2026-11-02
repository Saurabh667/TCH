
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../services/auth";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState(
    "Verifying your email address..."
  );

  useEffect(() => {
    let active = true;

    const verifyEmail = async () => {
      const uid = searchParams.get("uid");
      const token = searchParams.get("token");

      if (!uid || !token) {
        setStatus("error");
        setMessage("The verification link is incomplete.");
        return;
      }

      try {
        const response = await api.post("/auth/verify-email/", {
          uid,
          token,
        });

        if (!active) return;

        setStatus("success");
        setMessage(
          response.data.message ||
            "Your email has been verified successfully."
        );
      } catch (error) {
        if (!active) return;

        setStatus("error");
        setMessage(
          error.response?.data?.detail ||
            "Email verification failed. The link may be invalid or expired."
        );
      }
    };

    verifyEmail();

    return () => {
      active = false;
    };
  }, [searchParams]);

  return (
    <div className="mx-auto w-full max-w-[480px] rounded-3xl border border-[#D8E4F0] bg-white p-7 text-center shadow-sm sm:p-9 dark:border-white/10 dark:bg-[#101e30]">

      {/* Status Icon */}
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 dark:bg-cyan-400/10">

        {status === "verifying" && (
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-cyan-200 border-t-cyan-600 dark:border-cyan-900 dark:border-t-cyan-400" />
        )}

        {status === "success" && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-9 w-9 text-emerald-500"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}

        {status === "error" && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-9 w-9 text-red-500"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6m0-6 6 6" />
          </svg>
        )}
      </div>

      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">
        Account Verification
      </p>

      <h2 className="text-2xl font-bold tracking-tight text-[#102B4E] dark:text-white">
        {status === "verifying" && "Verifying Email"}
        {status === "success" && "Email Verified!"}
        {status === "error" && "Verification Failed"}
      </h2>

      <p
        className={`mt-3 text-sm leading-7 ${
          status === "error"
            ? "text-red-600 dark:text-red-400"
            : status === "success"
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-[#607B9E] dark:text-slate-400"
        }`}
      >
        {message}
      </p>

      {status === "verifying" && (
        <p className="mt-6 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
          Please wait...
        </p>
      )}

      {status === "success" && (
        <Link
          to="/login"
          className="mt-7 block w-full rounded-xl bg-gradient-to-r from-[#00BFEA] to-[#2588E8] px-5 py-3.5 text-sm font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5"
        >
          Continue to Login →
        </Link>
      )}

      {status === "error" && (
        <Link
          to="/login"
          className="mt-7 block w-full rounded-xl bg-gradient-to-r from-[#00BFEA] to-[#2588E8] px-5 py-3.5 text-sm font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5"
        >
          Back to Login →
        </Link>
      )}
    </div>
  );
}
