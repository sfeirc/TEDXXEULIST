'use client';

export default function NuclearAtmosphere() {
  return (
    <div className="nuclear-atmosphere pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="nuclear-atmosphere__void" />
      <div className="nuclear-atmosphere__vignette" />
      <div className="nuclear-atmosphere__noise" />
    </div>
  );
}
