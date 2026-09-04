import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { connectiveApp, featuredClients, featuredVenture } from "@/data/site";
import { breadcrumbJsonLd, pageHead, pages, webPageJsonLd, workListJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/work/")({
  component: WorkIndex,
  head: () => pageHead(pages.work),
});

function WorkIndex() {
  return (
    <main id="main" className="page-wrap py-16 md:py-24">
      <JsonLd data={webPageJsonLd(pages.work.path, pages.work.title, pages.work.description, "CollectionPage")} />
      <JsonLd data={workListJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <SectionHeading
        index="Work"
        label="Selected"
        title="The company, the studio’s clients, and the product in progress."
      />
      <ul className="mt-12 grid gap-10 md:grid-cols-2">
        <li>
          <Link to="/work/$slug" params={{ slug: featuredVenture.slug }} className="group block no-underline">
            <div className="project-shot shot-wide">
              <img src={featuredVenture.image} alt="Orilo website" />
            </div>
            <p className="kicker mt-4">Venture</p>
            <p className="mt-2 text-2xl text-fg">{featuredVenture.name}</p>
            <p className="mt-1 text-sm text-muted">{featuredVenture.blurb}</p>
          </Link>
        </li>
        <li>
          <Link to="/work/$slug" params={{ slug: "connective-fitness" }} className="group block no-underline">
            <div className="project-shot shot-wide flex items-center justify-center bg-surface-soft">
              <img src={connectiveApp.icon} alt="Connective Fitness APP icon" className="h-20 w-20 object-contain" />
            </div>
            <p className="kicker mt-4">SAAS Development</p>
            <p className="mt-2 text-2xl text-fg">{connectiveApp.name}</p>
            <p className="mt-1 text-sm text-muted">{connectiveApp.status}</p>
          </Link>
        </li>
        {featuredClients.map((client) => (
          <li key={client.slug}>
            <a href={client.url} target="_blank" rel="noreferrer" className="group block no-underline">
              <div className="project-shot shot-wide">
                <img src={client.image} alt={`${client.name} website`} />
              </div>
              <p className="kicker mt-4">Orilo client</p>
              <p className="mt-2 text-2xl text-fg">{client.name}</p>
              <p className="mt-1 text-sm text-muted">{client.blurb}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm text-fg">
                Live site
                <ArrowUpRight className="size-3.5" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
