#!/usr/bin/env node
/**
 * One command per photograph: resize, compress, and drop it straight
 * into public/photos/ — then print the line to paste into
 * lib/products.ts.
 *
 *   npm run photo -- ~/Desktop/DSC_0041.jpg the-birthday-box-01 \
 *     --alt Closed, ribbon tied, the painted name plaque facing up
 *
 * No upload, no dashboard, no waiting. The file lands in the folder and
 * ships with the next commit. Photos are small enough (~200 KB) that
 * git carries them happily, and serving them from the site's own domain
 * is the plainest signal to Google Images.
 *
 * Video is the opposite case and still goes to Cloudflare — clips are
 * 3–5 MB and git keeps every version of a binary forever. See
 * `npm run video`.
 *
 * Needs ffmpeg on PATH. Nothing else.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

/** Where the files land. Matches PHOTO_DIR in lib/media.ts. */
const DEST = join(process.cwd(), "public", "photos");
/** Wide enough for a full-bleed shot on a laptop, no wider. */
const WIDTH = 1600;
/** Above this a product card starts to cost real time on 3G. */
const TARGET_KB = 300;

const args = process.argv.slice(2);

// --alt … — the description, written here so it lands in the printed
// block ready to paste, rather than being left as an empty string to
// fill in later. Empty strings left to fill in later never get filled.
//
// Everything after --alt is taken as the description, up to the next
// --flag or the end. That is not laziness: `npm run` on Windows strips
// the quotes off arguments, so a quoted sentence arrives as a dozen
// separate words. Reading only the next one would keep "Top-down" and
// silently bin the rest of the sentence.
const altFlag = args.indexOf("--alt");
let altEnd = altFlag;
const altWords = [];
if (altFlag !== -1) {
  for (let i = altFlag + 1; i < args.length && !args[i].startsWith("--"); i++) {
    altWords.push(args[i]);
    altEnd = i;
  }
}
const alt = altWords.join(" ");

// Positional args are everything that is not a flag and not part of
// the description. The `altFlag !== -1` guard matters: without it the
// range test is true from index 0 and swallows the input file.
const positional = args.filter(
  (a, i) => !a.startsWith("--") && !(altFlag !== -1 && i > altFlag && i <= altEnd),
);
const [input, id] = positional;

if (!input || !id) {
  console.error(`
  Usage: npm run photo -- <input-file> <id> [--alt …]

    <input-file>  the photo straight off your phone or camera
    <id>          the name it gets on the site, lowercase and hyphenated,
                  e.g. the-birthday-box-01. This is what goes in the
                  \`photos\` array in lib/products.ts — no path, no
                  extension.
    --alt         what is in the shot, in your words. Optional, but it
                  is what Google Images reads and what a screen reader
                  says out loud, so it is worth the extra few seconds.

  Several photos for one product? Give them numbered ids and list them
  in order; the first one is the card image.

    npm run photo -- shot1.jpg the-birthday-box-01 --alt Closed, ribbon tied
    npm run photo -- shot2.jpg the-birthday-box-02 --alt Open, chocolates in rows
`);
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(id)) {
  console.error(`  ✗ "${id}" — ids are lowercase letters, digits and hyphens.`);
  console.error(`    The id becomes a URL, so anything else will bite later.`);
  process.exit(1);
}

// Check the file before handing it to ffmpeg, whose failure is forty
// lines of build configuration followed by a stack trace.
//
// The usual cause is punctuation in the file name. PowerShell reads
// ( ) [ ] as syntax, so box1(1).jpeg reaches us as "box1" with the
// rest eaten — which looks like the script is broken when it is the
// shell that rewrote the argument.
if (!existsSync(input)) {
  console.error(`\n  ✗ No file at:\n      ${input}\n`);
  if (/[()[\]{}&^!% ]/.test(input) || !/\.\w+$/.test(input)) {
    console.error(
      `  That path looks cut short or has punctuation in it. PowerShell\n` +
      `  treats ( ) [ ] & ^ ! % and spaces as syntax, so a name like\n` +
      `  box1(1).jpeg arrives here as box1.\n\n` +
      `  Easiest fix: rename the file so it is plain — box1-1.jpeg —\n` +
      `  then run the command again.\n`,
    );
  }
  process.exit(1);
}

mkdirSync(DEST, { recursive: true });
const out = join(DEST, `${id}.jpg`);
const replacing = existsSync(out);

console.log(`\n  Resizing ${input} …`);
execFileSync("ffmpeg", [
  "-y", "-i", input,
  // Never upscale: a photo already narrower than WIDTH is left alone.
  "-vf", `scale='min(${WIDTH},iw)':-2`,
  // 2–5 is the useful range here; 3 is indistinguishable from the
  // original on a screen and roughly a third of the bytes.
  "-q:v", "3",
  out,
], { stdio: "inherit", shell: process.platform === "win32" });

const kb = statSync(out).size / 1024;
console.log(`\n  public/photos/${id}.jpg  ${Math.round(kb)} KB${replacing ? "  (replaced)" : ""}`);
if (kb > TARGET_KB) {
  console.log(
    `\n  ⚠ Over the ${TARGET_KB} KB budget. Raise -q:v 3 to 5 in this\n` +
    `    script, or crop the shot tighter before running it.`,
  );
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
}  Then: git add -A && git commit`);
