import { useMemo } from "react";

interface BuilderActivityProps {
  joinedYear: number;
}

const BuilderActivity = ({ joinedYear }: BuilderActivityProps) => {
  // Generate a simple activity heatmap (visual placeholder)
  const weeks = 26; // ~6 months
  const days = 7;

  const cells = useMemo(() => {
    const result: number[][] = [];
    for (let w = 0; w < weeks; w++) {
      const week: number[] = [];
      for (let d = 0; d < days; d++) {
        // Generate pseudo-random activity levels 0-4
        const seed = (w * 7 + d + joinedYear) % 17;
        const level = seed < 5 ? 0 : seed < 9 ? 1 : seed < 13 ? 2 : seed < 16 ? 3 : 4;
        week.push(level);
      }
      result.push(week);
    }
    return result;
  }, [joinedYear]);

  const levelColors = [
    "bg-secondary/40",
    "bg-primary/20",
    "bg-primary/40",
    "bg-primary/60",
    "bg-primary/80",
  ];

  return (
    <section className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-semibold text-foreground">
          Builder Activity
        </h2>
        <span className="text-xs text-muted-foreground">Last 6 months</span>
      </div>

      {/* Heatmap grid */}
      <div className="overflow-x-auto">
        <div className="flex gap-[3px] min-w-fit">
          {cells.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((level, di) => (
                <div
                  key={di}
                  className={`w-3 h-3 rounded-[3px] ${levelColors[level]} transition-colors`}
                  title={`Activity level: ${level}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
        <span>Less</span>
        {levelColors.map((color, i) => (
          <div key={i} className={`w-3 h-3 rounded-[3px] ${color}`} />
        ))}
        <span>More</span>
      </div>
    </section>
  );
};

export default BuilderActivity;
