import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { GestureController } from "@/components/motion/gesture-controller";
import { SiteShell } from "@/components/layout/site-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { AuthProvider } from "@/lib/auth/provider";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";
import { SITE } from "@/data/site";
import appCss from "../styles.css?url";

const THEME_BOOT =
  "(function(){try{var t=localStorage.getItem('ms-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}else{document.documentElement.dataset.theme='dark';}}catch(e){document.documentElement.dataset.theme='dark';}})();";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${SITE.name} | AI/ML Engineer | Python, AI & Data` },
      { name: "theme-color", content: "#0a0c0b" },
      { name: "application-name", content: SITE.brand },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
      },
    ],
  }),
  notFoundComponent: NotFound,
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" data-theme="dark" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body>
        <PreviewHostBridge />
        <JsonLd data={personJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <AuthProvider>
          <Outlet />
          <GestureController />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-2xl px-4 py-28 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">404</p>
        <h1 className="mt-4 font-display text-4xl text-fg">This page is not here.</h1>
        <p className="mt-4 text-muted">
          The link may be out of date. Return home or browse projects and notes.
        </p>
        <a href="/" className="mt-8 inline-flex text-accent hover:text-accent-strong">
          Back to home
        </a>
      </section>
    </SiteShell>
  );
}
