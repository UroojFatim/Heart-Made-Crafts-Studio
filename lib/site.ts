/**
 * Single source of truth for contact details and brand copy.
 *
 * ⚠️ CHANGE `whatsapp` BEFORE GOING LIVE — it is a placeholder.
 * Format: country code + number, digits only, no + or spaces.
 * Example for 0300 1234567 → "923001234567"
 */
export const site = {
  name: "HeartMade Craft",
  /**
   * The live domain, with the www and no trailing slash. It feeds
   * metadataBase, sitemap.xml, robots.txt, Open Graph and the
   * LocalBusiness schema — get it wrong and all five are wrong.
   *
   * Note the s: the DOMAIN is heartmadecraftS.studio, the INSTAGRAM
   * handle is heartmadecraft.studio. They genuinely differ.
   */
  url: "https://www.heartmadecrafts.studio",
  instagram: "heartmadecraft.studio",
  email: "heartmadecraft.studio@gmail.com",
  whatsapp: "923000000000",
  city: "Karachi",

  promise: "Har gift mein aik cheez sirf unke liye.",
  promiseEn: "Every box carries one piece made only for them.",

  /**
   * ⚠️ THE MOST IMPORTANT EMPTY FIELD ON THE SITE.
   *
   * A named person with a start date is what tells Google — and a buyer
   * about to send money to a domain they have never heard of — that
   * there is a real studio here. It matters more than any photo.
   *
   * Every field is optional and every one degrades quietly: leave
   * `name` empty and /about writes itself without a name rather than
   * printing a placeholder. Nothing on the site ever shows a blank.
   */
  founder: {
    /** Full name as you want it read. "" until you fill it in. */
    name: "Adrooj",
    role: "Founder, Creative Director and Maker",
    /** Year the studio started, e.g. "2024". "" omits the sentence. */
    since: "2026",
    /**
     * Optional scan of your own handwriting. Transparent PNG. Without
     * it the name is set in the display face instead — which still
     * looks intentional.
     *
     * ⚠️ NO "/public" IN THE PATH. Everything inside public/ is served
     * from the site root, so public/signature.PNG is "/signature.PNG".
     * Writing "/public/..." is the one mistake this trips everybody on.
     *
     * The case has to match the real filename too. It works either way
     * on Windows, but Vercel runs Linux and is case-sensitive — so a
     * lowercase .png here with an uppercase .PNG on disk breaks in
     * production while looking fine on your machine.
     */
    signature: "/signature.PNG",
  },
} as const;

/** Builds a wa.me link with a pre-filled message. */
export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  // /shop is the gift boxes hub now, not just an occasions index — its
  // H1 and title say so, and the nav has to agree.
  { href: "/shop", label: "Gift boxes" },
  { href: "/gift-hampers", label: "Gift hampers" },
  { href: "/build-your-box", label: "Build your box" },
  // Named for what the page is now — the process, not a bio.
  { href: "/about", label: "How it's made" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
