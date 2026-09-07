import type { MetadataRoute } from "next";
import { cities } from "@/lib/delivery";
import { absolutePosterUrl, absoluteVideoUrl } from "@/lib/media";
import { occasions } from "@/lib/occasions";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // /shop and /gift-hampers are the two commercial hubs, so they sit a
  // notch above the rest.
  const pages = [
    "",
    "/shop",
    "/gift-hampers",
    "/build-your-box",
    "/about",
    "/faq",
    "/contact",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/shop" || path === "/gift-hampers" ? 0.9 : 0.8,
  }));

  // Occasion pages are the ones people actually search for
  // ("birthday gifts karachi"), so they rank above product pages.
  const occasionPages = occasions.map((o) => ({
    url: `${site.url}/occasions/${o.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // City delivery pages carry buying intent ("gift delivery karachi")
  // and back up the Google Business Profile, so they rank with the
  // occasion pages rather than below the products.
  const cityPages = cities.map((c) => ({
    url: `${site.url}/gift-delivery/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Product pages carry their clips as video sitemap entries, which is
  // how Google finds a video that is not on YouTube. A product with no
  // clip simply has no `videos` key.
  const productPages = products.map((p) => ({
    url: `${site.url}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    ...(p.media.length > 0 && {
      videos: p.media.map((m) => ({
        title: `${p.name} — ${p.tagline}`,
        description: m.alt,
        thumbnail_loc: absolutePosterUrl(m.id, site.url),
        content_loc: absoluteVideoUrl(m.id, site.url),
        family_friendly: "yes" as const,
        ...(m.published && { publication_date: m.published }),
      })),
    }),
  }));

  return [...pages, ...occasionPages, ...cityPages, ...productPages];
}
