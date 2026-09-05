import { createFileRoute } from "@tanstack/react-router";
import { JsonLd } from "@/components/json-ld";
import { StudioCarousel } from "@/components/studio-carousel";
import { connectiveApp, featuredClients, featuredVenture } from "@/data/site";
import { breadcrumbJsonLd, pageHead, pages, webPageJsonLd, workListJsonLd } from "@/lib/seo";

const workItems = [
  {
    slug: featuredVenture.slug,
    name: featuredVenture.name,
    blurb: featuredVenture.blurb,
    image: featuredVenture.image,
  },
  {
    slug: "connective-fitness",
    name: connectiveApp.name,
    blurb: connectiveApp.status,
    image: connectiveApp.icon,
    fit: "contain" as const,
  },
  ...featuredClients.map((client) => ({
    slug: client.slug,
    name: client.name,
    blurb: client.blurb,
    image: client.image,
  })),
];

export const Route = createFileRoute("/work/")({
  component: WorkIndex,
  head: () => pageHead(pages.work),
});

function WorkIndex() {
  return (
    <main id="main" className="work-page">
      <JsonLd data={webPageJsonLd(pages.work.path, pages.work.title, pages.work.description, "CollectionPage")} />
      <JsonLd data={workListJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <StudioCarousel items={workItems} variant="full" />
    </main>
  );
}
