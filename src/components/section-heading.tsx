export function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <header>
      <p className="kicker">
        {index} — {label}
      </p>
      <h2 className="display mt-3 max-w-3xl text-3xl text-fg md:text-5xl text-balance">
        {title}
      </h2>
    </header>
  );
}
