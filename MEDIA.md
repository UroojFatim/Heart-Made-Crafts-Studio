# Photos and videos

**Photographs run the catalogue. Video runs the home page.**

**Photos live in the repo. Video lives in the bucket.** Small and
frequent ships with the site; large and rare goes to Cloudflare.

That split is the whole design, and it was a performance decision. The
site used to play a clip in every product card on every page — seven
clips, roughly 24 MB, most of it downloaded by people who only wanted
to see what a box looks like. Now a grid card costs one image of about
200 KB, and clips play in four cards on the home page and nowhere else.

Everything is addressed by a bare **id** — `the-signature-box` — and
`lib/media.ts` turns that id into a URL:

| | Served from | Path |
|---|---|---|
| Photo | the site itself | `public/photos/<id>.jpg` |
| Video | Cloudflare R2 | `videos/<id>.mp4` |
| Its poster | Cloudflare R2 | `videos/<id>.jpg` |

Products never store a URL, only ids. One id cannot drift from itself,
which is what fixed the old bug where four products pointed at poster
files that did not exist.

---

## Adding a photograph

No command, no processing, no format to convert to.

1. Put the file in **`public/photos/`**
2. Copy its name — the whole name, extension and all — into
   `lib/products.ts`
3. Commit

```ts
photos: [
  { file: "the-birthday-box-01.jpeg", alt: "Closed, ribbon tied, the painted name plaque facing up" },
  { file: "the-birthday-box-02.png",  alt: "Open, chocolates in rows beside the calligraphy card" },
],
```

`.jpeg`, `.jpg`, `.png`, `.webp` — whatever you have. Nothing is
assumed and nothing is added: the name in `products.ts` has to match
the name in the folder exactly.

**The first entry is the card image**, so lead with your best shot. The
rest become thumbnails on the product page. Add as many as you like.

### Two things the folder cares about

**Keep each file under about 300 KB.** Straight off a phone a photo is
3–5 MB, which is roughly twenty times what a card needs and slow on
mobile data. Anything exported from Canva, Lightroom, Photoshop or a
phone's own editor is usually already fine. If a file is much larger,
export it again at about 1600px wide before dropping it in.

**Capital letters count.** Windows ignores them; the server does not.
`shot.JPG` and `shot.jpg` are different files in production even though
they look identical on your laptop. Safest habit: lowercase names
throughout.

### Writing `alt`

This is the field worth slowing down for. It does three jobs: a screen
reader reads it aloud, Google Images reads it to work out what the
picture is of, and it shows if the image ever fails to load.

**Describe the photograph, not the product.**

```
x   "The Signature Box"
ok  "Open, chocolates in rows beside the calligraphy card"
```

The product name is already in the heading above the picture.
Repeating it tells Google nothing it did not already know, while the
actual description is the only place these details ever get written
down — and details are what long searches match on. Somebody typing
"gift box with name plaque karachi" can only find you if the words
*name plaque* exist somewhere on the page.

`alt` is optional. Leave it off and the product name and tagline stand
in: valid, but it wins nothing.

### What to shoot

Portrait, roughly 4:5 — that is the shape of the card, and anything
else gets cropped. Shoot more than you need and pick later; adding a
line to the array is a one-line change.

### If a photo does not appear

The name in `products.ts` and the name in the folder differ somewhere.
That is the only thing that can be wrong. Check the extension first
(`.jpeg` is not `.jpg`), then capital letters, then spelling.

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

### If the compression is hurting the picture

The script trades quality for size, and the trade is adjustable. In
`scripts/video.mjs`:

```
-crf 26      lower number = better picture, bigger file
             22 is noticeably cleaner, roughly 1.5x the size
             18 is close to the original, roughly 3x

scale=1080   the width it downscales to. Raise it to 1280 for detail
             work, or delete the whole -vf line to keep the original.
```

