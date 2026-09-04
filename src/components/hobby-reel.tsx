import { LoopVideo } from "@/components/loop-video";
import { hobbies } from "@/data/site";

export function HobbyReel() {
  const strip = [...hobbies, ...hobbies];
  return (
    <section className="hobby-section" aria-label="Hobbies">
      <div className="page-wrap">
        <p className="kicker">Hobbies</p>
      </div>
      <div className="hobby-reel">
        <div className="hobby-track">
          {strip.map((item, i) => (
            <figure key={`${item.id}-${i}`} className="hobby-slide">
              {item.type === "video" ? (
                <LoopVideo src={item.src} poster={item.poster} label={i < hobbies.length ? item.alt : undefined} />
              ) : (
                <img src={item.src} alt={i < hobbies.length ? item.alt : ""} />
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
