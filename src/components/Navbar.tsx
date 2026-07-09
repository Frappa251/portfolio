import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: a thin band around the viewport centre decides the active
  // section, so exactly one link lights up at a time while scrolling.
  useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      return;
    }
    const ids = links.map((l) => l.href.slice(1));
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set((e.target as HTMLElement).id, e.isIntersecting);
        setActive(ids.find((id) => visible.get(id)) ?? null);
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [pathname]);

  // Anchor links only behave correctly while on the home route — when on a
  // detail page we route home first and let the browser jump to the anchor.
  const hrefFor = (h: string) => (pathname === "/" ? h : `/${h}`);

  return (
    <header
      className={`sticky top-0 z-50 glass transition-shadow ${
        scrolled ? "shadow-[0_1px_0_0_rgba(56,189,248,0.15)]" : ""
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <Link
          to="/"
          className="font-mono text-sm tracking-[0.2em] text-neon-gradient"
        >
          FSC.
        </Link>

        <ul className="flex items-center gap-8 text-sm text-muted">
          {links.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={hrefFor(l.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative transition-colors hover:text-neon-cyan focus-visible:text-neon-cyan ${
                    isActive ? "text-neon-cyan glow-cyan" : ""
                  }`}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-neon-cyan shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
