#!/usr/bin/env node
/**
 * One command per photograph: resize, compress, upload to R2, and print
 * the line to paste into lib/products.ts.
 *
 *   npm run photo -- ~/Desktop/DSC_0041.jpg the-signature-box
 *
 * Photographs are what the catalogue runs on — every grid card and the
 * whole product-page gallery — so this is the script you will reach for
 * most often. `npm run video` is now for the home page only.
 *
 * Needs ffmpeg on PATH (it resizes stills perfectly well, and it is
 * already required for video, so there is nothing extra to install).
 * Uploading needs wrangler, which authenticates in your browser the
 * first time (`npx wrangler login`) — no API token to copy around and
 * nothing secret kept in a file.
 *
 * Pass --no-upload to only produce the file and put it in the R2
 * dashboard by hand.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BUCKET = "heartmade-media";
const PREFIX = "photos";
/** Wide enough for a full-bleed shot on a laptop, no wider. */
const WIDTH = 1600;
/** Above this a product card starts to cost real time on 3G. */
const TARGET_KB = 300;

const args = process.argv.slice(2);
const upload = !args.includes("--no-upload");
const [input, id] = args.filter((a) => !a.startsWith("--"));

if (!input || !id) {
  console.error(`
  Usage: npm run photo -- <input-file> <id> [--no-upload]

    <input-file>  the photo straight off your phone or camera
    <id>          the name it gets on the site, lowercase and hyphenated,
                  e.g. the-signature-box-01. This is what goes in the
                  \`photos\` array in lib/products.ts — no path, no
                  extension.

  Several photos for one product? Give them numbered ids and list them
  in order; the first one is the card image.

    npm run photo -- shot1.jpg the-signature-box-01
    npm run photo -- shot2.jpg the-signature-box-02
`);
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(id)) {
  console.error(`  ✗ "${id}" — ids are lowercase letters, digits and hyphens.`);
  console.error(`    The id becomes a URL, so anything else will bite later.`);
  process.exit(1);
}

const run = (cmd, cmdArgs) =>
  execFileSync(cmd, cmdArgs, { stdio: "inherit", shell: process.platform === "win32" });

const work = mkdtempSync(join(tmpdir(), "hmc-"));
const out = join(work, `${id}.jpg`);

console.log(`\n  Resizing ${input} …`);
run("ffmpeg", [
  "-y", "-i", input,
  // Never upscale: a photo already narrower than WIDTH is left alone.
  "-vf", `scale='min(${WIDTH},iw)':-2`,
  // 2–5 is the useful range here; 3 is indistinguishable from the
  // original on a screen and roughly a third of the bytes.
  "-q:v", "3",
  out,
]);

const kb = statSync(out).size / 1024;
console.log(`\n  ${id}.jpg  ${Math.round(kb)} KB`);
if (kb > TARGET_KB) {
  console.log(
    `\n  ⚠ Over the ${TARGET_KB} KB budget. Raise -q:v 3 to 5 in this\n` +
    `    script, or crop the shot tighter before running it.`,
  );
}

if (upload) {
  console.log(`\n  Uploading to ${BUCKET} …`);
  run("npx", [
    "wrangler", "r2", "object", "put",
    `${BUCKET}/${PREFIX}/${id}.jpg`,
    "--file", out, "--content-type", "image/jpeg", "--remote",
  ]);
} else {
  console.log(`\n  Skipped upload. The file is at:\n    ${out}`);
}

console.log(`
  ── Paste into lib/products.ts ──────────────────────────────────

    photos: ["${id}"],

  Already have photos on that product? Add the id to the array instead,
  in the order you want them shown:

    photos: ["the-signature-box-01", "${id}"],

  The first id is the card image, so lead with your best shot.
`);
