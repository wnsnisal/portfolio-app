"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface PanelDef {
  /** Anchor/active-section id for this panel (matches nav + `#hash` links). */
  id: string;
  node: ReactNode;
}

/**
 * Turns a list of panels into a horizontally-scrolling experience.
 *
 * The page keeps scrolling **vertically** (native wheel / trackpad / keyboard);
 * a pinned track is translated sideways in proportion to that scroll, so each
 * section slides across the screen. Invisible full-height markers — one per
 * panel, carrying the real `id` — provide the scroll-snap points and the
 * targets that anchor links and `useActiveSection` rely on, so nav keeps
 * working unchanged.
 *
 * Enabled only on `lg+` with motion allowed; otherwise it renders a normal
 * vertical stack (so tall panels like the projects grid aren't trapped).
 */
export function HorizontalScroll({ panels }: { panels: PanelDef[] }) {
  const count = panels.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    const apply = () => {
      setEnabled(mq.matches);
      setReady(true);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // The id-bearing DOM swaps between modes; tell useActiveSection to re-observe.
  useEffect(() => {
    if (ready) window.dispatchEvent(new Event("sectionlayoutchange"));
  }, [enabled, ready]);

  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!container || !track || !sticky) return;

    // The in-flow sticky `<header>` sits above this section, so the container's
    // top starts one header-height down the page. We pin the track right below
    // the header and begin the horizontal scrub from that same line — otherwise
    // the first header-height of scrolling moves the hero straight *up* (the
    // header scrolling away) before any sideways motion starts, which reads as
    // "vertical first, then horizontal".
    const header = document.querySelector<HTMLElement>("header");
    const applyOffset = () => {
      const h = header?.offsetHeight ?? 0;
      sticky.style.top = `${h}px`;
      sticky.style.height = `calc(100vh - ${h}px)`;
    };
    applyOffset();

    // ScrollTrigger drives the sideways slide: as the page scrolls the full
    // `count * 100vh` of the container, the sticky track is scrubbed from 0 to
    // `-(count - 1) * 100vw`. GSAP batches every trigger onto one shared ticker
    // and caches start/end positions, so unlike the old per-frame
    // `getBoundingClientRect` this measures only on refresh.
    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(count - 1) * window.innerWidth,
        ease: "none",
        // Keep the transform 3D at rest *and* while scrubbing. With the default
        // `force3D: "auto"` GSAP renders a 2D `translate()` at rest and switches
        // to `translate3d()` on the first scroll; that 2D→3D layer promotion
        // re-snaps the track to the pixel grid.
        force3D: true,
        scrollTrigger: {
          trigger: container,
          // Fire the moment the container's top reaches the header's bottom
          // edge — i.e. at scroll position 0, exactly where the track pins.
          start: () => `top ${header?.offsetHeight ?? 0}px`,
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: applyOffset,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [enabled, count]);

  // Vertical fallback: plain stacked flow, ids on the wrappers for anchors.
  // `lg:pb-24` leaves room for the footer when it is fixed (lg + reduced motion).
  if (!enabled) {
    return (
      <div className="lg:pb-24">
        {panels.map((panel) => (
          <div key={panel.id} id={panel.id} className="scroll-mt-24">
            {panel.node}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${count * 100}vh` }}
    >
      {/* One full-height marker per panel: snap points + anchor/active targets. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {panels.map((panel) => (
          <div key={panel.id} id={panel.id} className="h-screen w-full snap-start" />
        ))}
      </div>
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        <div ref={trackRef} className="flex h-full will-change-transform">
          {panels.map((panel) => (
            <div
              key={`panel-${panel.id}`}
              className="flex h-full w-screen shrink-0 flex-col justify-center overflow-hidden pb-24"
            >
              {panel.node}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
