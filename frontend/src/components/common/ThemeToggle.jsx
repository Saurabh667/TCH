import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={darkMode ? "Light mode" : "Dark mode"}
      aria-pressed={darkMode}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-[1.5px] border-[#0B2545] bg-white text-[#0B2545] transition hover:border-cyan-500 hover:bg-[#EAF4FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-amber-300 dark:hover:border-cyan-400 dark:hover:bg-slate-800"
    >
      {darkMode ? (
        <Sun size={20} aria-hidden="true" />
      ) : (
        <Moon size={20} aria-hidden="true" />
      )}
    </button>
  );
}