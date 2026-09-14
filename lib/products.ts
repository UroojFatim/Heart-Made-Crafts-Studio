/**
 * ══════════════════════════════════════════════════════════════════
 *  PRODUCTS  —  you manage this file
 * ══════════════════════════════════════════════════════════════════
 *
 * TO ADD A PRODUCT
 *   1. `npm run photo -- <file> <id> --alt …` for each photograph.
 *      It writes straight into public/photos/ — no upload step.
 *   2. Copy any entry below, change the fields, done.
 *
 * THE FIELDS THAT MATTER
 *
 *   occasions   Where it shows up. An array of occasion slugs, or the
 *               string "all" for pieces that suit every occasion.
 *               A product can sit in as many as you like — a chocolate
 *               bouquet can be birthday AND anniversary AND sorry.
 *
 *   tags        Which filters it matches. Put the filter option's `id`
 *               from lib/occasions.ts here. Tags for occasions this
 *               product isn't in are simply ignored, so it's safe to
 *               list everything that applies.
 *
 *   photos      Photographs, in order, by id. First one is the card
 *               image, so put the best shot first. This is what the
 *               whole catalogue runs on — grids and product pages.
 *
 *   media       Clips. These play on the HOME PAGE ONLY. Everywhere
 *               else a product shows its photograph, because a grid of
 *               autoplaying video was what was making the site slow.
 *                 playback: "hover"  → still frame until hovered/tapped
 *                 playback: "auto"   → plays muted on loop straight away
 *
 *   featured    `featured: true` puts it on the home page and in the
 *               "everything" grid on /shop. Omit it and the product is
 *               still fully live — its own page, inside its occasions,
 *               filterable, in the sitemap — it just isn't out front.
 *               Keep roughly eight featured; let the rest live inside
 *               their occasions.
 *
 * NO PHOTO YET? Leave `photos` out. The product falls back to the
 * still frame of its clip, and if there is no clip either, to the drawn
 * SVG box in its palette. The site stays presentable while you shoot.
 *
 * Products carry no price field. Price BANDS live in lib/pricing.ts
 * and are shown on /shop; the exact figure is quoted on WhatsApp.
 */

import { photoUrl, posterUrl } from "./media";
import type { OccasionSlug } from "./occasions";
import type { Palette } from "./palette";

export type Media = {
  /**
   * File name with no extension, e.g. "the-signature-box".
   *
   * The video is <id>.mp4 and the poster is <id>.jpg — one id, so the
   * two can never drift apart the way separately typed paths did. The
   * URLs are built in lib/media.ts, which is also the one place that
   * knows whether they come from public/ or from the R2 bucket.
   */
  id: string;
  /**
   * "hover" — still frame until hovered. Right for anything in a grid.
   * "auto"  — plays muted on loop in view. Two or three per page at the
   *           very most; each one is a video download on a phone.
   */
  playback: "hover" | "auto";
  /** Describe it for screen readers, and for Google Images. */
  alt: string;
  /**
   * The day the clip went live, "YYYY-MM-DD". Optional, but Google
   * requires `uploadDate` before it will show a video result, so a clip
   * without one is indexed and never featured. `npm run video` stamps
   * today's date when it uploads.
   */
  published?: string;
};

