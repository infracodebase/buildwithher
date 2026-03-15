import { Linkedin, Globe, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionsSidebarProps {
  builder: {
    name: string;
    linkedin?: string;
    infracodbaseUserId?: string;
  };
  isOwner: boolean;
  generatingProfile: boolean;
  generatingCard: boolean;
  onDownloadProfile: () => void;
  onDownloadCard: () => void;
  onCreateCard: () => void;
}

const ActionsSidebar = ({
  builder,
  isOwner,
  generatingProfile,
  generatingCard,
  onDownloadProfile,
  onDownloadCard,
  onCreateCard,
}: ActionsSidebarProps) => {
  return (
    <div className="space-y-2.5">
      <Button asChild className="w-full gap-2 transition-all duration-200 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-0.5" size="sm">
        <a
          href={builder.linkedin || `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(builder.name)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin size={14} />
          Connect on LinkedIn
        </a>
      </Button>

      <Button variant="outline" asChild className="w-full gap-2 transition-all duration-200 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5" size="sm">
        <a
          href={builder.infracodbaseUserId ? `https://infracodebase.com/users/${builder.infracodbaseUserId}` : "https://infracodebase.com"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Globe size={14} />
          View Infrastructure Portfolio
        </a>
      </Button>

      <Button variant="ghost" size="sm" className="w-full gap-2 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5" onClick={onDownloadProfile} disabled={generatingProfile}>
        {generatingProfile ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Share2 size={14} />
            Share your builder profile →
          </>
        )}
      </Button>
      <p className="text-xs text-muted-foreground/60 text-center mt-1">Show the world what you're building.</p>

      <Button variant="outline" size="sm" className="w-full gap-2 transition-all duration-200 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5" onClick={onDownloadCard} disabled={generatingCard}>
        {generatingCard ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download size={14} />
            Share Builder Card
          </>
        )}
      </Button>

      {!isOwner && (
        <button
          onClick={onCreateCard}
          className="block w-full text-center rounded-xl py-3 px-4 text-sm font-semibold text-primary-foreground bg-gradient-to-r from-[hsl(var(--gradient-blue))] via-[hsl(var(--gradient-green))] to-[hsl(var(--gradient-yellow))] transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 hover:brightness-110"
        >
          Create Your Builder Card
        </button>
      )}
    </div>
  );
};

export default ActionsSidebar;
