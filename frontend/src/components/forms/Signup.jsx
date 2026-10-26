import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FormHeader,
  FormNotice,
  PasswordField,
  SubmitButton,
  TextField,
} from "../auth/AuthFields";

import { registerUser } from "../../services/auth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

function validate(values) {
  const errors = {};

  const fullName = values.fullName.trim();
  const email = values.email.trim();
  const department = values.department.trim();
  const phone = values.phone.trim();

  if (fullName.length < 2) {
    errors.fullName = "Enter your full name.";
  }

  if (!email) {
    errors.email = "Enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!department) {
    errors.department = "Enter your department.";
  }

  if (values.yearOfStudy) {
    const year = Number(values.yearOfStudy);

    if (!Number.isInteger(year) || year < 1 || year > 10) {
      errors.yearOfStudy = "Enter a valid year of study.";
    }
  }

  if (phone && !/^\+?[0-9]{7,15}$/.test(phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.password) {
    errors.password = "Create a password.";
  } else if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

const linkClasses =
  "rounded font-semibold text-cyan-700 underline-offset-4 transition-colors hover:text-sky-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600/50 dark:text-cyan-400 dark:hover:text-cyan-300 dark:focus-visible:ring-cyan-400/50";

export default function Signup() {
  const formRef = useRef(null);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    fullName: "",
    email: "",
    department: "",
    yearOfStudy: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const next = {
      ...values,
      [name]: value,
    };

    setValues(next);

    setErrors((previous) => {
      const freshErrors = validate(next);
      const updated = { ...previous };

      Object.keys(previous).forEach((key) => {
        if (previous[key]) {
          updated[key] = freshErrors[key];
        }
      });

      return updated;
    });

    if (notice) {
      setNotice(null);
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    const validationErrors = validate(values);

    setErrors((previous) => ({
      ...previous,
      [name]: validationErrors[name],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNotice(null);

    const validationErrors = validate(values);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector('[aria-invalid="true"]')
          ?.focus();
      });

      return;
    }

    setSubmitting(true);

    try {
      const result = await registerUser(values);

      if (!result.ok) {
        setNotice({
          tone: "error",
          text: result.message,
        });

        return;
      }

      setNotice({
        tone: "success",
        text:
          result.data.message ||
          "Registration successful. Check your email for verification instructions.",
      });

      // Navigate after briefly displaying the success message.
      // The email verification page will be implemented separately.
      window.setTimeout(() => {
        navigate("/login", {
          state: {
            registeredEmail: values.email.trim().toLowerCase(),
            registrationMessage:
              result.data.message ||
              "Registration successful. Please verify your email before logging in.",
          },
        });
      }, 1500);
    } catch {
      setNotice({
        tone: "error",
        text: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full text-[#102B4E] transition-colors duration-300 dark:text-slate-100">
      <FormHeader
        title="Create your account"
        subtitle="Join The Coders Hub and start building with your campus community."
      />

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5"
      >
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

        <TextField
          label="Department"
          name="department"
          type="text"
          autoComplete="organization-title"
          placeholder="e.g. Computer Science"
          value={values.department}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.department}
        />

        <TextField
          label="Year of study (optional)"
          name="yearOfStudy"
          type="number"
          placeholder="e.g. 3"
          value={values.yearOfStudy}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.yearOfStudy}
        />

        <TextField
          label="Phone number (optional)"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="e.g. 9876543210"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
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

        {notice && (
          <FormNotice tone={notice.tone}>
            {notice.text}
          </FormNotice>
        )}

        <SubmitButton loading={submitting}>
          Create account
        </SubmitButton>
      </form>

      <p className="mt-7 text-center text-sm text-slate-600 dark:text-slate-300">
        Already have an account?{" "}
        <Link to="/login" className={linkClasses}>
          Sign in
        </Link>
      </p>
    </div>
  );
}