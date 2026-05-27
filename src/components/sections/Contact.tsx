import { motion } from "framer-motion";
import { Github, Mail, Send } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const channels = [
  {
    label: "GitHub",
    handle: "@Frappa251",
    href: "https://github.com/Frappa251",
    Icon: Github,
    accent: "cyan" as const,
  },
  {
    label: "Email",
    handle: "francescosaverio2004@gmail.com",
    href: "mailto:francescosaverio2004@gmail.com",
    Icon: Mail,
    accent: "pink" as const,
  },
  {
    label: "Telegram",
    handle: "@Frappa_251",
    href: "https://t.me/Frappa_251",
    Icon: Send,
    accent: "cyan" as const,
  },
];

const accentClasses = {
  cyan: "hover:border-neon-cyan/50 hover:text-neon-cyan hover:shadow-[0_0_24px_-6px_rgba(0,224,255,0.45)]",
  pink: "hover:border-neon-pink/50 hover:text-neon-pink hover:shadow-[0_0_24px_-6px_rgba(255,47,208,0.45)]",
};

const iconAccent = {
  cyan: "text-neon-cyan",
  pink: "text-neon-pink",
};

export default function Contact() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          eyebrow="// contact"
          title="Let's build something."
          description="Open to collaborations on security research, full-stack projects, and student initiatives. The fastest way to reach me is below."
        />

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-4 md:grid-cols-3"
        >
          {channels.map(({ label, handle, href, Icon, accent }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`group flex items-center gap-4 rounded-lg border border-border bg-surface/60 p-5 text-white/85 transition duration-300 hover:-translate-y-0.5 ${accentClasses[accent]}`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-border bg-bg">
                  <Icon className={`h-4 w-4 ${iconAccent[accent]}`} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-widest text-muted">
                    {label}
                  </span>
                  <span className="block truncate font-mono text-sm">
                    {handle}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
