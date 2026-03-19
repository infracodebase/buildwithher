import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, X, Linkedin, Download, Copy, ExternalLink,
  Share2, User, CreditCard,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateBuilderCard } from "@/utils/generateBuilderCard";

interface ShareOverlayProps {
  visible: boolean;
  onDismiss: () => void;
  profileUrl: string;
  builder: {
    name: string;
    role?: string;
    country: string;
    company?: string;
    tags: string[];
    photo?: string;
  };
}

const ShareOverlay = ({ visible, onDismiss, profileUrl, builder }: ShareOverlayProps) => {
  const { toast } = useToast();
  const [downloadingCard, setDownloadingCard] = useState(false);
  const [cardPreviewUrl, setCardPreviewUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "card">("profile");

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(profileUrl);
    toast({ title: "Copied!", description: "Profile link copied to clipboard." });
  }, [profileUrl, toast]);

  const handleGenerateCard = useCallback(async () => {
    if (cardPreviewUrl) return cardPreviewUrl;
    try {
      const dataUrl = await generateBuilderCard({
        name: builder.name,
        role: builder.role?.split(" at ")[0] || builder.role || "",
        country: builder.country,
        company: builder.company || builder.role?.split(" at ")[1],
        skills: builder.tags,
        photoDataUrl: builder.photo || null,
      });
      setCardPreviewUrl(dataUrl);
      return dataUrl;
    } catch {
      toast({ title: "Error", description: "Could not generate your Builder Card." });
      return null;
    }
  }, [builder, cardPreviewUrl, toast]);

  const handleDownloadCard = useCallback(async () => {
    setDownloadingCard(true);
    try {
      const dataUrl = await handleGenerateCard();
      if (dataUrl) {
        const link = document.createElement("a");
        link.download = `BuildWithHer-${builder.name.replace(/\s+/g, "-")}.png`;
        link.href = dataUrl;
        link.click();
      }
    } finally {
      setDownloadingCard(false);
    }
  }, [builder.name, handleGenerateCard]);

  // Generate card preview when switching to card tab
  const handleTabSwitch = useCallback(async (tab: "profile" | "card") => {
    setActiveTab(tab);
    if (tab === "card" && !cardPreviewUrl) {
      await handleGenerateCard();
    }
  }, [cardPreviewUrl, handleGenerateCard]);

  const firstName = builder.name.split(" ")[0];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
          style={{ pointerEvents: "none" }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/40 backdrop-blur-[2px]"
            style={{ pointerEvents: "auto" }}
            onClick={onDismiss}
          />

          {/* Overlay card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl shadow-primary/5 overflow-hidden"
            style={{ pointerEvents: "auto" }}
          >
            {/* Top accent */}
            <div
              className="h-1 w-full"
              style={{
                background: "linear-gradient(90deg, #2E6D8F, #4FA48F, #8ACB2B, #D7B11F, #C07A13)",
              }}
            />

            {/* Dismiss */}
            <button
              onClick={onDismiss}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors z-10"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>

            <div className="p-6 sm:p-8 space-y-5">
              {/* Header */}
              <div className="text-center space-y-2.5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto"
                >
                  <Sparkles className="w-6 h-6 text-primary" />
                </motion.div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                  Your builder profile is live
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  {firstName}, you now have a public profile and a shareable builder card.
                </p>
              </div>

              {/* Tab switcher */}
              <div className="flex rounded-xl bg-secondary/50 p-1 gap-1">
                <button
                  onClick={() => handleTabSwitch("profile")}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === "profile"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <User size={14} />
                  Your Profile
                </button>
                <button
                  onClick={() => handleTabSwitch("card")}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === "card"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <CreditCard size={14} />
                  Builder Card
                </button>
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                {activeTab === "profile" ? (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Profile preview */}
                    <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-secondary/30 p-3.5">
                      {builder.photo ? (
                        <img
                          src={builder.photo}
                          alt={builder.name}
                          className="w-11 h-11 rounded-xl object-cover border border-border/50"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center border border-primary/20">
                          <span className="font-semibold text-sm text-primary">
                            {builder.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground truncate">{builder.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {builder.role}{builder.country ? ` · ${builder.country}` : ""}
                        </p>
                      </div>
                      <div className="flex-shrink-0 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                        <span className="text-[10px] font-medium text-primary">Live</span>
                      </div>
                    </div>

                    {/* Profile actions */}
                    <a
                      href={profileUrl}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 shadow-md"
                    >
                      <ExternalLink size={16} />
                      View your profile
                    </a>

                    <div className="flex gap-2">
                      <a
                        href={linkedInShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-secondary/80 text-foreground border border-border/50 hover:bg-secondary transition-colors"
                      >
                        <Linkedin size={14} />
                        Share profile
                      </a>
                      <button
                        onClick={handleCopyLink}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-secondary/80 text-foreground border border-border/50 hover:bg-secondary transition-colors"
                      >
                        <Copy size={14} />
                        Copy link
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="card"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Card preview */}
                    <div className="rounded-xl border border-border/50 bg-secondary/30 p-3 flex items-center justify-center min-h-[120px]">
                      {cardPreviewUrl ? (
                        <img
                          src={cardPreviewUrl}
                          alt="Your Builder Card"
                          className="w-full max-w-[320px] rounded-lg shadow-lg"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <span className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                          Generating your card…
                        </div>
                      )}
                    </div>

                    {/* Card actions */}
                    <button
                      onClick={handleDownloadCard}
                      disabled={downloadingCard}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 shadow-md disabled:opacity-50"
                    >
                      {downloadingCard ? (
                        <>
                          <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Generating…
                        </>
                      ) : (
                        <>
                          <Download size={16} />
                          Download builder card
                        </>
                      )}
                    </button>

                    <a
                      href={linkedInShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-secondary/80 text-foreground border border-border/50 hover:bg-secondary transition-colors"
                    >
                      <Share2 size={14} />
                      Share builder card
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom dismiss */}
              <div className="flex items-center justify-center pt-1">
                <button
                  onClick={onDismiss}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareOverlay;
