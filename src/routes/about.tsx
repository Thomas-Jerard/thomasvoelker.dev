import { createFileRoute } from "@tanstack/react-router";
import { education, site } from "@/data/site";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [{ title: "About — Thomas Voelker" }],
  }),
});

function AboutPage() {
  return (
    <main id="main" className="page-wrap py-16 md:py-24">
      <p className="kicker">About</p>
      <h1 className="display mt-3 text-4xl text-fg md:text-6xl">Who I am.</h1>
      <div className="mt-10 grid gap-10 md:grid-cols-12">
        <div className="portrait-frame md:col-span-5">
          <img
            src={site.portrait.src}
            alt={site.portrait.alt}
            className="shot-portrait w-full object-cover"
          />
        </div>
        <div className="md:col-span-7 space-y-4 text-base leading-relaxed text-muted md:text-lg">
          <p className="text-fg">{site.tagline}</p>
          <p>
            I lead {site.orilo.company}, the company behind Orilo. The studio
            is founder-led and agent-backed: design, upkeep, hosting, and SEO
            for businesses that need a real website.
          </p>
          <p>
            Before that I trained AI models at Mercor, worked as a PCT on a
            cardiac PCU at UPMC, and spent time in operations at ADP and
            Capstone Logistics.
          </p>
          <p>
            {education.school}, {education.degree}. {education.line}.
          </p>
          <p>
            Independently I’m building connective software for gyms and their
            members — still locked while it ships.
          </p>
        </div>
      </div>
    </main>
  );
}
