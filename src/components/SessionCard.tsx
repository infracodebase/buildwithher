import { cn } from "@/lib/utils";

export interface SessionData {
  title: string;
  description: string;
  speaker: string;
  role: string;
  source: string;
  sessionType: string;
  contentType: "video" | "podcast";
  embedUrl?: string;
  imageUrl?: string;
  status?: string;
  registerLink?: string;
  videoUrl?: string;
}

const typeColors: Record<string, string> = {
  "Career Talk": "bg-accent/10 text-accent",
  "Conversation": "bg-muted text-muted-foreground",
  "Technical Session": "bg-primary/10 text-primary",
  "Live Webinar": "bg-destructive/10 text-destructive",
  "Podcast": "bg-green-500/10 text-green-500",
};

const SessionCard = ({ session }: { session: SessionData }) => {
  const cardContent = (
    <div className="overflow-hidden group flex flex-col rounded-2xl bg-card border border-border/50 transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[0_8px_40px_hsl(var(--primary)/0.12),0_0_0_1px_hsl(var(--primary)/0.05)] hover:border-primary/25">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden">
        {session.embedUrl ? (
          <iframe
            src={session.embedUrl}
            title={session.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full transition-all duration-200 ease-out group-hover:brightness-[0.9] group-hover:scale-105"
          />
        ) : session.imageUrl ? (
          <img
            src={session.imageUrl}
            alt={session.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-200 ease-out group-hover:brightness-[0.9] group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-200" />
      </div>

      {/* Content – fixed-height zones */}
      <div className="p-5 flex flex-col flex-1">
        {/* Row 1: Series + Type pill */}
        <div className="flex items-center gap-2 mb-3 min-h-[24px]">
          <span className="text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded shrink-0">
            {session.source}
          </span>
          <span
            className={cn(
              "text-[10px] font-medium px-2 py-0.5 rounded shrink-0",
              typeColors[session.sessionType] ?? "bg-muted text-muted-foreground"
            )}
          >
            {session.sessionType}
          </span>
          {session.status && (
            <span className="ml-auto badge-glow !py-0.5 !px-2.5 text-[10px] shrink-0">
              {session.status}
            </span>
          )}
        </div>

        {/* Row 2: Title – 2 lines max */}
        <h3 className="font-display font-semibold text-foreground text-[15px] leading-snug line-clamp-2 mb-2 min-h-[2.6rem]">
          {session.title}
        </h3>

        {/* Row 3: Description – 3 lines max */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4 min-h-[3.6rem]">
          {session.description}
        </p>

        {/* Row 4: Speaker – always at bottom */}
        <div className="mt-auto pt-3 border-t border-border/40">
          <p className="text-sm font-medium text-foreground">{session.speaker}</p>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1">{session.role}</p>
        </div>

        {/* Optional CTA */}
        {session.registerLink && (
          <a
            href={session.registerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Register for the Webinar
          </a>
        )}
      </div>
    </div>
  );

  if (session.videoUrl) {
    return (
      <a
        href={session.videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-2xl cursor-pointer"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
};

export default SessionCard;