export type Photo = {
  /**
   * The file name in public/photos/.
   *
   *   id: "box-01.jpeg"   ->  public/photos/box-01.jpeg
   *   id: "box-01.png"    ->  public/photos/box-01.png
   *   id: "box-01"        ->  public/photos/box-01.jpg   (.jpg assumed)
   *
   * Write the extension unless the file really is a .jpg. Nothing is
   * converted and nothing is guessed beyond that one default: whatever
   * you drop in the folder is what gets served.
   *
   * Two things the folder cares about:
   *
   *   - Capital letters count. Windows ignores them, the server does
   *     not, so shot.JPG and shot.jpg are different files in production
   *     even though they look identical on your laptop.
   *   - Keep each file under about 300 KB, or the card gets slow on a
   *     phone — which is most of your visitors.
   *
   * If a photo does not appear, this name and the name in the folder
   * differ somewhere. That is the only thing that can be wrong.
   */
  id: string;
  /**
   * What is actually in the shot, in your words.
   *
   * This is the one field worth slowing down for. It does three jobs at
   * once: a screen reader reads it aloud, Google Images reads it to
   * decide what the picture is of, and it is what shows if the image
   * ever fails to load.
   *
   * Describe the photograph, not the product:
   *
   *   ✗ "The Signature Box"
   *   ✓ "The box open, chocolates in rows, a hand-painted name plaque
   *      resting on the lid"
   *
   * The product name is already on the page in the heading — repeating
   * it here tells Google nothing it did not know, while the real
   * description is the only place the details ever get written down.
   *
   * Optional. Leave it off and the name and tagline stand in, which is
   * enough to be valid but not enough to win anything.
   */
  alt?: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /**
   * Still photographs. These are what the catalogue actually shows:
   * every grid card, and the whole product-page gallery.
   *
   *   photos: [
   *     { id: "the-signature-box-01", alt: "Closed, ribbon tied, the
   *       painted name plaque facing up" },
   *     { id: "the-signature-box-02", alt: "Open, chocolates in rows
   *       beside the calligraphy card" },
   *   ],
   *
   * First one is the card image, so put the best shot first. Add as
   * many as you like — everything after the first becomes a thumbnail
   * on the product page.
   *
   * Leave it out and the product falls back to the still frame from its
   * clip, and then to the drawn SVG box. Nothing breaks while you are
   * still shooting — the page just gets plainer.
   */
  photos?: Photo[];
  /**
   * This product's reel on Instagram.
   *
   * Paste the link straight from Instagram's "Copy link" — the
   * `?igsh=…` tracking tail is stripped for you in lib/site.ts.
   *
   *   reel: "https://www.instagram.com/reel/C8xYz1AbCdE/",
   *
   * It shows as a link under the gallery on the product page. Leave it
   * out and no link appears; an unreadable one is treated the same way,
   * because a dead Instagram button is worse than none.
   *
   * A different reel per product is the point — link the reel that is
   * actually about this box, not the profile.
   */
  reel?: string;
  /**
   * Clips. These play on the **home page only**. A grid of autoplaying
   * video was the single biggest thing slowing the site down, and it
   * cost more in load time than it won in atmosphere. Everywhere else a
   * product shows its photograph.
   */
  media: Media[];
  occasions: OccasionSlug[] | "all";
  tags: string[];
  /**
   * Put it on the HOME PAGE. That is all this does.
   *
   * It does not control /shop — /shop lists the whole catalogue, so a
   * product appears there simply by existing and not being `homeOnly`.
   *
   * Leave `featured` off and the product is still completely live: its
   * own page, /shop, every occasion you tagged it with, the filters,
   * the sitemap. It just isn't on the front page. Keep the home page
   * to a handful and let the rest live in the shop and the occasions.
   */
  featured?: boolean;
  /**
   * Home page only. Kept out of /shop, out of every occasion page, out
   * of /gift-hampers and out of "others for the same occasion".
   *
   * This is the holding pen for the seven products that still lead with
   * video. They look right on the home page, where video belongs, and
   * wrong in a photo grid next to properly shot products. Rather than
   * show a video card among photo cards, they sit out of the catalogue
   * until each one has its own photographs.
   *
   * **Removing the flag is the whole migration.** Shoot the photos, add
   * `photos: [...]`, delete this line, and the product rejoins every
   * grid it is tagged for. Nothing else to change.
   *
   * The product keeps its own page and its place in the sitemap either
   * way — the home page card links to it, so it has to exist, and it is
   * a real product with real copy that Google should still index.
   */
  homeOnly?: boolean;
  /** The handmade piece — the thing no competitor can copy. */
  handmade: string;
  includes: string[];
  leadTimeDays: [number, number];
  palette: Palette;
};

