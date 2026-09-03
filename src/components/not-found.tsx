import { Link } from "@tanstack/react-router";

export function NotFoundPage() {
  return (
    <main id="main" className="page-wrap py-24 md:py-32">
      <p className="kicker">404</p>
      <h1 className="display mt-3 max-w-xl text-4xl text-fg md:text-6xl">That page isn’t here.</h1>
      <p className="mt-5 max-w-md text-muted">
        The URL may have moved. Home, work, and about are still in the usual places.
      </p>
      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link to="/" className="text-fg hover:text-muted">
          Home
        </Link>
        <Link to="/work" className="text-fg hover:text-muted">
          Work
        </Link>
        <Link to="/about" className="text-fg hover:text-muted">
          About
        </Link>
        <Link to="/contact" className="text-fg hover:text-muted">
          Contact
        </Link>
      </div>
    </main>
  );
}
