import { createFileRoute } from "@tanstack/react-router";
import { CopyEmail } from "@/components/copy-email";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/data/site";
import { breadcrumbJsonLd, pageHead, pages, webPageJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => pageHead(pages.contact),
});

function ContactPage() {
  return (
    <main id="main" className="page-wrap py-16 md:py-24">
      <JsonLd data={webPageJsonLd(pages.contact.path, pages.contact.title, pages.contact.description)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <p className="kicker">Contact</p>
      <h1 className="display mt-3 max-w-2xl text-4xl text-fg md:text-6xl">
        Email is the fastest way.
      </h1>
      <p className="mt-5 max-w-lg text-muted">
        I don’t take live calls. If the work is a fit, write {site.email}.
      </p>
      <div className="mt-8">
        <CopyEmail />
      </div>
      <ul className="mt-10 flex flex-wrap gap-5 text-sm text-muted">
        {site.socials.map((s) => (
          <li key={s.id}>
            <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-fg">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
