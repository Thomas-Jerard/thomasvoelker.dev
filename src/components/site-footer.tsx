import { site } from "@/data/site";
import { Wordmark } from "@/components/wordmark";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="page-wrap flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Wordmark />
        <p className="text-sm text-muted">
          {site.location} ·{" "}
          <a href={`mailto:${site.email}`} className="text-fg hover:text-muted">
            {site.email}
          </a>
        </p>
        <ul className="flex gap-4 text-sm text-muted">
          {site.socials.map((s) => (
            <li key={s.id}>
              <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-fg">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
