import { ExternalLink } from "lucide-react";

export interface BuilderProfile {
  id: string;
  name: string;
  role: string;
  country: string;
  photo?: string;
  statement: string;
  tags: string[];
  linkedin?: string;
}

const BuilderCard = ({ profile }: { profile: BuilderProfile; index?: number }) => {
  const skillsString = profile.tags.join(" • ");

  return (
    <div className="flex flex-col gap-2.5">
      {/* Card */}
      <div className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer">
        {/* ── Poster default state ── */}
        <div className="absolute inset-0 builder-card-gradient" />

        {/* Subtle noise/texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />

        <div className="relative z-10 h-full flex flex-col items-center justify-between p-6 text-center">
          {/* Top branding */}
          <div className="space-y-0.5">
            <p className="text-[11px] font-display font-semibold tracking-widest uppercase text-foreground/90">Build with Her</p>
            <p className="text-[9px] tracking-wider uppercase text-foreground/40">Powered by Infracodebase</p>
          </div>

          {/* Profile photo */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-foreground/20 overflow-hidden flex items-center justify-center bg-secondary/50 shadow-lg">
            {profile.photo ? (
              <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <span className="font-display font-bold text-2xl md:text-3xl text-foreground/80">{profile.name.charAt(0)}</span>
            )}
          </div>

          {/* Professional identity */}
          <div className="space-y-1">
            <h3 className="font-display font-bold text-base text-foreground leading-tight">{profile.name}</h3>
            <p className="text-xs text-foreground/70">{profile.role}</p>
            <p className="text-[11px] text-foreground/50">{profile.country}</p>
            <p className="text-[10px] text-foreground/40 leading-relaxed max-w-[90%] mx-auto">{skillsString}</p>
          </div>
        </div>

        {/* ── Hover reveal state ── */}
        <div className="absolute inset-0 z-20 bg-background/85 backdrop-blur-xl flex flex-col justify-between p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          {/* Top info */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-secondary flex-shrink-0 border border-border/50">
                  {profile.photo ? (
                    <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-display font-bold text-sm text-foreground/80">{profile.name.charAt(0)}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-sm text-foreground truncate">{profile.name}</h3>
                  <p className="text-[11px] text-muted-foreground truncate">{profile.role}</p>
                </div>
              </div>
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0 mt-1">
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground/70">{profile.country}</p>
          </div>

          {/* Quote */}
          <p className="text-sm text-secondary-foreground/80 leading-relaxed line-clamp-4 my-auto py-3">
            "{profile.statement}"
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {profile.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-secondary/80 text-muted-foreground border border-border/30">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Name below card */}
      <div className="flex items-center justify-center gap-1.5">
        {profile.linkedin ? (
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-display font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
            {profile.name} <ExternalLink size={11} className="inline-block" />
          </a>
        ) : (
          <p className="text-sm font-display font-medium text-foreground/80">{profile.name}</p>
        )}
      </div>
    </div>
  );
};

export default BuilderCard;
