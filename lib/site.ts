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
} as const;

/** Builds a wa.me link with a pre-filled message. */
export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { href: "/shop", label: "Occasions" },
  { href: "/build-your-box", label: "Build your box" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
