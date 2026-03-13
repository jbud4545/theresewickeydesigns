export function SiteHeader() {
  return (
    <header className="flex items-center justify-between py-6 md:py-8">
      <a href="/" className="font-serif text-xl md:text-2xl text-foreground">
        Therese Wickey
      </a>
      <p className="text-sm text-muted-foreground tracking-wide uppercase">
        Styling & Design
      </p>
    </header>
  );
}
