'use client';

import { useMemo, useState, useEffect } from 'react';

const STAR_COUNT = 55;
const EU_GOLD = 'rgba(255, 215, 0, 0.85)';
const WHITE = 'rgba(255, 255, 255, 0.9)';

export default function Starfield() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const stars = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1.5 + Math.random() * 2,
      duration: 90 + Math.random() * 70,
      delay: Math.random() * 4,
      color: Math.random() > 0.3 ? WHITE : EU_GOLD,
    }));
  }, [mounted]);

  if (!mounted) {
    return <div className="starfield absolute inset-0 overflow-hidden" aria-hidden />;
  }

  return (
    <div
      className="starfield absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="star absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: star.color,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
            animation: `star-float ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
