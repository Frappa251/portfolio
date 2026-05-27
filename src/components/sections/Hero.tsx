import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[88vh] items-center overflow-hidden"
    >
      {/* Ambient neon glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 -left-24 h-[520px] w-[520px] rounded-full bg-neon-cyan/10 blur-[120px]" />
        <div className="absolute top-40 -right-32 h-[480px] w-[480px] rounded-full bg-neon-pink/10 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-mono text-sm tracking-widest text-neon-cyan"
        >
          $ whoami
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="text-neon-gradient">Francesco Saverio</span>
          <br />
          <span className="text-white">Cioeta</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 max-w-2xl text-lg text-muted md:text-xl"
        >
          Computer Engineering Student
          <span className="mx-2 text-neon-cyan">•</span>
          Cybersecurity Enthusiast
          <span className="mx-2 text-neon-pink">•</span>
          Software Developer
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md border border-neon-cyan/60 bg-neon-cyan/5 px-5 py-2.5 text-sm font-medium text-neon-cyan transition hover:bg-neon-cyan/10 hover:shadow-[0_0_24px_rgba(0,224,255,0.35)]"
          >
            View Projects
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-white/80 transition hover:border-neon-pink/60 hover:text-neon-pink"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
