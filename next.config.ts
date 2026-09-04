import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Retired occasion slugs.
   *
   * Both of these were live URLs in the sitemap, so they cannot simply
   * disappear — a 404 throws away whatever Google had already learned
   * about them. `permanent: true` sends a 308, which passes the ranking
   * on to the new page.
   *
   * Add a line here any time you rename or retire a slug in
   * lib/occasions.ts.
   */
  async redirects() {
    return [
      {
        // Merged into Nikah & Wedding — same intent, one stronger page.
        source: "/occasions/engagement",
        destination: "/occasions/nikah-wedding",
        permanent: true,
      },
      {
        // Split into /occasions/14-august and /occasions/valentine.
        // No single successor, so it goes to the occasions index.
        source: "/occasions/festivals",
        destination: "/shop",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
