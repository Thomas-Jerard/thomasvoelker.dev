export const site = {
  name: "Thomas Voelker",
  fullName: "Thomas Jerard Voelker",
  title: "Thomas Voelker — Founder of Orilo",
  jobTitle: "Founder, developer, and product builder",
  location: "Greensburg, Pennsylvania",
  email: "thomas@orilo.io",
  availability: "Available for select projects",
  headline: "I build websites and the systems around them.",
  tagline:
    "I run Orilo and I’m building connective software for gyms and the people who train in them.",
  description:
    "Thomas Jerard Voelker is a founder, developer, and product builder in Greensburg, Pennsylvania. He leads Orilo, a founder-led, agent-backed website studio.",
  portrait: {
    src: "/images/profile/thomas.jpg",
    square: "/images/profile/thomas-square.jpg",
    alt: "Thomas Jerard Voelker smiling outdoors in natural light",
  },
  socials: [
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/thomas-voelker/" },
    { id: "x", label: "X", href: "https://x.com/voelker_thomas" },
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/tjvolky/" },
  ],
  orilo: {
    name: "Orilo",
    url: "https://orilo.io/",
    company: "7homais Limited",
    pitch:
      "Founder-led and agent-backed. Design, upkeep, hosting, and SEO for businesses that need a real website—not another handoff. Client sites below are their businesses, shipped through the studio.",
  },
} as const;

export const workplaces = [
  { id: "orilo", name: "Orilo", href: "https://orilo.io/", logo: "/images/brand/orilo.svg" },
  { id: "mercor", name: "Mercor", href: "https://www.mercor.com/", logo: "/images/logos/mercor.png" },
  { id: "upmc", name: "UPMC", href: "https://www.upmc.com/", logo: "/images/logos/upmc.png" },
  { id: "adpia", name: "ADPIA", href: "https://insurance.adp.com/", logo: "/images/logos/adp.png" },
  { id: "capstone", name: "Capstone Logistics", href: "https://www.capstonelogistics.com/", logo: "/images/logos/capstone.svg" },
] as const;

export const oriloServices = [
  { title: "Web design", body: "A site that looks like the business and works on a phone between jobs." },
  { title: "Upkeep", body: "Bounded monthly changes so the site stays current without a ticket queue." },
  { title: "Hosting", body: "Launch, hosting, and the unglamorous work of keeping it fast and up." },
  { title: "SEO", body: "Pages, titles, and structure a customer—and a search engine—can actually use." },
] as const;

export const featuredVenture = {
  slug: "orilo",
  kicker: "01 — Venture",
  name: "Orilo",
  blurb: "Founder-led. Agent-backed. Websites that stay looked after.",
  summary:
    "My company. A managed website studio that designs, launches, hosts, and maintains sites for local businesses and creators—plus the SEO to help people find them.",
  href: "https://orilo.io/",
  image: "/images/projects/orilo-live.jpg",
  live: true,
};

export const featuredClients = [
  {
    slug: "reinforce-gym",
    name: "Reinforce Gym",
    url: "https://www.reinforcegym.com/",
    image: "/images/projects/reinforce.jpg",
    blurb: "A 24/7 gym site that can carry the floor.",
  },
  {
    slug: "prime-stretch",
    name: "Prime Stretch",
    url: "https://primestretchpa.com/",
    image: "/images/projects/prime-stretch.jpg",
    blurb: "A quiet front door for assisted stretching.",
  },
  {
    slug: "pevarnik",
    name: "Pevarnik Bros.",
    url: "https://pevarnik.com/",
    image: "/images/projects/pevarnik.jpg",
    blurb: "A contractor site that can carry the work.",
  },
] as const;

export const connectiveApp = {
  name: "Connective Fitness APP",
  status: "Development in Progress",
  icon: "/images/brand/connective-icon.svg",
  summary:
    "Holistic software that sits between a gym and its members. Scan-in access, a personal training dashboard, an AI assistant, generated training plans, nutrition, and recovery — practical information both sides can actually use.",
  users: [
    { title: "For the gym", body: "Scan-in access and a live picture of who’s on the floor." },
    { title: "For the member", body: "Training, diet, and recovery in one dashboard — not five apps." },
  ],
} as const;

export const practice = [
  {
    id: "llm",
    title: "Large language models",
    body: "Daily work in Grok and other frontier models — drafting, research, and getting a model to actually ship instead of demo.",
    hog: { name: "Grok", src: "/images/brand/grok.svg" },
  },
  {
    id: "agentic",
    title: "Agentic frameworks",
    body: "Grok Bot and the rest: agents with their own computer, running overnight, finishing the work instead of chatting about it.",
    hog: { name: "Grok Bot", src: "/images/brand/grok-bot.svg" },
  },
  {
    id: "cloud",
    title: "Cloud agents",
    body: "Codex and cloud coding agents inside the studio — the hands that help Orilo design, ship, and look after sites.",
    hog: { name: "Codex", src: "/images/brand/codex.svg" },
  },
] as const;

export const education = {
  school: "Ohio University",
  line: "Proud Bobcat",
  degree: "B.S. Biology, honors",
  place: "Athens, Ohio",
  bio: "I transferred to Athens in 2022 and finished on College Green — biology, honors, and the years that still sit behind the work.",
  image: "/images/ohio/college-green.jpg",
  alt: "College Green at Ohio University, Cutler Hall at the end of the brick walk",
} as const;
