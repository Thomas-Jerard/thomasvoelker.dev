import { createFileRoute } from "@tanstack/react-router";
import { JsonLd } from "@/components/json-ld";
import { WorkCarousel } from "@/components/work-carousel";
import { breadcrumbJsonLd, pageHead, pages, webPageJsonLd, workListJsonLd } from "@/lib/seo";

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
      <WorkCarousel />
    </main>
  );
}
