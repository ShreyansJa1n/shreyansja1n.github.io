import { useEffect, useRef } from "react";

/**
 * Scroll progress bar driven by direct DOM mutation (no React state) to
 * avoid re-rendering on every scroll frame.
 */
export const ScrollProgressBar = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const height = (document.documentElement.scrollHeight || 0) - window.innerHeight;
      const pct = height > 0 ? Math.min(1, Math.max(0, scrollTop / height)) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${pct})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-[var(--accent-ink)] will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
};
