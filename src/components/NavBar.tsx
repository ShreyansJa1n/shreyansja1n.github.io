import { Link } from "react-router-dom";
import { useContext } from "react";
import DarkModeContext from "@/contexts/dark";
import { Sun, Moon } from "lucide-react";
import { useScrollY } from "@/hooks/useScrollProgress";

export const NavBar = () => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  const scrollY = useScrollY();
  const scrolled = scrollY > 8;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-apple-quick ${
        scrolled
          ? "backdrop-blur-2xl bg-white/70 dark:bg-black/60 border-b border-[color:var(--hairline)]"
          : "backdrop-blur-md bg-white/30 dark:bg-black/20 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-12 md:h-14 flex items-center justify-between">
        <Link
          to="/"
          className="text-[15px] font-semibold tracking-tightish text-ink dark:text-ink hover:opacity-70 transition-opacity"
        >
          Shreyans Jain
        </Link>
        <div className="flex items-center gap-1 md:gap-2">
          <a
            href="/#for-recruiters"
            className="hidden md:inline-block text-[13px] font-medium px-3 py-1.5 rounded-full text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-subtle)] dark:hover:bg-white/5 transition-colors"
          >
            For recruiters
          </a>
          <a
            href="/#projects"
            className="hidden md:inline-block text-[13px] font-medium px-3 py-1.5 rounded-full text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-subtle)] dark:hover:bg-white/5 transition-colors"
          >
            Projects
          </a>
          <a
            href="/#experience"
            className="hidden md:inline-block text-[13px] font-medium px-3 py-1.5 rounded-full text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-subtle)] dark:hover:bg-white/5 transition-colors"
          >
            Experience
          </a>
          <Link
            to="/blogs"
            className="text-[13px] font-medium px-3 py-1.5 rounded-full text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-subtle)] dark:hover:bg-white/5 transition-colors"
          >
            Writing
          </Link>
          <button
            aria-label="Toggle dark mode"
            className="ml-1 rounded-full p-2 text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-subtle)] dark:hover:bg-white/5 transition-colors"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
};
