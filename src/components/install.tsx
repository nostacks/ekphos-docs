"use client";

import { useEffect, useId, useState } from "react";

const METHODS = [
  { id: "cargo", name: "Cargo", lines: ["cargo install ekphos"] },
  { id: "brew", name: "Homebrew", lines: ["brew install ekphos"] },
  {
    id: "make",
    name: "Make",
    lines: [
      "git clone https://github.com/nostacks/ekphos.git",
      "cd ekphos",
      "make",
      "sudo make install",
    ],
  },
  {
    id: "docker",
    name: "Docker",
    lines: [
      "git clone https://github.com/nostacks/ekphos.git",
      "cd ekphos",
      "docker build -t ekphos-ssh .",
      "docker compose up -d",
      "ssh ekphos@localhost",
    ],
  },
];

const tab =
  "inline-flex h-7 items-center border px-2 text-xs transition-[color,border-color,scale] duration-150 active:scale-[0.96]";
const tabIdle =
  tab +
  " border-border-strong text-text-muted hover:border-text-strong hover:text-text-strong";
const tabActive = tab + " border-text-strong text-text-strong";

export function Install() {
  const [active, setActive] = useState(METHODS[0].id);
  const [copied, setCopied] = useState(false);
  const baseId = useId();
  const method = METHODS.find((m) => m.id === active) ?? METHODS[0];
  const command = method.lines.join("\n");

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <h2 className="font-medium text-text-muted">Install</h2>
        <div
          role="tablist"
          aria-label="Install method"
          className="flex flex-wrap gap-2"
        >
          {METHODS.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${m.id}`}
              aria-selected={m.id === active}
              aria-controls={`${baseId}-panel-${m.id}`}
              tabIndex={m.id === active ? 0 : -1}
              className={m.id === active ? tabActive : tabIdle}
              onClick={() => {
                setActive(m.id);
                setCopied(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                e.preventDefault();
                const i = METHODS.findIndex((x) => x.id === active);
                const next =
                  METHODS[
                    (i + (e.key === "ArrowRight" ? 1 : METHODS.length - 1)) %
                      METHODS.length
                  ];
                setActive(next.id);
                setCopied(false);
                document.getElementById(`${baseId}-tab-${next.id}`)?.focus();
              }}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>
      <div
        role="tabpanel"
        id={`${baseId}-panel-${method.id}`}
        aria-labelledby={`${baseId}-tab-${method.id}`}
        className="mt-4 flex items-center justify-between gap-4 border border-border bg-term p-4"
      >
        <pre className="overflow-x-auto leading-[1.6]">
          {method.lines.map((line) => (
            <span key={line} className="block">
              <span className="text-text-muted">$ </span>
              <code className="text-text-strong">{line}</code>
            </span>
          ))}
        </pre>
        <button
          type="button"
          aria-label={copied ? "Copied" : "Copy install command"}
          className="inline-flex h-7 shrink-0 items-center border border-border-strong px-2 text-xs text-text-muted transition-[color,border-color,scale] duration-150 hover:border-text-strong hover:text-text-strong active:scale-[0.96]"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(command);
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
        >
          {copied ? <span className="text-ok">copied</span> : "copy"}
        </button>
      </div>
    </div>
  );
}
