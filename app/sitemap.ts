import type { MetadataRoute } from "next";
import { occasions } from "@/lib/occasions";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = ["", "/shop", "/build-your-box", "/about", "/faq", "/contact"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  // Occasion pages are the ones people actually search for
  // ("birthday gifts karachi"), so they rank above product pages.
  const occasionPages = occasions.map((o) => ({
    url: `${site.url}/occasions/${o.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const productPages = products.map((p) => ({
    url: `${site.url}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...occasionPages, ...productPages];
}
