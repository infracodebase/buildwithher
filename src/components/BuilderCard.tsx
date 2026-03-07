import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer">
      {/* ── Default state ── */}
      <div className="absolute inset-0 builder-card-gradient" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />

      <div className="relative z-10 h-full flex flex-col items-center justify-between p-5 md:p-6 text-center">
        {/* Top branding */}
        <div className="space-y-0.5">
          <p className="text-[10px] font-display font-semibold tracking-widest uppercase text-foreground/90">Build with Her</p>
          <p className="text-[8px] tracking-wider uppercase text-foreground/40">Powered by Infracodebase</p>
        </div>

        {/* Profile photo */}
        <div className="w-18 h-18 md:w-22 md:h-22 rounded-full border-2 border-foreground/20 overflow-hidden flex items-center justify-center bg-secondary/50 shadow-lg" style={{ width: "5rem", height: "5rem" }}>
          {profile.photo ? (
            <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            <span className="font-display font-bold text-2xl text-foreground/80">{profile.name.charAt(0)}</span>
          )}
        </div>

        {/* Professional identity — Name first */}
        <div className="space-y-1 min-w-0 w-full">
          <h3 className="font-display font-bold text-[15px] md:text-base text-foreground leading-tight truncate">{profile.name}</h3>
          <p className="text-[11px] text-foreground/65 truncate">{profile.role}</p>
          <p className="text-[10px] text-foreground/45">{profile.country}</p>
          <p className="text-[9px] text-foreground/35 leading-relaxed truncate">{skillsString}</p>
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] text-primary/70 hover:text-primary transition-colors mt-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={9} />
            </a>
          )}
        </div>
      </div>

      {/* ── Hover reveal state ── */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col justify-between p-5 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: "linear-gradient(180deg, hsl(222 47% 6% / 0.95) 0%, hsl(222 40% 8% / 0.97) 100%)" }}
      >
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-secondary flex-shrink-0 border border-border/50">
              {profile.photo ? (
                <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <span className="font-display font-bold text-xs text-foreground/80">{profile.name.charAt(0)}</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-display font-semibold text-sm text-foreground truncate">{profile.name}</h3>
              <p className="text-[11px] text-muted-foreground truncate">{profile.role}</p>
            </div>
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0">
                <ExternalLink size={12} />
              </a>
            )}
          </div>
          <p className="text-[10px] text-muted-foreground/60">{profile.country}</p>
        </div>

        {/* Quote */}
        <p className="text-[13px] text-foreground/75 leading-relaxed my-auto py-4 italic">
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
      </motion.div>
    </div>
  );
};

export default BuilderCard;
