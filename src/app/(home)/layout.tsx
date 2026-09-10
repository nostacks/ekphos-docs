import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="landing min-h-screen w-full overflow-x-clip bg-bg text-text">
      <main className="@container w-full max-w-2xl px-6 py-16 md:px-16 md:py-24">
        <SiteHeader />
        {children}
        <SiteFooter />
      </main>
      <div
        className="noise pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-screen"
        aria-hidden="true"
      />
    </div>
  );
}
