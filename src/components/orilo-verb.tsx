import { useEffect, useState } from "react";

const words = ["Built", "Made", "Created"] as const;

export function OriloVerb() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"type" | "delete">("type");

  useEffect(() => {
    const prefersReduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) {
      setText(words[0]);
      return;
    }

    const word = words[index];
    let id = 0;
    if (phase === "type") {
      if (text.length < word.length) {
        id = window.setTimeout(() => setText(word.slice(0, text.length + 1)), 78);
      } else {
        id = window.setTimeout(() => setPhase("delete"), 1500);
      }
    } else if (text.length > 0) {
      id = window.setTimeout(() => setText(text.slice(0, -1)), 48);
    } else {
      id = window.setTimeout(() => {
        setIndex((n) => (n + 1) % words.length);
        setPhase("type");
      }, 220);
    }
    return () => window.clearTimeout(id);
  }, [index, phase, text]);

  return (
    <span className="orilo-verb">
      {text}
      <span className="orilo-caret" aria-hidden="true" />
    </span>
  );
}
