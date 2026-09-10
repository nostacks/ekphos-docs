import Link from "next/link";
import { Logo } from "./logo";

export function SiteHeader() {
  return (
    <header>
      <Link
        href="/"
        className="inline-flex items-center gap-3 text-text-strong no-underline"
        aria-label="ekphos home"
      >
        <Logo className="size-4 text-accent" />
        <span className="font-medium leading-tight">ekphos</span>
      </Link>
    </header>
  );
}
