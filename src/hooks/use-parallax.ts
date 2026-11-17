"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * `useLayoutEffect` on the client, `useEffect` on the server. The initial
 * parallax offset must be written **before** the browser paints — otherwise the
 * element paints once at its untransformed position (0,0) and then jumps to its
 * resting offset. The `useEffect` fallback avoids React's server-side warning.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface UseParallaxOptions {
  /**
   * How strongly the element lags behind the scroll. Positive values move the
   * element against the scroll direction (classic depth). Keep it small
   * (~0.03–0.2) to avoid large jumps and horizontal/vertical overflow.
   */
  speed?: number;
  /** Axis to translate along. */
  axis?: "x" | "y";
}

/**
 * Returns a ref whose element is translated as the page scrolls, creating a
 * parallax effect. The transform is written directly to the node via
 * requestAnimationFrame (no React re-renders), and the effect is disabled when
 * the user prefers reduced motion.
 */
export function useParallax<T extends HTMLElement = HTMLElement>({
  speed = 0.1,
  axis = "y",
}: UseParallaxOptions = {}) {
  const ref = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let frame = 0;
    // The offset we last wrote to the element. `getBoundingClientRect()`
    // includes the element's own transform, so we subtract this back out to
    // recover the purely scroll-driven position — otherwise each update feeds on
    // the previous one.
    let offset = 0;
    // The element's resting position (captured on the first measurement). The
    // parallax is applied *relative* to it, so the resting state has no
    // transform: the element stays exactly where CSS puts it until you scroll,
    // then drifts smoothly from there. Measuring an absolute offset from the
    // viewport centre instead would shift the element on load (0,0 → resting
    // value) and read as a jump.
    let base: number | null = null;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // Position of the element centre (without our own offset) along the chosen
      // axis. For `x` this reacts to the horizontal section slide.
      const centre =
        axis === "y"
          ? rect.top + rect.height / 2 - offset
          : rect.left + rect.width / 2 - offset;
      if (base === null) base = centre;
      // Drift only by how far the element has travelled from its resting spot.
      offset = -(centre - base) * speed;
      const value = offset.toFixed(2);
      el.style.transform =
        offset === 0
          ? ""
          : axis === "y"
            ? `translate3d(0, ${value}px, 0)`
            : `translate3d(${value}px, 0, 0)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      el.style.transform = "";
    };
  }, [speed, axis]);

  return ref;
}
