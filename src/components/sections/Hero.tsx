import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ease, fadeUp } from "@/lib/motion";

/* ------------------------------------------------------------------ *
 *  Digital ENSŌ — zen circle redrawn in a glitch / data key           *
 * ------------------------------------------------------------------ */
function DigitalEnso() {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 600 600"
      className="aspect-square w-[84vw] max-w-[740px]"
      style={{ filter: "drop-shadow(0 0 6px rgba(168,85,247,0.30))", overflow: "visible", opacity: 0.5 }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, ease, delay: 0.1 }}
    >
      <defs>
        <linearGradient id="ensoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="45%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#e0218a" />
        </linearGradient>
      </defs>

      <motion.g
        style={{ originX: "50%", originY: "50%" }}
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 120, ease: "linear", repeat: Infinity }}
      >
        {/* main brush ring — near-complete enso, opening at lower-right */}
        <circle
          cx="300" cy="300" r="205"
          fill="none"
          stroke="url(#ensoGrad)"
          strokeWidth="6"
          strokeOpacity="0.7"
          strokeLinecap="round"
          strokeDasharray="1100 188"
          transform="rotate(128 300 300)"
        />
        {/* ink-load accent near the brush head */}
        <circle
          cx="300" cy="300" r="205"
          fill="none"
          stroke="#e0218a"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="64 1224"
          transform="rotate(112 300 300)"
          opacity="0.5"
        />
        {/* digital tick rings — segmented "data" outlines */}
        <circle cx="300" cy="300" r="262" fill="none" stroke="#a855f7" strokeWidth="2" strokeOpacity="0.32" strokeDasharray="2 16" />
        <circle cx="300" cy="300" r="158" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.35" strokeDasharray="1 26" />
      </motion.g>

      {/* katana-blade slashes (do not rotate) */}
      <polygon points="-138,0 0,-3 138,0 0,3" fill="#a855f7" opacity="0.7" transform="translate(150 168) rotate(-38)" />
      <polygon points="-92,0 0,-2.2 92,0 0,2.2" fill="#e0218a" opacity="0.6" transform="translate(120 252) rotate(-38)" />
      <polygon points="-118,0 0,-2.6 118,0 0,2.6" fill="#c084fc" opacity="0.55" transform="translate(470 432) rotate(-38)" />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ *
 *  Looping typewriter for the role line                               *
 * ------------------------------------------------------------------ */
const ROLES = [
  "Cybersecurity Engineer",
  "Linux Systems Developer",
  "Kernel & Low-Level Hacker",
  "CTF Player / Red Team",
];

type Phase = "typing" | "hold" | "deleting";

function Typewriter() {
  const reduce = useReducedMotion();
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    if (reduce) return;
    const full = ROLES[roleIdx];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (text.length < full.length) {
        t = setTimeout(() => setText(full.slice(0, text.length + 1)), 65);
      } else {
        t = setTimeout(() => setPhase("hold"), 1500);
      }
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("deleting"), 200);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(full.slice(0, text.length - 1)), 30);
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, roleIdx, reduce]);

  return (
    <span className="cursor font-mono text-neon-cyan glow-blue">
      {reduce ? ROLES[0] : text}
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden bg-ink font-display text-white">
      {/* ambient neon glows (corner reflections) */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-neon-blue/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-[-10rem] h-[40rem] w-[40rem] rounded-full bg-neon-violet/20 blur-[150px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-neon-magenta/10 blur-[160px]" />

      {/* giant background kanji (影 — shadow) */}
      <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center">
        <span className="font-jp text-[78vw] font-bold leading-none text-white/[0.04] sm:text-[60vw] lg:text-[44vw]">
          影
        </span>
      </div>

      {/* digital enso, centred behind the text */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <DigitalEnso />
      </div>

      {/* foreground content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        {/* name — stacked three-line lockup, per-word one-shot glitch */}
        <motion.h1
          variants={fadeUp} custom={0} initial="hidden" animate="show"
          className="glow-soft flex flex-col items-center font-display font-bold leading-[0.96] tracking-[0.11em]"
        >
          <span className="glitch block text-[2rem] sm:text-5xl lg:text-[4.25rem]" data-text="FRANCESCO">FRANCESCO</span>
          <span className="glitch block text-[2rem] sm:text-5xl lg:text-[4.25rem]" data-text="SAVERIO">SAVERIO</span>
          <span className="glitch block text-[2rem] sm:text-5xl lg:text-[4.25rem]" data-text="CIOETA">CIOETA</span>
        </motion.h1>

        {/* role typewriter — fixed height so the loop never shifts layout */}
        <motion.p
          variants={fadeUp} custom={1} initial="hidden" animate="show"
          className="mt-9 h-7 text-base tracking-wide sm:text-xl"
        >
          <span className="font-mono text-white/30">&gt;&nbsp;</span>
          <Typewriter />
        </motion.p>

        {/* description */}
        <motion.p
          variants={fadeUp} custom={2} initial="hidden" animate="show"
          className="mt-6 max-w-2xl text-pretty font-mono text-sm leading-relaxed text-white/55 sm:text-[15px]"
        >
          Studente di Ingegneria Informatica alla <span className="text-neon-violetlite/80">Sapienza</span>.
          Focus su ambienti Linux, cybersecurity e sviluppo software. Tra una root shell,
          test di sicurezza e architetture full-stack, scompongo e ricostruisco sistemi.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp} custom={3} initial="hidden" animate="show"
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            className="group relative overflow-hidden rounded-md border border-neon-violet/60 bg-neon-violet/10 px-7 py-3 font-mono text-sm tracking-wider text-neon-violetlite transition-all duration-300 hover:bg-neon-violet/20"
            style={{ boxShadow: "0 0 22px rgba(168,85,247,0.25), inset 0 0 14px rgba(168,85,247,0.10)" }}
          >
            <span className="glow-violet">./view_projects</span>
          </a>
          <a
            href="#contact"
            className="rounded-md border border-white/10 px-7 py-3 font-mono text-sm tracking-wider text-white/70 transition-all duration-300 hover:border-neon-cyan/50 hover:text-neon-cyan"
          >
            <span className="text-white/30">$</span> whoami --contact
          </a>
        </motion.div>
      </div>

      {/* scroll indicator: pulsing mouse with violet glow */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <motion.div
          className="flex h-10 w-6 justify-center rounded-full border border-neon-violet/60 pt-2"
          animate={reduce ? {} : {
            boxShadow: [
              "0 0 6px rgba(168,85,247,0.25)",
              "0 0 22px rgba(168,85,247,0.65)",
              "0 0 6px rgba(168,85,247,0.25)",
            ],
          }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        >
          <motion.span
            className="h-2 w-1 rounded-full bg-neon-violetlite"
            animate={reduce ? {} : { y: [0, 9, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon-violetlite/60">scroll</span>
      </motion.div>

      {/* texture overlays */}
      <div className="scanlines pointer-events-none absolute inset-0 z-20 opacity-60" />
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
      />
    </section>
  );
}
