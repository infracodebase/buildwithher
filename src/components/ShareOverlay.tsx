import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Download, Copy, X, ExternalLink, Sparkles } from "lucide-react";
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

  const linkedInMessage = encodeURIComponent(
    `I just created my builder profile with Build With Her — a community spotlighting builders and people shaping the future of tech.\n\nTake a look:\n${profileUrl}\n\n#BuildWithHer #WomenInTech #Builders #Tech`
  );

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(profileUrl);
    toast({ title: "Copied!", description: "Profile link copied to clipboard." });
  }, [profileUrl, toast]);

  const handleDownloadCard = useCallback(async () => {
    setDownloadingCard(true);
    try {
      const dataUrl = await generateBuilderCard({
        name: builder.name,
        role: builder.role?.split(" at ")[0] || builder.role || "",
        country: builder.country,
        company: builder.company || builder.role?.split(" at ")[1],
        skills: builder.tags,
        photoDataUrl: builder.photo || null,
      });
      const link = document.createElement("a");
      link.download = `BuildWithHer-${builder.name.replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      toast({ title: "Error", description: "Could not generate your Builder Card." });
    } finally {
      setDownloadingCard(false);
    }
  }, [builder, toast]);

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
          {/* Subtle backdrop - doesn't block interaction */}
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
            className="relative w-full max-w-md rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl shadow-primary/5 overflow-hidden"
            style={{ pointerEvents: "auto" }}
          >
            {/* Top accent line */}
            <div
              className="h-1 w-full"
              style={{
                background: "linear-gradient(90deg, #2E6D8F, #4FA48F, #8ACB2B, #D7B11F, #C07A13)",
              }}
            />

            {/* Dismiss button */}
            <button
              onClick={onDismiss}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors z-10"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Header */}
              <div className="text-center space-y-3">
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
                  This is what people will see. Share it with your network.
                </p>
              </div>

              {/* Primary CTA - LinkedIn */}
              <a
                href={linkedInShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 shadow-md"
                style={{
                  background: "linear-gradient(135deg, #0077B5, #005885)",
                }}
              >
                <Linkedin size={18} />
                Share your profile
              </a>

              {/* Secondary CTA - Download Card */}
              <button
                onClick={handleDownloadCard}
                disabled={downloadingCard}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold bg-secondary/80 text-foreground border border-border/50 hover:bg-secondary transition-colors disabled:opacity-50"
              >
                {downloadingCard ? (
                  <>
                    <span className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Share your builder card
                  </>
                )}
              </button>

              {/* Tertiary actions */}
              <div className="flex items-center justify-center gap-4 pt-1">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Copy size={12} />
                  Copy profile link
                </button>
                <span className="text-border">·</span>
                <button
                  onClick={onDismiss}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Maybe later
                </button>
              </div>

              {/* Microcopy */}
              <p className="text-center text-[11px] text-muted-foreground/60">
                Your profile is ready to be discovered.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareOverlay;
