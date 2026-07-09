import { useId } from "react";

/**
 * Full-bleed SVG backdrop: dot matrix + fine/major cyber grid that dissolves
 * toward the edges. Pattern ids are namespaced with useId so multiple
 * sections can mount it on the same page without SVG id collisions.
 */
export default function CyberBackdrop() {
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `${name}-${uid}`;
  const url = (name: string) => `url(#${id(name)})`;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 select-none"
      aria-hidden="true"
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={id("dots")} width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#a855f7" fillOpacity="0.13" />
          </pattern>
          <pattern id={id("fine")} width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M56 0H0V56" fill="none" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.05" />
          </pattern>
          <pattern id={id("major")} width="168" height="168" patternUnits="userSpaceOnUse">
            <path d="M168 0H0V168" fill="none" stroke="#a855f7" strokeWidth="1.1" strokeOpacity="0.07" />
            <circle cx="0" cy="0" r="1.6" fill="#38bdf8" fillOpacity="0.18" />
            <circle cx="168" cy="0" r="1.6" fill="#38bdf8" fillOpacity="0.18" />
            <circle cx="0" cy="168" r="1.6" fill="#38bdf8" fillOpacity="0.18" />
          </pattern>
          <radialGradient id={id("fade")} cx="50%" cy="40%" r="80%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="60%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.06" />
          </radialGradient>
          <mask id={id("mask")}>
            <rect width="100%" height="100%" fill={url("fade")} />
          </mask>
        </defs>
        <g mask={url("mask")}>
          <rect width="100%" height="100%" fill={url("dots")} />
          <rect width="100%" height="100%" fill={url("fine")} />
          <rect width="100%" height="100%" fill={url("major")} />
        </g>
      </svg>
    </div>
  );
}
