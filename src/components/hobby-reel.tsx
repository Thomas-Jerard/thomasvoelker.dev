import { useLayoutEffect, useRef } from "react";
import { LoopVideo } from "@/components/loop-video";
import { hobbies } from "@/data/site";

const COPIES = 3;

export function HobbyReel() {
  const reelRef = useRef<HTMLDivElement>(null);
  const strip = Array.from({ length: COPIES }, () => hobbies).flat();

  useLayoutEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;

    const unit = () => reel.scrollWidth / COPIES;
    const place = () => {
      reel.scrollLeft = unit();
    };
    place();

    const wrap = () => {
      const w = unit();
      if (w < 16) return;
      if (reel.scrollLeft < w * 0.5) reel.scrollLeft += w;
      else if (reel.scrollLeft >= w * 1.5) reel.scrollLeft -= w;
    };

    let paused = false;
    let dragging = false;
    let startX = 0;
    let startLeft = 0;
    let resume = 0;
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      /* ignore */
    }

    const hold = () => {
      paused = true;
      window.clearTimeout(resume);
    };
    const release = () => {
      window.clearTimeout(resume);
      resume = window.setTimeout(() => {
        paused = false;
      }, 1600);
    };

    const onScroll = () => wrap();

    const onPointerDown = (e: PointerEvent) => {
      hold();
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      startX = e.clientX;
      startLeft = reel.scrollLeft;
      reel.classList.add("is-dragging");
      reel.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      e.preventDefault();
      reel.scrollLeft = startLeft - (e.clientX - startX);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (dragging) {
        dragging = false;
        reel.classList.remove("is-dragging");
        try {
          reel.releasePointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }
      release();
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      hold();
      reel.scrollLeft += e.deltaY;
      release();
    };

    let raf = 0;
    const tick = () => {
      if (!paused && !reduce && !dragging) reel.scrollLeft += 0.55;
      raf = requestAnimationFrame(tick);
    };

    reel.addEventListener("scroll", onScroll, { passive: true });
    reel.addEventListener("pointerdown", onPointerDown);
    reel.addEventListener("pointermove", onPointerMove);
    reel.addEventListener("pointerup", onPointerUp);
    reel.addEventListener("pointercancel", onPointerUp);
    reel.addEventListener("wheel", onWheel, { passive: false });
    reel.addEventListener("mouseenter", hold);
    reel.addEventListener("mouseleave", release);
    const ro = new ResizeObserver(place);
    ro.observe(reel);
    raf = requestAnimationFrame(tick);

    return () => {
      reel.removeEventListener("scroll", onScroll);
      reel.removeEventListener("pointerdown", onPointerDown);
      reel.removeEventListener("pointermove", onPointerMove);
      reel.removeEventListener("pointerup", onPointerUp);
      reel.removeEventListener("pointercancel", onPointerUp);
      reel.removeEventListener("wheel", onWheel);
      reel.removeEventListener("mouseenter", hold);
      reel.removeEventListener("mouseleave", release);
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(resume);
    };
  }, []);

  return (
    <section className="hobby-section" aria-label="Hobbies">
      <div className="page-wrap">
        <p className="kicker">Hobbies</p>
      </div>
      <div ref={reelRef} className="hobby-reel" tabIndex={0} aria-label="Hobby photos, swipe to browse">
        <div className="hobby-track">
          {strip.map((item, i) => (
            <figure key={`${item.id}-${i}`} className="hobby-slide">
              {item.type === "video" ? (
                <LoopVideo src={item.src} poster={item.poster} label={i < hobbies.length ? item.alt : undefined} />
              ) : (
                <img src={item.src} alt={i < hobbies.length ? item.alt : ""} />
              )}
              <figcaption className="hobby-label">{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
