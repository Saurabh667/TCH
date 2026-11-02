
import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/auth";

export default function ForgotPass() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await forgotPassword(email);

      setMessage(response.message);
      setEmail("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[480px] rounded-3xl border border-[#D8E4F0] bg-white p-7 shadow-sm sm:p-9 dark:border-white/10 dark:bg-[#101e30]">

      {/* Icon */}
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-400">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-[#102B4E] dark:text-white">
        Forgot password?
      </h2>

      <p className="mt-3 text-sm leading-7 text-[#607B9E] dark:text-slate-400">
        No worries! Enter your registered email address and we'll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#304966] dark:text-slate-200">
            Email Address
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-[#D8E4F0] bg-[#F7FAFD] px-4 py-3.5 text-sm text-[#102B4E] outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-[#0B1727] dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-[#00BFEA] to-[#2588E8] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-cyan-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Reset Link →"}
        </button>
      </form>

      {message && (
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="my-6 border-t border-[#E1EAF3] dark:border-white/10" />

      <Link
        to="/login"
        className="block text-center text-sm font-semibold text-[#0085AD] transition hover:text-blue-600 dark:text-cyan-400"
      >
        ← Back to Login
      </Link>
    </div>
  );
}
