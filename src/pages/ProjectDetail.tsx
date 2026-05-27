import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
} from "lucide-react";
import { projects } from "@/data/projects";

export default function ProjectDetail() {
  const { id } = useParams();
  const index = projects.findIndex((p) => p.id === id);
  const project = index >= 0 ? projects[index] : undefined;

  // Reset scroll when navigating between projects
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  if (!project) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-sm text-neon-pink">// 404</p>
        <h1 className="mt-2 text-4xl font-bold">Project not found</h1>
        <p className="mt-3 text-muted">
          The project <span className="font-mono">{id}</span> doesn't exist (or
          isn't here yet).
        </p>
        <Link
          to="/#projects"
          className="mt-8 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm transition hover:border-neon-cyan hover:text-neon-cyan"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>
      </main>
    );
  }

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <Link
        to="/#projects"
        className="inline-flex items-center gap-2 font-mono text-xs text-muted transition hover:text-neon-cyan"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        back to projects
      </Link>

      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8"
      >
        <p className="font-mono text-xs tracking-widest text-neon-cyan">
          // {project.year} · project
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
          <span className="text-neon-gradient">{project.title}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted md:text-xl">
          {project.summary}
        </p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded border border-border bg-surface px-2.5 py-1 font-mono text-xs text-white/80"
            >
              {t}
            </li>
          ))}
        </ul>

        {(project.links?.repo || project.links?.demo) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-neon-cyan/60 bg-neon-cyan/5 px-4 py-2 text-sm font-medium text-neon-cyan transition hover:bg-neon-cyan/10 hover:shadow-[0_0_24px_rgba(0,224,255,0.35)]"
              >
                <Github className="h-4 w-4" />
                Source
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-white/85 transition hover:border-neon-pink/60 hover:text-neon-pink"
              >
                <ExternalLink className="h-4 w-4" />
                Live demo
              </a>
            )}
          </div>
        )}
      </motion.header>

      {project.cover && (
        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 overflow-hidden rounded-lg border border-border"
        >
          <img
            src={project.cover}
            alt={`${project.title} cover`}
            className="h-auto w-full"
            loading="lazy"
          />
        </motion.figure>
      )}

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 space-y-5 text-base leading-relaxed text-white/85 md:text-lg"
      >
        {project.description.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </motion.section>

      {project.images && project.images.length > 0 && (
        <section className="mt-12 grid gap-4 sm:grid-cols-2">
          {project.images.map((src) => (
            <figure
              key={src}
              className="overflow-hidden rounded-lg border border-border"
            >
              <img
                src={src}
                alt={`${project.title} screenshot`}
                className="h-auto w-full"
                loading="lazy"
              />
            </figure>
          ))}
        </section>
      )}

      <nav
        aria-label="Project navigation"
        className="mt-20 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
      >
        <Link
          to={`/project/${prev.id}`}
          className="group flex flex-col gap-1 rounded-lg border border-border bg-surface/60 p-5 transition hover:-translate-y-0.5 hover:border-neon-cyan/50"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
            <ArrowLeft className="h-3 w-3" />
            previous
          </span>
          <span className="text-base font-semibold text-white transition-colors group-hover:text-neon-cyan">
            {prev.title}
          </span>
        </Link>

        <Link
          to={`/project/${next.id}`}
          className="group flex flex-col items-end gap-1 rounded-lg border border-border bg-surface/60 p-5 text-right transition hover:-translate-y-0.5 hover:border-neon-pink/50"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
            next
            <ArrowRight className="h-3 w-3" />
          </span>
          <span className="text-base font-semibold text-white transition-colors group-hover:text-neon-pink">
            {next.title}
          </span>
        </Link>
      </nav>
    </main>
  );
}
