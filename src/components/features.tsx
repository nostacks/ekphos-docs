const FEATURES = [
  {
    n: "01",
    name: "Three panels",
    body: "Notes on the left, content in the middle, outline on the right. Tab moves between them.",
  },
  {
    n: "02",
    name: "Vim keybindings",
    body: "Navigate and edit with hjkl, w, b, 0, $ and the motions you already know.",
  },
  {
    n: "03",
    name: "Wiki links",
    body: "Link notes with [[note]] and get autocomplete as you type.",
  },
  {
    n: "04",
    name: "Graph view",
    body: "See how your notes connect in an interactive graph with Ctrl+g.",
  },
  {
    n: "05",
    name: "Fast search",
    body: "Fuzzy file search and full text search across every note with Ctrl+k.",
  },
  {
    n: "06",
    name: "Journal",
    body: "Open or create today's dated note with a single key.",
  },
  {
    n: "07",
    name: "Inline images",
    body: "Preview images in iTerm2, Kitty, WezTerm, Ghostty and Sixel terminals.",
  },
  {
    n: "08",
    name: "Themes",
    body: "TOML based theming with a live theme picker on Ctrl+t.",
  },
];

export function Features() {
  return (
    <section className="mt-10">
      <h2 className="font-medium text-text-muted">Features</h2>
      <ul className="mt-4 grid gap-px border border-border bg-border @min-[30rem]:grid-cols-2">
        {FEATURES.map((f) => (
          <li key={f.n} className="bg-bg p-4">
            <h3 className="flex items-baseline gap-3">
              <span className="text-xs text-text-muted tabular-nums">{f.n}</span>
              <span className="font-medium text-text-strong">{f.name}</span>
            </h3>
            <p className="mt-2 leading-relaxed text-text-muted">{f.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
