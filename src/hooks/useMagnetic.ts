import { useEffect, useRef } from "react";

/**
 * Magnetic effect: while cursor is within `radius` px of the element's center,
 * translate it toward the cursor. Optimized:
 *   - `getBoundingClientRect` is cached and only refreshed on scroll/resize,
 *     not on every pointer move (eliminates per-move layout reads).
 *   - IntersectionObserver gates the pointermove listener so the effect
 *     does no work when the element is off-screen.
 *   - Disabled on touch / coarse pointer / reduced-motion.
 */
export const useMagnetic = <T extends HTMLElement = HTMLAnchorElement>(
  strength = 0.35,
  radius = 110
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window === "undefined") return;

    const fine = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    node.style.transition = "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)";
    node.style.willChange = "transform";

    let rect = node.getBoundingClientRect();
    const refreshRect = () => {
      rect = node.getBoundingClientRect();
    };

    let raf = 0;
    let pendingTx = 0;
    let pendingTy = 0;
    let active = false;

    const apply = () => {
      raf = 0;
      node.style.transform = `translate3d(${pendingTx}px, ${pendingTy}px, 0)`;
    };

    const onMove = (e: PointerEvent) => {
      if (!active) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      // Quick early-out using axis-aligned check before the costly hypot.
      if (Math.abs(dx) > radius || Math.abs(dy) > radius) {
        if (pendingTx !== 0 || pendingTy !== 0) {
          pendingTx = 0;
          pendingTy = 0;
          if (!raf) raf = requestAnimationFrame(apply);
        }
        return;
      }
      const dist = Math.hypot(dx, dy);
      if (dist > radius) {
        pendingTx = 0;
        pendingTy = 0;
      } else {
        const factor = 1 - dist / radius;
        pendingTx = dx * strength * factor;
        pendingTy = dy * strength * factor;
      }
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const reset = () => {
      pendingTx = 0;
      pendingTy = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) {
          refreshRect();
          window.addEventListener("pointermove", onMove, { passive: true });
          window.addEventListener("scroll", refreshRect, { passive: true });
          window.addEventListener("resize", refreshRect);
        } else {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("scroll", refreshRect);
          window.removeEventListener("resize", refreshRect);
          reset();
        }
      },
      { rootMargin: "120px" }
    );
    io.observe(node);

    node.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);

    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", refreshRect);
      window.removeEventListener("resize", refreshRect);
      node.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      if (raf) cancelAnimationFrame(raf);
      node.style.transform = "";
      node.style.transition = "";
      node.style.willChange = "";
    };
  }, [strength, radius]);

  return ref;
};
