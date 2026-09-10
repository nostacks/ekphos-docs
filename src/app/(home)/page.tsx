import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Chip } from "@/components/chip";
import { Features } from "@/components/features";
import { Install } from "@/components/install";
import { getRepoInfo, GITHUB_URL } from "@/lib/github";

const SITE = "https://ekphos.xyz";
const TITLE = "ekphos - a markdown research tool for your terminal";
const DESCRIPTION =
  "A lightweight, fast, terminal-based markdown research tool written in Rust.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: SITE + "/" },
  openGraph: {
    type: "website",
    siteName: "ekphos",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE + "/",
    images: [{ url: SITE + "/og.png", width: 1200, height: 630, alt: "ekphos logo" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nostackslab",
    title: TITLE,
    description: DESCRIPTION,
    images: [SITE + "/og.png"],
  },
};

export default async function HomePage() {
  const { version } = await getRepoInfo();

  return (
    <>
      <p className="mt-8 max-w-[60ch] leading-relaxed">{DESCRIPTION}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        <li>
          <Chip href={GITHUB_URL}>Source</Chip>
        </li>
        <li>
          <Chip href="/docs">Docs</Chip>
        </li>
        <li>
          <Chip href="https://crates.io/crates/ekphos">crates.io</Chip>
        </li>
        {version ? (
          <li>
            <Chip href={`${GITHUB_URL}/releases/latest`}>{version}</Chip>
          </li>
        ) : null}
      </ul>

      <section className="mt-10">
        <Install />
        <p className="mt-4 max-w-[60ch] leading-relaxed text-text-muted">
          ekphos is in early development and moves fast. Update often, and read the{" "}
          <Link
            href="/docs/getting-started"
            className="underline decoration-border-strong transition-[color,text-decoration-color] duration-150 hover:text-text-strong hover:decoration-text-strong"
          >
            getting started guide
          </Link>{" "}
          for first steps.
        </p>
      </section>

      <figure className="mt-10">
        <Image
          src="/ekphos-example.png"
          alt="ekphos in the terminal: a notes sidebar, the rendered note, and an outline panel"
          width={3024}
          height={1896}
          priority
          className="h-auto w-full"
        />
      </figure>

      <Features />
    </>
  );
}
