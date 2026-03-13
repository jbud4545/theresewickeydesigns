import Image from "next/image";

export function HeroSection() {
  return (
    <section className="py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
        <div className="order-2 lg:order-1">
          <p className="text-sm text-muted-foreground tracking-wide uppercase mb-4">
            Personal Stylist & Interior Designer
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[1.05] text-balance mb-6">
            Spaces designed to be loved every day
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg">
            From personal styling to interior design, I create spaces and looks
            that reflect who you are and make you feel completely at home.
          </p>
        </div>
        <div className="order-1 lg:order-2 relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-sm">
          <Image
            src="/images/gallery-1.jpg"
            alt="Beautiful living room interior with warm earth tones"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
