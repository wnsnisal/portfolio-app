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

    // The in-flow sticky `<header>` sits above this section. We pin the track
    // right below the header (so panel content never hides under it) by nudging
    // the sticky element down one header-height. The horizontal scrub itself,
    // however, must start exactly when the container's top reaches the viewport
    // top (`start: "top top"`): the id-bearing snap markers are spaced a clean
    // `100vh` apart, so only a `100vh`-per-panel mapping that begins on that
    // same line puts each marker's scroll rest-point at the position where its
    // panel is horizontally centred. Offsetting the start by the header height
    // (as a way to avoid a brief dead-zone at the very top) desyncs the two and
    // leaves every nav jump / snap landing off-centre by up to a header-height.
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
          // Start on the same line the `100vh` snap markers are measured from,
          // so each panel's marker rest-point is its horizontally-centred
          // position (see the note above applyOffset).
          start: "top top",
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
  // `space-y-12` adds breathing room between sections on mobile only; it resets
  // to `0` at `lg` (this branch renders there only under reduced motion, where
  // each section supplies its own spacing). `lg:pb-24` leaves room for the
  // footer when it is fixed (lg + reduced motion).
  if (!enabled) {
    return (
      <div className="space-y-12 lg:space-y-0 lg:pb-24">
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
        <div ref={trackRef} className="relative flex h-full will-change-transform">
          {/* Decorative seams between panels: a gradient line, a soft glow and
              a pair of rotated-square shapes straddling each boundary. Sits
              behind the panels (which are in normal flow and paint on top), so
              it never covers section content. */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {Array.from({ length: count - 1 }).map((_, i) => (
              <div
                key={`seam-${i}`}
                className="absolute top-0 bottom-0"
                style={{ left: `${(i + 1) * 100}vw` }}
              >
                {/* soft column glow */}
                <div className="absolute top-1/2 left-1/2 size-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--primary),transparent_70%)] opacity-[0.10] blur-2xl dark:opacity-[0.16]" />
                {/* vertical gradient hairline */}
                <div className="absolute inset-y-[14%] left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/35 to-transparent" />
                {/* outer diamond outline */}
                <div className="absolute top-1/2 left-1/2 size-9 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[4px] border border-primary/25" />
                {/* inner filled diamond */}
                <div className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] border border-primary/50 bg-primary/15" />
              </div>
            ))}
          </div>
          {panels.map((panel) => (
            <div
              key={`panel-${panel.id}`}
              className="relative flex h-full w-screen shrink-0 flex-col justify-center overflow-hidden pt-6 pb-20"
            >
              {panel.node}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
