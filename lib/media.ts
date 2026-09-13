/**
 * ══════════════════════════════════════════════════════════════════
 *  WHERE THE MEDIA LIVES  —  you manage this file
 * ══════════════════════════════════════════════════════════════════
 *
 * Products never store a URL. They store a bare id —
 * "the-birthday-box-01" — and every URL on the site is built from it
 * here. That means a poster can never go missing from a typo, and
 * moving hosts is this file rather than forty lines across the
 * catalogue.
 *
 * ── PHOTOS AND VIDEO LIVE IN DIFFERENT PLACES, ON PURPOSE ─────────
 *
 * PHOTOS  →  public/photos/, shipped with the site.
 *
 *   You add photographs constantly, so the thing that matters is how
 *   little ceremony each one costs: run `npm run photo`, the file lands
 *   in the folder, commit. No upload, no dashboard, no waiting.
 *
 *   They are small — around 200 KB each — so git carries them without
 *   complaint, and serving them from the site's own domain is the
 *   plainest possible signal to Google Images: the picture and the page
 *   that sells it share an origin.
 *
 * VIDEO  →  Cloudflare R2, over media.heartmadecrafts.studio.
 *
 *   Clips are 3–5 MB each and git keeps every version of a binary
 *   forever, so one re-shoot a month would bloat the repository
 *   permanently. They also change rarely — seven clips, uploaded once —
 *   so the upload step costs almost nothing in practice.
 *
 * The rule of thumb: small and frequent goes in the repo, large and
 * rare goes in the bucket.
 */

/** Videos and their posters. Cloudflare R2. */
const VIDEO_HOST = "https://media.heartmadecrafts.studio";
const VIDEO_DIR = "/videos";

/**
 * Photographs. Served from the site itself.
 *
 * "" means public/photos/ — the files sit in the repo and Vercel serves
 * them from the site's own domain. Set this to a URL only if photos
 * ever outgrow the repo and need a bucket of their own.
 */
const PHOTO_HOST = "";
const PHOTO_DIR = "/photos";

/**
 * The video file for a media id.
 *
 * `id` is the file name with no extension, and it is the same id the
 * poster uses — that pairing is the whole point.
 */
export function videoUrl(id: string) {
  return `${VIDEO_HOST}${VIDEO_DIR}/${id}.mp4`;
}

/**
 * The still frame for a clip.
 *
 * Always .jpg, always beside the clip. Without a poster the browser
 * downloads the first chunk of the video just to draw one frame, which
 * on a Pakistani mobile connection is the difference between a page
 * that loads and one that is abandoned. `npm run video` writes it.
 */
export function posterUrl(id: string) {
  return `${VIDEO_HOST}${VIDEO_DIR}/${id}.jpg`;
}

/**
 * A still photograph.
 *
 * Photos are what the catalogue runs on — every grid card, and the
 * whole product-page gallery. `npm run photo` writes them into
 * public/photos/ at 1600px wide, which is enough for a full-width shot
 * on a laptop and still well under 300 KB.
 */
export function photoUrl(id: string) {
  return `${PHOTO_HOST}${PHOTO_DIR}/${id}.jpg`;
}

/**
 * Absolute URLs, for schema.org and the sitemap.
 *
 * Crawlers reject a site-relative path in `contentUrl`, `content_loc`
 * or `image:loc`, so anything served from the site itself has to be
 * prefixed with the origin. Pass `site.url`.
 */
export function absoluteVideoUrl(id: string, siteUrl: string) {
  return absolute(videoUrl(id), siteUrl);
}

export function absolutePosterUrl(id: string, siteUrl: string) {
  return absolute(posterUrl(id), siteUrl);
}

export function absolutePhotoUrl(id: string, siteUrl: string) {
  return absolute(photoUrl(id), siteUrl);
}

/**
 * Make any URL from this file absolute.
 *
 * A URL that already names a host is left alone; a site-relative one
 * gets the origin in front. This is what lets photos and video sit on
 * different hosts without every caller having to know which is which.
 */
export function absolute(url: string, siteUrl: string) {
  return url.startsWith("http") ? url : `${siteUrl}${url}`;
}
