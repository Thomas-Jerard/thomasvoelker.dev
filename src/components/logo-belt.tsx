import { workplaces } from "@/data/site";
import { useMarquee } from "@/components/use-marquee";

function BeltSet({ copy }: { copy: number }) {
  return (
    <ul className="logo-belt-set" aria-hidden={copy === 0 ? undefined : true}>
      {workplaces.map((place, index) => (
        <li key={`${place.id}-${copy}-${index}`}>
          <a
            href={place.href}
            target="_blank"
            rel="noreferrer"
            title={place.name}
            className="logo-belt-link"
            tabIndex={copy === 0 ? 0 : -1}
          >
            <img
              src={place.logo}
              alt={copy === 0 ? place.name : ""}
              className="logo-mark"
              draggable={false}
              decoding="async"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function LogoBelt() {
  const { viewportRef, trackRef } = useMarquee(36, 2);

  return (
    <section aria-label="Where I've Been" className="logo-belt">
      <p className="kicker">Where I've Been</p>
      <div ref={viewportRef} className="logo-belt-mask">
        <div ref={trackRef} className="logo-belt-track">
          <BeltSet copy={0} />
          <BeltSet copy={1} />
        </div>
      </div>
    </section>
  );
}
