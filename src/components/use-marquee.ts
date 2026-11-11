import { useLayoutEffect, useRef } from "react";

/** Seamless sideways loop. Transform only, so it does not fight touch scrolling. */
export function useMarquee(speedPxPerSec: number, copies = 2) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const view = viewportRef.current;
    const track = trackRef.current;
    if (!view || !track) return;

    let offset = 0;
    let width = 0;
    let dragging = false;
    let lastX = 0;
    let axis: "x" | "y" | null = null;
    let moved = false;
    let startX = 0;
    let startY = 0;
    let pointerId = -1;
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      /* ignore */
    }

    const measure = () => {
      const next = track.scrollWidth / copies;
      if (next > 8) width = next;
    };

    const apply = () => {
      if (width < 8) return;
      offset = ((offset % width) + width) % width;
      track.style.transform = `translate3d(${-offset}px,0,0)`;
    };

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(34, now - last);
      last = now;
      if (!document.hidden && !dragging && !reduce) {
        offset += (speedPxPerSec * dt) / 1000;
        apply();
      }
      raf = requestAnimationFrame(tick);
    };

    const down = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      axis = null;
      moved = false;
      pointerId = e.pointerId;
      startX = lastX = e.clientX;
      startY = e.clientY;
    };

    const move = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!axis) {
        if (Math.hypot(dx, dy) < 8) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (axis === "y") {
          dragging = false;
          return;
        }
        try {
          view.setPointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }
      if (axis !== "x") return;
      e.preventDefault();
      moved = true;
      offset += lastX - e.clientX;
      lastX = e.clientX;
      apply();
    };

    const up = (e: PointerEvent) => {
      if (e.pointerId !== pointerId && pointerId !== -1) return;
      if (moved) {
        const stopClick = (ev: Event) => {
          ev.preventDefault();
          ev.stopPropagation();
          view.removeEventListener("click", stopClick, true);
        };
        view.addEventListener("click", stopClick, true);
      }
      dragging = false;
      axis = null;
      pointerId = -1;
      try {
        view.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    measure();
    view.addEventListener("pointerdown", down);
    view.addEventListener("pointermove", move, { passive: false });
    view.addEventListener("pointerup", up);
    view.addEventListener("pointercancel", up);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      view.removeEventListener("pointerdown", down);
      view.removeEventListener("pointermove", move);
      view.removeEventListener("pointerup", up);
      view.removeEventListener("pointercancel", up);
    };
  }, [copies, speedPxPerSec]);

  return { viewportRef, trackRef };
}
