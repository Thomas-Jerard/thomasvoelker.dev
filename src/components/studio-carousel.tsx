import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { featuredClients } from "@/data/site";
import { Button } from "@/components/ui/button";

function slot(index: number, active: number, count: number) {
  const rel = (index - active + count) % count;
  if (rel === 0) return "front";
  if (rel === 1) return "right";
  return "left";
}

export function StudioCarousel() {
  const count = featuredClients.length;
  const [active, setActive] = useState(0);
  const pause = useRef(false);
  const startX = useRef<number | null>(null);
  const current = featuredClients[active] ?? featuredClients[0];

  const prev = () => setActive((n) => (n - 1 + count) % count);
  const next = () => setActive((n) => (n + 1) % count);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!pause.current) setActive((n) => (n + 1) % count);
    }, 5200);
    return () => window.clearInterval(id);
  }, [count]);

  return (
    <div
      className="studio-carousel outline-none"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          prev();
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          next();
        }
      }}
      onMouseEnter={() => {
        pause.current = true;
      }}
      onMouseLeave={() => {
        pause.current = false;
      }}
      onTouchStart={(e) => {
        startX.current = e.changedTouches[0]?.clientX ?? null;
        pause.current = true;
      }}
      onTouchEnd={(e) => {
        const x = e.changedTouches[0]?.clientX;
        if (startX.current != null && x != null) {
          const dx = x - startX.current;
          if (dx > 40) prev();
          if (dx < -40) next();
        }
        startX.current = null;
        pause.current = false;
      }}
    >
      <div className="studio-stage" aria-live="polite">
        {featuredClients.map((client, i) => {
          const pos = slot(i, active, count);
          const isFront = pos === "front";
          return (
            <article key={client.slug} className="studio-card" data-pos={pos}>
              {isFront ? (
                <Link
                  to="/work/$slug"
                  params={{ slug: client.slug }}
                  className="studio-face group block no-underline"
                >
                  <div className="project-shot shot-wide">
                    <img src={client.image} alt="" />
                  </div>
                </Link>
              ) : (
                <button
                  type="button"
                  className="studio-face studio-face-btn"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${client.name}`}
                >
                  <div className="project-shot shot-wide">
                    <img src={client.image} alt="" />
                  </div>
                </button>
              )}
            </article>
          );
        })}
      </div>
      <div className="studio-caption">
        <p className="text-lg font-medium text-fg">{current.name}</p>
        <p className="mt-1 text-sm text-muted">{current.blurb}</p>
        <Link
          to="/work/$slug"
          params={{ slug: current.slug }}
          className="mt-3 inline-flex items-center gap-1 text-sm text-fg no-underline hover:text-muted"
        >
          View project
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
      <div className="studio-nav" aria-hidden="false">
        <Button type="button" variant="outline" onClick={prev} aria-label="Previous project">
          <ChevronLeft />
        </Button>
        <p className="studio-index">
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <Button type="button" variant="outline" onClick={next} aria-label="Next project">
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
