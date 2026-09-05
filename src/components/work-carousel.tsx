import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { connectiveApp, featuredClients, featuredVenture } from "@/data/site";

export const workSlides = [
  {
    slug: featuredVenture.slug,
    kicker: "Venture",
    name: featuredVenture.name,
    blurb: featuredVenture.blurb,
    image: featuredVenture.image,
  },
  {
    slug: "connective-fitness",
    kicker: "SAAS Development",
    name: connectiveApp.name,
    blurb: connectiveApp.status,
    icon: connectiveApp.icon,
  },
  ...featuredClients.map((client) => ({
    slug: client.slug,
    kicker: "Orilo client",
    name: client.name,
    blurb: client.blurb,
    image: client.image,
  })),
] as const;

export function WorkCarousel() {
  const count = workSlides.length;
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const locked = useRef(false);

  const go = (dir: -1 | 1) => {
    if (locked.current) return;
    locked.current = true;
    setActive((n) => (n + dir + count) % count);
    window.setTimeout(() => {
      locked.current = false;
    }, 520);
  };

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 30 && Math.abs(e.deltaX) < 30) return;
      e.preventDefault();
      if (e.deltaY > 0 || e.deltaX > 0) go(1);
      else go(-1);
    };
    window.addEventListener("keydown", onKey);
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", onKey);
      el.removeEventListener("wheel", onWheel);
    };
  }, [count]);

  return (
    <div
      ref={root}
      className="work-carousel"
      style={{ "--work-i": String(active) } as CSSProperties}
      onTouchStart={(e) => {
        startX.current = e.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const x = e.changedTouches[0]?.clientX;
        if (startX.current != null && x != null) {
          const dx = x - startX.current;
          if (dx > 48) go(-1);
          if (dx < -48) go(1);
        }
        startX.current = null;
      }}
    >
      <div className="work-track">
        {workSlides.map((slide) => (
          <article key={slide.slug} className="work-slide">
            <div className="work-slide-inner page-wrap">
              {"image" in slide && slide.image ? (
                <div className="work-slide-media">
                  <img src={slide.image} alt={`${slide.name} website`} />
                </div>
              ) : (
                <div className="work-slide-media work-slide-icon">
                  <img src={"icon" in slide ? slide.icon : ""} alt="" />
                </div>
              )}
              <div className="work-slide-copy">
                <p className="kicker">{slide.kicker}</p>
                <h2 className="display mt-2 text-2xl text-fg md:text-4xl">{slide.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{slide.blurb}</p>
                <Link
                  to="/work/$slug"
                  params={{ slug: slide.slug }}
                  className="mt-4 inline-flex items-center gap-1 text-sm text-fg no-underline hover:text-muted"
                >
                  View project
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="work-nav">
        <Button type="button" variant="outline" onClick={() => go(-1)} aria-label="Previous project">
          <ChevronLeft />
        </Button>
        <p className="work-index">
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <Button type="button" variant="outline" onClick={() => go(1)} aria-label="Next project">
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
