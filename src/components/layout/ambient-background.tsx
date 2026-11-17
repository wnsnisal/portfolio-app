/**
 * Ambient, non-interactive backdrop: a faint dot grid that sits behind every
 * section for subtle texture. Pinned to the viewport (`fixed`) so it stays put
 * while the horizontal track slides across it. Pure CSS — no client JS.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Faint dot grid, fading toward the edges, for texture */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--muted-foreground)_1px,transparent_1px)] opacity-[0.06] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] dark:opacity-[0.08]" />
    </div>
  );
}