**Or skip the script entirely.** Compress the clip however you like —
your phone's own export, CapCut, Handbrake — then upload two files to
**R2 → heartmade-media → videos/** by hand:

```
<id>.mp4     the clip
<id>.jpg     one frame from it, as the poster
```

Both files, always. Without a poster the browser downloads the start of
the video just to draw one frame. Keep the clip under about 5 MB so it
still starts quickly on mobile data.

**Write `alt` properly.** It is read aloud to anyone using a screen
reader, it is what Google reads, and it is the `description` on the
video's schema. "The Signature Box" is not a description of what
happens on screen; the line above is.

**`published` matters more than it looks.** Google will index a video
without an upload date but will not give it a video result. The script
stamps today's date for you — keep it.

---

## Deleting a photo or a clip

**Take it out of the code first.**

1. Remove the entry from `lib/products.ts` — the `{ id: "…" }` line
   from `photos`, or the block from `media`.
2. `npm run dev` and check the product page still looks right.
3. Commit.

For a photo, deleting the file in the same commit is fine: the code and
the file go together, so the site is never pointing at a gap.

A clip is different, because it lives somewhere else. Push first, and
delete from R2 only once the new build is live — do it the other way
round and the site spends the gap asking for a file that is gone: a
broken image on the card, and a sitemap sending Google to a 404.

### Deleting a photo

Delete the file from `public/photos/`, remove its line from
`lib/products.ts`, commit. That is all — no dashboard, no command.

### Deleting a clip

Dashboard: **R2 → heartmade-media → videos/**, tick the file,
**Delete**. Or from the project folder — a clip is two files, so delete
both or the poster is orphaned:

```bash
npx wrangler r2 object delete heartmade-media/videos/<id>.mp4 --remote
npx wrangler r2 object delete heartmade-media/videos/<id>.jpg --remote
```

**A deleted clip has no undo** — the bucket keeps no version history.
A deleted photo is recoverable from git history, but only if it was
committed first. Either way: keep your originals in a folder of their
own, outside the project.

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

Photos need nothing at all — no tool, no login, no command.

`npm run video` is the only script left, and it needs:

- **ffmpeg** on PATH. `winget install ffmpeg`.
- **wrangler**. First time: `npx wrangler login`, which opens a browser
  and authorises this machine. No API token to copy, nothing secret in
  a file.

It takes `--no-upload` if you would rather compress the clip and put it
in the R2 dashboard by hand — or skip the script entirely and upload
your own file, see below.

---

## Where the files live

### Photos: in the repo

`public/photos/`. They ship with the site and Vercel serves them from
`www.heartmadecrafts.studio/photos/…` — the same domain as the page
that sells the thing in them, which is the plainest possible signal to
Google Images.

There is no upload step and no command. Drop the file in the folder,
name it in `lib/products.ts`, commit.

This works because photos are small: about 200 KB each, so a hundred of
them is 20 MB and git does not notice. Adding one does mean a deploy,
which is the trade — but a deploy is a push, and you were pushing
anyway.

### Video: in the bucket

| | |
|---|---|
| Bucket | `heartmade-media`, Asia-Pacific |
| Public domain | `media.heartmadecrafts.studio` |
| Bandwidth | free, forever, whatever the traffic |

Clips are 3–5 MB each, and **git keeps every version of a binary
forever** — delete one next month and it still sits in the history, in
every clone, on every deploy. Seven clips re-shot a few times each
would bloat the repository permanently and there is no undoing it.

They also change rarely, so the upload step costs almost nothing in
practice. That is the whole reason for the split: it is not that
buckets are better, it is that the two kinds of file have completely
different habits.

### If something fails to load

Open its URL in a browser first:

```
https://www.heartmadecrafts.studio/photos/<id>.jpg    # photo
https://media.heartmadecrafts.studio/videos/<id>.mp4  # clip
```

A 404 means the file is missing, or the id in `lib/products.ts` does
not match the file name. It is almost always the second one.


---

## Naming, and why there are no folders

Files are flat: `public/photos/the-signature-box-01.jpeg`. There is no
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
  that sells the thing in them, with absolute URLs on the site's own
  domain. That is how a picture that is not on a big platform gets
  found in Google Images, and sharing an origin with the page is the
  clearest version of that signal.
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
