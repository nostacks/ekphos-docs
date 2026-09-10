import Link from "next/link";
import { GITHUB_URL } from "@/lib/github";
import { Logo } from "./logo";

const link =
  "underline decoration-border-strong transition-[color,text-decoration-color] duration-150 hover:text-text-strong hover:decoration-text-strong";

export function SiteFooter() {
  return (
    <footer className="mt-16 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border pt-6 text-xs text-text-muted">
      <p className="inline-flex items-center gap-2">
        <Logo className="size-3 text-accent" />
        <span>
          ekphos <span className="mx-1">&middot;</span> MIT
        </span>
      </p>
      <p>
        <a href={GITHUB_URL} className={link}>
          GitHub
        </a>
        <span className="mx-2">&middot;</span>
        <Link href="/docs" className={link}>
          Docs
        </Link>
        <span className="mx-2">&middot;</span>
        <a href="https://nostacks.xyz" className={link}>
          made in nostacks labs
        </a>
      </p>
    </footer>
  );
}
