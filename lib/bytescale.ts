/**
 * Bytescale CDN URL helpers for optimized image & video delivery.
 *
 * URL anatomy:
 *   https://upcdn.io/{accountId}/raw/{filePath}    — unprocessed original
 *   https://upcdn.io/{accountId}/image/{filePath}   — on-the-fly image processing
 *   https://upcdn.io/{accountId}/video/{filePath}   — on-the-fly video processing
 *
 * Image query params:  w, h, f (format), fit (crop|max|min), quality (implicit)
 * Video query params:  f (e.g. mp4-h264), h (height)
 */

const ACCOUNT_ID = "223k2Xg";
const BASE = `https://upcdn.io/${ACCOUNT_ID}`;

/** Known Bytescale folder paths for each project */
export const FOLDERS = {
  steamboat: "wickeyDesigns/steamboat",
  sagamore: "wickeyDesigns/sagamore",
} as const;

export type FolderKey = keyof typeof FOLDERS;

// ---------------------------------------------------------------------------
// Image helpers
// ---------------------------------------------------------------------------

export interface BytescaleImageOptions {
  /** Output width in pixels */
  w?: number;
  /** Output height in pixels */
  h?: number;
  /**
   * Output format.
   * "webp" is broadly supported and ~30 % smaller than JPEG at equivalent quality.
   * Omit to let Bytescale return the source format.
   */
  f?: "webp" | "avif" | "jpeg" | "png";
  /**
   * Resize fit mode:
   *  - "crop"  – fill exact w×h, cropping edges as needed (good for thumbnails)
   *  - "max"   – scale down to fit inside w×h, no cropping (default)
   *  - "min"   – scale so shortest side matches w/h
   */
  fit?: "crop" | "max" | "min";
}

/**
 * Build a Bytescale *image processing* URL.
 *
 * @param filename  e.g. "1-1.jpg" or "8939sag_03.jpg"
 * @param opts      width, height, format, fit
 * @param folder    which project folder (defaults to "steamboat")
 *
 * @example
 *   bytescaleImage("1-1.jpg", { w: 800, f: "webp" })
 *   bytescaleImage("8939sag_03.jpg", { w: 800, f: "webp" }, "sagamore")
 */
export function bytescaleImage(
  filename: string,
  opts: BytescaleImageOptions = {},
  folder: FolderKey = "steamboat",
): string {
  const params = new URLSearchParams();
  if (opts.w) params.set("w", String(opts.w));
  if (opts.h) params.set("h", String(opts.h));
  if (opts.f) params.set("f", opts.f);
  if (opts.fit) params.set("fit", opts.fit);

  const qs = params.toString();
  return `${BASE}/image/${FOLDERS[folder]}/${filename}${qs ? `?${qs}` : ""}`;
}

/**
 * Return the raw (unprocessed) URL for an image.
 * Use this only when you need the original file (e.g. downloads).
 */
export function bytescaleRaw(filename: string, folder: FolderKey = "steamboat"): string {
  return `${BASE}/raw/${FOLDERS[folder]}/${filename}`;
}

// ---------------------------------------------------------------------------
// Video helpers
// ---------------------------------------------------------------------------

export interface BytescaleVideoOptions {
  /** Output height (width scales proportionally). Common: 480, 720, 1080 */
  h?: number;
  /**
   * Output format + codec.  "mp4-h264" has universal browser support.
   * Omit to let Bytescale decide.
   */
  f?: "mp4-h264" | "mp4-h265" | "webm-vp9";
}

/**
 * Build a Bytescale *video processing* URL.
 *
 * @example
 *   bytescaleVideo("steambot-video.mp4", { h: 720, f: "mp4-h264" })
 *   // → https://upcdn.io/223k2Xg/video/wickeyDesigns/steamboat/steambot-video.mp4?h=720&f=mp4-h264
 */
export function bytescaleVideo(
  filename: string,
  opts: BytescaleVideoOptions = {},
  folder: FolderKey = "steamboat",
): string {
  const params = new URLSearchParams();
  if (opts.h) params.set("h", String(opts.h));
  if (opts.f) params.set("f", opts.f);

  const qs = params.toString();
  return `${BASE}/video/${FOLDERS[folder]}/${filename}${qs ? `?${qs}` : ""}`;
}

// ---------------------------------------------------------------------------
// Pre-defined breakpoint widths (matches common responsive sizes)
// ---------------------------------------------------------------------------

/** Standard widths used for responsive image srcSet */
export const IMAGE_WIDTHS = [320, 640, 768, 1024, 1280, 1536, 1920] as const;

/**
 * Build a complete list of Bytescale image URLs at standard breakpoints.
 * Useful for manually constructing `<img srcset>` or for a custom loader.
 */
export function bytescaleImageSrcSet(
  filename: string,
  opts: Omit<BytescaleImageOptions, "w"> = { f: "webp" },
): string {
  return IMAGE_WIDTHS.map(
    (w) => `${bytescaleImage(filename, { ...opts, w })} ${w}w`,
  ).join(", ");
}

// ---------------------------------------------------------------------------
// Next.js custom image loader
// ---------------------------------------------------------------------------

/**
 * A Next.js-compatible image loader that delegates resizing to Bytescale's CDN.
 *
 * Usage with next/image:
 *   <Image loader={bytescaleLoader} src="1-1.jpg" ... />
 *
 * `src` should be just the filename (e.g. "1-1.jpg").
 * Next.js will call this with the `width` it needs for the current viewport.
 */
export function bytescaleLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  return bytescaleImage(src, { w: width, f: "webp" });
}

// ---------------------------------------------------------------------------
// Asset manifests
// ---------------------------------------------------------------------------

/** Every image file in the Bytescale steamboat folder */
export const STEAMBOAT_IMAGES = Array.from({ length: 33 }, (_, i) => `1-${i + 1}.jpg`);

/** The video file in the Bytescale steamboat folder */
export const STEAMBOAT_VIDEO = "steambot-video.mp4";

/** Every image file in the Bytescale sagamore folder */
export const SAGAMORE_IMAGES = Array.from(
  { length: 17 },
  (_, i) => `8939sag_${String(i + 1).padStart(2, "0")}.jpg`,
);
