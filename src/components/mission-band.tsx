import { useEffect, useRef } from "react";

type Stream = {
  axis: "x" | "y";
  lane: number;
  head: number;
  len: number;
  speed: number;
};

function makeStream(cols: number, rows: number): Stream {
  const axis = Math.random() < 0.58 ? "x" : "y";
  const maxLane = axis === "x" ? rows : cols;
  return {
    axis,
    lane: Math.floor(Math.random() * Math.max(1, maxLane + 1)),
    head: -Math.random() * 0.4,
    len: 0.07 + Math.random() * 0.11,
    speed: 0.045 + Math.random() * 0.07,
  };
}

export function MissionBand() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let streams: Stream[] = [];
    let last = performance.now();

    const cellPx = () => {
      const raw = getComputedStyle(parent).getPropertyValue("--mission-cell").trim();
      const n = parseFloat(raw) || 5.5;
      if (raw.endsWith("rem")) {
        return n * parseFloat(getComputedStyle(document.documentElement).fontSize);
      }
      return n;
    };

    const fit = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawGrid = (w: number, h: number, cell: number) => {
      ctx.strokeStyle = "rgba(255,255,255,0.045)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= w + 1; x += cell) {
        ctx.moveTo(Math.floor(x) + 0.5, 0);
        ctx.lineTo(Math.floor(x) + 0.5, h);
      }
      for (let y = 0; y <= h + 1; y += cell) {
        ctx.moveTo(0, Math.floor(y) + 0.5);
        ctx.lineTo(w, Math.floor(y) + 0.5);
      }
      ctx.stroke();
    };

    const drawStream = (s: Stream, w: number, h: number, cell: number) => {
      const span = s.axis === "x" ? w : h;
      const head = s.head * span;
      const tail = (s.head - s.len) * span;
      if (s.axis === "x") {
        const y = Math.floor(s.lane * cell) + 0.5;
        const g = ctx.createLinearGradient(tail, y, head, y);
        g.addColorStop(0, "rgba(255,255,255,0)");
        g.addColorStop(0.55, "rgba(210,210,210,0.18)");
        g.addColorStop(0.88, "rgba(255,255,255,0.62)");
        g.addColorStop(1, "rgba(255,255,255,0.95)");
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(tail, y);
        ctx.lineTo(head, y);
        ctx.stroke();
      } else {
        const x = Math.floor(s.lane * cell) + 0.5;
        const g = ctx.createLinearGradient(x, tail, x, head);
        g.addColorStop(0, "rgba(255,255,255,0)");
        g.addColorStop(0.55, "rgba(210,210,210,0.18)");
        g.addColorStop(0.88, "rgba(255,255,255,0.62)");
        g.addColorStop(1, "rgba(255,255,255,0.95)");
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(x, tail);
        ctx.lineTo(x, head);
        ctx.stroke();
      }
    };

    const tick = (now: number) => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const cell = cellPx();
      const cols = Math.ceil(w / cell);
      const rows = Math.ceil(h / cell);
      if (streams.length === 0) {
        streams = Array.from({ length: 9 }, () => makeStream(cols, rows));
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, w, h);
      drawGrid(w, h, cell);
      if (!reduce) {
        for (const s of streams) {
          s.head += s.speed * dt;
          if (s.head - s.len > 1.08) Object.assign(s, makeStream(cols, rows), { head: -s.len });
          drawStream(s, w, h, cell);
        }
      }
      raf = window.requestAnimationFrame(tick);
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    raf = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="mission-band" aria-label="Mission">
      <canvas ref={canvasRef} className="mission-streams" aria-hidden="true" />
      <p className="mission-stat">1</p>
      <p className="mission-caption">mission to build cool sh*t</p>
    </section>
  );
}
