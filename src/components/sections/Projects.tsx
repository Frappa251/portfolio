import CyberBackdrop from "@/components/CyberBackdrop";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="cyber-bg relative w-full overflow-hidden font-display text-white">
      <CyberBackdrop />
      {/* ambient neon glows — match section 02 */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-neon-violet/12 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[38rem] w-[38rem] rounded-full bg-neon-blue/12 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 lg:px-10">
        <SectionHeading
          kicker="03 — DOSSIER.SYS"
          title={
            <>
              DECRYPTED <span className="text-neon-violetlite">RECORDS</span>
            </>
          }
          command={
            <>
              ls -la ~/operations/{" "}
              <span className="text-white/40">— {projects.length} dossier recuperati</span>
            </>
          }
        />

        <div className="flex flex-col gap-12">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>

      {/* texture overlays */}
      <div className="crt-fine pointer-events-none absolute inset-0 z-20" />
      <div className="scanlines pointer-events-none absolute inset-0 z-20 opacity-30" />
      <div className="pointer-events-none absolute inset-0 z-20" style={{ background: "radial-gradient(ellipse at center, transparent 62%, rgba(0,0,0,0.5) 100%)" }} />
    </section>
  );
}
