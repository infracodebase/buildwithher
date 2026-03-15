import { Layers, Cloud, Target, CalendarDays } from "lucide-react";

interface BuilderStatsCardProps {
  tags: string[];
  cloudPlatforms?: string[];
  building?: string[];
  joinedYear: number;
}

const BuilderStatsCard = ({ tags, cloudPlatforms, building, joinedYear }: BuilderStatsCardProps) => {
  // Derive stats
  const platformCount = cloudPlatforms?.length || tags.length;
  const projectCount = building?.length || 1;

  // Get platform names (top 3)
  const platforms = (cloudPlatforms || tags).slice(0, 3);

  // Determine primary focus
  const focusArea = tags[0] || "Cloud Engineering";

  return (
    <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-5 space-y-4">
      <h3 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider">
        Builder Stats
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-secondary/50 p-3 text-center">
          <Layers size={18} className="mx-auto mb-1.5 text-primary" />
          <p className="text-lg font-bold text-foreground">{projectCount}</p>
          <p className="text-[11px] text-muted-foreground">Projects</p>
        </div>
        <div className="rounded-xl bg-secondary/50 p-3 text-center">
          <Cloud size={18} className="mx-auto mb-1.5 text-accent" />
          <p className="text-lg font-bold text-foreground">{platformCount}</p>
          <p className="text-[11px] text-muted-foreground">Stacks</p>
        </div>
        <div className="rounded-xl bg-secondary/50 p-3 text-center">
          <Target size={18} className="mx-auto mb-1.5 text-primary" />
          <p className="text-sm font-semibold text-foreground truncate">{focusArea}</p>
          <p className="text-[11px] text-muted-foreground">Focus</p>
        </div>
        <div className="rounded-xl bg-secondary/50 p-3 text-center">
          <CalendarDays size={18} className="mx-auto mb-1.5 text-accent" />
          <p className="text-lg font-bold text-foreground">{joinedYear}</p>
          <p className="text-[11px] text-muted-foreground">Joined</p>
        </div>
      </div>

      {/* Platforms list */}
      <div className="pt-2 border-t border-border/30">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-2">Platforms</p>
        <div className="flex flex-wrap gap-1.5">
          {platforms.map((p) => (
            <span
              key={p}
              className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuilderStatsCard;
