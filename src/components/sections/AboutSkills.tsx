import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileDown } from "lucide-react";
import CyberBackdrop from "@/components/CyberBackdrop";
import SectionHeading from "@/components/SectionHeading";
import { ease, staggerCard, staggerContainer } from "@/lib/motion";

/* ============ reusable double-layer clip frame (crisp neon border) ============ */
function Frame({
  clip = "clip-bevel-sm",
  hover = false,
  from = "from-neon-violet/45",
  to = "to-neon-blue/30",
  inner = "",
  style,
  children,
}: {
  clip?: string;
  hover?: boolean;
  from?: string;
  to?: string;
  inner?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div className={`hud ${hover ? "hud-hover" : ""} ${clip} bg-gradient-to-br ${from} ${to} p-px`} style={style}>
      <div className={`${clip} relative overflow-hidden bg-inkpanel ${inner}`}>{children}</div>
    </div>
  );
}

/* ====================== SLIDESHOW ====================== */
type Fragment = {
  id: string;
  tag: string;
  note: string;
  hue: [string, string];
  accent: string;
};

const FRAGMENTS: Fragment[] = [
  { id: "0xA1F4", tag: "~/recon/handshake.pcap", note: "signal intercepted", hue: ["#241a44", "#34245f"], accent: "#c084fc" },
  { id: "0xB7C2", tag: "~/exploit/heap_spray.c", note: "payload staged", hue: ["#142a4f", "#1d3a6e"], accent: "#60a5fa" },
  { id: "0xC39E", tag: "~/dump/firmware_v3.bin", note: "extraction complete", hue: ["#3a1230", "#581a46"], accent: "#f472b6" },
  { id: "0xD901", tag: "~/net/arp_poison.log", note: "session mirrored", hue: ["#0f2f3d", "#164055"], accent: "#38bdf8" },
];

const slideV = {
  enter: (d: number) => ({ x: d >= 0 ? 90 : -90, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d >= 0 ? -90 : 90, opacity: 0 }),
};

function FragmentSlide({ frag }: { frag: Fragment }) {
  const stripes = `repeating-linear-gradient(135deg, ${frag.hue[0]} 0 17px, ${frag.hue[1]} 17px 34px)`;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: stripes }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,6,12,.55) 100%)" }} />
      <div className="relative z-10 text-center">
        <div className="font-mono text-[11px] tracking-[0.35em] text-white/45">FRAGMENT {frag.id}</div>
        <div className="mt-2 font-display text-3xl font-bold tracking-[0.14em] glow-soft sm:text-5xl" style={{ color: frag.accent }}>
          MEMORY<br />FRAGMENT
        </div>
        <div className="mt-3 font-mono text-xs text-white/55">{frag.tag}</div>
      </div>
    </div>
  );
}

function ArrowBtn({ dir, side, onClick }: { dir: -1 | 1; side: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir < 0 ? "previous" : "next"}
      className={`arrow group absolute top-1/2 z-30 -translate-y-1/2 ${side}`}
    >
      <div className="clip-bevel-sm bg-gradient-to-br from-neon-cyan/60 to-neon-blue/50 p-px">
        <div className="clip-bevel-sm flex h-14 w-11 items-center justify-center bg-inkpanel/90 backdrop-blur-sm">
          <span className="font-display text-2xl font-bold text-neon-cyan glow-cyan">{dir < 0 ? "❮" : "❯"}</span>
        </div>
      </div>
    </button>
  );
}

function Corner({ pos }: { pos: string }) {
  return <span className={`pointer-events-none absolute h-5 w-5 border-neon-cyan/60 ${pos}`} />;
}

