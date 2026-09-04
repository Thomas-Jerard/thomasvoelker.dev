import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { ConnectiveAppModule } from "@/components/connective-app";
import { CopyEmail } from "@/components/copy-email";
import { Groundhogs } from "@/components/groundhogs";
import { JsonLd } from "@/components/json-ld";
import { LogoBelt } from "@/components/logo-belt";
import { LoopVideo } from "@/components/loop-video";
import { OriloBuildPreview } from "@/components/orilo-build-preview";
import { OriloVerb } from "@/components/orilo-verb";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StudioCarousel } from "@/components/studio-carousel";
import { Button } from "@/components/ui/button";
import {
  education,
  featuredVenture,
  oriloServices,
  practice,
  site,
} from "@/data/site";
import { personJsonLd, websiteJsonLd, organizationJsonLd } from "@/lib/seo";

export function HomePage() {
  return (
    <main id="main">
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <Hero />
      <OriloChapter />
      <ClientWork />
      <ConnectiveAppModule />
      <Practice />
      <OhioChapter />
      <ContactBand />
    </main>
  );
}

function NameLockup() {
  return (
    <p className="name-lockup display reveal" aria-label="Thomas Jerard Voelker">
      <span className="name-first">Thomas&nbsp;</span>
      <span className="name-mid" aria-hidden="true">
        <span className="name-jump">Jerard&nbsp;</span>
      </span>
      <span className="name-last">Voelker.</span>
    </p>
  );
}

function Hero() {
  return (
    <section className="page-wrap grid min-w-0 items-start gap-8 pb-12 pt-8 md:grid-cols-12 md:items-end md:gap-10 md:pb-20 md:pt-16">
      <div className="min-w-0 md:col-span-7">
        <NameLockup />
        <h1 className="display reveal reveal-delay-1 mt-5 text-[2.15rem] text-fg sm:text-5xl md:text-6xl text-balance">
          I build cool stuff with AI
        </h1>
        <p className="reveal reveal-delay-2 mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg text-pretty">
          {site.tagline} This site is mine.
        </p>
        <div className="reveal reveal-delay-3 mt-7 flex flex-col gap-3 sm:flex-row">
          <CopyEmail className="w-full sm:w-auto" />
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <a href="#connective">
              What am I up to?
              <ArrowRight />
            </a>
          </Button>
        </div>
        <p className="reveal reveal-delay-4 mt-6 inline-flex items-center gap-2 text-sm text-muted">
          <MapPin className="size-3.5" />
          {site.location}
        </p>
        <div className="mt-8 md:hidden">
          <LogoBelt />
        </div>
      </div>
      <div className="hidden md:col-span-5 md:block">
        <div className="portrait-frame portrait-motion">
          <img
            src={site.portrait.src}
            alt={site.portrait.alt}
            width={1100}
            height={1180}
            className="shot-portrait w-full object-cover"
          />
        </div>
        <LogoBelt />
      </div>
    </section>
  );
}

function OriloChapter() {
  return (
    <section id="work" className="border-t border-border py-16 md:py-24">
      <div className="page-wrap">
        <SectionHeading
          index="01"
          label="Venture"
          title="Orilo is the company I run."
        />
        <Reveal rank={1} className="mt-10 grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="kicker">Founder-led venture · Live</p>
            <h3 className="display mt-3 text-3xl text-fg md:text-5xl">{featuredVenture.name}</h3>
            <p className="mt-4 text-lg text-fg">{featuredVenture.blurb}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
              {featuredVenture.summary}
            </p>
            <a
              href="/work/orilo"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-muted"
            >
              View the studio
              <ArrowUpRight className="size-4" />
            </a>
          </div>
          <div className="project-shot shot-hero md:col-span-7">
            <OriloBuildPreview />
          </div>
        </Reveal>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          {site.orilo.pitch}
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {oriloServices.map((item) => (
            <li key={item.title}>
              <p className="text-sm font-medium text-fg">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="w-full sm:w-auto">
            <a href={site.orilo.url} target="_blank" rel="noreferrer">
              Visit orilo.io
              <ArrowUpRight />
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <a href="#clients">How the studio works</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ClientWork() {
  return (
    <section id="clients" className="border-t border-border py-16 md:py-24">
      <div className="page-wrap">
        <header>
          <p className="kicker">02 — Studio work</p>
          <h2 className="display mt-3 max-w-4xl text-3xl text-fg md:text-5xl">
            Some Projects Orilo <OriloVerb />
          </h2>
        </header>
        <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
          These are client businesses. Orilo designed, launched, and looks after the sites.
        </p>
        <div className="mt-10">
          <StudioCarousel />
        </div>
      </div>
    </section>
  );
}

function Practice() {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className="page-wrap">
        <p className="kicker">04 — LLM</p>
        <h2 className="display mt-3 max-w-3xl text-3xl text-fg md:text-4xl text-balance">
          Fluent in LLM use cases, agentic frameworks, and cloud{" "}
          <span className="agent-word">agents</span>.
        </h2>
        <div className="mt-8">
          <Groundhogs />
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {practice.map((item) => (
            <li key={item.id}>
              <p className="text-sm font-medium text-fg">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function OhioChapter() {
  return (
    <section className="ohio-chapter" aria-labelledby="ohio-title">
      <LoopVideo
        className="ohio-bg"
        src="/videos/ohio-rufus.mp4"
        poster="/videos/ohio-rufus-poster.jpg"
        label={education.alt}
      />
      <div className="ohio-copy">
        <div className="page-wrap w-full">
          <p className="kicker" style={{ color: "var(--color-ohio-fg)" }}>
            Education
          </p>
          <h2
            id="ohio-title"
            className="display-serif mt-3 text-5xl md:text-7xl"
            style={{ color: "var(--color-ohio-fg)" }}
          >
            {education.line}
          </h2>
          <p className="mt-4 max-w-lg text-base md:text-lg" style={{ color: "var(--color-ohio-fg)" }}>
            {education.school} · {education.degree}
          </p>
          <p className="mt-3 max-w-xl text-sm md:text-base" style={{ color: "var(--color-ohio-fg)" }}>
            {education.bio}
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactBand() {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <div className="page-wrap">
        <p className="kicker">Next</p>
        <h2 className="display mt-3 max-w-2xl text-3xl text-fg md:text-5xl text-balance">
          If the work is a fit, email me.
        </h2>
        <div className="mt-8">
          <CopyEmail />
        </div>
      </div>
    </section>
  );
}
