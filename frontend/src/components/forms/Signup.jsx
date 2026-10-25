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
const MIN_PASSWORD_LENGTH = 8;

function validate(values) {
  const errors = {};
  const email = values.email.trim();

  if (values.fullName.trim().length < 2) errors.fullName = "Enter your full name.";

  if (!email) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";

  if (!values.password) errors.password = "Create a password.";
  else if (values.password.length < MIN_PASSWORD_LENGTH)
    errors.password = `Use at least ${MIN_PASSWORD_LENGTH} characters.`;

  if (!values.confirmPassword) errors.confirmPassword = "Confirm your password.";
  else if (values.confirmPassword !== values.password)
    errors.confirmPassword = "Passwords do not match.";

  return errors;
}

// TODO(backend): replace with a real request, e.g. POST /api/auth/register.
// Never store the password in localStorage/sessionStorage.
async function registerUser(details) {
  void details;
  return {
    ok: false,
    message:
      "Your details look valid, but sign-up is not connected to a server yet, so no account was created.",
  };
}

const linkClasses =
  "rounded font-medium text-[#38A8FF] underline-offset-4 transition-colors hover:text-[#00CFFF] hover:underline focus-visible:ring-2 focus-visible:ring-[#00CFFF]/50 focus-visible:outline-hidden";

export default function Signup() {
  const formRef = useRef(null);
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };
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
      const result = await registerUser({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        password: values.password,
      });
      if (!result.ok) {
        setNotice({ tone: "info", text: result.message });
      }
      // TODO(backend): on success, navigate("/login") or sign the user in.
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <FormHeader
        title="Create your account"
        subtitle="Join The Coders Hub and start building with your campus community."
      />

      <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
        <TextField
          label="Full name"
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder="Your full name"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
        />

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
          autoComplete="new-password"
          placeholder="Create a password"
          hint={`At least ${MIN_PASSWORD_LENGTH} characters.`}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />

        <PasswordField
          label="Confirm password"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmPassword}
        />

        {notice && <FormNotice tone={notice.tone}>{notice.text}</FormNotice>}

        <SubmitButton loading={submitting}>Create account</SubmitButton>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link to="/login" className={linkClasses}>
          Sign in
        </Link>
      </p>
    </div>
  );
}