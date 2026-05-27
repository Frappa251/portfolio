import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold text-neon-gradient">404</h1>
      <p className="mt-4 text-muted">This page drifted into the void.</p>
      <Link
        to="/"
        className="mt-8 rounded-md border border-border px-4 py-2 text-sm transition hover:border-neon-cyan hover:text-neon-cyan"
      >
        Back home
      </Link>
    </main>
  );
}
