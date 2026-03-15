# Theresewickey Designs

## Bytescale Image Optimization

Images in this project are served through [Bytescale's Image Processing CDN](https://www.bytescale.com/docs/image-processing-api). All image URLs are built by `lib/bytescale.ts` using the `/image/` endpoint, which applies transformations on the fly and caches the result at the edge.

### How it works

Raw file URLs use the `/raw/` path:

```
https://upcdn.io/223k2Xg/raw/wickeyDesigns/steamboat/1-1.jpg
```

Swapping `raw` for `image` and appending query params enables on-the-fly processing:

```
https://upcdn.io/223k2Xg/image/wickeyDesigns/steamboat/1-1.jpg?w=640&f=webp&q=75&fit=shrink
```

### Parameters in use

| Param | Value | Purpose |
|---|---|---|
| `w` | `640` or `1200` | Output width in pixels. Single-col tiles use 640px, wide/hero tiles use 1200px. |
| `f` | `webp` | Converts to WebP — smaller than JPEG at equivalent quality, supported by all modern browsers. |
| `q` | `75` (thumbnails) / `85` (lightbox) | Quality level. `q=75` cuts file size ~50% vs. default with no visible loss at thumbnail scale. |
| `fit` | `shrink` | Prevents enlargement — images smaller than the requested width are served at their natural size. |

### Lightbox

The lightbox (full-screen view) uses a wider image but still applies optimization:

```
?w=1600&f=webp&q=85&fit=shrink
```

`q=85` gives a bit more fidelity for the full-screen view while remaining significantly smaller than `q=100`.

### Where this is configured

- **`lib/bytescale.ts`** — `bytescaleImage()` helper and `BytescaleImageOptions` interface
- **`components/photo-gallery.tsx`** — `thumbWidth()` controls per-tile widths; params are passed into `bytescaleImage()`
