import { useEffect, useRef, useState } from "react";

const CODE = [
  { n: 12, html: '<span class="c-k">export default function</span> <span class="c-f">Page</span>() {' },
  { n: 13, html: "  <span class=\"c-k\">return</span> (" },
  { n: 14, html: "    <<span class=\"c-f\">Hero</span>" },
  { n: 15, html: "      <span class=\"c-p\">title</span>=<span class=\"c-s\">\"Managed websites\"</span>" },
  { n: 16, html: "      <span class=\"c-p\">cta</span>=<span class=\"c-s\">\"Start a conversation\"</span>" },
  { n: 17, html: "    />" },
  { n: 18, html: "  );" },
  { n: 19, html: "}" },
];

const LOG = [
  { kind: "prompt", text: "> Ship the Orilo landing page." },
  { kind: "think", text: "Thinking..." },
  { kind: "tool", text: "read_file  app/page.tsx" },
  { kind: "tool", text: "grep      hero  ·  4 matches" },
  { kind: "tool", text: "write     pricing $299 / $97" },
  { kind: "time", text: "Thought for 1.6s" },
  { kind: "done", text: "[done]" },
];

export function OriloBuildPreview() {
  const root = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setOn(entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={root}
      className="orilo-build"
      data-on={on ? "" : undefined}
      aria-label="Orilo being generated, then the live site"
    >
      <div className="build-chrome" aria-hidden="true">
        <span className="build-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="build-title">orilo/main</span>
        <span className="build-meter">
          <b />
        </span>
      </div>
      <div className="build-stage">
        <div className="build-code" aria-hidden="true">
          <ol>
            {CODE.map((line) => (
              <li key={line.n} className="build-line">
                <span className="build-ln">{line.n}</span>
                <span dangerouslySetInnerHTML={{ __html: line.html }} />
              </li>
            ))}
          </ol>
          <div className="build-log">
            {LOG.map((row) => (
              <p key={row.text} className={`build-log-row is-${row.kind}`}>
                {row.text}
              </p>
            ))}
          </div>
        </div>
        <div className="build-site">
          <img src="/images/projects/orilo-live.jpg" alt="orilo.io landing page" />
        </div>
      </div>
    </div>
  );
}
