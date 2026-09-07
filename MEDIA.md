# Videos

Every clip is one **id** — `the-signature-box` — and nothing else. The
video is `<id>.mp4`, the poster is `<id>.jpg`, and every URL on the site
is built from that id in `lib/media.ts`.

That is the whole design, and it exists because the old way (typing the
full path for the video and again for the poster) had four products
pointing at poster files that did not exist. One id cannot drift from
itself.

---

## Adding a video

```bash
npm run video -- ~/Desktop/raw-clip.mp4 the-signature-box
```

That one command compresses the clip to under 3 MB, pulls a poster frame
out of it, uploads both to R2, and prints the block to paste into
`lib/products.ts`.

Then paste it in, and fill in `alt`:

```ts
media: [
  {
    id: "the-signature-box",
    playback: "hover",
    alt: "A wooden name plaque being lettered, then set into the box",
    published: "2026-09-05",
  },
],
```

**Write `alt` properly.** It is read aloud to anyone using a screen
reader, it is what Google Images reads, and it is the `description` on
the video's schema. "The Signature Box" is not a description of what
happens on screen; the line above is.

**`published` matters more than it looks.** Google will index a video
without an upload date but will not give it a video result. The script
stamps today's date for you.

### Requirements

- **ffmpeg** on PATH — the compressing and the poster both use it.
- **wrangler** for the upload. First time only: `npx wrangler login`,
  which opens a browser and authorises this machine. There is no API
  token to copy and nothing secret to keep in a file.

Pass `--no-upload` to skip R2 and put the two files in the dashboard by
hand instead. The script prints where it left them.

---

## Doing it by hand

If you would rather not use the script:

```bash
# compress — 1080 wide, keeps the aspect ratio
ffmpeg -i input.mp4 -vf "scale=1080:-2" -c:v libx264 -crf 26 -preset slow \
       -c:a aac -b:a 96k -movflags +faststart the-signature-box.mp4

# poster, from two seconds in
ffmpeg -i the-signature-box.mp4 -ss 2 -vframes 1 -q:v 3 the-signature-box.jpg
```

`-movflags +faststart` is not optional. It moves the file's index to the
front so playback can begin before the whole thing has downloaded.

Then in the Cloudflare dashboard: **R2 → heartmade-media → Upload**, and
drop both files into the `videos/` folder. Both files, always — a video
without its poster makes every visitor download the first chunk of it
just to draw one frame.

---

## Switching from public/ to R2

The bucket and the domain are live:

| | |
|---|---|
| Bucket | `heartmade-media`, Asia-Pacific |
| Public domain | `media.heartmadecrafts.studio` — active |
| Bandwidth | free, forever, whatever the traffic |

The site still serves from `public/videos/` until you flip one line.
Once every clip is in the bucket:

1. Open `https://media.heartmadecrafts.studio/videos/the-signature-box.mp4`
   in a browser and confirm it plays.
2. In `lib/media.ts`, set:
   ```ts
   const HOST = "https://media.heartmadecrafts.studio";
   ```
3. `npm run dev`, click through a product page, confirm the clips play.
4. Delete `public/videos/`.

Nothing else changes — the schema, the sitemap and both components all
build their URLs through `lib/media.ts`.

---

## Naming, and why there are no folders

Files are flat: `videos/the-signature-box.mp4`. There is no
`videos/birthday/` and there should not be.

**A clip often belongs to several occasions.** The chocolate bouquet
suits birthday *and* anniversary *and* sorry. Folders would force you to
upload it three times or file it under one and lose the rest.

**A file's path is its URL.** Move `birthday/x.mp4` to `eid/x.mp4` and
every link to it breaks — the page, the `VideoObject` schema, the
sitemap entry, whatever Google has already indexed, and every cached
copy at Cloudflare's edge.

Which occasions a clip appears in is not the bucket's business. It is
already in `lib/products.ts`:

```ts
occasions: "all",                                    // every occasion
occasions: ["birthday", "anniversary", "eid"],       // three
```

One file, listed anywhere you like, never duplicated.

### Re-shooting a clip

Cloudflare caches hard at the edge, which is what makes it fast. Replace
`the-signature-box.mp4` with a new cut under the same name and visitors
keep getting the old one from cache for a long time.

So bump the id:

```
the-signature-box-v2
```

Change the one line in `lib/products.ts`. New id, new URL, everyone sees
the new cut immediately. Delete the old pair a week later.

---

## Playback modes

```ts
playback: "hover"   // still frame until hovered — right for grids
playback: "auto"    // plays muted on loop in view
```

Two `"auto"` clips on the site today, the chocolate bouquet and the
signature box. **Keep it to two or three.** Every autoplaying clip is a
video download, and the home page once shipped seven of them — about
24 MB before a visitor had touched anything.

⚠️ On touch devices `"hover"` currently falls back to playing in view,
because `ProductMedia.tsx` treats "no pointer" as "cannot hover". That
was the right call when there were no posters and a paused clip looked
broken. Now that every clip has one, tapping to play would be lighter on
exactly the phones that matter most — a one-line change in that
component, and a UX decision rather than a technical one.

---

## What the SEO depends on

Three things, all of which come from the id:

- **`VideoObject`** on every product page, with `contentUrl` pointing at
  our own file on our own domain. This is what can earn a video result
  for heartmadecrafts.studio instead of for somebody else's platform.
- **Video entries in `sitemap.xml`**, which is how Google finds a video
  that is not on YouTube.
- **The poster**, which is `thumbnailUrl` in the schema and
  `thumbnail_loc` in the sitemap. No poster, no video result.

None of it needs touching when you add a clip. Fill in the id, the alt
and the published date, and all three follow.
