import { useEffect, useState } from "react";
import { cozzoVenture } from "@/data/site";

const HOLD = 3400;
const LIFT = 680;

export function CozzoStack() {
  const items = cozzoVenture.features;
  const [front, setFront] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lift = 0;
    const loop = window.setInterval(() => {
      setLeaving(true);
      lift = window.setTimeout(() => {
        setFront((n) => (n + 1) % items.length);
        setLeaving(false);
      }, LIFT);
    }, HOLD);
    return () => {
      window.clearInterval(loop);
      window.clearTimeout(lift);
    };
  }, [items.length]);

  const item = items[front];

  return (
    <div className="cozzo-rotator" aria-live="polite">
      <div className={leaving ? "is-out" : undefined} key={item.title}>
        <h3 className="display text-fg">{item.title}</h3>
        <p className="text-muted">{item.body}</p>
      </div>
    </div>
  );
}
