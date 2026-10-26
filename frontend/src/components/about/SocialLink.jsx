
export default function SocialLink({ href, label, children }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/10 text-white transition hover:-translate-y-1 hover:border-emerald-400 hover:bg-emerald-400/15 hover:text-emerald-300"
    >
      {children}
    </a>
  );
}
