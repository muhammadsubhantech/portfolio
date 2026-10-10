import { SITE, SOCIALS } from "@/data/site";

export function pageHead(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string;
}) {
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
    ],
    links: [{ rel: "canonical", href: opts.path }],
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    alternateName: SITE.brand,
    jobTitle: SITE.titleRole,
    description: SITE.shortBio,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    image: "/images/profile-portrait.jpg",
    url: "/about",
    knowsAbout: [...SITE.interests],
    sameAs: SOCIALS.map((item) => item.href),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.brand,
    alternateName: SITE.name,
    description: SITE.shortBio,
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
      item: item.path,
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
    author: { "@type": "Person", name: SITE.name },
    image: opts.image,
    mainEntityOfPage: opts.path,
  };
}
