type StatsSectionProps = {
  stats: Array<{ label: string; value: string }>;
};

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-8">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-xl border border-border bg-card p-4 text-center">
            <p className="text-2xl font-bold text-primary">{item.value}</p>
            <p className="mt-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
