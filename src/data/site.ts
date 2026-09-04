export const site = {
  name: "Thomas Voelker",
  fullName: "Thomas Jerard Voelker",
  title: "Thomas Voelker — Founder of Orilo",
  jobTitle: "Founder, developer, and product builder",
  location: "Greensburg, Pennsylvania",
  email: "thomas@orilo.io",
  agent: {
    name: "Sara",
    role: "Personal Assistant",
    phone: "+12137290516",
    display: "(213) 729-0516",
  },
  availability: "Available for select projects",
  headline: "I build cool stuff with AI",
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
    blurb: "A 24/7 gym site displaying amenities and features.",
  },
  {
    slug: "prime-stretch",
    name: "Prime Stretch",
    url: "https://primestretchpa.com/",
    image: "/images/projects/prime-stretch.jpg",
    blurb: "A site displaying a rehabilitation and physical support studio.",
  },
  {
    slug: "pevarnik",
    name: "Pevarnik Bros.",
    url: "https://pevarnik.com/",
    image: "/images/projects/pevarnik.jpg",
    blurb: "A contractor site resembling professional commercial work.",
  },
] as const;

export const connectiveApp = {
  name: "Connective Fitness APP",
  status: "Development in Progress",
  icon: "/images/brand/connective-icon.svg",
  summary:
    "Holistic software that sits between a gym and its members. Scan-in access, a personal training dashboard, an AI assistant, generated training plans, nutrition, and recovery. Providing practical use cases for members and staff alike.",
  users: [
    { title: "For the gym", body: "Scan-in access and a live picture of who’s on the floor." },
    { title: "For the member", body: "Scan-in, training, diet, recovery, and gym classes all under one roof." },
  ],
} as const;

export const practice = [
  {
    id: "llm",
    title: "Large language models",
    brief: "Daily work in Grok and other frontier models.",
    more: "Drafting, research, and getting a model to actually ship instead of a demo.",
    hog: { name: "Grok", src: "/images/brand/grok.svg" },
  },
  {
    id: "agentic",
    title: "Agentic frameworks",
    brief: "Grok Bot and agents that run with their own computer.",
    more: "Overnight jobs that finish the work instead of chatting about it.",
    hog: { name: "Grok Bot", src: "/images/brand/grok-bot.svg" },
  },
  {
    id: "cloud",
    title: "Cloud agents",
    brief: "Codex and cloud coding agents inside the studio.",
    more: "The hands that help Orilo design, ship, and look after sites.",
    hog: { name: "Codex", src: "/images/brand/codex.svg" },
  },
] as const;

export const education = {
  school: "Ohio University",
  line: "Proud Bobcat",
  degree: "B.S. Biology, honors",
  place: "Athens, Ohio",
  bio: "I transferred to Athens in 2022 and finished on College Green",
  more: "I spent my time in Athens studying biology with intent to continue to Medical or PA school. While studying, I worked as a bartender at Broney's and trained regularly. My training eventually led to competing in an amateur body building competition the Natural Ohio in 2023. Later, I trained clients. I provided customized nutrition plans, training protocols, and supplement recommendations directly contributing to multiple client successes.",
  image: "/images/ohio/college-green.jpg",
  alt: "Rufus the Bobcat on a snowy College Green at Ohio University",
} as const;

export const about = {
  title: "Who is Thomas Voelker?",
  lead: "Developer, product builder, entrepreneur, and AI analyst. Currently building useful digital experiences and leading 7homais Limited, the company behind Orilo.",
  studio:
    "When I founded Orilo, my goal was simple. Create a web design agency to help small businesses and creators build a reputable online presence without need for a large upfront deposit. The studio is founder-led and agent-backed, focusing on: design, upkeep, hosting, and SEO for our clients that need website help.",
  path: "While building Orilo, I assist in post-training AI models for frontier labs. Before that, I worked in healthcare on a cardiac PCU at UPMC. Moreover, I have spent time in operations at ADP and Capstone Logistics.",
  product:
    "Independently, I am working on building connective software for gyms and their members. This software's capabilities are designed to help bridge the gap between large commercial gyms and smaller locally owned locations.",
  future: "I continue to expand my work into various ventures and have some awesome aspirations for future projects",
  place: "Pittsburgh Metro 📍",
} as const;

export const craft = [
  "Web development",
  "Product development",
  "UI / UX design",
  "Creative direction",
  "Brand systems",
  "Managed websites",
  "Fitness",
  "Health & fitness technology",
] as const;

export const companies = [
  {
    name: "7homais Limited",
    status: "Operating",
    role: "Owner · Founder · CEO",
    body: "The product company behind Orilo and independent digital ventures.",
  },
  {
    name: "Orilo",
    status: "Operating",
    role: "Owner · Founder · CEO",
    body: "A managed web studio creating and caring for high-quality websites for businesses and creators.",
    href: "https://orilo.io/",
  },
] as const;

export const hobbies = [
  {
    id: "bodybuilding",
    name: "Competitive bodybuilding",
    body: "Training with structure, discipline, and a long view of progress.",
    image: "/images/hobbies/bodybuilding.jpg",
    alt: "Thomas posing during a bodybuilding competition",
  },
  {
    id: "baseball",
    name: "Baseball",
    body: "The pace, detail, and strategy of the game—from college baseball to the majors.",
    image: "/images/hobbies/baseball.jpg",
    alt: "Baseball gloves resting along a stadium rail",
  },
  {
    id: "fortnite",
    name: "Fortnite",
    body: "A competitive reset built around fast decisions, mechanics, and squad play.",
    image: "/images/hobbies/gaming.jpg",
    alt: "A blue and purple illuminated gaming room",
  },
] as const;
