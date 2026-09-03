import { useLayoutEffect, useRef } from "react";

type LoopVideoProps = {
  className?: string;
  src: string;
  poster?: string;
  label?: string;
};

export function LoopVideo({ className, src, poster, label }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.controls = false;
    el.muted = true;
    el.defaultMuted = true;
    el.volume = 0;
    el.loop = true;
    el.autoplay = true;
    el.playsInline = true;
    el.setAttribute("muted", "");
    el.setAttribute("autoplay", "");
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "true");
    el.removeAttribute("controls");

    const kick = () => {
      if (!el.paused) return;
      const attempt = el.play();
      if (attempt) attempt.catch(() => {});
    };

    kick();
    el.addEventListener("loadeddata", kick);
    el.addEventListener("canplay", kick);
    el.addEventListener("canplaythrough", kick);
    el.addEventListener("pause", kick);
    el.addEventListener("stalled", kick);
    el.addEventListener("suspend", kick);
    const onVis = () => {
      if (document.visibilityState === "visible") kick();
    };
    document.addEventListener("visibilitychange", onVis);
    const unlock = () => kick();
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("click", unlock);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) kick();
      },
      { threshold: 0.01 },
    );
    io.observe(el);

    return () => {
      el.removeEventListener("loadeddata", kick);
      el.removeEventListener("canplay", kick);
      el.removeEventListener("canplaythrough", kick);
      el.removeEventListener("pause", kick);
      el.removeEventListener("stalled", kick);
      el.removeEventListener("suspend", kick);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("click", unlock);
      io.disconnect();
    };
  }, []);

  return (
    <video
      ref={ref}
      className={["loop-video", className].filter(Boolean).join(" ")}
      autoPlay
      muted
      loop
      playsInline
      controls={false}
      preload="auto"
      poster={poster}
      disablePictureInPicture
      disableRemotePlayback
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
