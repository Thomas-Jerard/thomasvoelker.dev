import {
  connectiveApp,
  education,
  featuredClients,
  featuredVenture,
  site,
} from "@/data/site";

export const SITE_ORIGIN = "https://thomasvoelker.dev";
export const OG_IMAGE = `${SITE_ORIGIN}/og.jpg`;

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  if (path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path}`;
}

type PageHeadInput = {
  path: string;
  title: string;
  description: string;
  image?: string;
};

export function pageHead({ path, title, description, image = OG_IMAGE }: PageHeadInput) {
  const url = absoluteUrl(path);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.name },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${site.fullName} — Founder of Orilo` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@voelker_thomas" },
      { name: "twitter:creator", content: "@voelker_thomas" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const pages = {
  home: {
    path: "/",
    title: site.title,
    description: site.description,
  },
  about: {
    path: "/about",
    title: "About — Thomas Voelker",
    description:
      "Thomas Jerard Voelker is a founder, developer, and product builder in Greensburg, Pennsylvania. He leads 7homais Limited and Orilo.",
  },
  work: {
    path: "/work",
    title: "Work — Thomas Voelker",
    description:
      "Orilo, the studio’s client sites, and connective software for gyms — selected work by Thomas Voelker.",
  },
  contact: {
    path: "/contact",
    title: "Contact — Thomas Voelker",
    description: `Email ${site.email}. Thomas Voelker — founder of Orilo in Greensburg, Pennsylvania.`,
  },
  orilo: {
    path: "/work/orilo",
    title: "Orilo — Thomas Voelker",
    description: featuredVenture.summary,
  },
  connective: {
    path: "/work/connective-fitness",
    title: "Connective Fitness APP — Thomas Voelker",
    description: connectiveApp.summary,
  },
} as const;

export function clientPage(slug: string) {
  const client = featuredClients.find((c) => c.slug === slug);
  if (!client) return null;
  return {
    path: `/work/${client.slug}`,
    title: `${client.name} — Orilo client · Thomas Voelker`,
    description: `${client.name}: ${client.blurb} A live site designed and looked after by Orilo.`,
  };
}

export const sitemapPaths = [
  "/",
  "/about",
  "/work",
  "/work/orilo",
  "/work/connective-fitness",
  ...featuredClients.map((c) => `/work/${c.slug}`),
  "/contact",
] as const;

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_ORIGIN}/#person`,
    name: site.fullName,
    givenName: "Thomas",
    additionalName: "Jerard",
    familyName: "Voelker",
    url: `${SITE_ORIGIN}/`,
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(site.portrait.src),
      caption: site.portrait.alt,
    },
    email: site.email,
    jobTitle: site.jobTitle,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Greensburg",
      addressRegion: "PA",
      addressCountry: "US",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education.school,
      url: "https://www.ohio.edu/",
    },
    worksFor: { "@id": `${SITE_ORIGIN}/#orilo` },
    founder: [
      { "@id": `${SITE_ORIGIN}/#orilo` },
      {
        "@type": "Organization",
        name: "7homais Limited",
        url: "https://7homais.co/",
      },
    ],
    knowsAbout: [
      "Web development",
      "Product development",
      "SEO",
      "Large language models",
      "Agentic frameworks",
      "Fitness technology",
    ],
    sameAs: [
      ...site.socials.map((s) => s.href),
      "https://github.com/Thomas-Jerard",
    ],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#orilo`,
    name: "Orilo",
    url: site.orilo.url,
    description: site.orilo.pitch,
    founder: { "@id": `${SITE_ORIGIN}/#person` },
    parentOrganization: {
      "@type": "Organization",
      name: "7homais Limited",
      url: "https://7homais.co/",
    },
    areaServed: "United States",
    knowsAbout: ["Web design", "Website hosting", "SEO", "Website maintenance"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    name: site.name,
    url: `${SITE_ORIGIN}/`,
    description: site.description,
    inLanguage: "en-US",
    publisher: { "@id": `${SITE_ORIGIN}/#person` },
  };
}

export function webPageJsonLd(
  path: string,
  name: string,
  description: string,
  type: "WebPage" | "CollectionPage" | "ProfilePage" | "ContactPage" = "WebPage",
) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    about: { "@id": `${SITE_ORIGIN}/#person` },
    inLanguage: "en-US",
  };
}

export function workListJsonLd() {
  const entries = [
    { name: featuredVenture.name, path: "/work/orilo" },
    { name: connectiveApp.name, path: "/work/connective-fitness" },
    ...featuredClients.map((c) => ({ name: c.name, path: `/work/${c.slug}` })),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected work",
    itemListElement: entries.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function projectJsonLd(input: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: input.url,
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    creator: { "@id": `${SITE_ORIGIN}/#person` },
    provider: { "@id": `${SITE_ORIGIN}/#orilo` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
