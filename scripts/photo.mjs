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

// --alt "…" — the description, written here so it lands in the printed
// block ready to paste, rather than being left as an empty string to
// fill in later. Empty strings left to fill in later never get filled.
const altFlag = args.indexOf("--alt");
const alt = altFlag !== -1 ? (args[altFlag + 1] ?? "") : "";

// The index holding --alt's value, or -1 when the flag is absent. Not
// `altFlag + 1`: with no flag that is 0, which silently swallowed the
// input file.
const altValueAt = altFlag === -1 ? -1 : altFlag + 1;
const positional = args.filter(
  (a, i) => !a.startsWith("--") && i !== altValueAt,
);
const [input, id] = positional;

if (!input || !id) {
  console.error(`
  Usage: npm run photo -- <input-file> <id> [--alt "…"] [--no-upload]

    <input-file>  the photo straight off your phone or camera
    <id>          the name it gets on the site, lowercase and hyphenated,
                  e.g. the-signature-box-01. This is what goes in the
                  \`photos\` array in lib/products.ts — no path, no
                  extension.
    --alt         what is in the shot, in your words. Optional, but it
                  is what Google Images reads and what a screen reader
                  says out loud, so it is worth the extra few seconds.

  Several photos for one product? Give them numbered ids and list them
  in order; the first one is the card image.

    npm run photo -- shot1.jpg the-signature-box-01 --alt "Closed, ribbon tied"
    npm run photo -- shot2.jpg the-signature-box-02 --alt "Open, chocolates in rows"
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

// Escape for a double-quoted TS string, so a description containing a
// quote or a backslash pastes in as written instead of breaking the file.
const altLiteral = alt.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

console.log(`
  ── Paste into lib/products.ts ──────────────────────────────────

    photos: [
      { id: "${id}", alt: "${altLiteral}" },
    ],

  Already have photos on that product? Add this line to the array
  instead, in the order you want them shown — the first entry is the
  card image, so lead with your best shot.
${
  alt
    ? ""
    : `
  ⚠ No description. Fill in \`alt\` before you commit: it is what Google
    Images reads and what a screen reader says out loud, and it is the
    only place the details of this shot ever get written down.

    Describe the photograph, not the product:
      ✗ "The Signature Box"
      ✓ "Open, chocolates in rows beside the calligraphy card"
`
}`);
