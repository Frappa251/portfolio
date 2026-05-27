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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Anchor links only behave correctly while on the home route — when on a
  // detail page we route home first and let the browser jump to the anchor.
  const hrefFor = (h: string) => (pathname === "/" ? h : `/${h}`);

  return (
    <header
      className={`sticky top-0 z-50 glass transition-shadow ${
        scrolled ? "shadow-[0_1px_0_0_rgba(0,224,255,0.15)]" : ""
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
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={hrefFor(l.href)}
                className="relative transition-colors hover:text-neon-cyan focus-visible:text-neon-cyan"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
