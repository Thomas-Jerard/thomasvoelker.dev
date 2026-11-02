import { CozzoCanary } from "@/components/cozzo-canary";

export function CozzoLive() {
  return (
    <a
      className="project-shot cozzo-hero"
      href="https://cozzo.io/"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src="/images/projects/cozzo-hero.jpg"
        alt="cozzo.io homepage. The right AI voice for every call."
        width={1600}
        height={832}
      />
      <CozzoCanary />
    </a>
  );
}
