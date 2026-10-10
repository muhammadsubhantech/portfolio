import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { SubhanAi } from "@/components/chat/subhan-ai";
import { Atmosphere } from "@/components/layout/atmosphere";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { BootLoader } from "@/components/motion/boot-loader";
import { ScrollProgress } from "@/components/motion/scroll-progress";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="site-shell min-h-dvh">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <BootLoader />
      <Atmosphere />
      <ScrollProgress />
      <Navbar />
      <main id="main" key={pathname} className="page-enter pb-16 md:pb-8">
        {children}
      </main>
      <Footer />
      <SubhanAi />
    </div>
  );
}
