import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

type Props = {
  /** HUD kicker, e.g. "02 — ARCHIVE.SYS" */
  kicker: string;
  title?: ReactNode;
  /** Terminal-style subline rendered after a "$" prompt, with blinking caret */
  command?: ReactNode;
};

export default function SectionHeading({ kicker, title, command }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease }}
      className={`text-center ${title ? "mb-16" : "mb-10"}`}
    >
      <div className="flex items-center justify-center gap-3 font-mono text-xs tracking-[0.35em] text-neon-cyan/75">
        <span className="h-1.5 w-1.5 rotate-45 bg-neon-cyan glow-cyan" />
        {kicker}
        <span className="h-1.5 w-1.5 rotate-45 bg-neon-cyan glow-cyan" />
      </div>

      {title && (
        <h2 className="mt-6 font-display text-3xl font-bold tracking-[0.08em] text-white glow-soft sm:text-4xl">
          {title}
        </h2>
      )}

      {command && (
        <p className="mt-4 font-mono text-[13px] tracking-[0.1em] text-neon-cyan/75">
          <span className="text-white/35">$</span> {command}
          <span className="cursor" />
        </p>
      )}
    </motion.div>
  );
}
