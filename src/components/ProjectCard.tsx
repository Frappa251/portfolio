import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  index?: number;
};

export default function ProjectCard({ project, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-lg border border-border bg-surface/60 transition duration-300 hover:-translate-y-1 hover:border-neon-cyan/50 hover:shadow-[0_0_32px_-8px_rgba(0,224,255,0.4)]"
    >
      {/* Neon edge wash that lights up on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx,50%) var(--my,0%), rgba(0,224,255,0.08), transparent 40%)",
        }}
      />

      <Link
        to={`/project/${project.id}`}
        className="block p-6"
        aria-label={`Open ${project.title} project details`}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-neon-cyan">
            {project.title}
          </h3>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-cyan" />
        </div>

        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-white/70"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between text-xs text-muted">
          <span className="font-mono">{project.year}</span>
          {project.links?.repo && (
            <span className="inline-flex items-center gap-1.5">
              <Github className="h-3.5 w-3.5" />
              <span>Source</span>
            </span>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
