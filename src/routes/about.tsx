import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ContactActions } from "@/components/contact-actions";
import { JsonLd } from "@/components/json-ld";
import { LoopVideo } from "@/components/loop-video";
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
        <CraftLines />
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

const CRAFT_COLORS = ["#ef4444", "#3b82f6", "#9a9a9a", "#ec4899", "#22c55e"] as const;

function CraftLines() {
  const [done, setDone] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!desktop.matches || reduce.matches) {
      setDone(craft.length);
      setChars(0);
      return;
    }

    let line = 0;
    let i = 0;
    let timer = 0;
    setDone(0);
    setChars(0);

    const type = () => {
      const word = craft[line];
      if (i < word.length) {
        i += 1;
        setChars(i);
        timer = window.setTimeout(type, 28);
        return;
      }
      if (line < craft.length - 1) {
        line += 1;
        i = 0;
        setDone(line);
        setChars(0);
        timer = window.setTimeout(type, 200);
        return;
      }
      timer = window.setTimeout(() => {
        line = 0;
        i = 0;
        setDone(0);
        setChars(0);
        type();
      }, 2400);
    };

    timer = window.setTimeout(type, 360);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="craft-block">
      <ul className="sr-only">
        {craft.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="craft-credits" aria-hidden="true">
        <ul className="craft-credits-track">
          {craft.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <pre className="craft-code" aria-hidden="true">
        {craft.map((item, i) => {
          if (i > done) return null;
          const color = CRAFT_COLORS[i % CRAFT_COLORS.length];
          const text = i < done ? item : item.slice(0, chars);
          return (
            <span key={item} className="craft-line" style={{ color }}>
              {`* ${text}`}
              {i === done ? <span className="orilo-caret" aria-hidden="true" /> : null}
              {"\n"}
            </span>
          );
        })}
      </pre>
    </div>
  );
}

function AboutPortrait() {
  return (
    <div className="about-portrait-wrap">
      <span className="about-corner about-corner-tr" aria-hidden="true" />
      <span className="about-corner about-corner-bl" aria-hidden="true" />
      <div className="portrait-frame about-portrait">
        <LoopVideo
          className="about-shot is-on"
          src="/videos/about-portrait.mp4?v=3"
          poster="/videos/about-portrait.jpg?v=3"
          label="Thomas Voelker"
        />
      </div>
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
