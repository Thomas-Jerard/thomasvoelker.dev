import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ContactActions } from "@/components/contact-actions";
import { JsonLd } from "@/components/json-ld";
import { about, companies, craft, hobbies } from "@/data/site";
import { breadcrumbJsonLd, pageHead, pages, personJsonLd, webPageJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => pageHead(pages.about),
});

function AboutPage() {
  return (
    <main id="main">
      <JsonLd data={personJsonLd()} />
      <JsonLd data={webPageJsonLd(pages.about.path, pages.about.title, pages.about.description, "ProfilePage")} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <section className="about-hero page-wrap">
        <div className="about-media">
          <AboutPortrait />
        </div>
        <div className="about-copy">
          <p className="kicker">About</p>
          <TypeTitle text={about.title} />
          <details className="about-expand">
            <summary>
              <span className="about-lead">{about.lead}</span>
              <span className="practice-plus" aria-hidden="true" />
            </summary>
            <div className="about-extra">
              <p>{about.studio}</p>
              <p>{about.path}</p>
              <p>{about.product}</p>
              <p>{about.future}</p>
              <p className="text-sm">{about.place}</p>
            </div>
          </details>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="page-wrap">
          <p className="kicker">What I do</p>
          <h2 className="display mt-3 text-3xl text-fg md:text-5xl">The work.</h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-fg md:grid-cols-4 md:text-base">
            {craft.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="page-wrap">
          <p className="kicker">Companies</p>
          <h2 className="display mt-3 text-3xl text-fg md:text-5xl">
            The companies I founded and run.
          </h2>
          <ul className="mt-10 grid gap-10 md:grid-cols-2">
            {companies.map((company) => (
              <li key={company.name}>
                <p className="kicker">{company.status}</p>
                <h3 className="display mt-2 text-3xl text-fg">{company.name}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
                  {company.body}
                </p>
                <p className="mt-4 text-sm text-fg">{company.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="page-wrap">
          <p className="kicker">Hobbies</p>
          <h2 className="display mt-3 max-w-2xl text-3xl text-fg md:text-5xl">
            What keeps me moving, competing, and recharging outside of work.
          </h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {hobbies.map((hobby) => (
              <li key={hobby.id}>
                <div className="project-shot shot-wide">
                  <img src={hobby.image} alt={hobby.alt} />
                </div>
                <h3 className="mt-4 text-lg font-medium text-fg">{hobby.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{hobby.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-24">
        <div className="page-wrap">
          <p className="kicker">Let's Connect</p>
          <h2 className="display text-3xl text-fg md:text-5xl text-balance">
            Feel Free to Shoot me a quick Email or Call my Agent
          </h2>
          <div className="mt-8">
            <ContactActions />
          </div>
        </div>
      </section>
    </main>
  );
}

function AboutPortrait() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || about.photos.length < 2) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % about.photos.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="portrait-frame about-portrait">
      {about.photos.map((photo, i) => (
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          width={1200}
          height={1500}
          className={i === active ? "about-shot is-on" : "about-shot"}
        />
      ))}
    </div>
  );
}

function TypeTitle({ text }: { text: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(text.length);
      return;
    }
    setCount(0);
    const delay = 200;
    const span = 1200;
    let raf = 0;
    let started = 0;
    const wait = window.setTimeout(() => {
      started = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - started) / span);
        setCount(Math.round(p * text.length));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(wait);
      cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <h1 className="display mt-3 text-4xl text-fg md:text-6xl" aria-label={text}>
      {text.slice(0, count)}
      <span className="orilo-caret" aria-hidden="true" />
    </h1>
  );
}
