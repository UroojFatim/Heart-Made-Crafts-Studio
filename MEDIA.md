# Photos and videos

**Photographs run the catalogue. Video runs the home page.**

That split is the whole design, and it was a performance decision. The
site used to play a clip in every product card on every page — seven
clips, roughly 24 MB, most of it downloaded by people who only wanted
to see what a box looks like. Now a grid card costs one image of about
200 KB, and clips play in four cards on the home page and nowhere else.

Everything is addressed by a bare **id** — `the-signature-box` — and
`lib/media.ts` turns that id into a URL:

| | |
|---|---|
| Photo | `/photos/<id>.jpg` |
| Video | `/videos/<id>.mp4` |
| Its poster | `/videos/<id>.jpg` |

Products never store a URL, only ids. One id cannot drift from itself,
which is what fixed the old bug where four products pointed at poster
files that did not exist.

---

## Adding a photograph

This is the one you will do most often.

```bash
npm run photo -- C:\Users\you\Pictures\DSC_0041.jpg the-signature-box-01 ^
  --alt "Closed, ribbon tied, the painted name plaque facing up"
```

It resizes to 1600px wide, compresses to roughly 200 KB, uploads to R2,
and prints the line to paste into `lib/products.ts`:

```ts
photos: [
  { id: "the-signature-box-01", alt: "Closed, ribbon tied, the painted name plaque facing up" },
  { id: "the-signature-box-02", alt: "Open, chocolates in rows beside the calligraphy card" },
],
```

**The first entry is the card image**, so lead with your best shot. The
rest become the thumbnails on the product page. Add as many as you
like — one line each.

### Writing `alt`

This is the field worth slowing down for. It does three jobs: a screen
reader reads it aloud, Google Images reads it to work out what the
picture is of, and it shows if the image ever fails to load.

**Describe the photograph, not the product.**

```
✗ "The Signature Box"
✓ "Open, chocolates in rows beside the calligraphy card"
```

The product name is already in the heading above the picture. Repeating
it tells Google nothing it did not already know, while the actual
description is the only place these details ever get written down —
and details are what long searches match on. Somebody typing "gift box
with name plaque karachi" can only find you if the words *name plaque*
exist somewhere on the page.

`alt` is optional. Leave it off and the product name and tagline stand
in: valid, but it wins nothing.

### On Windows: file names

Rename the file to something plain before you run this — `box1-1.jpeg`,
not `box1(1).jpeg`.

PowerShell reads `( ) [ ] & ^ ! %` and spaces as syntax, so
`box1(1).jpeg` reaches the script as `box1` and ffmpeg reports a file
that does not exist. The script now catches this and tells you, but
renaming is one second and avoids the whole class of problem.

The description does not need quotes — `npm run` strips them on
Windows anyway, so everything after `--alt` is read as the sentence,
up to the next `--flag`. Quotes are still fine where they survive.

### What to shoot

Portrait, roughly 4:5 — that is the shape of the card, and anything
else gets cropped. Shoot more than you need and pick later; adding a
line to the array is a one-line change.

---

## Adding a video

Video only shows on the home page, and only for products marked
`featured: true`. Two or three clips is the right number.

```bash
npm run video -- C:\Users\you\Videos\clip.mp4 the-signature-box
```

It compresses to under 3 MB, pulls a poster frame out of the clip,
uploads both, and prints the block to paste in:

```ts
media: [
  {
    id: "the-signature-box",
    playback: "hover",
    alt: "A wooden name plaque being lettered, then set into the box",
    published: "2026-09-12",
  },
],
```

```ts
playback: "hover"   // still frame until hovered
playback: "auto"    // plays muted on loop in view
```

**Write `alt` properly.** It is read aloud to anyone using a screen
reader, it is what Google reads, and it is the `description` on the
video's schema. "The Signature Box" is not a description of what
happens on screen; the line above is.

**`published` matters more than it looks.** Google will index a video
without an upload date but will not give it a video result. The script
stamps today's date for you — keep it.

---

## Deleting a photo or a clip

**Order matters. Code first, bucket second.**

1. Remove the entry from `lib/products.ts` — the `{ id: "…" }` line
   from `photos`, or the block from `media`.
2. `npm run dev` and check the product page still looks right.
3. Commit and push.
4. *Then* delete the file from R2.

Do it the other way round and the site spends the gap pointing at a
file that no longer exists: a broken image on the card, and a sitemap
telling Google to fetch a 404.

### Deleting the file

