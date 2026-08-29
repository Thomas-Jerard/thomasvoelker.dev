const hogs = [
  { id: "codex", name: "Codex", src: "/images/brand/codex.svg" },
  { id: "grok", name: "Grok", src: "/images/brand/grok.svg" },
  { id: "bot", name: "Grok Bot", src: "/images/brand/grok-bot.svg" },
];

export function Groundhogs() {
  return (
    <div className="groundhog-row" aria-hidden="true">
      {hogs.map((hog, i) => (
        <div key={hog.id} className="groundhog-slot">
          <div className="groundhog" style={{ animationDelay: `${i * 3}s` }}>
            <img src={hog.src} alt="" />
            <span>{hog.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