function Slideshow() {
  const [state, setState] = useState<[number, number]>([0, 0]); // [index, direction]
  const [paused, setPaused] = useState(false);
  const [i, dir] = state;
  const n = FRAGMENTS.length;
  const idx = ((i % n) + n) % n;
  const frag = FRAGMENTS[idx];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setState(([p]) => [p + 1, 1]), 5200);
    return () => clearInterval(t);
  }, [paused]);

  const go = (d: -1 | 1) => setState(([p]) => [p + d, d]);

  return (
    <div
      className="relative mx-auto w-full max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Frame
        clip="clip-mech"
        from="from-neon-violet/60"
        to="to-neon-blue/40"
        style={{ filter: "drop-shadow(0 0 18px rgba(168,85,247,.28)) drop-shadow(0 14px 30px rgba(59,130,246,.22))" }}
      >
        <div className="relative aspect-[16/9] w-full">
          {/* top status bar */}
          <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-7 pt-3 font-mono text-[10px] tracking-[0.3em] text-neon-cyan/70">
            <span>MEMORY_BANK // {String(idx + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}</span>
            <span className="text-white/35">{frag.note}</span>
          </div>

          {/* slides */}
          <AnimatePresence initial={false} custom={dir} mode="sync">
            <motion.div
              key={idx}
              custom={dir}
              variants={slideV}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { duration: 0.5, ease }, opacity: { duration: 0.35 } }}
              className="absolute inset-0"
            >
              <FragmentSlide frag={frag} />
            </motion.div>
          </AnimatePresence>

          {/* overlays */}
          <div className="scanlines pointer-events-none absolute inset-0 z-20 opacity-50" />
          <Corner pos="left-3 top-3 border-l-2 border-t-2" />
          <Corner pos="right-3 top-3 border-r-2 border-t-2" />
          <Corner pos="left-3 bottom-3 border-l-2 border-b-2" />
          <Corner pos="right-3 bottom-3 border-r-2 border-b-2" />

          {/* dots */}
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {FRAGMENTS.map((_, k) => (
              <button
                key={k}
                aria-label={`fragment ${k + 1}`}
                onClick={() => setState([k, k > idx ? 1 : -1])}
                className={`h-1.5 transition-all duration-300 ${k === idx ? "w-6 bg-neon-cyan" : "w-1.5 bg-white/25"}`}
                style={k === idx ? { boxShadow: "0 0 8px rgba(56,189,248,.8)" } : {}}
              />
            ))}
          </div>
        </div>
      </Frame>

      <ArrowBtn dir={-1} side="-left-3 sm:-left-7" onClick={() => go(-1)} />
      <ArrowBtn dir={1} side="-right-3 sm:-right-7" onClick={() => go(1)} />
    </div>
  );
}

/* ====================== MANIFESTO ====================== */
function Manifesto() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease }}
      className="relative mt-20"
    >
      <span className="absolute bottom-0 left-0 top-0 w-[3px] bg-neon-blue" style={{ boxShadow: "0 0 16px rgba(59,130,246,.85)" }} />
      <div className="pl-7 sm:pl-10">
        <div className="mb-5 flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-neon-cyan/80">
          <span className="text-white/40">$</span> cat ~/manifesto.txt
        </div>
        <p className="max-w-4xl text-pretty font-mono text-[15px] leading-[1.9] text-white/65 sm:text-base">
          Ingegneria informatica di giorno,{" "}
          <span className="text-neon-violetlite glow-soft">shell e reverse engineering</span> di notte.
          Il mio approccio non è semplicemente costruire codice, ma{" "}
          <span className="text-white/90">smontare, rompere i sistemi</span> e analizzarne le{" "}
          <span className="text-neon-cyan/90">vulnerabilità</span> per capire esattamente come funzionano
          dall&apos;interno. Dai protocolli di rete alle architetture full-stack, considero ogni riga di codice
          come un potenziale punto di accesso o una barriera da rinforzare. Non c&apos;è sicurezza senza{" "}
          <span className="text-neon-violetlite glow-soft">destrutturazione</span>.
        </p>
        <code className="mt-7 block font-mono text-[13px] text-neon-cyan/75">
          <span className="text-white/35">while</span>(<span className="text-neon-violetlite">true</span>) {"{ "}
          break(); <span className="text-white/35">understand</span>(); rebuild();{" }"}
          <span className="cursor" />
        </code>
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2.5 font-mono text-[13px] tracking-[0.18em] text-neon-violetlite/80 transition-colors duration-300 hover:text-neon-cyan"
        >
          <FileDown className="h-4 w-4" />
          <span className="text-white/35">$</span> open ~/cv.pdf
        </a>
      </div>
    </motion.div>
  );
}

/* ====================== SKILL NODES (decrypt on hover) ====================== */
const GLYPHS = "ｱｶｻﾀﾅﾊﾐﾗﾈ01<>/#$%&*=+█▚";

function scrambleStr(t: string) {
  let s = "";
  for (let k = 0; k < t.length; k++) s += t[k] === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  return s;
}

function Scramble({ text, active, order }: { text: string; active: boolean; order: number }) {
  const [disp, setDisp] = useState(() => scrambleStr(text));

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    let startTimer: ReturnType<typeof setTimeout> | undefined;
    if (active) {
      let tick = 0;
      startTimer = setTimeout(() => {
        interval = setInterval(() => {
          tick++;
          const reveal = Math.floor(tick / 1.5);
          let s = "";
          for (let k = 0; k < text.length; k++) {
            if (text[k] === " ") s += " ";
            else if (k < reveal) s += text[k];
            else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          setDisp(s);
          if (reveal >= text.length) {
            clearInterval(interval);
            setDisp(text);
          }
        }, 28);
      }, order * 85);
    } else {
      setDisp(scrambleStr(text));
    }
    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, [active, text, order]);

  return <span>{disp}</span>;
}

