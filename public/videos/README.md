# Videos

Drop `.mp4` files in this folder, then reference them from `lib/products.ts`.

## Naming

```
<occasion>-<what-it-is>.mp4          birthday-signature-box.mp4
all-<what-it-is>.mp4                 all-chocolate-bouquet.mp4
```

Use `all-` for pieces that suit every occasion. The prefix is only for
your own sanity — nothing in the code reads it.

## Poster frames (optional but worth it)

Save a still next to the video with the same name:

```
birthday-signature-box.mp4
birthday-signature-box.jpg
```

Without a poster the browser downloads the first chunk of every video
just to show a frame. On a Pakistani mobile connection that's the
difference between a page that loads and one that doesn't.

To pull a still out of a video:

```bash
ffmpeg -i birthday-signature-box.mp4 -vframes 1 -q:v 3 birthday-signature-box.jpg
```

## Keep files small

Aim for **under 3 MB** per clip. These are served straight from the
site, so file size is load time.

```bash
# 1080×1920 vertical, good quality, much smaller
ffmpeg -i input.mp4 -vf "scale=1080:-2" -c:v libx264 -crf 26 -preset slow \
       -c:a aac -b:a 96k -movflags +faststart output.mp4
```

`-movflags +faststart` matters — it moves the index to the front of the
file so playback can begin before the whole thing has downloaded.

## Wiring one up

In `lib/products.ts`:

```ts
media: [
  {
    src: "/videos/birthday-signature-box.mp4",
    poster: "/videos/birthday-signature-box.jpg",
    playback: "hover",   // or "auto"
    alt: "The Signature Box being packed and tied",
  },
],
```

- `playback: "hover"` — still frame until hovered. Good for busy grids.
- `playback: "auto"` — plays muted on loop once it scrolls into view.
  Use sparingly; two or three per page is plenty.

On phones there is no hover, so `"hover"` clips play while on screen.

On the product page every clip plays **with sound** when clicked,
whichever mode is set here.

## No video yet?

Leave `media: []`. The card falls back to the drawn SVG box in that
product's palette, so the grid still looks finished while you shoot.
