import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FormHeader,
  FormNotice,
  PasswordField,
  SubmitButton,
  TextField,
} from "../auth/AuthFields";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  const email = values.email.trim();
  if (!email) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";
  if (!values.password) errors.password = "Enter your password.";
  return errors;
}

// TODO(backend): replace with a real request, e.g. POST /api/auth/login.
// Never store the password in localStorage/sessionStorage.
async function signIn(credentials) {
  void credentials;
  return {
    ok: false,
    message:
      "Your details look valid, but sign-in is not connected to a server yet, so nothing was sent.",
  };
}

const linkClasses =
  "rounded font-medium text-[#38A8FF] underline-offset-4 transition-colors hover:text-[#00CFFF] hover:underline focus-visible:ring-2 focus-visible:ring-[#00CFFF]/50 focus-visible:outline-hidden";

export default function Login() {
  const formRef = useRef(null);
  const [values, setValues] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    const next = { ...values, [name]: type === "checkbox" ? checked : value };
    setValues(next);
    setErrors((prev) => {
      const fresh = validate(next);
      const updated = { ...prev };
      Object.keys(prev).forEach((key) => {
        if (prev[key]) updated[key] = fresh[key];
      });
      return updated;
    });
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    if (name === "remember") return;
    setErrors((prev) => ({ ...prev, [name]: validate(values)[name] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNotice(null);
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() =>
        formRef.current?.querySelector('[aria-invalid="true"]')?.focus()
      );
      return;
    }

    setSubmitting(true);
    try {
      const result = await signIn({
        email: values.email.trim(),
        password: values.password,
        remember: values.remember,
      });
      if (!result.ok) {
        setNotice({ tone: "info", text: result.message });
      }
      // TODO(backend): on success, navigate to the app (e.g. navigate("/dashboard")).
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    setNotice({
      tone: "info",
      text: "Password recovery is not connected yet. It will be available once the backend is ready.",
    });
  };

  return (
    <div>
      <FormHeader
        title="Welcome back"
        subtitle="Sign in to continue to The Coders Hub community."
      />

      <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
        <TextField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@university.edu"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />

        <PasswordField
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />

        <div className="flex items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300 select-none">
            <input
              type="checkbox"
              name="remember"
              checked={values.remember}
              onChange={handleChange}
              className="h-4 w-4 rounded border-[#00CFFF]/30 bg-[#0B1425] accent-[#00CFFF]"
            />
            Remember me
          </label>
          <button type="button" onClick={handleForgotPassword} className={`${linkClasses} text-sm`}>
            Forgot password?
          </button>
        </div>

        {notice && <FormNotice tone={notice.tone}>{notice.text}</FormNotice>}

        <SubmitButton loading={submitting}>Sign in</SubmitButton>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        New to TCH?{" "}
        <Link to="/signup" className={linkClasses}>
          Create an account
        </Link>
      </p>
    </div>
  );
}