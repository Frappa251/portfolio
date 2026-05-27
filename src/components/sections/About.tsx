import { motion } from "framer-motion";
import { FileDown, Terminal, Server, Shield, Award } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const highlights = [
  {
    icon: Terminal,
    title: "Linux & terminal-first workflows",
    body: "Daily driver on Fedora and Arch. I'm at home in the shell — tiling window managers, scripted environments, and reproducible dotfiles.",
  },
  {
    icon: Server,
    title: "Home lab & networking",
    body: "Hands-on experience building home lab servers, configuring complex networks, virtualisation stacks, and self-hosted services.",
  },
  {
    icon: Shield,
    title: "Offensive security training",
    body: "Active on Hack The Box and TryHackMe — pivoting between web, network, and binary exploitation challenges to keep skills sharp.",
  },
  {
    icon: Award,
    title: "Roadmap to OSCP & eJPT",
    body: "Studying toward advanced offensive certifications (eJPT, then OSCP) as the next concrete milestones on my cybersecurity track.",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="// about"
        title="Engineer by training, hacker by curiosity."
      />

      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-5 text-base leading-relaxed text-white/80 md:text-lg"
        >
          <p>
            I'm a Computer Engineering student at Sapienza University of Rome,
            currently in my third year. My focus sits at the intersection of{" "}
            <span className="text-neon-cyan">cybersecurity</span> and{" "}
            <span className="text-neon-pink">full-stack development</span> — I
            like building things and I like understanding how to break them.
          </p>
          <p>
            Outside the classroom I run a home lab where I prototype services,
            harden networks, and experiment with infrastructure I'd actually
            want to defend. Most of the work happens on Linux — Fedora and Arch
            are my daily drivers — inside terminal-based workflows that I trust
            more than any IDE.
          </p>
          <p>
            On the offensive side I train regularly on{" "}
            <span className="text-white">Hack The Box</span> and{" "}
            <span className="text-white">TryHackMe</span>, working through web,
            network, and binary challenges. The next concrete milestones on my
            roadmap are the{" "}
            <span className="text-neon-cyan">eJPT</span> and, after that, the{" "}
            <span className="text-neon-cyan">OSCP</span>.
          </p>

          <div className="pt-4">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md border border-neon-cyan/60 bg-neon-cyan/5 px-5 py-2.5 text-sm font-medium text-neon-cyan transition hover:bg-neon-cyan/10 hover:shadow-[0_0_24px_rgba(0,224,255,0.35)]"
            >
              <FileDown className="h-4 w-4" />
              See my CV
            </a>
          </div>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
        >
          {highlights.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="rounded-lg border border-border bg-surface/60 p-5 transition hover:border-neon-cyan/40"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-md border border-border bg-bg text-neon-cyan">
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
