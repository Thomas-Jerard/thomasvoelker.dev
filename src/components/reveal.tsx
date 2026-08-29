import { useEffect, useRef, type ElementType, type ReactNode } from "react";

export function Reveal({
  as: Tag = "div",
  rank = 2,
  className,
  children,
}: {
  as?: ElementType;
  rank?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("is-in");
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-rank={rank}
      className={["reveal-item", className].filter(Boolean).join(" ")}
      style={{ "--reveal-delay": `${(rank - 1) * 70}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
