import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientButton from "@/components/GradientButton";
import { BuilderProfile } from "@/components/BuilderCard";
import { sampleBuilders } from "@/data/communityData";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Globe, Sparkles, Camera, Copy, Download, ExternalLink, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const cloudOptions = [
  "AWS", "Azure", "GCP", "DevOps", "Platform Engineering",
  "Security", "AI Infrastructure", "Kubernetes", "Terraform", "Other",
];

const JoinTheBuilders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [focus, setFocus] = useState<string[]>([]);
  const [building, setBuilding] = useState("");
  const [statement, setStatement] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleFocus = (item: string) => {
    setFocus((prev) => prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const shareText = name
    ? `I'm proud to be part of Build with Her, a global community of women building in cloud, AI, infrastructure, and platform engineering. ${name.split(" ")[0]} is building${focus.length > 0 ? ` in ${focus.slice(0, 2).join(" and ")}` : ""}. Join us and make your journey visible.`
    : "I'm proud to be part of Build with Her, a global community of women building in cloud, AI, infrastructure, and platform engineering. Join us and make your journey visible.";

  const copyShareText = () => {
    navigator.clipboard.writeText(shareText);
    toast({ title: "Copied!", description: "Share text copied to clipboard." });
  };

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
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> 12 countries</span>
            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> 78+ builders</span>
            <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" /> Community powered</span>
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

            {/* Live card */}
            <div className="w-full max-w-[320px] aspect-[3/4] relative rounded-2xl overflow-hidden builder-card-wrapper shadow-2xl">
              <div className="absolute inset-0 builder-card-gradient" />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />
              <div className="relative z-10 h-full flex flex-col items-center justify-between p-6 md:p-8 text-center">
                {/* Top branding */}
                <div className="space-y-0.5">
                  <p className="text-[11px] font-display font-semibold tracking-widest uppercase builder-card-text-primary">Build with Her</p>
                  <p className="text-[9px] tracking-wider uppercase builder-card-text-muted">Powered by Infracodebase</p>
                </div>

                {/* Photo */}
                <div className="w-24 h-24 rounded-full border-2 border-white/20 overflow-hidden flex items-center justify-center bg-secondary/50 shadow-lg">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-display font-bold text-3xl builder-card-text-primary">
                      {name ? name.charAt(0).toUpperCase() : "?"}
                    </span>
                  )}
                </div>

                {/* Identity */}
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
                    {skillsString || "Your skills"}
                  </p>
                </div>
              </div>
            </div>

            {/* Community strip below card */}
            <div className="flex -space-x-2">
              {sampleBuilders.slice(0, 5).map((b) => (
                <div key={b.id} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-secondary flex items-center justify-center text-foreground font-display font-bold text-[10px]">
                  {b.photo ? (
                    <img src={b.photo} alt={b.name} className="w-full h-full object-cover" />
                  ) : b.name.charAt(0)}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold">+73</div>
            </div>
            <p className="text-xs text-muted-foreground">Join 78+ women building across the world</p>
          </motion.div>

          {/* RIGHT: Form + Sharing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {submitted ? (
              /* ── Success state ── */
              <div className="space-y-10">
                <div className="text-center py-12 flex flex-col items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">Welcome, Builder!</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Your profile is now visible on the Builder Wall. You are part of the movement.
                  </p>
                </div>

                {/* Sharing panel */}
                <div className="space-y-6 card-premium p-6 md:p-8 gradient-border-card">
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">Share Your Story</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Once your profile is ready, use your Builder Card to share your journey and invite more women to build with us.
                    </p>
                  </div>

                  <div className="rounded-xl bg-secondary/50 border border-border/50 p-4">
                    <p className="text-sm text-foreground leading-relaxed">{shareText}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={copyShareText}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-secondary/80 text-foreground border border-border/50 hover:bg-secondary transition-colors"
                    >
                      <Copy size={14} /> Copy text
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-secondary/80 text-foreground border border-border/50 hover:bg-secondary transition-colors">
                      <Download size={14} /> Download Card
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://buildwithher.dev")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink size={14} /> LinkedIn
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-secondary/80 text-foreground border border-border/50 hover:bg-secondary transition-colors"
                    >
                      <ExternalLink size={14} /> X
                    </a>
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-secondary/80 text-foreground border border-border/50 hover:bg-secondary transition-colors"
                    >
                      <ExternalLink size={14} /> Instagram
                    </a>
                  </div>

                  <p className="text-xs text-muted-foreground">For Instagram, download the card image and upload it directly to your post or story.</p>
                </div>

                <div className="text-center">
                  <GradientButton to="/meet-the-builders" icon>View the Builder Wall</GradientButton>
                </div>
              </div>
            ) : (
              /* ── Form ── */
              <div className="space-y-8">
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
                    <Label className="text-xs text-muted-foreground">Profile Photo</Label>
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
                    <Label className="text-xs text-muted-foreground">What are you currently building or learning?</Label>
                    <Textarea value={building} onChange={(e) => setBuilding(e.target.value)} className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl" rows={2} />
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">What would you say to another woman learning cloud?</Label>
                    <Textarea value={statement} onChange={(e) => setStatement(e.target.value)} className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl" rows={2} />
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">LinkedIn</Label>
                    <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl" placeholder="https://linkedin.com/in/..." />
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

                  <GradientButton type="submit" className="mt-4 w-full" size="lg">Share Your Story</GradientButton>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JoinTheBuilders;
