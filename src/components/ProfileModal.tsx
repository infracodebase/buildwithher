import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import GradientButton from "./GradientButton";
import { BuilderProfile } from "./BuilderCard";
import { CheckCircle, Sparkles, Globe, Heart } from "lucide-react";

const cloudOptions = [
  "AWS", "Azure", "GCP", "DevOps", "Platform Engineering",
  "Security", "AI Infrastructure", "Kubernetes", "Terraform", "Other",
];

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (profile: BuilderProfile) => void;
}

const ProfileModal = ({ open, onClose, onSubmit }: ProfileModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [focus, setFocus] = useState<string[]>([]);
  const [building, setBuilding] = useState("");
  const [builderStory, setBuilderStory] = useState("");
  const [statement, setStatement] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const toggleFocus = (item: string) => {
    setFocus((prev) => prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: BuilderProfile = {
      id: Date.now().toString(),
      name,
      role: role + (company ? ` at ${company}` : ""),
      country,
      statement: statement || building,
      tags: focus,
      linkedin: linkedin || undefined,
    };
    onSubmit(profile);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setName(""); setRole(""); setCountry(""); setCompany(""); setFocus([]);
    setBuilding(""); setBuilderStory(""); setStatement(""); setLinkedin(""); setGithub(""); setPortfolio("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-card border-border/50 rounded-2xl">
        {submitted ? (
          <div className="py-16 text-center flex flex-col items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">Welcome, Builder!</h3>
            <p className="text-muted-foreground text-sm max-w-xs">Your profile is now visible on the Builder Wall. You are part of the movement.</p>
            <GradientButton onClick={handleClose}>Close</GradientButton>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="text-center space-y-4 pt-2 pb-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <DialogTitle className="font-display text-2xl font-bold text-foreground">Be Part of the Movement</DialogTitle>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Add your profile and let other women see they are not building alone. Takes less than 60 seconds.
                </p>
                <div className="flex items-center justify-center gap-4 text-[11px] text-muted-foreground/70">
                  <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> 12 countries</span>
                  <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> 78+ builders</span>
                </div>
              </div>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
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
              <GradientButton type="submit" className="mt-3 w-full" size="lg">Share Your Story</GradientButton>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
