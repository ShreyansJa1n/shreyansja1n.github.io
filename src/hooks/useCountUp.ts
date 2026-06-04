import { useEffect, useRef, useState } from "react";

/**
 * Animate a numeric value from `start` to `target` over `duration` ms with an
 * ease-out cubic curve. Only runs when `active` flips to true. Honors
 * `prefers-reduced-motion` by snapping to the target.
 */
export const useCountUp = (
  target: number,
  duration = 1800,
  start = 0,
  active = true
) => {
  const [value, setValue] = useState(start);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    if (typeof window === "undefined") {
      setValue(target);
      return;
    }
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }

    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const elapsed = t - t0;
      const p = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(start + (target - start) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active, target, duration, start]);

  return value;
};
