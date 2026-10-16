import { Link } from "@tanstack/react-router";
import { connectiveApp, featuredClients, featuredVenture } from "@/data/site";

const workLinks = [
  { slug: featuredVenture.slug, name: featuredVenture.name },
  { slug: "connective-fitness", name: connectiveApp.name },
  ...featuredClients.map((c) => ({ slug: c.slug, name: c.name })),
];

/** Plain text links to every work page (crawlable, no extra visuals). */
export function WorkNav({ current, label = "More work" }: { current?: string; label?: string }) {
  const items = workLinks.filter((w) => w.slug !== current);
  return (
    <nav aria-label={label} className="mt-12 border-t border-border pt-6">
      <p className="kicker">{label}</p>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {items.map((w) => (
          <li key={w.slug}>
            <Link to="/work/$slug" params={{ slug: w.slug }} className="text-fg no-underline hover:text-muted">
              {w.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
