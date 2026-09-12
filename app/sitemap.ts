import type { MetadataRoute } from "next";
import { cities } from "@/lib/delivery";
import { absolute, absolutePosterUrl, absoluteVideoUrl } from "@/lib/media";
import { occasions } from "@/lib/occasions";
import { featuredProducts, products, stillsFor } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /**
   * Video entries, all of them on the home page.
   *
   * A video sitemap entry names the page a visitor can watch the video
   * on, not the file's own address. The clips play on the home page and
   * nowhere else now, so every entry hangs off "/" — the same four
   * featured products the page renders, in the same order.
   *
   * Listing them against the product pages, where they used to be,
   * would point Google at pages that no longer contain a video.
   */
  const homeVideos = featuredProducts()
    .slice(0, 4)
    .flatMap((p) =>
      p.media.map((m) => ({
        title: `${p.name} — ${p.tagline}`,
        description: m.alt,
        thumbnail_loc: absolutePosterUrl(m.id, site.url),
        content_loc: absoluteVideoUrl(m.id, site.url),
        family_friendly: "yes" as const,
        ...(m.published && { publication_date: m.published }),
      })),
    );

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
    ...(path === "" && homeVideos.length > 0 && { videos: homeVideos }),
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

  /**
   * Product pages, each listing its photographs.
   *
   * Image entries do for Google Images what the video entries do for
   * video: they are how a picture that is not on a big platform gets
   * found, and they tie each photograph to the page that sells the
   * thing in it. The URLs are absolute because they live on R2, on a
   * different host from the pages.
   */
  const productPages = products.map((p) => {
    const images = stillsFor(p).map((s) => absolute(s.src, site.url));
    return {
      url: `${site.url}/product/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(images.length > 0 && { images }),
    };
  });

  return [...pages, ...occasionPages, ...cityPages, ...productPages];
}
