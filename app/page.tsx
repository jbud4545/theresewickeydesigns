import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { PhotoGallery } from "@/components/photo-gallery";
import { BioSection } from "@/components/bio-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <main className="px-5 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
      <SiteHeader />
      <HeroSection />

      {/* Gallery */}
      <section className="py-16 md:py-24">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground">
            Gallery
          </h2>
          <p className="text-sm text-muted-foreground">
            Browse for inspiration
          </p>
        </div>
        <PhotoGallery />
      </section>

      <div className="border-t border-border" />

      <BioSection />

      <SiteFooter />
    </main>
  );
}
