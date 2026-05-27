import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="border-t border-border bg-bg-elev/30"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          eyebrow="// projects"
          title="Selected work."
          description="A mix of full-stack systems, security-flavoured tools, and hackathon builds. Click any card for the full write-up."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