export const products: Product[] = [


  // Occasion Birthday

  // 1
  {
    slug: "the-blush-glow-birthday-box",
    name: "The Blush Glow Birthday Box",
    tagline: "Made to make their special day feel a little more magical.",
    description:
      "A beautifully curated pink birthday gift box designed around the feeling of celebration. Soft fairy lights, chocolates, elegant gold-tone accessories, delicate decorative details and a romantic blush-pink presentation come together to create a gift that feels personal, thoughtful and unforgettable.",
    photos: [
      { id: "the-birthday-box-01-01.jpeg", alt: "Premium customized pink gift box with fairy lights, chocolates, gold-tone jewelry, decorative flower and elegant handmade details, photographed from a front three-quarter angle." },
      { id: "the-birthday-box-01-02.jpeg", alt: "Top-down view of an open customized pink gift box filled with chocolates, gold-tone jewelry, decorative flower, pink filler and handmade gifting details." },
      { id: "the-birthday-box-01-03.jpeg", alt: "Low-angle photograph of an open pink customized gift box showing its layered arrangement, fairy lights, chocolates, jewelry and decorative details." },
      { id: "the-birthday-box-01-04.jpeg", alt: "Close-up of chocolates, gold-tone jewelry, decorative yellow flower and pink filler inside a customized gift box with warm fairy-light illumination." },
    ],
    reel: "https://www.instagram.com/reel/Db8gjgIsDcR/",
    media: [],
    occasions: ["birthday"],
    tags: ["box", "for-her", "small"],
    handmade: "Hand-lettered card in your words",
    includes: [
      "2 pairs of gold-tone earrings",
      "Gold-tone ring",
      "Gold-tone chain",
      "2 Gold-tone bracelet/chain accessories",
      "Gold-tone bangles/churiyan",
      "Pink bangles/churiyan",
      "Gold-tone necklace",
      "Decorative flower clature",
      "Cadbury Dairy Milk Silk Roast Almond",
      "Dark Fantasy Choco Fills",
      "Cherry chocolate/snack",
      "Warm fairy lights",
      "Personalized birthday box decoration",
      "Pink decorative filler",
    ],
    leadTimeDays: [3, 5],
    palette: { box: "#F3E2DA", lid: "#E6CABE", ribbon: "#C4695E", glow: "#FFEADB" },
  },

  // 2
  {
    slug: "the-midnight-memories-birthday-box",
    name: "The Midnight Memories Birthday Box",
    tagline: "A thoughtful birthday surprise made of style, memories and little luxuries.",
    description:
      "A premium personalized birthday gift box thoughtfully curated for someone special. The elegant black presentation features a personalized photo collage with warm fairy lights, a stylish striped shirt, classic wristwatch, leather-style wallet, fragrance, roses and assorted chocolates. Every detail is arranged to turn a birthday gift into a memorable experience.",

    photos: [
      {
        id: "the-midnight-memories-birthday-box-01.jpeg",
        alt:
          "Open black birthday gift box featuring a personalized illuminated photo collage, striped shirt, wristwatch, wallet, fragrance, roses and assorted chocolates."
      },
      {
        id: "the-midnight-memories-birthday-box-02.jpeg",
        alt:
          "Angled view of an open luxury birthday gift hamper with personalized photo collage, striped shirt, watch, wallet, chocolates, fragrance and red roses."
      },
      {
        id: "the-midnight-memories-birthday-box-03.jpeg",
        alt:
          "Close-up angled view of a personalized black birthday gift box showing the striped shirt, leather-style wallet, wristwatch, chocolates, roses and fragrance."
      },
      {
        id: "the-midnight-memories-birthday-box-04.jpeg",
        alt:
          "Premium black personalized birthday gift box with gold Happy Birthday lettering and satin bow, photographed from a front three-quarter angle."
      },
    ],

    reel: "https://www.instagram.com/reel/DdMS4RZMWi_/",

    media: [],

    occasions: ["birthday"],

    tags: [
      "box",
      "for-him",
      "personalized",
      "premium",
      "luxury",
      "small"
    ],

    handmade: "Personalized birthday message and photo memories",

    includes: [
      "Striped formal shirt",
      "Classic wristwatch",
      "Leather-style wallet",
      "Fragrance",
      "Red decorative roses",
      "Cadbury Dairy Milk chocolates",
      "Assorted chocolate bars",
      "Personalized photo collage",
      "Warm fairy lights",
      "Gold Happy Birthday decoration",
      "Black satin ribbon bow",
      "Premium black gift box presentation",
    ],

    leadTimeDays: [3, 5],

    palette: {
      box: "#111111",
      lid: "#0B0B0B",
      ribbon: "#151515",
      glow: "#FFE7A8"
    },
  },

  // 3
  {
    slug: "the-blush-love-birthday-box",
    name: "The Blush Love Birthday Box",
    tagline: "A little box of love, made just for her.",

    description:
      "A beautifully curated blush-pink birthday gift box filled with thoughtful little surprises. Delicate gold-tone jewelry, chocolates, a soft plushie, decorative flowers, a handwritten-style message card and warm fairy lights come together in a romantic presentation designed to make her birthday feel extra special.",

    photos: [
      {
        id: "the-blush-love-birthday-box-01.png",
        alt:
          "Premium customized blush-pink birthday gift box with warm fairy lights, gold-tone jewelry, chocolates, plushie, decorative flower and personalized handmade details, photographed from a front three-quarter angle."
      },
      {
        id: "the-blush-love-birthday-box-02.png",
        alt:
          "Top-down view of an open blush-pink birthday gift box showing gold-tone jewelry, chocolates, plushie, decorative flower, ribbons and personalized gifting details."
      },
      {
        id: "the-blush-love-birthday-box-03.png",
        alt:
          "Low-angle photograph of an open blush-pink birthday gift box showing its layered arrangement, fairy lights, jewelry, chocolates, plushie and decorative details."
      },
      {
        id: "the-blush-love-birthday-box-04.png",
        alt:
          "Close-up photograph highlighting the gold-tone jewelry, chocolates, soft plushie, handmade heart card, decorative flower and satin ribbon details inside the birthday gift box."
      },
    ],

    reel: "https://www.instagram.com/reel/DcG0MIvMq1I/",

    media: [],

    occasions: ["birthday"],

    tags: [
      "box",
      "for-her",
      "birthday",
      "romantic",
      "cute",
      "personalized",
      "small"
    ],

    handmade: "Handmade birthday message card and personalized box decoration",

    includes: [
      "Butterfly earrings — 1 pair",
      "Gold-tone pendant necklace — 2",
      "Gold-tone bracelet/chain accessory — 1",
      "Hershey's chocolate bar — 1",
      "Soft plushie — 1",
      "Decorative red flower — 1",
      "White patterned mini gift pouch — 1",
      "Handmade heart-shaped 'For You' card — 1",
      "Additional small handmade message card",
      "Red satin ribbon decoration",
      "Warm fairy lights",
      "Personalized birthday box decoration",
      "Pink decorative filler",
    ],

    leadTimeDays: [3, 5],

    palette: {
      box: "#F3D9DC",
      lid: "#EBC6D0",
      ribbon: "#B92F45",
      glow: "#FFE4C7"
    },
  },

  // 4
  {
    slug: "the-pink-love-birthday-chocolate-box",
    name: "The Pink Love Birthday Chocolate Box",
    tagline: "A sweet little surprise wrapped in love and made for their special day.",

    description:
      "A charming pink customized birthday gift box filled with a delicious selection of chocolates and finished with a soft satin ribbon. The box features a beautiful 'Happy Birthday' design on the closed lid, while the open presentation reveals a heartfelt 'LOVE' message along with neatly arranged chocolates including Kinder Bueno, Mars, Snickers, KitKat, Raffaello and Ferrero Rocher. A simple, sweet and thoughtful gift designed to make birthdays feel extra special.",

    photos: [
      {
        id: "the-pink-love-birthday-chocolate-box-01.jpg",
        alt:
          "Open pastel-pink customized birthday gift box featuring a 'LOVE' message inside the lid and neatly arranged Kinder Bueno, Mars, Snickers, KitKat, Raffaello and Ferrero Rocher chocolates."
      },
      {
        id: "the-pink-love-birthday-chocolate-box-02.jpg",
        alt:
          "Closed pastel-pink customized birthday chocolate gift box with a 'Happy Birthday' lid design and soft pink satin ribbon bow, photographed from a front three-quarter angle."
      },
      {
        id: "the-pink-love-birthday-chocolate-box-03.jpg",
        alt:
          "Front three-quarter photograph of the open pastel-pink birthday chocolate gift box showing the LOVE message, assorted chocolates and elegant pink satin ribbon."
      },
      {
        id: "the-pink-love-birthday-chocolate-box-04.jpg",
        alt:
          "Close-up photograph of the open pink chocolate gift box highlighting the 'LOVE' lid design, assorted branded chocolates, soft pink box finish and satin ribbon details."
      },
    ],

    reel: "https://www.instagram.com/reel/DcYfMrSO8GH/",

    media: [],

    occasions: ["birthday"],

    tags: [
      "box",
      "for-her",
      "for-him",
      "birthday",
      "chocolate",
      "romantic",
      "cute",
      "personalized",
      "small"
    ],

    handmade:
      "Personalized birthday and love-themed box decoration with handmade ribbon finishing",

    includes: [
      "Kinder Bueno chocolate",
      "Mars chocolate bars",
      "Snickers chocolate bars",
      "KitKat chocolate bars",
      "Ferrero Rocher chocolates",
      "Raffaello chocolates",
      "Pastel-pink customized gift box",
      "Personalized 'Happy Birthday' lid design",
      "LOVE message inside the lid",
      "Soft pink satin ribbon bow",
      "Neatly arranged chocolate filling",
      "Personalized birthday gift presentation",
    ],

    leadTimeDays: [3, 5],

    palette: {
      box: "#E9A9B9",
      lid: "#E79CAF",
      ribbon: "#F3B6C5",
      glow: "#FFE8E1"
    },
  },

  // Sorry

  // 2
  {
    slug: "the-sorry-meri-jaan-love-box",
    name: "The Sorry Meri Jaan Love Box",
    tagline: "A heartfelt little surprise to turn an apology into something unforgettable.",

    description:
      "A romantic black gift box thoughtfully arranged for those moments when words alone are not enough. The box features a handmade 'SORRY MERI JAAN' banner, warm fairy lights, deep red roses, wrapped surprises with satin ribbons, a personalized photo keychain, a heartfelt message card and carefully arranged gift details. Every element is presented by hand to create a warm, emotional and memorable apology gift for someone special.",

    photos: [
      {
        id: "the-sorry-meri-jaan-love-box-01.jpg",
        alt:
          "Premium open black romantic apology gift box featuring a handmade 'SORRY MERI JAAN' banner, red roses, wrapped gifts, personalized photo keychain, heartfelt message card and warm fairy lights, photographed from a front three-quarter angle."
      },
      {
        id: "the-sorry-meri-jaan-love-box-02.jpg",
        alt:
          "Top-down view of an open black 'SORRY MERI JAAN' romantic gift box showing red roses, wrapped surprises, personalized photo keychain, handwritten-style message card, decorative ribbons and warm fairy lights."
      },
      {
        id: "the-sorry-meri-jaan-love-box-03.jpg",
        alt:
          "Low-angle side photograph of an open black apology gift box with a 'SORRY MERI JAAN' banner, layered gift arrangement, red roses, ribbon-wrapped presents and glowing fairy lights."
      },
      {
        id: "the-sorry-meri-jaan-love-box-04.jpg",
        alt:
          "Close-up photograph highlighting the red roses, personalized photo keychain, heartfelt message card, satin ribbon details, wrapped gifts and warm fairy-light glow inside the 'SORRY MERI JAAN' gift box."
      },
    ],

    reel: "https://www.instagram.com/reel/DdO45JhMoa8/",
    media: [],

    occasions: ["sorry"],

    tags: [
      "box",
      "for-him",
      "gentle",
      "serious",
      "romantic",
      "apology",
      "personalized",
      "handmade",
      "small"
    ],

    handmade:
      "Handmade 'SORRY MERI JAAN' banner and personalized heartfelt message presentation",

    includes: [
      "Premium T-Shirt",
      "Fragrance/body spray",
      "Personalized photo keychain",
      "Red decorative rose bouquet",
      "Handwritten-style heartfelt message card",
      "Premium black gift box",
      "Handmade 'SORRY MERI JAAN' banner",
      "Warm fairy lights",
      "Wrapped gift surprises with satin ribbon bows",
      "Decorative shredded paper filler",
      "Romantic ribbon decorations",
    ],

    leadTimeDays: [3, 5],

    palette: {
      box: "#111111",
      lid: "#0B0B0B",
      ribbon: "#C92F45",
      glow: "#FFE7A8",
    },
  },


  // Multi-occasion products

  // 1
  {
    slug: "the-classic-gentleman-gift-box",
    name: "The Classic Gentleman Gift Box",
    tagline: "A timeless gift filled with style, fragrance and thoughtful little details.",
    description:
      "A thoughtfully curated premium gift box for him, combining everyday style with elegant finishing touches. A classic neutral-toned shirt, black wristwatch, fragrances, chocolates and delicate cream roses are arranged inside a sophisticated black gift box with soft neutral filler. The combination of masculine essentials and handcrafted details makes it a beautiful choice for birthdays, anniversaries and special moments.",

    photos: [
      {
        id: "the-classic-gentleman-gift-box-01.jpg",
        alt:
          "Premium black gift box for him featuring a neutral-toned shirt, black wristwatch, fragrances, chocolate and cream roses, photographed from a front three-quarter angle."
      },
      {
        id: "the-classic-gentleman-gift-box-02.jpg",
        alt:
          "Top-down view of an open black men's gift box showing a folded neutral shirt, black wristwatch, GIO and Bellavita White Oud fragrances, chocolate and cream roses."
      },
      {
        id: "the-classic-gentleman-gift-box-03.jpg",
        alt:
          "Angled side view of an open luxury men's gift box with a neutral shirt, fragrances, black watch, chocolate and cream decorative roses arranged inside."
      },
      {
        id: "the-classic-gentleman-gift-box-04.jpg",
        alt:
          "Close-up of a premium men's gift box highlighting the neutral shirt fabric, GIO and Bellavita White Oud fragrances, black wristwatch and cream roses."
      },
    ],

    reel: "https://www.instagram.com/reel/DcEoFGYS9Fa/",
    media: [],

    occasions: ["birthday", "anniversary", "congratulations", "nikah-wedding", "eid", "valentine", "graduation"],

    tags: [
      "box",
      "for-him",
      "premium",
      "luxury",
      "mens-gift",
      "birthday",
      "small"
    ],

    handmade:
      "Thoughtfully arranged by hand with a personalized gifting presentation",

    includes: [
      "Neutral-toned formal shirt",
      "Classic black wristwatch",
      "GIO fragrance",
      "Bellavita White Oud fragrance",
      "KitKat chocolate",
      "3 cream decorative roses",
      "Soft neutral decorative filler",
      "Black satin ribbon",
      "Premium black gift box presentation",
    ],

    leadTimeDays: [3, 5],

    palette: {
      box: "#111111",
      lid: "#0B0B0B",
      ribbon: "#151515",
      glow: "#E8CFAE",
    },
  },




  /* ─────────────────────────────────────────────────────────────
     UNIVERSAL — suits every occasion
     ───────────────────────────────────────────────────────────── */
  {
    slug: "chocolate-bouquet",
    name: "The Chocolate Bouquet",
    tagline: "Chocolates you can eat.",
    description:
      "Hand-wrapped, hand-tied, built to whatever size you want. Works for almost any occasion, which is why it's the thing people order when they can't decide.",
    media: [
      { id: "the-chocolate-bouquet", playback: "auto", alt: "A bouquet of wrapped chocolates being turned in the light" },
    ],
    occasions: "all",
    tags: ["bouquet", "for-her", "for-him", "for-kids", "small", "gentle", "playful"],
    featured: true,
    homeOnly: true,
    handmade: "Hand-lettered tag, wrapped and tied by hand",
    includes: [
      "Imported chocolates, arranged as blooms",
      "Hand-lettered tag",
      "Wrapping and ribbon work",
      "Dried floral accents",
    ],
    leadTimeDays: [2, 3],
    palette: { box: "#F0DDD6", lid: "#E4C8BE", ribbon: "#C4695E", glow: "#FFF2E4" },
  },

  {
    slug: "handwritten-card",
    name: "The Card, On Its Own",
    tagline: "Sometimes the card was always the gift.",
    description:
      "You send the words. They come back in ink on cotton paper, lettered by hand and sealed with wax. People order these for things a hamper would be wrong for.",
    media: [
      { id: "the-card-on-its-own", playback: "hover", alt: "The Hand made card with pictures" },
    ],
    occasions: ["sorry"],
    tags: ["card", "for-her", "for-him", "small", "gentle", "serious"],
    featured: true,
    homeOnly: true,
    handmade: "Entirely — this is only handmade work",
    includes: [
      "Hand-lettered calligraphy card",
      "Your words, up to roughly 120",
      "Deckle-edge cotton paper",
      "Wax-sealed envelope",
    ],
    leadTimeDays: [1, 2],
    palette: { box: "#FAF3EA", lid: "#EEE2D2", ribbon: "#C4695E", glow: "#FFF6EA" },
  },

  /* ─────────────────────────────────────────────────────────────
     BIRTHDAY
     ───────────────────────────────────────────────────────────── */
  {
    slug: "the-signature-box",
    name: "The Signature Box",
    tagline: "Our most-ordered box, and the reason why.",
    description:
      "The box most people mean when they say they want a gift box. Big enough to feel generous, restrained enough not to look like a pile of things. Contents built around a short brief from you.",
    media: [
      { id: "the-signature-box", playback: "auto", alt: "The Signature Box being packed and tied" },
    ],
    occasions: ["birthday", "anniversary", "congratulations"],
    tags: ["box", "for-him", "statement", "new-job", "graduation"],
    featured: true,
    homeOnly: true,
    handmade: "Hand-painted name plaque + calligraphy card",
    includes: [
      "Hand-painted wooden name plaque",
      "Handwritten calligraphy card",
      "6–8 curated items to your brief",
      "Preserved or fresh flowers",
      "Warm fairy lights inside the lid",
      "Ribbon-tied, sealed with wax",
    ],
    leadTimeDays: [3, 4],
    palette: { box: "#EFE4D7", lid: "#E0D0BD", ribbon: "#96453C", glow: "#FFE9C8" },
  },

  {
    slug: "the-countdown",
    name: "The Countdown",
    tagline: "22 gifts for her 22nd. Or 8 for an 8th.",
    description:
      "One parcel for every year, each individually wrapped and hand-numbered so they open in an order you choose. Tell us the age and the budget and we'll tell you honestly what fits.",
    media: [
      { id: "the-countdown", playback: "hover", alt: "The Countdown box being prepared" },
    ],
    occasions: ["birthday"],
    tags: ["box", "hamper", "for-her", "for-him", "for-kids", "statement"],
    featured: true,
    homeOnly: true,
    handmade: "Numbered hand-lettered tags for every parcel",
    includes: [
      "One small wrapped gift per year",
      "Hand-lettered numbered tag on each",
      "Opening-order card, handwritten",
      "Large sectioned presentation tray",
      "Lights and dried florals throughout",
    ],
    leadTimeDays: [6, 9],
    palette: { box: "#F3E2DA", lid: "#E6CABE", ribbon: "#C4695E", glow: "#FFEADB" },
  },

  /* ─────────────────────────────────────────────────────────────
     ANNIVERSARY
     ───────────────────────────────────────────────────────────── */
  {
    slug: "the-anniversary-box",
    name: "The Anniversary Box",
    tagline: "For the year you both actually remember.",
    description:
      "Built around a hand-lettered timeline — the dates that actually mattered this year, written out. Most people send six or seven; we letter them onto a single card that sits on top when the lid comes off.",
    media: [
      { id: "the-anniversary-box", playback: "hover", alt: "The Anniversary Box being packed and tied" },
    ],
    occasions: ["anniversary", "nikah-wedding"],
    tags: ["box", "for-couple", "for-her", "for-him", "statement"],
    featured: true,
    homeOnly: true,
    handmade: "Hand-lettered timeline of your year",
    includes: [
      "Hand-lettered timeline card of your year together",
      "Pressed-flower frame",
      "Curated items for two",
      "Candle and fresh florals",
      "Deep box with lights, wax-sealed",
    ],
    leadTimeDays: [4, 5],
    palette: { box: "#EAD9D3", lid: "#DCC3BA", ribbon: "#96453C", glow: "#FFE4D8" },
  },

  /* ─────────────────────────────────────────────────────────────
     SORRY
     ───────────────────────────────────────────────────────────── */
  {
    slug: "the-apology",
    name: "The Quiet Sorry",
    tagline: "Small, and entirely about the words.",
    description:
      "Deliberately unshowy. A hand-lettered card doing the actual work, and just enough around it that it doesn't arrive empty-handed. We'll help you word it if you want.",
    media: [
      { id: "the-quite-sorry", playback: "hover", alt: "The Quiet Sorry box being prepared" },
    ],
    occasions: ["sorry"],
    tags: ["box", "card", "for-her", "for-him", "small", "gentle", "serious"],
    featured: true,
    homeOnly: true,
    handmade: "Handwritten card in your words",
    includes: [
      "Hand-lettered card, wax-sealed",
      "A few very good chocolates",
      "Single preserved stem",
      "Plain, quiet wrapping",
    ],
    leadTimeDays: [1, 2],
    palette: { box: "#EDE4E6", lid: "#DCCFD3", ribbon: "#A2646C", glow: "#FBEEF0" },
  },

  /* ─────────────────────────────────────────────────────────────
     EID
     ───────────────────────────────────────────────────────────── */
  {
    slug: "eid-bouquet",
    name: "The Eid Bouquet",
    tagline: "Eidi, but worth keeping.",
    description:
      "For the in-laws, the cousins, or a whole office at once. Green and gold if you want it traditional, or we'll match whatever you have in mind.",
    media: [
      { id: "eid-bouquet", playback: "hover", alt: "The Eid Bouquet being packed and tied" },
    ],
    occasions: ["eid"],
    tags: ["box", "hamper", "for-her", "for-him", "for-kids", "for-family", "single", "set", "bulk"],
    featured: true,
    homeOnly: true,
    handmade: "Hand-lettered Eid Mubarak card per box",
    includes: [
      "Hand-lettered card in each box",
      "Dates, chocolates and dry fruit",
      "Small keepsake per recipient",
      "Coordinated wrapping across the set",
    ],
    leadTimeDays: [3, 5],
    palette: { box: "#E4EDE6", lid: "#CEDBD2", ribbon: "#5E8C6A", glow: "#EAFBEF" },
  },

];

