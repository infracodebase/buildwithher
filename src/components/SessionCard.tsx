import { useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

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
  const [modalOpen, setModalOpen] = useState(false);

  // Cards with embedUrl but no videoUrl open in a modal
  const opensModal = !!session.embedUrl && !session.videoUrl;

  const cardContent = (
    <div className="overflow-hidden group flex flex-col rounded-2xl bg-card border border-border/50 transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-[0_8px_40px_hsl(var(--primary)/0.12),0_0_0_1px_hsl(var(--primary)/0.05)] hover:border-primary/25">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden">
        {session.imageUrl ? (
          <img
            src={session.imageUrl}
            alt={session.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-200 ease-out group-hover:brightness-[0.9] group-hover:scale-105"
          />
        ) : session.embedUrl ? (
          <img
            src={`https://img.youtube.com/vi/${session.embedUrl.split("/embed/")[1]?.split("?")[0]}/maxresdefault.jpg`}
            alt={session.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-200 ease-out group-hover:brightness-[0.9] group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-200" />
        {/* Play icon overlay for modal cards */}
        {opensModal && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-primary/80 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-primary-foreground ml-1"><polygon points="5,3 19,12 5,21" /></svg>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
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

        <h3 className="font-display font-semibold text-foreground text-[15px] leading-snug line-clamp-2 mb-2 min-h-[2.6rem]">
          {session.title}
        </h3>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4 min-h-[3.6rem]">
          {session.description}
        </p>

        <div className="mt-auto pt-3 border-t border-border/40">
          <p className="text-sm font-medium text-foreground">{session.speaker}</p>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1">{session.role}</p>
        </div>

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

  // Modal cards
  if (opensModal) {
    return (
      <>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="block text-left w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-2xl cursor-pointer"
        >
          {cardContent}
        </button>

        {modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <div
              className="relative w-full max-w-4xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <p className="text-white font-display font-semibold text-lg mb-3 line-clamp-1">
                {session.title}
              </p>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={`${session.embedUrl}?autoplay=1`}
                  title={session.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // External link cards (videoUrl like Spotify)
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
