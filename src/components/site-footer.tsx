import { Link } from "@tanstack/react-router";
import { site } from "@/data/site";
import { Wordmark } from "@/components/wordmark";

const links = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="page-wrap py-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Wordmark />
            <p className="mt-3 text-sm text-muted">Founder of Orilo</p>
          </div>
          <nav className="flex flex-col gap-3 text-sm text-muted">
            {links.map((link) => (
              <Link key={link.label} to={link.to} className="hover:text-fg">
                {link.label}
              </Link>
            ))}
          </nav>
          <ul className="flex flex-col gap-3 text-sm text-muted">
            {site.socials.map((s) => (
              <li key={s.id}>
                <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-fg">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10 border-t border-border pt-6 text-sm text-muted">
          © {new Date().getFullYear()} {site.fullName} · {site.location} ·{" "}
          <a href={`mailto:${site.email}`} className="text-fg hover:text-muted">
            {site.email}
          </a>
          {" · "}
          <a href={`tel:${site.agent.phone}`} className="text-fg hover:text-muted">
            Sara {site.agent.display}
          </a>
        </p>
      </div>
    </footer>
  );
}
