import { ExternalLink } from "lucide-react";
import type { PartnerData } from "@/data/partnersData";

const PartnerCard = ({ partner }: { partner: PartnerData }) => {
  const hasLink = Boolean(partner.cta_url);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasLink) return;
    // Don't double-trigger when the user clicked the inner CTA or any other link/button
    const target = e.target as HTMLElement;
    if (target.closest("a, button")) return;
    window.open(partner.cta_url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={hasLink ? handleCardClick : undefined}
      className={`overflow-hidden group flex flex-col rounded-2xl bg-card border border-border/50 transition-all duration-200 ease-out focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2 focus-within:ring-offset-background ${
        hasLink
          ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_12px_48px_hsl(var(--primary)/0.18),0_0_0_1px_hsl(var(--primary)/0.1)] hover:border-primary/40"
          : "hover:shadow-[0_8px_40px_hsl(var(--primary)/0.12),0_0_0_1px_hsl(var(--primary)/0.05)] hover:border-primary/25"
      }`}
    >
      {/* Full-width media header */}
      <div className="relative w-full bg-gradient-to-br from-primary/15 via-primary/5 to-transparent overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center justify-center p-6" style={{ minHeight: '168px' }}>
          {partner.logoUrl ? (
            <img
              src={partner.logoUrl}
              alt={`${partner.name} logo`}
              className="w-auto object-contain"
              style={{ maxHeight: '120px' }}
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">{partner.name.charAt(0)}</span>
            </div>
          )}
          {partner.featuredLabel && (
            <span className="mt-3 text-[10px] font-medium uppercase tracking-widest text-primary/70">
              {partner.featuredLabel}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category badge */}
        <div className="flex items-center gap-2 mb-3 min-h-[24px]">
          <span className="text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded shrink-0">
            {partner.category}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-display font-semibold text-foreground text-[15px] leading-snug line-clamp-2 mb-2 min-h-[2.6rem] ${
          hasLink ? "group-hover:text-primary transition-colors" : ""
        }`}>
          {partner.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4 min-h-[3.6rem]">
          {partner.description}
        </p>

        {/* Tags */}
        {partner.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {partner.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium px-2.5 py-0.5 rounded bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-3 border-t border-border/40">
          <a
            href={partner.cta_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-display font-semibold hover:bg-primary/90 transition-colors"
          >
            {partner.cta_label} <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PartnerCard;
