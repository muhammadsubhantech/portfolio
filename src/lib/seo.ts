import { SITE, SOCIALS } from "@/data/site";

const SITE_URL = "https://muhammadsubhantech.vercel.app";

function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function pageHead(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string;
}) {
  const canonical = absoluteUrl(opts.path);
  const image = absoluteUrl("/og.jpg");

  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { name: "author", content: SITE.name },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      {
        name: "keywords",
        content:
          opts.keywords ??
          "Muhammad Subhan, Muhammad Subhan Tech, AI ML Engineer Pakistan, AI ML Engineer Karachi, Aspiring AI ML Engineer, Python, Machine Learning, Agentic AI, Data Engineering, SQL",
      },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:url", content: canonical },
      { property: "og:type", content: "website" },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#person"),
    name: SITE.name,
    alternateName: SITE.brand,
    jobTitle: SITE.titleRole,
    description: SITE.shortBio,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    image: absoluteUrl("/images/profile-portrait.jpg"),
    url: absoluteUrl("/about"),
    knowsAbout: [...SITE.interests],
    sameAs: SOCIALS.map((item) => item.href),
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl("/about#profile"),
    url: absoluteUrl("/about"),
    name: `About ${SITE.name}`,
    mainEntity: {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.brand,
    alternateName: SITE.name,
    description: SITE.shortBio,
    url: absoluteUrl("/"),
    inLanguage: "en",
    publisher: {
      "@type": "Person",
      name: SITE.name,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  date: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    dateModified: opts.date,
    author: {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: SITE.name,
      url: absoluteUrl("/about"),
    },
    image: absoluteUrl(opts.image),
    mainEntityOfPage: absoluteUrl(opts.path),
  };
}
