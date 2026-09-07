# Video hosting — Cloudflare R2

Videos live in a Cloudflare R2 bucket, served from `media.heartmadecrafts.studio`.
The site holds only the file name; the URL is built in `lib/media.ts`.

**Why R2 and not the repo:** every video in `public/` is uploaded to Vercel on
every deploy and counts against Vercel's limits. R2 charges nothing for
bandwidth, ever — the cost of a video does not grow with how many people watch
it. That is the whole reason.

---

## Part 1 — One-time setup

Roughly 30 minutes, mostly waiting for DNS.

### ⚠️ Read this before you start

Step 2 changes your nameservers. **If the DNS records are not copied across
correctly, heartmadecrafts.studio goes down** — the site, and email on that
domain if you have any. It is reversible (change the nameservers back) but the
outage is real while it lasts.

So: do step 1 first and keep that screenshot until the site is confirmed
working on Cloudflare.

### 1. Write down your current DNS

Go to wherever the domain's DNS lives now (Vercel, or your registrar) and
**screenshot every record** — type, name, value, TTL. Especially:

- the `A` or `CNAME` record for `@` (the root)
- the `CNAME` for `www`
- any `MX` or `TXT` records (email, domain verification)

You are going to re-create these on Cloudflare.

### 2. Create the Cloudflare account and add the domain

1. Sign up at `dash.cloudflare.com` — free, no card at this stage.
2. **Add a domain** → `heartmadecrafts.studio` → choose the **Free** plan.
3. Cloudflare scans your existing DNS and imports what it finds. **Check the
   imported list against your screenshot.** It usually gets everything, but it
   is your job to confirm — this is the step that breaks sites.
4. Cloudflare gives you two nameservers. Go to your registrar and replace the
   existing nameservers with those two.
5. Wait. Usually under an hour, sometimes up to 24. Cloudflare emails you.

### 3. Make Vercel's records DNS-only

This one catches everyone. In the Cloudflare DNS list, the records pointing at
Vercel must show a **grey cloud**, not an orange one.

- Orange cloud = Cloudflare proxies the traffic. Combined with Vercel's own SSL
  this causes redirect loops and certificate errors.
- Grey cloud = Cloudflare only answers the DNS question and steps aside.

Click the cloud icon to toggle it. Do this for the root record and `www`.

**Then load the site and confirm it still works before going any further.**

### 4. Turn on R2

1. In the dashboard sidebar: **R2**.
2. It asks for a payment method. This is unavoidable — Cloudflare's own
   explanation is that R2 usage is not capped, so they need a card on file.

   What that actually risks, at your scale:

   | | Free every month | You will use |
   |---|---|---|
   | Storage | 10 GB | 30 videos ≈ 90 MB |
   | Uploads (Class A) | 1,000,000 | tens |
   | Reads (Class B) | 10,000,000 | far below |
   | **Bandwidth out** | **unlimited, free** | — |

   Storage past 10 GB is roughly $0.015 per GB per month, so even 20 GB would
   be about 15 cents. The expensive thing everywhere else — bandwidth — is the
   one thing R2 never charges for. A surprise bill has no route in.

3. **Create bucket** → name it `heartmade-media` → location **Automatic**.

### 5. Connect the custom domain

1. Open the bucket → **Settings** → **Public access** → **Custom Domains** →
   **Connect Domain**.
2. Enter `media.heartmadecrafts.studio`.
3. Cloudflare creates the DNS record and issues the certificate itself. A few
   minutes.

Do **not** use the `pub-xxxx.r2.dev` URL it also offers. Cloudflare's docs are
explicit that it is rate-limited and for development only.

### 6. Tell the site where the bucket is

In `lib/media.ts`, set the host to your custom domain. That is the only place
the domain appears — everything else builds URLs from it.

---

## Part 2 — How to organise the files

### Do NOT make folders per occasion

The obvious instinct is `birthday/`, `anniversary/`, `eid/`. Don't. Two reasons,
and both bite later:

**A video often belongs to several occasions.** The chocolate bouquet suits
birthday *and* anniversary *and* sorry. In a folder-per-occasion layout you
either upload the same file three times, or you file it under one and the
structure immediately stops meaning anything.

