import { useEffect, useRef } from "react";

const HOVER_SELECTOR = 'a, button, [role="button"], [data-magnetic]';
const EXCLUDE_INSIDE = "[cmdk-root]";

/**
 * Cursor follower. In default ("dot") mode it tracks the pointer as a small
 * filled circle. On hover over an interactive element, it shapeshifts into
 * a transparent outlined frame of the same size and border-radius as that
 * element, anchored to its center.
 *
 * Position updates via pointermove (rAF-throttled). Hover transitions via
 * pointerover/pointerout delegation so the closest() walk only runs on
 * element-boundary changes, not every pixel of motion.
 *
 * Disabled on touch / coarse pointer / reduced-motion.
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
    dot.dataset.mode = "dot";

    let raf = 0;
    let pendingX = 0;
    let pendingY = 0;
    let firstMove = true;
    let hoveredEl: Element | null = null;

    const update = () => {
      raf = 0;
      if (hoveredEl) {
        // Re-read rect so the wrap tracks magnetic-offset movement of the
        // hovered button. Sub-millisecond layout read.
        const r = hoveredEl.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const w = Math.round(r.width);
        const h = Math.round(r.height);
        if (dot.style.width !== `${w}px`) dot.style.width = `${w}px`;
        if (dot.style.height !== `${h}px`) dot.style.height = `${h}px`;
        dot.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      } else {
        dot.style.transform = `translate3d(${pendingX}px, ${pendingY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMove = (e: PointerEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (firstMove) {
        firstMove = false;
        dot.style.opacity = "1";
      }
      if (!raf) raf = requestAnimationFrame(update);
    };

    const wrapTo = (el: Element) => {
      if (hoveredEl === el) return;
      hoveredEl = el;
      const styles = window.getComputedStyle(el);
      dot.style.borderRadius = styles.borderRadius;
      dot.dataset.mode = "wrap";
      if (!raf) raf = requestAnimationFrame(update);
    };

    const unwrap = () => {
      hoveredEl = null;
      dot.dataset.mode = "dot";
      // Clear inline sizing so the .cursor-dot CSS defaults kick back in
      // and the shape transitions back to a small filled circle.
      dot.style.width = "";
      dot.style.height = "";
      dot.style.borderRadius = "";
      if (!raf) raf = requestAnimationFrame(update);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const wrapEl = target.closest(HOVER_SELECTOR);
      if (!wrapEl) return;
      if (wrapEl.closest(EXCLUDE_INSIDE)) return;
      wrapTo(wrapEl);
    };

    const onOut = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const fromEl = target?.closest(HOVER_SELECTOR);
      if (!fromEl || fromEl !== hoveredEl) return;
      const related = e.relatedTarget as Element | null;
      const toEl = related?.closest(HOVER_SELECTOR);
      // If moving directly to another wrap target (not inside the palette),
      // let onOver handle the switch — don't flicker through dot mode.
      if (toEl && !toEl.closest(EXCLUDE_INSIDE)) return;
      unwrap();
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

  return <div ref={dotRef} aria-hidden className="cursor-dot" style={{ opacity: 0 }} />;
};
