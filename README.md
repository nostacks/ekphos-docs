# ekphos-docs

Website for [ekphos](https://github.com/nostacks/ekphos), a lightweight, fast, terminal-based markdown research tool built with Rust.

The landing page is served at `/` and the documentation at `/docs`.

## Development

```bash
npm install
npm run dev
```

## Deployment

The site is exported as static files and served by Cloudflare Workers static assets. `workers_dev` is disabled in `wrangler.jsonc`, so the Worker needs a custom domain or route attached in the Cloudflare dashboard.

```bash
npm run preview
npm run deploy
```

The release version on the landing page is fetched from GitHub at build time. Set `GITHUB_TOKEN` in the build environment to avoid API rate limits.

## Assets

The logo lives in `src/components/logo.tsx`. Favicons and the OG image are generated from it:

```bash
npm run assets
```

This needs Bun and Google Chrome installed and writes to `public/`.

## Contributing

1. Fork the repo
2. Create a branch (`git checkout -b fix/typo`)
3. Edit docs in `content/docs/*.mdx`
4. Test locally with `npm run dev`
5. Submit a PR

Docs use [MDX](https://mdxjs.com) with [Fumadocs components](https://fumadocs.dev/docs/ui/components).

## Built with

- [Fumadocs](https://fumadocs.dev) - Next.js documentation framework
- [Next.js](https://nextjs.org)
