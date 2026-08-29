import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { connectiveApp, featuredClients, featuredVenture, oriloServices, site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { OriloBuildPreview } from "@/components/orilo-build-preview";

export const Route = createFileRoute("/work/$slug")({
  component: WorkSlug,
  loader: ({ params }) => {
    if (params.slug === "orilo") return { kind: "orilo" as const };
    if (params.slug === "connective-fitness") return { kind: "app" as const };
    const client = featuredClients.find((c) => c.slug === params.slug);
    if (!client) throw notFound();
    return { kind: "client" as const, client };
  },
});

function WorkSlug() {
  const data = Route.useLoaderData();
  if (data.kind === "orilo") return <OriloPage />;
  if (data.kind === "app") return <AppPage />;
  return <ClientPage client={data.client} />;
}

function OriloPage() {
  return (
    <main id="main" className="page-wrap py-16 md:py-24">
      <p className="kicker">Venture · Live</p>
      <h1 className="display mt-3 text-4xl text-fg md:text-6xl">{featuredVenture.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{featuredVenture.summary}</p>
      <div className="project-shot shot-hero mt-10">
        <OriloBuildPreview />
      </div>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {oriloServices.map((item) => (
          <li key={item.title}>
            <p className="text-sm font-medium text-fg">{item.title}</p>
            <p className="mt-1 text-sm text-muted">{item.body}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button asChild>
          <a href={site.orilo.url} target="_blank" rel="noreferrer">
            Visit orilo.io
            <ArrowUpRight />
          </a>
        </Button>
      </div>
    </main>
  );
}

function AppPage() {
  return (
    <main id="main" className="page-wrap py-16 md:py-24">
      <p className="kicker">{connectiveApp.status}</p>
      <h1 className="display mt-3 text-4xl text-fg md:text-6xl">{connectiveApp.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{connectiveApp.summary}</p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {connectiveApp.users.map((item) => (
          <li key={item.title} className="bg-surface p-4">
            <p className="text-sm font-medium text-fg">{item.title}</p>
            <p className="mt-1 text-sm text-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

function ClientPage({ client }: { client: (typeof featuredClients)[number] }) {
  return (
    <main id="main" className="page-wrap py-16 md:py-24">
      <p className="kicker">Orilo client · Live</p>
      <h1 className="display mt-3 text-4xl text-fg md:text-6xl">{client.name}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{client.blurb}</p>
      <div className="project-shot shot-hero mt-10">
        <img src={client.image} alt="" />
      </div>
      <div className="mt-8">
        <Button asChild>
          <a href={client.url} target="_blank" rel="noreferrer">
            Visit live site
            <ArrowUpRight />
          </a>
        </Button>
      </div>
    </main>
  );
}
