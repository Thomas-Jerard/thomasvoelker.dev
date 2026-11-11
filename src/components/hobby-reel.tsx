import { LoopVideo } from "@/components/loop-video";
import { useMarquee } from "@/components/use-marquee";
import { hobbies } from "@/data/site";

const COPIES = 2;

export function HobbyReel() {
  const { viewportRef, trackRef } = useMarquee(22, COPIES);
  const strip = Array.from({ length: COPIES }, () => hobbies).flat();

  return (
    <section className="hobby-section" aria-label="Hobbies">
      <div className="page-wrap">
        <p className="kicker">Hobbies</p>
      </div>
      <div ref={viewportRef} className="hobby-reel" tabIndex={0} aria-label="Hobby photos, swipe to browse">
        <div ref={trackRef} className="hobby-track">
          {strip.map((item, i) => (
            <figure key={`${item.id}-${i}`} className="hobby-slide">
              {item.type === "video" ? (
                <LoopVideo src={item.src} poster={item.poster} label={i < hobbies.length ? item.alt : undefined} />
              ) : (
                <img
                  src={item.src}
                  alt={i < hobbies.length ? item.alt : ""}
                  draggable={false}
                  decoding="async"
                />
              )}
              <figcaption className="hobby-label">{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
