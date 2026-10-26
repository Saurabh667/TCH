import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../services/auth";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your email address...");

  useEffect(() => {
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

        setStatus("success");
        setMessage(
          response.data.message || "Your email has been verified successfully."
        );
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data?.detail ||
            "Email verification failed. The link may be invalid or expired."
        );
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow">
        <h1 className="mb-4 text-2xl font-bold">Email Verification</h1>

        <p
          className={`mb-6 ${
            status === "error"
              ? "text-red-600"
              : status === "success"
                ? "text-green-600"
                : "text-slate-600"
          }`}
        >
          {message}
        </p>

        {status === "success" && (
          <Link
            to="/login"
            className="rounded-lg bg-cyan-700 px-5 py-3 font-semibold text-white"
          >
            Continue to Login
          </Link>
        )}

        {status === "error" && (
          <Link to="/login" className="font-semibold text-cyan-700">
            Back to Login
          </Link>
        )}
      </section>
    </main>
  );
}