/* ──────────────────────────────────────────────────────────────────
   Helpers — you shouldn't need to touch these
   ────────────────────────────────────────────────────────────────── */

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

/** One still image: where to load it from, and what to call it. */
export type Still = { src: string; alt: string };

/**
 * Every still a product can show, best first.
 *
 * Three sources, in order:
 *
 *   1. Real photographs from `photos` — what you want.
 *   2. The poster frame of each clip. Not as good as a photograph, but
 *      it is a real picture of the real box and it already exists for
 *      every clip, so no product has to sit empty while you shoot.
 *   3. Nothing — the caller draws the SVG box instead.
 *
 * The fallback is the reason the catalogue could switch from video to
 * photographs in one commit without waiting on a photo shoot.
 */
export function stillsFor(product: Product): Still[] {
  if (product.photos?.length) {
    return product.photos.map((photo) => ({
      src: photoUrl(photo.id),
      // Her description if she wrote one. The fallback is deliberately
      // plain: it is valid and says something true, but it describes
      // the product rather than the picture, which is exactly what a
      // written `alt` is for.
      alt: photo.alt?.trim() || `${product.name} — ${product.tagline}`,
    }));
  }
  return product.media.map((m) => ({ src: posterUrl(m.id), alt: m.alt }));
}

/** The single image that represents a product — card, share, schema. */
export function coverFor(product: Product): Still | null {
  return stillsFor(product)[0] ?? null;
}

