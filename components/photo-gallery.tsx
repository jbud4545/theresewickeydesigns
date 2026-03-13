"use client";

import Image from "next/image";
import { useState } from "react";
import { bytescaleImage, type FolderKey } from "@/lib/bytescale";

interface Photo {
  file: string;
  alt: string;
  folder: FolderKey;
}

/**
 * Sagamore photos first, then Steamboat photos.
 * Each entry carries the Bytescale filename + folder so we can
 * build the correct CDN URL at render time.
 */
const photos: Photo[] = [
  // ── Sagamore (17 photos) ──────────────────────────────────────────────
  { file: "8939sag_01.jpg", alt: "Sagamore residence exterior front view", folder: "sagamore" },
  { file: "8939sag_02.jpg", alt: "Sagamore entry and landscaping detail", folder: "sagamore" },
  { file: "8939sag_03.jpg", alt: "Sagamore living area with mountain views", folder: "sagamore" },
  { file: "8939sag_04.jpg", alt: "Sagamore open-concept kitchen and dining", folder: "sagamore" },
  { file: "8939sag_05.jpg", alt: "Sagamore kitchen with modern finishes", folder: "sagamore" },
  { file: "8939sag_06.jpg", alt: "Sagamore dining space with natural light", folder: "sagamore" },
  { file: "8939sag_07.jpg", alt: "Sagamore great room with fireplace", folder: "sagamore" },
  { file: "8939sag_08.jpg", alt: "Sagamore primary suite with warm textiles", folder: "sagamore" },
  { file: "8939sag_09.jpg", alt: "Sagamore bathroom with stone and wood accents", folder: "sagamore" },
  { file: "8939sag_10.jpg", alt: "Sagamore guest bedroom styling", folder: "sagamore" },
  { file: "8939sag_11.jpg", alt: "Sagamore hallway and architectural details", folder: "sagamore" },
  { file: "8939sag_12.jpg", alt: "Sagamore mudroom and storage design", folder: "sagamore" },
  { file: "8939sag_13.jpg", alt: "Sagamore outdoor living and deck", folder: "sagamore" },
  { file: "8939sag_14.jpg", alt: "Sagamore patio with mountain backdrop", folder: "sagamore" },
  { file: "8939sag_15.jpg", alt: "Sagamore landscape and exterior lighting", folder: "sagamore" },
  { file: "8939sag_16.jpg", alt: "Sagamore home detail and craftsmanship", folder: "sagamore" },
  { file: "8939sag_17.jpg", alt: "Sagamore home exterior with mountain views", folder: "sagamore" },

  // ── Steamboat (9 photos) ──────────────────────────────────────────────
  { file: "1-1.jpg", alt: "Steamboat modern home with warm earth tones", folder: "steamboat" },
  { file: "1-2.jpg", alt: "Steamboat kitchen with contemporary finishes", folder: "steamboat" },
  { file: "1-3.jpg", alt: "Steamboat bedroom with layered neutral textiles", folder: "steamboat" },
  { file: "1-4.jpg", alt: "Steamboat bathroom with natural stone and warm wood", folder: "steamboat" },
  { file: "1-5.jpg", alt: "Steamboat dining room with statement chandelier", folder: "steamboat" },
  { file: "1-6.jpg", alt: "Steamboat entryway with curated objects", folder: "steamboat" },
  { file: "1-7.jpg", alt: "Steamboat reading nook with built-in shelves", folder: "steamboat" },
  { file: "1-8.jpg", alt: "Steamboat outdoor patio living space", folder: "steamboat" },
  { file: "1-9.jpg", alt: "Steamboat textile detail in warm neutrals", folder: "steamboat" },
];

/**
 * Pick an optimal thumbnail width based on grid position.
 * Widths are 2x the max CSS rendered size to stay sharp on Retina/HiDPI.
 *
 *   0  → 2-col + 2-row hero tile  (≈66 vw ≈ 900px CSS)  → 1920 px
 *   7  → 2-col wide tile          (≈66 vw ≈ 900px CSS)  → 1920 px
 *   rest → single col             (≈33 vw ≈ 460px CSS)  → 1024 px
 *
 * For items beyond the first 9 we use the same pattern modulo 9.
 */
function thumbWidth(index: number): number {
  const pos = index % 9;
  if (pos === 0 || pos === 7) return 1920;
  return 1024;
}

/**
 * Grid classes per position in the repeating 9-item pattern.
 */
function gridClasses(index: number): string {
  const pos = index % 9;
  if (pos === 0) return "sm:col-span-2 sm:row-span-2";
  if (pos === 7) return "sm:col-span-2";
  return "";
}

function aspectClasses(index: number): string {
  const pos = index % 9;
  if (pos === 0) return "aspect-[4/3]";
  if (pos === 7) return "aspect-[2/1]";
  return "aspect-square";
}

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {photos.map((photo, index) => (
          <button
            key={`${photo.folder}-${photo.file}`}
            className={`group relative overflow-hidden rounded-sm cursor-pointer appearance-none border-0 bg-transparent p-0 text-left ${gridClasses(index)}`}
            onClick={() => setSelectedPhoto(index)}
            aria-label={`View ${photo.alt}`}
          >
            <div className={`relative w-full ${aspectClasses(index)}`}>
              <Image
                src={bytescaleImage(photo.file, {
                  w: thumbWidth(index),
                  f: "webp",
                }, photo.folder)}
                alt={photo.alt}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes={
                  thumbWidth(index) === 1024
                    ? "(min-width: 1024px) 66vw, (min-width: 640px) 66vw, 100vw"
                    : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                }
                priority={index < 3}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox — serve a large version (1920 px wide) for detail viewing */}
      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4 md:p-12"
          onClick={() => setSelectedPhoto(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setSelectedPhoto(null);
            if (e.key === "ArrowRight")
              setSelectedPhoto((prev) =>
                prev !== null ? (prev + 1) % photos.length : 0
              );
            if (e.key === "ArrowLeft")
              setSelectedPhoto((prev) =>
                prev !== null
                  ? (prev - 1 + photos.length) % photos.length
                  : 0
              );
          }}
          role="dialog"
          aria-label="Photo lightbox"
          tabIndex={0}
        >
          <button
            className="absolute top-6 right-6 appearance-none border-0 bg-transparent p-0 text-background/80 hover:text-background transition-colors text-lg font-sans tracking-widest uppercase"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close lightbox"
          >
            Close
          </button>
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 appearance-none border-0 bg-transparent p-0 text-background/60 hover:text-background transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhoto(
                (selectedPhoto - 1 + photos.length) % photos.length
              );
            }}
            aria-label="Previous photo"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 appearance-none border-0 bg-transparent p-0 text-background/60 hover:text-background transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhoto((selectedPhoto + 1) % photos.length);
            }}
            aria-label="Next photo"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div
            className="relative max-w-5xl w-full aspect-[3/2]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={bytescaleImage(photos[selectedPhoto].file, {
                w: 2560,
                f: "webp",
              }, photos[selectedPhoto].folder)}
              alt={photos[selectedPhoto].alt}
              fill
              unoptimized
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-background/60 text-sm font-sans">
            {selectedPhoto + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
