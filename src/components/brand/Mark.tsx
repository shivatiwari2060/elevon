import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

/* The Elevon mark: three folded ribbons, traced from the brand logo (555 x 700). */
const GRADIENTS = (
  <defs>
    <linearGradient id="rib-a" x1="80" y1="40" x2="470" y2="330" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#12e6d8" />
      <stop offset="1" stopColor="#00f5e4" />
    </linearGradient>
    <linearGradient id="rib-b" x1="80" y1="540" x2="420" y2="300" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#0fd2cc" />
      <stop offset="1" stopColor="#00f0e0" />
    </linearGradient>
    <linearGradient id="rib-c" x1="150" y1="500" x2="510" y2="640" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#0fb8c8" />
      <stop offset="1" stopColor="#1c86c6" />
    </linearGradient>
    <linearGradient
      id="rib-fold"
      x1="200"
      y1="240"
      x2="470"
      y2="380"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stopColor="#0a7f90" stopOpacity=".15" />
      <stop offset="1" stopColor="#0aa5b8" stopOpacity=".7" />
    </linearGradient>
  </defs>
);

const RIBBONS = {
  top: { d: 'M475 40v120L92 358q-17 8-17-12V268q0-24 36-35z', fill: 'url(#rib-a)' },
  fold1: { d: 'M205 308 330 242l85 28v30z', fill: 'url(#rib-fold)' },
  mid: { d: 'M415 270v115L82 540q-7 3-7-8V462q0-24 32-34z', fill: 'url(#rib-b)' },
  fold2: { d: 'M330 336l140 22-55 27z', fill: 'url(#rib-fold)' },
  low: { d: 'M150 526 282 462l230 113-112 66q-12 3-22-2z', fill: 'url(#rib-c)' },
} as const;

const VIEW_BOX = '40 20 500 640';

/** Static mark for the header and footer. */
export function Mark({ height = 34 }: { height?: number }) {
  return (
    <svg
      height={height}
      viewBox={VIEW_BOX}
      role="img"
      aria-label="Elevon"
      style={{ width: 'auto' }}
    >
      {GRADIENTS}
      {(['low', 'fold2', 'mid', 'fold1', 'top'] as const).map((key) => (
        <path key={key} d={RIBBONS[key].d} fill={RIBBONS[key].fill} />
      ))}
    </svg>
  );
}

/** Drawing order is back-to-front; each ribbon slides in from its own side. */
const ENTRANCE = [
  { key: 'low', delay: 0.15, from: { x: 120, y: 80 } },
  { key: 'fold2', delay: 0.5, from: { x: 80, y: 0 } },
  { key: 'mid', delay: 0.3, from: { x: -120, y: 40 } },
  { key: 'fold1', delay: 0.6, from: { x: 80, y: -20 } },
  { key: 'top', delay: 0.45, from: { x: 140, y: -90 } },
] as const;

/** Large mark for the hero: the ribbons slide into place once. */
export const AnimatedMark = forwardRef<SVGSVGElement, { className?: string }>(function AnimatedMark(
  { className },
  ref,
) {
  return (
    <svg
      ref={ref}
      className={className}
      viewBox={VIEW_BOX}
      role="img"
      aria-label="Elevon logo mark"
    >
      {GRADIENTS}
      {ENTRANCE.map(({ key, delay, from }) => (
        <motion.path
          key={key}
          d={RIBBONS[key].d}
          fill={RIBBONS[key].fill}
          initial={{ opacity: 0, ...from }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay, ease: EASE }}
        />
      ))}
    </svg>
  );
});
