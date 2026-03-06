import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import GradientButton from "./GradientButton";
import { BuilderProfile } from "./BuilderCard";
import { CheckCircle } from "lucide-react";

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
    setBuilding(""); setStatement(""); setLinkedin(""); setGithub(""); setPortfolio("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-card border-border">
        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center gap-4">
            <CheckCircle className="w-12 h-12 text-accent" />
            <h3 className="font-display text-xl font-bold text-foreground">Profile Created!</h3>
            <p className="text-muted-foreground text-sm">Your builder profile has been added to the grid.</p>
            <GradientButton onClick={handleClose}>Close</GradientButton>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-lg">Create Your Builder Profile</DialogTitle>
              <p className="text-sm text-muted-foreground">Takes less than 60 seconds</p>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
              <div>
                <Label className="text-xs">Full Name *</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 bg-secondary border-border" />
              </div>
              <div>
                <Label className="text-xs">Country *</Label>
                <Input value={country} onChange={(e) => setCountry(e.target.value)} required className="mt-1 bg-secondary border-border" />
              </div>
              <div>
                <Label className="text-xs">Role / Title *</Label>
                <Input value={role} onChange={(e) => setRole(e.target.value)} required className="mt-1 bg-secondary border-border" />
              </div>
              <div>
                <Label className="text-xs">Company or School (optional)</Label>
                <Input value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1 bg-secondary border-border" />
              </div>
              <div>
                <Label className="text-xs">Cloud Focus *</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {cloudOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
                      <Checkbox
                        checked={focus.includes(opt)}
                        onCheckedChange={() => toggleFocus(opt)}
                      />
                      <span className="text-xs text-muted-foreground">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-xs">What are you currently building or learning?</Label>
                <Textarea value={building} onChange={(e) => setBuilding(e.target.value)} className="mt-1 bg-secondary border-border" rows={2} />
              </div>
              <div>
                <Label className="text-xs">What would you say to another woman learning cloud?</Label>
                <Textarea value={statement} onChange={(e) => setStatement(e.target.value)} className="mt-1 bg-secondary border-border" rows={2} />
              </div>
              <div>
                <Label className="text-xs">LinkedIn</Label>
                <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="mt-1 bg-secondary border-border" placeholder="https://linkedin.com/in/..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">GitHub (optional)</Label>
                  <Input value={github} onChange={(e) => setGithub(e.target.value)} className="mt-1 bg-secondary border-border" />
                </div>
                <div>
                  <Label className="text-xs">Portfolio (optional)</Label>
                  <Input value={portfolio} onChange={(e) => setPortfolio(e.target.value)} className="mt-1 bg-secondary border-border" />
                </div>
              </div>
              <GradientButton type="submit" className="mt-2 w-full">Create Profile</GradientButton>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
