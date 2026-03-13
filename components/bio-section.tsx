export function BioSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground text-balance leading-tight mb-8">
          Creating spaces that feel like home
        </h2>
        <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
          <p>
            With a degree in apparel and textile marketing, I fell in love with
            textiles early and carried that passion through every chapter of my
            career. What began in wholesale and retail clothing evolved into
            wardrobe consulting and personal styling for both men and women, and
            ultimately into interior design.
          </p>
          <p>
            The transition felt natural. When I style a person, I learn
            everything about them: their preferences, their comfort, what makes
            them feel confident. I apply the same philosophy to spaces. I ask
            many questions because I want a home to reflect its owners and their
            personalities.
          </p>
          <p>
            {
              "I've designed three houses, each with a completely different style. My goal is always the same: I want you to walk into your home every day and fall in love with it all over again. Whether it's a family room, a kitchen, or a quiet nook, I want that space to make you feel at ease and truly happy."
            }
          </p>
        </div>
      </div>
    </section>
  );
}
