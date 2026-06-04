import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DarkModeContext from "@/contexts/dark";
import { Sun, Moon, Search } from "lucide-react";

export const NavBar = () => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-apple-quick ${
        scrolled
          ? "backdrop-blur-xl bg-white/80 dark:bg-black/70 border-b border-[color:var(--hairline)]"
          : "backdrop-blur-md bg-white/40 dark:bg-black/30 border-b border-transparent"
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
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("palette:open"))}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--hairline)] text-[12px] font-medium text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-subtle)] dark:hover:bg-white/5 transition-colors"
            aria-label="Open command palette"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Search</span>
            <kbd className="font-sans text-[10.5px] tracking-wider opacity-70">⌘K</kbd>
          </button>
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
