
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      <span className="text-[10px] font-bold tracking-[0.25em] text-cyan-700 dark:text-cyan-400 sm:text-xs">
        {eyebrow}
      </span>

      <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
        {title}{" "}
        {highlight && (
          <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>

      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
          {description}
        </p>
      )}
    </Reveal>
  );
}
