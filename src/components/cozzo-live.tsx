import { CozzoCanary } from "@/components/cozzo-canary";

export function CozzoLive() {
  return (
    <div className="project-shot cozzo-hero">
      <img
        src="/images/projects/cozzo-hero.jpg"
        alt="cozzo.io homepage: The right AI voice for every call"
        width={1600}
        height={832}
      />
      <CozzoCanary />
    </div>
  );
}
