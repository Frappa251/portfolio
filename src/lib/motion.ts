import type { Variants } from "framer-motion";

/** Standard easing tuple for the cyber redesign (ease-out-expo-ish). */
export const ease = [0.16, 1, 0.3, 1] as const;

/** Staggered fade-up — pass the element order via the `custom` prop. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delay: 0.2 + i * 0.14 },
  }),
};

/** Parent/child pair for scroll-revealed card grids. */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

export const staggerCard: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
