"use client";

import Image from "next/image";
import { useState } from "react";

const photos = [
  {
    src: "/images/gallery-1.jpg",
    alt: "Modern living room with warm earth tones and natural textures",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/gallery-2.jpg",
    alt: "Elegant kitchen with marble countertops and brass fixtures",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "Serene master bedroom with layered neutral textiles",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery-4.jpg",
    alt: "Spa-like bathroom with natural stone and warm wood",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/images/gallery-5.jpg",
    alt: "Elegant dining room with solid wood table and statement chandelier",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery-6.jpg",
    alt: "Welcoming entryway with curated objects and warm lighting",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery-7.jpg",
    alt: "Cozy reading nook with built-in bookshelves",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery-8.jpg",
    alt: "Beautifully styled outdoor patio living space",
    span: "col-span-2 row-span-1",
  },
  {
    src: "/images/gallery-9.jpg",
    alt: "Textile detail with layered fabrics in warm neutrals",
    span: "col-span-1 row-span-1",
  },
];

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            className={`group relative overflow-hidden rounded-sm cursor-pointer ${
              index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
            } ${index === 7 ? "sm:col-span-2" : ""}`}
            onClick={() => setSelectedPhoto(index)}
            aria-label={`View ${photo.alt}`}
          >
            <div
              className={`relative w-full ${
                index === 0 ? "aspect-[4/3]" : "aspect-square"
              } ${index === 7 ? "aspect-[2/1]" : ""}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes={
                  index === 0
                    ? "(min-width: 1024px) 66vw, (min-width: 640px) 66vw, 100vw"
                    : index === 7
                      ? "(min-width: 1024px) 66vw, (min-width: 640px) 66vw, 100vw"
                      : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                }
                priority={index < 3}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
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
            className="absolute top-6 right-6 text-background/80 hover:text-background transition-colors text-lg font-sans tracking-widest uppercase"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close lightbox"
          >
            Close
          </button>
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-background/60 hover:text-background transition-colors"
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
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-background/60 hover:text-background transition-colors"
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
              src={photos[selectedPhoto].src}
              alt={photos[selectedPhoto].alt}
              fill
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
