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

const BuilderCard = ({ profile }: { profile: BuilderProfile }) => (
  <div className="card-premium p-6 flex flex-col gap-4 group">
    <div className="flex items-start gap-3">
      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-foreground font-display font-bold text-lg overflow-hidden flex-shrink-0 group-hover:bg-primary/20 transition-colors">
        {profile.photo ? (
          <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
        ) : (
          profile.name.charAt(0)
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-display font-semibold text-sm text-foreground truncate">{profile.name}</h3>
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0">
              <ExternalLink size={12} />
            </a>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{profile.role}</p>
        <p className="text-xs text-muted-foreground/70">{profile.country}</p>
      </div>
    </div>
    <p className="text-sm text-secondary-foreground/80 leading-relaxed line-clamp-3 flex-1">"{profile.statement}"</p>
    <div className="flex flex-wrap gap-1.5 mt-auto">
      {profile.tags.map((tag) => (
        <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-secondary/80 text-muted-foreground border border-border/30">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default BuilderCard;
