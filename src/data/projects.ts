export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  cover?: string;
  images?: string[];
  links?: {
    repo?: string;
    demo?: string;
  };
  year: number;
};

export const projects: Project[] = [
  {
    id: "infostudio-54",
    title: "InfoStudio-54",
    summary:
      "Full-stack club management software with a robust PHP/MariaDB backend.",
    description:
      "A complete club management system designed to handle members, events, bookings, and administrative workflows from a single dashboard. The backend is built in PHP on top of a MariaDB schema engineered for relational integrity and fast reporting, while the frontend prioritises clarity for non-technical operators. The project covers the full development lifecycle: requirements analysis, schema design, server-side logic, role-based access control, and deployment.",
    tech: ["PHP", "MariaDB", "JavaScript", "HTML", "CSS"],
    links: {
      repo: "https://github.com/Frappa251/InfoStudio-54",
    },
    year: 2025,
  },
  {
    id: "text-webscraper",
    title: "Text_WebScraper",
    summary:
      "Python utility that extracts, cleans, and exports structured text from web pages.",
    description:
      "A scraping toolkit focused on producing analysis-ready text from arbitrary URLs. It handles request throttling, encoding detection, and DOM-based content extraction, then normalises whitespace, removes boilerplate, and writes the result to plain text or JSON. Useful as a building block for NLP pipelines, dataset collection, or quick research dumps.",
    tech: ["Python", "BeautifulSoup", "Requests"],
    links: {
      repo: "https://github.com/Frappa251/Text_WebScraper",
    },
    year: 2024,
  },
  {
    id: "turni-fly",
    title: "Turni-Fly",
    summary: "Shift planning app for distributed teams with conflict detection.",
    description:
      "A scheduling tool that lets managers draft, publish, and rotate work shifts across multiple teams while automatically flagging overlaps, missing coverage, and rest-period violations. The data model is designed around recurring patterns so common rotations can be applied with a single action, and individual employees can view a personal calendar of upcoming assignments.",
    tech: ["TypeScript", "React", "Node.js"],
    links: {
      repo: "https://github.com/Frappa251/Turni-Fly",
    },
    year: 2024,
  },
  {
    id: "emergency-app",
    title: "Emergency-App",
    summary:
      "Mobile-first app for surfacing emergency contacts and procedures in seconds.",
    description:
      "A lightweight application built to put critical information one tap away during an emergency: local emergency numbers, geolocated services, step-by-step first-aid protocols, and a quick-share screen for transmitting your position to a trusted contact. Designed to remain usable on weak connections and degraded device states.",
    tech: ["JavaScript", "React", "Geolocation API"],
    links: {
      repo: "https://github.com/Frappa251/Emergency-App",
    },
    year: 2024,
  },
  {
    id: "hackupc",
    title: "HackUPC",
    summary:
      "Hackathon entry built at HackUPC in Barcelona under a 36-hour deadline.",
    description:
      "Project developed during HackUPC, an international student hackathon hosted at the Universitat Politècnica de Catalunya. Built end-to-end with a small team under heavy time pressure, the work covers ideation, rapid prototyping, integration of third-party APIs, and a live demo presented to the judging panel.",
    tech: ["TypeScript", "React", "Node.js"],
    links: {
      repo: "https://github.com/Frappa251/HackUPC",
    },
    year: 2024,
  },
  {
    id: "orbitss",
    title: "ORBITSS",
    summary:
      "Orbital tracking and visualisation system for low-Earth satellites.",
    description:
      "A system for ingesting two-line element sets, propagating satellite trajectories, and visualising the resulting orbits over time. The pipeline separates data ingestion, orbital mechanics, and rendering into independent modules so each can be tested and swapped independently, with an eye toward integration with public TLE feeds.",
    tech: ["Python", "TypeScript", "WebGL"],
    links: {
      repo: "https://github.com/Frappa251/ORBITSS",
    },
    year: 2025,
  },
];

export const getProjectById = (id: string) =>
  projects.find((p) => p.id === id);
