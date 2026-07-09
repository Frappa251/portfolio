import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code, Crosshair, ExternalLink, FileSearch } from "lucide-react";
import { ease } from "@/lib/motion";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  index: number;
};

/* Visual identity cycled per card so consecutive dossiers alternate accents */
const ACCENTS = [
  { hex: "#a855f7", from: "from-neon-violet/55", to: "to-neon-blue/35" },
  { hex: "#38bdf8", from: "from-neon-blue/55", to: "to-neon-violet/35" },
  { hex: "#e0218a", from: "from-neon-magenta/55", to: "to-neon-violet/35" },
];

const BARCODE = [3, 7, 2, 9, 4, 6, 2, 8, 3, 5, 7, 2, 9, 3, 6, 4, 8, 2, 5, 7];

/** Deterministic faux hex serial derived from the project id */
function serialOf(id: string) {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) & 0xfff;
  return `0x${h.toString(16).toUpperCase().padStart(3, "0")}`;
}

function HoloBtn({
  href,
  to,
  icon,
  label,
  code,
  accent,
}: {
  href?: string;
  to?: string;
  icon: ReactNode;
  label: string;
  code: string;
  accent: string;
}) {
  const inner = (
    <span
      className="holo-clip flex items-center gap-2.5 bg-inkpanel px-4 py-2.5 font-mono text-[12px] tracking-[0.18em] text-white/55 transition-colors duration-300 group-hover/btn:text-neon-violetlite"
      style={{ "--acc": accent } as CSSProperties}
    >
      <span className="text-white/35 transition-colors duration-300 group-hover/btn:text-neon-violetlite">
        {icon}
      </span>
      <span>{label}</span>
      <span className="ml-1 text-[10px] text-white/20 transition-colors duration-300 group-hover/btn:text-neon-cyan/70">
        {code}
      </span>
    </span>
  );
  const cls = "holo holo-clip group/btn block bg-gradient-to-br from-white/15 to-white/[0.04] p-px";

  return to ? (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  );
}

function TechTag({ t, accent }: { t: string; accent: string }) {
  return (
    <span
      className="clip-bevel-sm border px-2.5 py-1 font-mono text-[11px] tracking-[0.12em] text-white/70"
      style={{ borderColor: accent + "55", backgroundColor: accent + "12" }}
    >
      {t}
    </span>
  );
}

export default function ProjectCard({ project, index }: Props) {
  const accent = ACCENTS[index % ACCENTS.length];
  const clip = index % 2 === 0 ? "clip-dossier-a" : "clip-dossier-b";
  const align = index % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto";
  const num = String(index + 1).padStart(2, "0");
  const serial = serialOf(project.id);
  const excerpt = project.description.split("\n\n")[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease, delay: 0.05 }}
      className={`dossier-grp w-full lg:w-[94%] ${align}`}
    >
      <div className={`dossier ${clip} bg-gradient-to-br ${accent.from} ${accent.to} p-px`}>
        <div className={`${clip} relative overflow-hidden bg-inkpanel/95`}>
          {/* hover scan sweep */}
          <span
            className="scanbar pointer-events-none absolute left-0 right-0 z-0 h-px"
            style={{ background: `linear-gradient(90deg,transparent,${accent.hex},transparent)` }}
          />

          {/* corner reticles */}
          <span className="reticle pointer-events-none absolute left-2.5 top-2.5 z-20"><Crosshair className="h-3.5 w-3.5" /></span>
          <span className="reticle pointer-events-none absolute right-2.5 top-2.5 z-20"><Crosshair className="h-3.5 w-3.5" /></span>
          <span className="reticle pointer-events-none absolute bottom-2.5 left-2.5 z-20"><Crosshair className="h-3.5 w-3.5" /></span>
          <span className="reticle pointer-events-none absolute bottom-2.5 right-2.5 z-20"><Crosshair className="h-3.5 w-3.5" /></span>

          {/* header strip */}
          <div className="relative z-10 flex items-center gap-3 border-b border-white/10 px-6 py-3 font-mono text-[10px] tracking-[0.28em] sm:px-9">
            <span className="text-neon-cyan/70">DOSSIER_{num}</span>
            <span className="text-white/25">//</span>
            <span className="text-neon-violetlite/75">[ID: {serial}]</span>
            <span className="hidden flex-1 border-t border-dashed border-white/15 sm:block" />
            <span className="ml-auto flex items-center gap-2 sm:ml-0">
              <span
                className="blink h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: accent.hex, boxShadow: `0 0 8px ${accent.hex}` }}
              />
              <span className="text-white/45">{index % 2 === 0 ? "CLASSIFIED" : "DECRYPTED"}</span>
            </span>
          </div>

          {/* body */}
          <div className="relative z-10 grid grid-cols-1 gap-y-8 px-6 py-8 sm:px-9 sm:py-10 lg:grid-cols-[1fr_236px] lg:gap-x-10">
            <div className="min-w-0">
              <div className="flex items-start gap-4">
                <span className="select-none font-display text-4xl font-bold leading-none text-white/10 sm:text-5xl">
                  {num}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-2xl font-bold tracking-[0.06em] text-white glow-soft sm:text-3xl">
                    {project.title}
                  </h3>
                  <div
                    className="mt-1.5 font-mono text-[12px] tracking-[0.14em]"
                    style={{ color: accent.hex }}
                  >
                    {project.summary}
                  </div>
                </div>
              </div>

              <p className="mt-6 max-w-xl text-pretty font-mono text-[13.5px] leading-[1.85] text-white/55">
                {excerpt}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {project.links?.repo && (
                  <HoloBtn
                    href={project.links.repo}
                    icon={<Code className="h-4 w-4" />}
                    label="REPOSITORY"
                    code="git"
                    accent={accent.hex}
                  />
                )}
                {project.links?.demo && (
                  <HoloBtn
                    href={project.links.demo}
                    icon={<ExternalLink className="h-4 w-4" />}
                    label="LIVE_DEMO"
                    code="exec"
                    accent={accent.hex}
                  />
                )}
                <HoloBtn
                  to={`/project/${project.id}`}
                  icon={<FileSearch className="h-4 w-4" />}
                  label="FULL_RECORD"
                  code="read"
                  accent={accent.hex}
                />
              </div>
            </div>

            {/* spec sidebar */}
            <aside className="relative font-mono text-[11px] leading-relaxed lg:border-l lg:border-white/10 lg:pl-9">
              <div className="mb-4 tracking-[0.25em] text-white/30">// SPECIFICATION</div>

              <div className="space-y-3">
                <div>
                  <div className="tracking-[0.2em] text-white/30">YEAR</div>
                  <div className="mt-0.5 text-white/70">{project.year}</div>
                </div>
                <div>
                  <div className="tracking-[0.2em] text-white/30">STACK</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <TechTag key={t} t={t} accent={accent.hex} />
                    ))}
                  </div>
                </div>
              </div>

              {/* faux barcode / serial readout */}
              <div className="mt-6 flex h-5 items-end gap-[2px] opacity-50">
                {BARCODE.map((h, k) => (
                  <span key={k} className="w-[2px] bg-neon-cyan/60" style={{ height: `${h * 2 + 2}px` }} />
                ))}
              </div>
              <div className="mt-2 tracking-[0.2em] text-white/25">
                REF::{serial}-{num}-FSC
              </div>
            </aside>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
