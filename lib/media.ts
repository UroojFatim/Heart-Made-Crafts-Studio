/**
 * ══════════════════════════════════════════════════════════════════
 *  WHERE THE VIDEOS LIVE  —  you manage this file
 * ══════════════════════════════════════════════════════════════════
 *
 * Products never store a URL. They store a bare id — "the-signature-box"
 * — and every URL on the site is built from it here. That means:
 *
 *   • a poster can never go missing from a typo, because it is derived
 *     from the same id as the video rather than typed out separately
 *   • moving hosts is this one constant, not forty lines across the
 *     catalogue
 *
 * ── WHERE THEY ARE SERVED FROM ────────────────────────────────────
 * Cloudflare R2, over media.heartmadecrafts.studio. Bandwidth there is
 * free whatever the traffic, and the files never enter git — which is
 * the point, because git keeps every version of a binary forever.
 *
 * Setting HOST back to "" would serve from public/videos/ instead, but
 * that folder was deleted once R2 went live. Adding a clip means
 * `npm run video`, not putting a file back in public/. See MEDIA.md.
 */

/** "" = serve from public/videos/. A URL = serve from that host. */
const HOST = "https://media.heartmadecrafts.studio";

/** Where the files sit, under the host or under public/. */
const DIR = "/videos";

/**
 * The video file for a media id.
 *
 * `id` is the file name with no extension, and it is the same id the
 * poster uses — that pairing is the whole point.
 */
export function videoUrl(id: string) {
  return `${HOST}${DIR}/${id}.mp4`;
}

/**
 * The still frame for a media id.
 *
 * Always .jpg. Without a poster the browser downloads the first chunk of
 * every video just to draw one frame, which on a Pakistani mobile
 * connection is the difference between a page that loads and one that
 * is abandoned. `npm run video` writes the .jpg for you.
 */
export function posterUrl(id: string) {
  return `${HOST}${DIR}/${id}.jpg`;
}

/**
 * Absolute URLs, for schema.org and the sitemap.
 *
 * Crawlers will not accept a site-relative path in `contentUrl` or
 * `content_loc`, so these prefix the site origin when HOST is still
 * empty. Pass `site.url`.
 */
export function absoluteVideoUrl(id: string, siteUrl: string) {
  return HOST ? videoUrl(id) : `${siteUrl}${videoUrl(id)}`;
}

export function absolutePosterUrl(id: string, siteUrl: string) {
  return HOST ? posterUrl(id) : `${siteUrl}${posterUrl(id)}`;
}
