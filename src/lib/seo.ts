import { site } from "@/data/site";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName,
    url: "https://thomasvoelker.dev/",
    image: "https://thomasvoelker.dev/assets/profile/thomas-portrait.jpg",
    email: site.email,
    jobTitle: site.jobTitle,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Greensburg",
      addressRegion: "PA",
      addressCountry: "US",
    },
    affiliation: [
      { "@type": "Organization", name: "7homais Limited", url: "https://7homais.co/" },
      { "@type": "Organization", name: "Orilo", url: site.orilo.url },
    ],
    sameAs: site.socials.map((s) => s.href),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: "https://thomasvoelker.dev/",
    description: site.description,
  };
}