Dashboard: **R2 → heartmade-media → photos/** (or `videos/`), tick the
file, **Delete**.

Or from the project folder:

```bash
npx wrangler r2 object delete heartmade-media/photos/<id>.jpg --remote
```

A clip is two files — delete both, or the poster is orphaned:

```bash
npx wrangler r2 object delete heartmade-media/videos/<id>.mp4 --remote
npx wrangler r2 object delete heartmade-media/videos/<id>.jpg --remote
```

**There is no undo.** The bucket keeps no version history, so a deleted
file is gone unless you still have the original on your laptop. Keep
the originals.

### Replacing rather than deleting

If the point is a better shot of the same thing, do not delete and
re-upload under the same name — Cloudflare caches hard at the edge and
visitors keep getting the old picture for a long time.

Give the new file a new id, point `lib/products.ts` at it, and delete
the old one a week later once nothing is asking for it.

---

## Linking a product to its reel

Each product can point at its own reel on Instagram. It shows as a link
under the gallery on the product page — which is exactly where the
video used to be, so somebody who wants to see the box move now has
somewhere to go.

In Instagram: open the reel → **Share** → **Copy link**. Then paste it
straight in:

```ts
reel: "https://www.instagram.com/reel/C8xYz1AbCdE/",
```

Paste it exactly as copied, `?igsh=…` tail and all — that tail is a
share-tracking token tied to whichever account copied the link, and it
gets stripped for you before the link is rendered.

**A different reel per product.** Linking the profile instead wastes
the placement: someone reading about this box wants to see *this* box.

Leave `reel` out and no link appears. A link that cannot be read — a
profile URL, a typo — is treated the same way and renders nothing,
because a dead Instagram button is worse than no button.

**It is a link, not an embed**, deliberately. An Instagram embed pulls
in their scripts and an iframe on every product page, which is the
weight this whole change just removed.

---

## Requirements

- **ffmpeg** on PATH. Both scripts use it. `winget install ffmpeg`.
- **wrangler** for the upload. First time only: `npx wrangler login`,
  which opens a browser and authorises this machine. There is no API
  token to copy and nothing secret kept in a file.

Pass `--no-upload` to either script to skip R2 and place the files in
the dashboard by hand. The script prints where it left them.

---

## Where the files live

| | |
|---|---|
| Bucket | `heartmade-media`, Asia-Pacific |
| Public domain | `media.heartmadecrafts.studio` |
| Bandwidth | free, forever, whatever the traffic |

`public/videos/` is gone, and it should stay gone. Media in git is the
one mistake that cannot be undone later: git keeps every version of
every binary forever, so a file you delete next month still sits in the
history, in every clone, on every deploy.

A new photo or clip goes to the bucket, never into `public/`. The only
things in `public/` are small and permanent: the logo, the signature,
the process shots.

If something fails to load, open its URL in a browser first:

```
https://media.heartmadecrafts.studio/photos/<id>.jpg
```

A 404 there means the file is missing from the bucket, or the id in
`lib/products.ts` does not match the file name. It is almost always the
second one.

---

## Naming, and why there are no folders

Files are flat: `photos/the-signature-box-01.jpg`. There is no
`photos/birthday/` and there should not be.

**A product often belongs to several occasions.** The chocolate bouquet
suits birthday *and* anniversary *and* sorry. Folders would force you
to upload it three times, or file it under one and lose the rest.

**A file's path is its URL.** Move `birthday/x.jpg` to `eid/x.jpg` and
every link to it breaks — the page, the sitemap entry, whatever Google
has already indexed, and every cached copy at Cloudflare's edge.

Which occasions something appears in is not the bucket's business. It
is already in `lib/products.ts`:

```ts
occasions: "all",                                // every occasion
occasions: ["birthday", "anniversary", "eid"],   // three
```

One file, listed anywhere you like, never duplicated.

### Re-shooting

Cloudflare caches hard at the edge, which is what makes it fast.
Replace a file with a new version under the same name and visitors keep
getting the old one from cache for a long time.

So bump the id:

```
the-signature-box-01  →  the-signature-box-01-v2
```

Change the one line in `lib/products.ts`. New id, new URL, everyone
sees the new version immediately. Delete the old file a week later.

---

## The fallback chain

A product shows the first of these it has:

1. **Its photographs** — `photos: [...]`
2. **The poster frame of its clip** — automatic, no config
3. **The drawn SVG box** in its palette

Step 2 is why the catalogue could switch from video to photographs in
one commit without waiting on a photo shoot. Every product with a clip
already had a real picture of the real box sitting on R2. Those frames
are standing in right now — they work, but a proper photograph will
beat a video still every time, so replace them as you shoot.

---

## What the SEO depends on

- **Photographs are listed in `sitemap.xml`** against the product page
  that sells the thing in them. That is how a picture that is not on a
  big platform gets found in Google Images.
- **`VideoObject` sits on the home page**, because that is where the
  clips play. It used to be on the product pages and it moved with
  them. Schema describes what is on the page; a VideoObject on a page
  with no video is a claim Google checks, does not find, and declines
  to reward.
- **Video sitemap entries also point at the home page**, for the same
  reason — a video entry names the page you can watch it on, not the
  file's own address.
- **`alt`** carries all of it — for photographs and clips alike. Write
  it yourself. The automatic fallback keeps the page valid; it does not
  make it findable.

None of this needs touching when you add a file. Fill in the id and the
alt, and the rest follows.
