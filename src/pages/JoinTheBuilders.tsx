import { useState, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientButton from "@/components/GradientButton";
import { sampleBuilders } from "@/data/communityData";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Heart, Globe, Sparkles, Camera, Copy, Download,
  CheckCircle, Linkedin, Twitter, Facebook, Link2, Share2,
} from "lucide-react";
import CelebrationEffect from "@/components/CelebrationEffect";
import { useToast } from "@/hooks/use-toast";
import { generateBuilderCard } from "@/utils/generateBuilderCard";
import { submitBuilder } from "@/hooks/useBuilders";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const cloudOptions = [
  "AWS", "Azure", "GCP", "DevOps", "Platform Engineering",
  "Security", "AI Infrastructure", "Kubernetes", "Terraform", "Other",
];

const JoinTheBuilders = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showCelebration, setShowCelebration] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [focus, setFocus] = useState<string[]>([]);
  const [building, setBuilding] = useState("");
  const [builderStory, setBuilderStory] = useState("");
  const [motivation, setMotivation] = useState("");
  const [statement, setStatement] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [cardImageUrl, setCardImageUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [submittedSlug, setSubmittedSlug] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  // Fixed community stats
  const communityStats = useMemo(() => {
    return { total: 78, countries: 12 };
  }, []);

  const toggleFocus = (item: string) => {
    setFocus((prev) =>
      prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateLinkedInUrl = (url: string) => {
    return /^https?:\/\/(www\.)?linkedin\.com\/in\/.+/i.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const errors: Record<string, string> = {};
    if (!motivation.trim()) errors.motivation = "Please tell us why you want to join Build With Her.";
    if (!builderStory.trim()) errors.builderStory = "Please share your builder story.";
    if (!building.trim()) errors.building = "Tell us what you're currently building or learning.";
    if (!linkedin.trim()) errors.linkedin = "Please add your LinkedIn profile.";
    else if (!validateLinkedInUrl(linkedin.trim())) errors.linkedin = "Please enter a valid LinkedIn URL (e.g. https://linkedin.com/in/yourname).";
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});

    if (!photoFile) {
      setShowPhotoModal(true);
      return;
    }
    setGenerating(true);
    try {
      // Save to database
      await submitBuilder({
        name,
        country,
        role,
        company: company || undefined,
        cloud_focus: focus,
        what_building: building || undefined,
        statement: statement || undefined,
        builder_story: builderStory || undefined,
        motivation: motivation || undefined,
        linkedin: linkedin || undefined,
        github: github || undefined,
        portfolio: portfolio || undefined,
        photoFile,
      });

      // Generate visual card
      const url = await generateBuilderCard({
        name,
        role,
        country,
        company,
        skills: focus,
        photoDataUrl: photoPreview,
      });
      setCardImageUrl(url);
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setSubmittedSlug(slug);
      // Persist profile data for header profile presence
      localStorage.setItem("builderProfileSlug", slug);
      localStorage.setItem("builderProfileName", name);
      localStorage.setItem("builderProfilePhoto", photoPreview || "");
      setSubmitted(true);
      
      // Trigger celebration then redirect
      setShowCelebration(true);
    } catch (err) {
      console.error("Submission error:", err);
      toast({ title: "Error", description: "Could not save your profile. Please try again." });
    } finally {
      setGenerating(false);
    }
  };

  const shareMessage = `I'm proud to be part of Build With Her.

A global community of women building in cloud, AI, infrastructure, DevOps, and platform engineering.

Visibility matters.
Representation matters.
Community matters.

Join us and share your builder story.

https://buildwithher.dev`;

  const shareUrl = "https://buildwithher.dev";

  const copyText = useCallback(
    (text: string, label: string) => {
      navigator.clipboard.writeText(text);
      toast({ title: "Copied!", description: `${label} copied to clipboard.` });
    },
    [toast]
  );

  const downloadCard = useCallback(() => {
    if (!cardImageUrl) return;
    const link = document.createElement("a");
    link.download = `BuildWithHer-${name.replace(/\s+/g, "-")}.png`;
    link.href = cardImageUrl;
    link.click();
  }, [cardImageUrl, name]);

  const skillsString = focus.join(" · ");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-8 md:pt-40 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 gradient-arc pointer-events-none" />
        <div className="container relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge-glow">Join the Movement</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text"
          >
            Be Part of the Movement
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            <p>Add your profile and let other women see they are not building alone.</p>
            <p className="mt-2">Women across the world are building in cloud, AI, infrastructure, DevOps, and platform engineering.</p>
            <p className="mt-2 text-foreground font-medium">Now it is your turn to be seen.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground"
          >
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> {communityStats.countries} countries</span>
            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> {communityStats.total}+ builders</span>
            <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" /> Community powered</span>
          </motion.div>

          {/* Share button (top) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-4 flex justify-center"
          >
            <Popover>
              <PopoverTrigger asChild>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-secondary/60 text-muted-foreground border border-border/40 hover:bg-secondary hover:text-foreground transition-colors">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2" align="center">
                <div className="flex flex-col gap-1">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { navigator.clipboard.writeText(shareMessage); }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <Twitter className="w-4 h-4" /> X
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(shareMessage);
                      toast({ title: "Copied!", description: "Your Facebook post text has been copied." });
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank", "noopener,noreferrer");
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors w-full text-left"
                  >
                    <Facebook className="w-4 h-4" /> Facebook
                  </button>
                  <button
                    onClick={() => copyText(shareMessage, "Full message")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-secondary/80 transition-colors w-full text-left"
                  >
                    <Link2 className="w-4 h-4" /> Copy Link
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </motion.div>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="container py-12 md:py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT: Live Builder Card Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-6 md:sticky md:top-32"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-display font-medium">Your Builder Card Preview</p>

            <AnimatePresence mode="wait">
              {submitted && cardImageUrl ? (
                <motion.div
                  key="generated"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-[320px]"
                >
                  <img
                    src={cardImageUrl}
                    alt="Your Builder Card"
                    className="w-full rounded-2xl shadow-2xl"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="live"
                  className="w-full max-w-[320px] aspect-[3/4] relative rounded-2xl overflow-hidden builder-card-wrapper shadow-2xl"
                >
                  <div className="absolute inset-0 builder-card-gradient" />
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />
                  <div className="relative z-10 h-full flex flex-col items-center justify-between p-6 md:p-8 text-center">
                    <div className="space-y-0.5">
                      <p className="text-[11px] font-display font-semibold tracking-widest uppercase builder-card-text-primary">Build with Her</p>
                      <p className="text-[9px] tracking-wider uppercase builder-card-text-muted">Powered by Infracodebase</p>
                    </div>
                    <div className="w-24 h-24 rounded-full border-2 border-white/20 overflow-hidden flex items-center justify-center bg-secondary/50 shadow-lg">
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-display font-bold text-3xl builder-card-text-primary">
                          {name ? name.charAt(0).toUpperCase() : "?"}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1.5 min-w-0 w-full">
                      <h3 className="font-display font-bold text-lg builder-card-text-primary leading-tight truncate">
                        {name || "Your Name"}
                      </h3>
                      <p className="text-xs builder-card-text-secondary truncate">
                        {role || "Your Role"}{company ? ` at ${company}` : ""}
                      </p>
                      <p className="text-[11px] builder-card-text-muted">
                        {country || "Your Country"}
                      </p>
                      <p className="text-[10px] builder-card-text-muted leading-relaxed truncate">
                        {skillsString || "Cloud Focus"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Community social proof */}
            <div className="flex -space-x-2">
              {sampleBuilders.slice(0, 5).map((b) => (
                <div key={b.id} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-secondary flex items-center justify-center text-foreground font-display font-bold text-[10px]">
                  {b.photo ? (
                    <img src={b.photo} alt={b.name} className="w-full h-full object-cover" />
                  ) : b.name.charAt(0)}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold">
                +{communityStats.total - 5}
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Join {communityStats.total}+ builders across {communityStats.countries} countries
            </p>
          </motion.div>

          {/* RIGHT: Form + Sharing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-10"
                >
                  {/* Welcome */}
                  <div className="text-center py-8 flex flex-col items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">🎉 Your builder profile is live!</h3>
                    <p className="text-muted-foreground text-sm max-w-xs">
                      Your profile is now visible on the Builder Wall. Share it with your network.
                    </p>
                  </div>

                  {/* Share on LinkedIn */}
                  <div className="space-y-4 rounded-2xl bg-card border border-border/50 p-6 md:p-8 shadow-lg">
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">Share it with your network</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Show the world what you're building.
                    </p>

                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://buildwithher.lovable.app/builders/${submittedSlug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-md"
                    >
                      <Linkedin size={18} /> Share on LinkedIn
                    </a>

                    {/* Copy profile link */}
                    <div className="rounded-xl bg-secondary/50 border border-border/50 p-4 space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Copy your profile link</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-sm text-foreground truncate">buildwithher.lovable.app/builders/{submittedSlug}</code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`https://buildwithher.lovable.app/builders/${submittedSlug}`);
                            toast({ title: "Copied!", description: "Profile link copied to clipboard." });
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary hover:bg-primary/10 transition-colors border border-primary/20"
                        >
                          <Copy size={12} /> Copy
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Download Builder Card */}
                  <div className="space-y-6 rounded-2xl bg-card border border-border/50 p-6 md:p-8 shadow-lg">
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">Download Your Builder Card</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Download your Builder Card and share it on social media.
                      </p>
                    </div>

                    <button
                      onClick={downloadCard}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold bg-secondary/80 text-foreground border border-border/50 hover:bg-secondary transition-colors"
                    >
                      <Download size={18} /> Download Builder Card
                    </button>

                    {/* Suggested LinkedIn Post */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Suggested LinkedIn Post</p>
                       <button
                          onClick={() => copyText(shareMessage, "Post text")}
                          className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                          <Copy size={12} /> Copy
                        </button>
                      </div>
                      <div className="rounded-xl bg-secondary/50 border border-border/50 p-4">
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{shareMessage}</p>
                      </div>
                    </div>

                    {/* Share actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://buildwithher.lovable.app/builders/${submittedSlug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => { navigator.clipboard.writeText(shareMessage); }}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-secondary/80 text-foreground border border-border/50 hover:bg-secondary transition-colors"
                      >
                        <Linkedin size={15} /> LinkedIn
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-secondary/80 text-foreground border border-border/50 hover:bg-secondary transition-colors"
                      >
                        <Twitter size={15} /> X
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(shareMessage);
                          toast({ title: "Copied!", description: "Your Facebook post text has been copied." });
                          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://buildwithher.lovable.app/builders/${submittedSlug}`)}`, "_blank", "noopener,noreferrer");
                        }}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-secondary/80 text-foreground border border-border/50 hover:bg-secondary transition-colors"
                      >
                        <Facebook size={15} /> Facebook
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(shareMessage);
                          toast({ title: "Copied!", description: "Your Instagram caption has been copied. Download your Builder Card and paste the caption into your Instagram post or story." });
                        }}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-secondary/80 text-foreground border border-border/50 hover:bg-secondary transition-colors"
                      >
                        <Camera size={15} /> Instagram
                      </button>
                      <button
                        onClick={() => copyText(shareMessage, "Full message")}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-secondary/80 text-foreground border border-border/50 hover:bg-secondary transition-colors col-span-2"
                      >
                        <Copy size={15} /> Copy Text
                      </button>
                    </div>
                  </div>

                  <div className="text-center">
                    <GradientButton to="/meet-the-builders" icon>View the Builder Wall</GradientButton>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="font-display text-2xl font-bold text-foreground">Share Your Story</h2>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Add your profile and let other women see they are not building alone. Takes less than 60 seconds.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Photo upload */}
                    <div>
                      <Label className="text-xs text-muted-foreground">Profile Photo *</Label>
                      <div className="mt-2 flex items-center gap-4">
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="w-16 h-16 rounded-full border-2 border-dashed border-border/60 hover:border-primary/40 flex items-center justify-center cursor-pointer bg-secondary/30 overflow-hidden transition-colors"
                        >
                          {photoPreview ? (
                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <Camera className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-sm text-primary hover:underline font-medium"
                          >
                            Upload photo
                          </button>
                          <p className="text-[11px] text-muted-foreground mt-0.5">Square photo works best</p>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoUpload}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">Full Name *</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl" />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Country *</Label>
                        <Input value={country} onChange={(e) => setCountry(e.target.value)} required className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">Role / Title *</Label>
                        <Input value={role} onChange={(e) => setRole(e.target.value)} required className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl" />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Company or School</Label>
                        <Input value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl" />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">Cloud Focus *</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {cloudOptions.map((opt) => (
                          <label
                            key={opt}
                            className={`flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                              focus.includes(opt)
                                ? "bg-primary/10 border-primary/30 text-foreground"
                                : "bg-secondary/30 border-border/30 text-muted-foreground hover:border-border/60"
                            }`}
                          >
                            <Checkbox
                              checked={focus.includes(opt)}
                              onCheckedChange={() => toggleFocus(opt)}
                              className="hidden"
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">Why do you want to join Build With Her? *</Label>
                      <Textarea 
                        value={motivation} 
                        onChange={(e) => { setMotivation(e.target.value); setValidationErrors(prev => ({ ...prev, motivation: "" })); }} 
                        className={`mt-1.5 bg-secondary/50 border-border/50 rounded-xl ${validationErrors.motivation ? "border-destructive" : ""}`} 
                        rows={3} 
                        placeholder={"What motivates you to be part of this community?\n\nExamples:\n• learning cloud or infrastructure\n• connecting with other women in tech\n• sharing what you're building\n• growing into leadership\n• finding mentors or collaborators"} 
                      />
                      <p className="text-[11px] text-muted-foreground mt-1">This helps us understand how to support you and grow the community.</p>
                      {validationErrors.motivation && <p className="text-xs text-destructive mt-1">{validationErrors.motivation}</p>}
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">Builder Story *</Label>
                      <Textarea 
                        value={builderStory} 
                        onChange={(e) => { setBuilderStory(e.target.value); setValidationErrors(prev => ({ ...prev, builderStory: "" })); }} 
                        className={`mt-1.5 bg-secondary/50 border-border/50 rounded-xl ${validationErrors.builderStory ? "border-destructive" : ""}`} 
                        rows={3} 
                        placeholder="Tell us your builder story — how did you start in cloud or infrastructure, and what motivates you to keep building?" 
                      />
                      {validationErrors.builderStory && <p className="text-xs text-destructive mt-1">{validationErrors.builderStory}</p>}
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">What are you currently building or learning? *</Label>
                      <Textarea 
                        value={building} 
                        onChange={(e) => { setBuilding(e.target.value); setValidationErrors(prev => ({ ...prev, building: "" })); }} 
                        className={`mt-1.5 bg-secondary/50 border-border/50 rounded-xl ${validationErrors.building ? "border-destructive" : ""}`} 
                        rows={2} 
                      />
                      {validationErrors.building && <p className="text-xs text-destructive mt-1">{validationErrors.building}</p>}
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">What would you say to another woman learning cloud?</Label>
                      <Textarea value={statement} onChange={(e) => setStatement(e.target.value)} className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl" rows={2} />
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">LinkedIn *</Label>
                      <Input 
                        value={linkedin} 
                        onChange={(e) => { setLinkedin(e.target.value); setValidationErrors(prev => ({ ...prev, linkedin: "" })); }} 
                        className={`mt-1.5 bg-secondary/50 border-border/50 rounded-xl ${validationErrors.linkedin ? "border-destructive" : ""}`} 
                        placeholder="https://linkedin.com/in/..." 
                      />
                      {validationErrors.linkedin && <p className="text-xs text-destructive mt-1">{validationErrors.linkedin}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">GitHub</Label>
                        <Input value={github} onChange={(e) => setGithub(e.target.value)} className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl" />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Portfolio</Label>
                        <Input value={portfolio} onChange={(e) => setPortfolio(e.target.value)} className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={generating}
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-colors shadow-md"
                    >
                      {generating ? (
                        <>
                          <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Generating your card...
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} /> Share Your Story
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />

      {showCelebration && (
        <CelebrationEffect
          onComplete={() => {
            if (submittedSlug) {
              navigate(`/builders/${submittedSlug}?welcome=true`);
            }
          }}
        />
      )}

      <AlertDialog open={showPhotoModal} onOpenChange={setShowPhotoModal}>
        <AlertDialogContent className="sm:max-w-md bg-card border-border/50 rounded-2xl">
          <AlertDialogHeader>
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Camera className="w-6 h-6 text-primary" />
              </div>
            </div>
            <AlertDialogTitle className="text-center font-display text-xl font-bold text-foreground">
              Add Your Photo to Be Seen by the Community
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-sm text-muted-foreground leading-relaxed">
              Your Builder Card is your place in the Build With Her community. Adding a profile photo helps other builders recognize you, connect with you, and celebrate the work you're doing.
              <br /><br />
              Profiles with photos are more likely to be discovered, shared, and remembered. Upload a photo to finalize your Builder Card, be recognized by other builders, and start growing your presence in the community.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction
              onClick={() => {
                setShowPhotoModal(false);
                setTimeout(() => fileInputRef.current?.click(), 200);
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6"
            >
              Upload Photo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default JoinTheBuilders;
