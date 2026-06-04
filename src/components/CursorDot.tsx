import { useEffect, useRef } from "react";

/**
 * Cursor follower dot. Position via rAF-throttled pointermove; hover state via
 * pointerover/pointerout event delegation (fires on element transitions, not
 * every move). Disabled on touch / reduced-motion / coarse pointer.
 */
export const CursorDot = () => {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const dot = dotRef.current;
    if (!dot) return;
    dot.style.opacity = "0";

    const HOVER_SELECTOR =
      'a, button, [role="button"], input, textarea, select, [data-magnetic], [cmdk-item]';

    let raf = 0;
    let pendingX = 0;
    let pendingY = 0;
    let firstMove = true;
    let hover = false;

    const applyPosition = () => {
      raf = 0;
      dot.style.transform = `translate3d(${pendingX}px, ${pendingY}px, 0)`;
    };

    const onMove = (e: PointerEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (firstMove) {
        firstMove = false;
        dot.style.opacity = "1";
      }
      if (!raf) raf = requestAnimationFrame(applyPosition);
    };

    const setHover = (next: boolean) => {
      if (hover === next) return;
      hover = next;
      dot.dataset.hover = next ? "true" : "false";
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target && target.closest(HOVER_SELECTOR)) {
        setHover(true);
      }
    };

    const onOut = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target || !target.closest(HOVER_SELECTOR)) return;
      const related = e.relatedTarget as Element | null;
      if (!related || !related.closest(HOVER_SELECTOR)) {
        setHover(false);
      }
    };

    const onPageLeave = () => {
      dot.style.opacity = "0";
    };
    const onPageEnter = () => {
      if (!firstMove) dot.style.opacity = "1";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPageLeave);
    document.documentElement.addEventListener("pointerenter", onPageEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.documentElement.removeEventListener("pointerleave", onPageLeave);
      document.documentElement.removeEventListener("pointerenter", onPageEnter);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="fixed top-0 left-0 z-[100] pointer-events-none w-2 h-2 -ml-1 -mt-1 rounded-full bg-ink dark:bg-ink transition-[width,height,margin,background-color,opacity] duration-300 ease-apple data-[hover=true]:w-9 data-[hover=true]:h-9 data-[hover=true]:-ml-[18px] data-[hover=true]:-mt-[18px] data-[hover=true]:bg-ink/20 dark:data-[hover=true]:bg-ink/20 will-change-transform"
      style={{ opacity: 0 }}
    />
  );
};
