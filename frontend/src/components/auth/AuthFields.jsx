import { useId, useState } from "react";

function fieldClasses(hasError) {
  return [
    "h-12 w-full rounded-[20px] border-2 px-5 text-[15px]",
    "bg-white text-[#102B4E] placeholder:text-[#8095B5]",
    "dark:bg-[#0B1425] dark:text-white dark:placeholder:text-slate-400",
    "outline-none transition duration-200",
    hasError
      ? "border-red-400 focus:ring-4 focus:ring-red-400/15"
      : "border-[#102B4E] hover:border-cyan-500 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:border-slate-700 dark:hover:border-cyan-400 dark:focus:border-cyan-400",
  ].join(" ");
}

function describedBy(id, error, hint) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

function FieldShell({ id, label, error, hint, labelAside, children }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label
          htmlFor={id}
          className="text-sm font-medium text-[#102B4E] dark:text-slate-100"
        >
          {label}
        </label>
        {labelAside}
      </div>

      {children}

      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-xs text-red-600 dark:text-red-300"
        >
          {error}
        </p>
      ) : hint ? (
        <p
          id={`${id}-hint`}
          className="mt-2 text-xs text-slate-600 dark:text-slate-300"
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function FormHeader({ title, subtitle }) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-semibold tracking-tight text-[#102B4E] sm:text-[2.5rem] dark:text-white">
        {title}
      </h1>

      <p className="mt-2 text-[15px] leading-relaxed text-[#42638F] dark:text-slate-300">
        {subtitle}
      </p>
    </header>
  );
}

export function TextField({ label, error, hint, labelAside, ...inputProps }) {
  const id = useId();

  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      labelAside={labelAside}
    >
      <input
        {...inputProps}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error, hint)}
        className={fieldClasses(Boolean(error))}
      />
    </FieldShell>
  );
}

function EyeIcon({ off }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {off ? (
        <>
          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
          <line x1="2" x2="22" y1="2" y2="22" />
        </>
      ) : (
        <>
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

export function PasswordField({
  label,
  error,
  hint,
  labelAside,
  ...inputProps
}) {
  const id = useId();
  const [visible, setVisible] = useState(false);

  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      labelAside={labelAside}
    >
      <div className="relative">
        <input
          {...inputProps}
          id={id}
          type={visible ? "text" : "password"}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy(id, error, hint)}
          className={`${fieldClasses(Boolean(error))} pr-12`}
        />

        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 hover:text-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:text-slate-300"
        >
          <EyeIcon off={visible} />
        </button>
      </div>
    </FieldShell>
  );
}

export function SubmitButton({ loading, children }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="h-12 w-full rounded-[20px] bg-gradient-to-r from-[#00CFFF] to-[#38A8FF] text-[15px] font-semibold text-[#062342] shadow-[0_8px_24px_-12px_rgba(0,207,255,0.65)] transition duration-200 hover:brightness-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Please wait…" : children}
    </button>
  );
}

const NOTICE_TONES = {
  info: "border-cyan-500/30 bg-cyan-50 text-cyan-900 dark:bg-cyan-500/10 dark:text-cyan-100",
  error:
    "border-red-400/30 bg-red-50 text-red-700 dark:bg-red-400/10 dark:text-red-200",
};

export function FormNotice({ tone = "info", children }) {
  return (
    <div
      role="status"
      className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${NOTICE_TONES[tone] || NOTICE_TONES.info}`}
    >
      {children}
    </div>
  );
}
