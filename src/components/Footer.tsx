import { Github, Mail, Send } from "lucide-react";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Frappa251",
    Icon: Github,
  },
  {
    label: "Email",
    href: "mailto:francescosaverio2004@gmail.com",
    Icon: Mail,
  },
  {
    label: "Telegram",
    href: "https://t.me/Frappa_251",
    Icon: Send,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-elev/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="font-mono text-xs text-muted">
          © {year} Francesco Saverio Cioeta. Built with React, Vite &amp;
          Tailwind.
        </p>

        <ul className="flex items-center gap-2">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted transition hover:border-neon-cyan/60 hover:text-neon-cyan"
              >
                <Icon className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
