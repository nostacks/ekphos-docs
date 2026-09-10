import { spawnSync } from "node:child_process";
import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { LOGO_PATH } from "../src/components/logo";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const ACCENT = "#7aa2f7";
const BG = "#121212";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function markSvg(size: number, tile: boolean) {
  const inner = tile ? Math.round(size * 0.62) : size;
  const offset = (size - inner) / 2;
  const rect = tile ? `<rect width="${size}" height="${size}" fill="${BG}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges">${rect}<svg x="${offset}" y="${offset}" width="${inner}" height="${inner}" viewBox="0 0 256 256"><path d="${LOGO_PATH}" fill="${ACCENT}"/></svg></svg>`;
}

async function png(size: number, tile: boolean) {
  return sharp(Buffer.from(markSvg(size, tile))).png().toBuffer();
}

function ico(images: { size: number; data: Buffer }[]) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries: Buffer[] = [];
  let offset = 6 + 16 * images.length;
  for (const img of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(img.size >= 256 ? 0 : img.size, 0);
    e.writeUInt8(img.size >= 256 ? 0 : img.size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(img.data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += img.data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

async function og() {
  const template = await readFile(path.join(ROOT, "scripts/og.html"), "utf8");
  const html = template.replace("__LOGO_PATH__", LOGO_PATH);
  const tmp = path.join(ROOT, "scripts/.og.render.html");
  await writeFile(tmp, html);
  const out = path.join(PUBLIC, "og.png");
  const proc = spawnSync(
    CHROME,
    [
      "--headless=new",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--window-size=1200,630",
      `--screenshot=${out}`,
      `file://${tmp}`,
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );
  await rm(tmp, { force: true });
  if (proc.status !== 0) {
    throw new Error(`chrome exited with ${proc.status}: ${proc.stderr.toString()}`);
  }
  const meta = await sharp(out).metadata();
  if (meta.width !== 1200 || meta.height !== 630) {
    throw new Error(`og.png is ${meta.width}x${meta.height}, expected 1200x630`);
  }
}

await mkdir(PUBLIC, { recursive: true });

await writeFile(path.join(PUBLIC, "favicon.svg"), markSvg(256, false));
await writeFile(path.join(PUBLIC, "apple-touch-icon.png"), await png(180, true));
await writeFile(path.join(PUBLIC, "icon-512.png"), await png(512, true));

const icoImages: { size: number; data: Buffer }[] = [];
for (const size of [16, 32, 48]) {
  icoImages.push({ size, data: await png(size, true) });
}
await writeFile(path.join(PUBLIC, "favicon.ico"), ico(icoImages));

try {
  await access(CHROME);
} catch {
  throw new Error(`Google Chrome not found at ${CHROME}; og.png was not rendered`);
}
await og();

console.log("assets written to public/");
