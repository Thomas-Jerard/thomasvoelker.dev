import { createFileRoute } from "@tanstack/react-router";

const body = `# Thomas Voelker

> Thomas Voelker, founder of Orilo and Cozzo Labs LLC, Greater Pittsburgh.

- [Home](https://thomasvoelker.dev/): Thomas Voelker — founder-led, agent-backed studio work and independent product.
- [About](https://thomasvoelker.dev/about): Background, companies, education, and hobbies.
- [Contact](https://thomasvoelker.dev/contact): Email thomas@orilo.io. No live calls.

## Orilo

Founder-led, agent-backed website studio (design, upkeep, hosting, SEO) under 7homais Limited.
Live: https://orilo.io/

Client work (not this site): Reinforce Gym, Prime Stretch, Pevarnik Bros.

## Cozzo

Independent voice AI agent benchmark and comparison site, run by Cozzo Labs LLC (founded by Thomas Voelker).
Live: https://cozzo.io/ · X: https://x.com/cozzoio
Project page: https://thomasvoelker.dev/work/cozzo

## Also

Ohio University, B.S. Biology, honors. Previously Mercor, UPMC, ADP, Capstone Logistics.
`;

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () =>
        new Response(body, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
