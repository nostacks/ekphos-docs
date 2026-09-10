import type { ReactNode } from "react";
import Link from "next/link";

const base =
  "inline-flex h-7 items-center gap-1.5 border border-border-strong px-2 text-xs text-text-muted";
const interactive =
  base +
  " transition-[color,border-color,scale] duration-150 hover:border-text-strong hover:text-text-strong active:scale-[0.96]";

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function Chip({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) {
    return <span className={base}>{children}</span>;
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={interactive}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={interactive}>
      {children}
      <Arrow />
    </a>
  );
}
