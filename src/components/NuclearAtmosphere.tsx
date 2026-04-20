'use client';

/**
 * Full-viewport layered background: void black, plasma pulses, grid, vignette.
 * Decorative only; respects prefers-reduced-motion for animated layers.
 */
export default function NuclearAtmosphere() {
  return (
    <div className="nuclear-atmosphere pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="nuclear-atmosphere__void" />
      <div className="nuclear-atmosphere__plasma" />
      <div className="nuclear-atmosphere__plasma nuclear-atmosphere__plasma--delayed" />
      <div className="nuclear-atmosphere__core nuclear-atmosphere__core--a" />
      <div className="nuclear-atmosphere__core nuclear-atmosphere__core--b" />
      <div className="nuclear-atmosphere__ring" />
      <div className="nuclear-atmosphere__grid" />
      <div className="nuclear-atmosphere__scan" />
      <div className="nuclear-atmosphere__vignette" />
      <div className="nuclear-atmosphere__noise" />
    </div>
  );
}
