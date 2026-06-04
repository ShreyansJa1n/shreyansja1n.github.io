import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

type Tile = {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const TILES: Tile[] = [
  { end: 50, suffix: "M+", label: "consumer iOS users reached at Lose It!" },
  { end: 100, prefix: "$", suffix: "K+", label: "revenue in 10 days via Deal Center" },
  { end: 99.9, decimals: 1, suffix: "%", label: "uptime maintained on critical production incidents" },
];

const StatTile = ({ tile, delay }: { tile: Tile; delay: number }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const value = useCountUp(tile.end, 1800, 0, inView);
  const decimals = tile.decimals ?? 0;
  const display = value.toFixed(decimals);

  return (
    <div
      ref={ref}
      className="card-surface p-7 md:p-9 transition-all duration-700 ease-apple"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="text-display text-5xl md:text-6xl font-semibold text-ink dark:text-ink tabular-nums">
        {tile.prefix}
        {display}
        {tile.suffix}
      </div>
      <p className="mt-4 text-sm md:text-base text-[var(--ink-muted)] leading-relaxed">
        {tile.label}
      </p>
    </div>
  );
};

export const Stats = () => {
  return (
    <section
      id="stats"
      className="px-6 py-12 md:py-16 bg-background"
      aria-label="Impact metrics"
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4 md:gap-5">
        {TILES.map((tile, i) => (
          <StatTile key={tile.label} tile={tile} delay={i * 90} />
        ))}
      </div>
    </section>
  );
};