**A file's path is its URL.** Move `birthday/x.mp4` to `eid/x.mp4` later and
every link to it breaks — the page, the `VideoObject` schema, anything Google
has already indexed, and every cached copy on Cloudflare's edge. Storage paths
should be boring and permanent.

### Instead: flat names, relationships in code

```
videos/the-signature-box.mp4
videos/the-signature-box.jpg      ← poster, same name
videos/chocolate-bouquet.mp4
videos/chocolate-bouquet.jpg
```

Which occasions a video appears in is not the bucket's business — it is already
described in `lib/products.ts`, and has been all along:

```ts
{
  slug: "chocolate-bouquet",
  video: "chocolate-bouquet",
  occasions: "all",                                   // every occasion
}
{
  slug: "the-signature-box",
  video: "the-signature-box",
  occasions: ["birthday", "anniversary", "congratulations"],   // three
}
```

**One file. Listed in as many occasions as you like. Never duplicated.** Add a
slug to that array and the video appears on that occasion page too — no upload,
no re-encode, no new URL.

### Re-shooting a video: change the name

Cloudflare caches aggressively at the edge, which is what makes it fast. If you
overwrite `the-signature-box.mp4` with a new cut under the same name, visitors
keep getting the old one from cache for a long time.

So when you re-shoot, bump the name:

```
videos/the-signature-box-v2.mp4
```

and change the one line in `lib/products.ts`. New name, new URL, everybody sees
the new cut immediately. Delete the old file a week later.

---

## Part 3 — Adding a video

### The short way

```bash
npm run video -- ~/Desktop/raw-clip.mp4 the-signature-box
```

That one command compresses the clip, pulls a poster frame out of it, uploads
both to R2 and prints the line to paste into `lib/products.ts`.

Compression is not optional housekeeping. A phone clip is 30–50 MB; on a
Karachi mobile connection that is the difference between a page that loads and
one that is abandoned. The script targets **under 3 MB**.

### The manual way

If you would rather not use the script, in the R2 dashboard: open the bucket →
**Upload** → drag the file in. Then the URL is
`https://media.heartmadecrafts.studio/videos/<name>.mp4`.

But compress it first, and make the poster, or you have shipped a 40 MB
autoplaying video to someone's phone:

```bash
# compress
ffmpeg -i input.mp4 -vf "scale=1080:-2" -c:v libx264 -crf 26 -preset slow \
       -c:a aac -b:a 96k -movflags +faststart the-signature-box.mp4

# poster, from 2 seconds in
ffmpeg -i the-signature-box.mp4 -ss 2 -vframes 1 -q:v 3 the-signature-box.jpg
```

`-movflags +faststart` matters — it moves the index to the front of the file so
playback can begin before the whole thing has downloaded.

### Then wire it up

In `lib/products.ts`:

```ts
video: "the-signature-box",
occasions: ["birthday", "anniversary"],
```

The poster is found automatically — same name, `.jpg`. There is nothing else to
fill in.

---

## Part 4 — A video for an occasion page itself

Everything above attaches a video to a *product*. If you also want a video on
the occasion page itself — a birthday montage at the top of
`/occasions/birthday` — that is a separate field on the occasion, not a product:

```ts
// lib/occasions.ts
{
  slug: "birthday",
  name: "Birthday",
  video: "birthday-montage",    // optional
  ...
}
```

Same bucket, same naming, same rules. Leave it out and the page renders exactly
as it does now.

---

## Why not YouTube

It is free and unlimited, so it deserves a straight answer: YouTube gives you an
iframe, not a file.

- `ProductMedia.tsx` needs a real `<video src>` — hover-to-play, muted looping,
  the `BoxArt` fallback when a file is missing. All of that would be rewritten.
- Each embed ships roughly half a megabyte of YouTube's own JavaScript, which
  lands directly on your Core Web Vitals.
- The video ranks for YouTube, not for heartmadecrafts.studio. On your own
  domain it can carry `VideoObject` schema pointing at your `contentUrl`, go in
  your video sitemap, and earn video results for *your* site.

YouTube is the right place to *also* post the clips for reach. It is the wrong
place to host the ones the website plays.
