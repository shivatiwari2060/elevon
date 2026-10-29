/** Shared easing and presets, so every animation on the site feels the same. */
export type Bezier = [number, number, number, number];

export const EASE: Bezier = [0.22, 1, 0.36, 1];

/** Subtle fade-and-rise used when content scrolls into view. */
export const fadeUp = (delay = 0) =>
  ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -64px 0px' },
    transition: { duration: 0.5, delay, ease: EASE },
  }) as const;
