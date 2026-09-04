# Process photos

Five hand-at-work shots for `/about`. **No faces needed** — hands, tools
and the work itself. For a craft studio these do more than a portrait
would: a portrait says someone exists, a photo of a nib mid-stroke says
someone can actually do this.

Until a photo exists the step renders as a numbered entry and looks
finished. Nothing on the page breaks while you shoot.

## What to shoot

| File | The shot |
|---|---|
| `01-box.jpg` | Boxes and ribbon laid out, a hand reaching for one. Shows choice being made. |
| `02-lettering.jpg` | **The important one.** Nib on paper, mid-word, close enough to read the ink. Shoot from above and slightly behind the hand. |
| `03-painting.jpg` | Brush on a wooden plaque, or resin being poured. Wet paint photographs better than dry. |
| `04-packing.jpg` | Half-packed box from above — contents arranged, tissue, lights, the handmade piece sitting on top. |
| `05-seal.jpg` | Wax being stamped, or the seal a second after lifting. |

## How to shoot them

- **Daylight, near a window, no flash.** Overhead room light goes yellow
  and flash kills the paper texture. Late morning is best.
- **Phone is fine.** Portrait mode off — it blurs the edges of the paper,
  which is the thing you want sharp.
- **Get close.** Fill the frame with hands and work. Wide shots of a room
  say nothing.
- **Mess is good.** Offcuts, ink, spare nibs. A spotless desk reads as
  staged.
- Shoot **4:3 or 4:5 portrait**. The page crops to 4:5 on desktop.

## Before adding them

Aim for **under 300 kB each**. Straight off a phone they are 3–5 MB, which
on a Karachi mobile connection is the difference between a page that
loads and one that doesn't.

```bash
# resize to 1200px wide and compress, keeping it sharp
ffmpeg -i IMG_1234.jpg -vf "scale=1200:-2" -q:v 4 02-lettering.jpg
```

## Wiring one up

In `app/about/page.tsx`, find the step in the `steps` array and add the
two fields:

```ts
{
  n: "02",
  title: "The card is lettered",
  body: "…",
  image: "/process/02-lettering.jpg",
  alt: "A steel nib lettering a name onto cotton paper",
},
```

`alt` is not optional in practice — write what is actually happening in
the frame. It is read aloud to anyone using a screen reader, and it is
also what Google Images reads.