type Node = {
  shape: string;
  index: string;
  title: string;
  from: string;
  to: string;
  dot: string;
  items: string[];
};

const NODES: Node[] = [
  { shape: "node-1", index: "0x01", title: "SYSTEM & SEC", from: "from-neon-violet/55", to: "to-neon-blue/35", dot: "bg-neon-violet",
    items: ["Linux", "Fedora", "WSL", "Kali", "eJPT", "OSCP path"] },
  { shape: "node-2", index: "0x02", title: "DEV STACK", from: "from-neon-blue/55", to: "to-neon-violet/35", dot: "bg-neon-cyan",
    items: ["Python", "C", "HTML", "CSS", "JavaScript", "React", "PHP", "SQL", "Flutter", "Firebase"] },
  { shape: "node-3", index: "0x03", title: "HARDWARE", from: "from-neon-violet/55", to: "to-neon-cyan/35", dot: "bg-neon-magenta",
    items: ["DIY Engineering", "IoT", "Custom Setup"] },
];

function SkillNode({ node }: { node: Node }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      variants={staggerCard}
      className="node-grp h-full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Frame clip={node.shape} hover from={node.from} to={node.to} inner="flex h-full min-h-[400px] flex-col px-8 py-10">
        {/* sweeping scan line on hover */}
        <span className="scanbar pointer-events-none absolute left-0 right-0 z-0 h-px" style={{ background: "linear-gradient(90deg,transparent,#38bdf8,transparent)" }} />

        <div className="relative z-10 flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-[0.3em] text-neon-cyan/70">NODE_{node.index}</span>
          <span className={`h-2 w-2 rotate-45 ${node.dot}`} style={{ boxShadow: "0 0 8px currentColor" }} />
        </div>

        <h3 className="relative z-10 mt-3 font-display text-xl font-bold tracking-[0.1em] text-white glow-soft">
          {node.title}
        </h3>

        <div className="relative z-10 mb-4 mt-4 font-mono text-[11px] tracking-[0.15em]">
          <span className="text-neon-cyan/70">&gt;&nbsp;</span>
          <span className={hover ? "text-neon-cyan/90" : "text-white/35"}>
            {hover ? "decrypting node…" : "[ encrypted // hover to decrypt ]"}
          </span>
        </div>

        <div className="relative z-10 flex flex-col gap-2.5">
          {node.items.map((it, k) => (
            <div key={it} className="flex items-baseline gap-2.5 font-mono text-[13px]">
              <span className="tabular-nums text-neon-violetlite/45">{(k * 7 + 16).toString(16).toUpperCase().padStart(2, "0")}</span>
              <span className={hover ? "text-neon-cyan/60" : "text-white/20"}>▸</span>
              <span className={hover ? "text-white/90" : "text-white/35"}>
                <Scramble text={it} active={hover} order={k} />
              </span>
            </div>
          ))}
        </div>

        <div className="relative z-10 mt-auto pt-6 font-mono text-[10px] tracking-[0.2em] text-white/25">
          // {node.items.length} entries · {hover ? "ACCESS GRANTED" : "READ-ONLY"}
        </div>
      </Frame>
    </motion.div>
  );
}

/* ====================== SECTION ====================== */
export default function AboutSkills() {
  return (
    <section id="about" className="cyber-bg relative min-h-screen w-full overflow-hidden font-display text-white">
      <CyberBackdrop />
      <div className="pointer-events-none absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-neon-blue/12 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[38rem] w-[38rem] rounded-full bg-neon-violet/12 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 lg:px-10">
        <SectionHeading kicker="02 — ARCHIVE.SYS" />

        {/* slideshow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
        >
          <Slideshow />
        </motion.div>

        <Manifesto />

        {/* skill matrix */}
        <motion.div
          className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {NODES.map((node) => (
            <SkillNode key={node.title} node={node} />
          ))}
        </motion.div>
      </div>

      <div className="scanlines pointer-events-none absolute inset-0 z-20 opacity-40" />
      <div className="pointer-events-none absolute inset-0 z-20" style={{ background: "radial-gradient(ellipse at center, transparent 62%, rgba(0,0,0,0.5) 100%)" }} />
    </section>
  );
}