export function isInOccasion(product: Product, slug: OccasionSlug) {
  return product.occasions === "all" || product.occasions.includes(slug);
}

/**
 * The catalogue: every product that belongs in a grid.
 *
 * One rule, in one place — `homeOnly` products are excluded. /shop,
 * the occasion pages, /gift-hampers and "others for the same occasion"
 * all read from here, so a product cannot leak back into one of them
 * by being added to a grid somebody forgot to update.
 */
export function catalogueProducts() {
  return products.filter((p) => !p.homeOnly);
}

/**
 * The home page grid.
 *
 * The `homeOnly` products lead, because they are the ones with video
 * and video is what the home page is for. Featured products follow.
 * No cap: the home page shows what it is given.
 */
export function homeProducts() {
  return [
    ...products.filter((p) => p.homeOnly),
    ...products.filter((p) => !p.homeOnly && p.featured),
  ];
}

/** Everything tagged with this occasion — featured or not. */
export function productsForOccasion(slug: OccasionSlug) {
  return catalogueProducts().filter((p) => isInOccasion(p, slug));
}

/**
 * The shortlist shown on the home page and in the "everything" grid.
 *
 * Deliberately opt-in: a product you add without `featured: true` goes
 * straight into its occasions and nowhere else, so the front of the
 * shop stays a curated handful however large the catalogue gets.
 */
export function featuredProducts() {
  return products.filter((p) => p.featured);
}

/**
 * Selected filters look like { recipient: ["for-her"], type: ["box","bouquet"] }.
 * Within a group the options are OR'd; across groups they're AND'd. A group
 * with nothing selected doesn't constrain anything.
 */
export function matchesFilters(
  product: Product,
  selected: Record<string, string[]>,
) {
  return Object.values(selected).every(
    (chosen) =>
      chosen.length === 0 || chosen.some((id) => product.tags.includes(id)),
  );
}
