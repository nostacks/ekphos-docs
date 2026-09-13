import Link from "next/link";

const GLOW =
  "radial-gradient(135% 105% at 100% 0%, color-mix(in oklab, var(--accent) 32%, transparent), transparent 58%), radial-gradient(95% 80% at 0% 100%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 68%)";

export function WhatsNew() {
  return (
    <Link
      href="/docs/whats-new"
      className="relative block overflow-hidden border bg-fd-popover p-3 transition-colors hover:bg-fd-accent"
      style={{ borderColor: "var(--rule-accent-strong)" }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: GLOW }}
      />
      <span aria-hidden="true" className="absolute end-3 top-3 grid grid-cols-2 gap-[3px]">
        <span className="size-[5px] bg-fd-primary/30" />
        <span className="size-[5px] bg-fd-primary/60" />
        <span className="size-[5px] bg-fd-primary/15" />
        <span className="size-[5px] bg-fd-primary/35" />
      </span>
      <span className="relative block text-xs text-fd-primary">What&apos;s new</span>
    </Link>
  );
}
