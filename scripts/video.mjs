#!/usr/bin/env node
/**
 * One command per clip: compress, pull a poster, upload both to R2, and
 * print the line to paste into lib/products.ts.
 *
 *   npm run video -- ~/Desktop/raw-clip.mp4 the-signature-box
 *
 * Needs ffmpeg on PATH. Uploading needs wrangler, which authenticates in
 * your browser the first time (`npx wrangler login`) — there is no API
 * token to copy around and nothing secret to keep in a file.
 *
 * Pass --no-upload to only compress and make the poster, and put the two
 * files in the R2 dashboard by hand.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BUCKET = "heartmade-media";
const PREFIX = "videos";
/** Our own budget. Above this a clip is slow on a Karachi phone. */
const TARGET_MB = 3;

const args = process.argv.slice(2);
const upload = !args.includes("--no-upload");
const [input, id] = args.filter((a) => !a.startsWith("--"));

if (!input || !id) {
  console.error(`
  Usage: npm run video -- <input-file> <id> [--no-upload]

    <input-file>  the clip straight off your phone
    <id>          the name it gets on the site, lowercase and hyphenated,
                  e.g. the-signature-box. This is what goes in
                  lib/products.ts — no path, no extension.
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
const mp4 = join(work, `${id}.mp4`);
const jpg = join(work, `${id}.jpg`);
const mb = (f) => statSync(f).size / 1024 / 1024;

console.log(`\n  Compressing ${input} …`);
run("ffmpeg", [
  "-y", "-i", input,
  // 1080 wide, height rounded to an even number (h.264 requires it)
  "-vf", "scale=1080:-2",
  "-c:v", "libx264", "-crf", "26", "-preset", "slow",
  "-c:a", "aac", "-b:a", "96k",
  // moves the index to the front so playback can start before the whole
  // file has downloaded — the single most useful flag here
  "-movflags", "+faststart",
  mp4,
]);

console.log(`\n  Pulling the poster …`);
run("ffmpeg", ["-y", "-i", mp4, "-ss", "2", "-vframes", "1", "-q:v", "3", jpg]);

const sizeMb = mb(mp4);
console.log(`\n  ${id}.mp4  ${sizeMb.toFixed(1)} MB`);
console.log(`  ${id}.jpg  ${mb(jpg).toFixed(2)} MB`);
if (sizeMb > TARGET_MB) {
  console.log(
    `\n  ⚠ Over the ${TARGET_MB} MB budget. Re-run with a shorter clip, or\n` +
    `    raise -crf 26 to 30 in this script for more compression.`,
  );
}

if (upload) {
  console.log(`\n  Uploading to ${BUCKET} …`);
  for (const [file, type] of [[mp4, "video/mp4"], [jpg, "image/jpeg"]]) {
    run("npx", [
      "wrangler", "r2", "object", "put",
      `${BUCKET}/${PREFIX}/${file.split(/[\\/]/).pop()}`,
      "--file", file, "--content-type", type, "--remote",
    ]);
  }
} else {
  console.log(`\n  Skipped upload. The two files are in:\n    ${work}`);
}

const today = new Date().toISOString().slice(0, 10);
console.log(`
  ── Paste into lib/products.ts ──────────────────────────────────

    media: [
      {
        id: "${id}",
        playback: "hover",
        alt: "",            // ← describe what happens in the clip
        published: "${today}",
      },
    ],

  alt is read aloud to anyone using a screen reader and is what Google
  Images reads, so write the real thing rather than the product name.
  published is what lets the clip earn a video result.
`);
