import { Link } from "@tanstack/react-router";
import { CopyEmail } from "@/components/copy-email";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";

const links = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="page-wrap flex h-14 items-center justify-between gap-4">
        <Wordmark />
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {links.map((link) => (
            <Link key={link.label} to={link.to} className="hover:text-fg">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <CopyEmail className="hidden sm:inline-flex" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
