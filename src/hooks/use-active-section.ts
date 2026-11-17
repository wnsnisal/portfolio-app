"use client";

import { useEffect, useState } from "react";

/** Returns the id of the section currently in the middle of the viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  // Bumped when the section DOM is rebuilt (e.g. the horizontal/vertical layout
  // swap) so the observer re-binds to the current id-bearing elements.
  const [layoutNonce, setLayoutNonce] = useState(0);

  useEffect(() => {
    const onLayoutChange = () => setLayoutNonce((n) => n + 1);
    window.addEventListener("sectionlayoutchange", onLayoutChange);
    return () => window.removeEventListener("sectionlayoutchange", onLayoutChange);
  }, []);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, layoutNonce]);

  return active;
}
