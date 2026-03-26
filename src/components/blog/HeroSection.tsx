type HeroSectionProps = {
  title: string;
  subtitle: string;
  image?: string;
};

export default function HeroSection({ title, subtitle, image }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="relative min-h-[240px] md:min-h-[300px]">
        {image ? (
          <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-muted to-background" />
        )}
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4 py-12">
          <div className="max-w-3xl text-white">
            <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>
            <p className="mt-4 text-white/85 md:text-lg">{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
