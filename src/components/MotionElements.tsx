'use client';

import {
  motion,
  useScroll,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { useRef, useEffect, useState, type ReactNode } from 'react';

/* ScrollReveal — plain passthrough, no scroll animation */
export function ScrollReveal({
  children,
  className = '',
  direction: _direction,
  delay: _delay,
  duration: _duration,
  once: _once,
}: {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  return <div className={className}>{children}</div>;
}

/* TextReveal — plain passthrough */
export function TextReveal({
  children,
  className = '',
  as: Tag = 'span',
  wordClassName: _wc,
  delay: _d,
}: {
  children: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  as?: 'span' | 'h1' | 'h2' | 'p';
}) {
  return <Tag className={className}>{children}</Tag>;
}

/* StaggerContainer — plain passthrough */
export function StaggerContainer({
  children,
  className = '',
  staggerDelay: _s,
  margin: _m,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  margin?: string;
}) {
  return <div className={className}>{children}</div>;
}

/* StaggerItem — plain passthrough */
export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function TiltCard({
  children,
  className = '',
  intensity: _intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  return <div className={className}>{children}</div>;
}

export function FlipNumber({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className={`inline-block ${className}`}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* ScrollProgress removed — no progress bar */
export function ScrollProgress() {
  return null;
}

export function GlowCursor() {
  return null;
}

export function ScrollIndicator() {
  return null;
}

export function MagneticWrapper({
  children,
  className = '',
  strength: _strength = 0.15,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  return <div className={className}>{children}</div>;
}

export function ParallaxLayer({
  children,
  className = '',
  speed: _speed,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function AnimatedGradientBorder({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function CountUp({
  target,
  prefix = '',
  suffix = '',
  className = '',
  duration: _d,
}: {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const dur = 1800;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / dur, 1);
      setCount(Math.floor(target * progress));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [target]);

  return (
    <span className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
