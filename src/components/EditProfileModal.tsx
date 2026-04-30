import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Camera, X, Plus, Loader2 } from "lucide-react";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  builderId: string;
  userId: string;
  initialData: {
    name: string;
    role: string;
    country: string;
    company?: string;
    photo_url?: string;
    banner_image_url?: string;
    cloud_focus?: string[];
    builder_story?: string;
    what_building?: string;
    statement?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
}

const EditProfileModal = ({
  open,
  onClose,
  onSaved,
  builderId,
  userId,
  initialData,
}: EditProfileModalProps) => {
  const [saving, setSaving] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [builderStory, setBuilderStory] = useState("");
  const [whatBuilding, setWhatBuilding] = useState("");
  const [statement, setStatement] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  // Images
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill on open
  useEffect(() => {
    if (open) {
      setName(initialData.name || "");
      // Parse role - if it contains " at ", split into role and company
      const roleStr = initialData.role || "";
      if (roleStr.includes(" at ") && !initialData.company) {
        const parts = roleStr.split(" at ");
        setRole(parts[0]);
        setCompany(parts.slice(1).join(" at "));
      } else {
        setRole(roleStr);
        setCompany(initialData.company || "");
      }
      setCountry(initialData.country || "");
      setBuilderStory(initialData.builder_story || "");
      setWhatBuilding(initialData.what_building || "");
      setStatement(initialData.statement || "");
      setLinkedin(initialData.linkedin || "");
      setGithub(initialData.github || "");
      setPortfolio(initialData.portfolio || "");
      setSkills(initialData.cloud_focus || []);
      setBannerPreview(initialData.banner_image_url || null);
      setAvatarPreview(initialData.photo_url || null);
      setBannerFile(null);
      setAvatarFile(null);
      setSkillInput("");
    }
  }, [open, initialData]);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      toast({ title: "File too large", description: "Banner must be under 3MB." });
      return;
    }
    setBannerFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setBannerPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      toast({ title: "File too large", description: "Photo must be under 3MB." });
      return;
    }
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
    }
    setSkillInput("");
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSave = async () => {
    if (!name.trim() || !role.trim() || !country.trim()) {
      toast({ title: "Missing fields", description: "Name, role, and location are required." });
      return;
    }

    setSaving(true);
    try {
      let photo_url = initialData.photo_url || null;
      let banner_image_url = initialData.banner_image_url || null;

      // Upload avatar if changed
      if (avatarFile) {
        const ext = avatarFile.name.split(".").pop() || "jpg";
        const path = `${userId}/${builderId}-avatar-${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from("builder-photos")
          .upload(path, avatarFile);
        if (uploadErr) throw uploadErr;
        const { data: urlData } = supabase.storage
          .from("builder-photos")
          .getPublicUrl(path);
        photo_url = urlData.publicUrl;
      }

      // Upload banner if changed
      if (bannerFile) {
        const ext = bannerFile.name.split(".").pop() || "jpg";
        const path = `${userId}/${builderId}-banner-${Date.now()}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from("profile-banners")
          .upload(path, bannerFile);
        if (uploadErr) throw uploadErr;
        const { data: urlData } = supabase.storage
          .from("profile-banners")
          .getPublicUrl(path);
        banner_image_url = urlData.publicUrl;
      }

      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const { error } = await supabase
        .from("builders")
        .update({
          name,
          role,
          company: company || null,
          country,
          cloud_focus: skills,
          skills: skills,
          builder_story: builderStory || null,
          what_building: whatBuilding || null,
          statement: statement || null,
          linkedin: linkedin || null,
          github: github || null,
          portfolio: portfolio || null,
          photo_url,
          banner_image_url,
          slug,
          updated_at: new Date().toISOString(),
        })
        .eq("id", builderId);

      if (error) throw error;

      toast({ title: "Profile updated successfully" });
      onSaved();
      onClose();
    } catch (err: unknown) {
      console.error("Save error:", err);
      toast({
        title: "Failed to save",
        description: err instanceof Error ? err.message : "Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const currentBanner =
    bannerPreview || "/images/build-with-her-background.png";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border/50 rounded-2xl p-0">
        {/* Banner area */}
        <div
          className="relative w-full rounded-t-2xl overflow-hidden cursor-pointer group"
          style={{ height: 200 }}
          onClick={() => bannerInputRef.current?.click()}
        >
          <img
            src={currentBanner}
            alt="Profile banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-white font-medium">
              <Camera size={18} />
              Change Banner
            </div>
          </div>
          <input
            ref={bannerInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleBannerChange}
          />
        </div>

        {/* Avatar overlay */}
        <div className="relative flex justify-center -mt-14 z-10">
          <div
            className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-card cursor-pointer group shadow-lg"
            onClick={() => avatarInputRef.current?.click()}
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                <span className="font-display font-bold text-3xl text-foreground/60">
                  {name ? name.charAt(0) : "?"}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
              <Camera size={16} className="text-white" />
            </div>
          </div>
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <div className="px-6 pb-6 pt-2 space-y-5">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-bold text-foreground text-center">
              Edit Profile
            </DialogTitle>
          </DialogHeader>

          {/* Fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">Name *</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Location *</Label>
                <Input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl"
                  placeholder="Lagos, Nigeria"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">Title *</Label>
                <Input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl"
                  placeholder="Cloud Engineer | Platform Builder"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Company or School</Label>
                <Input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl"
                />
              </div>
            </div>

            {/* Technical Skills - Tag input */}
            <div>
              <Label className="text-xs text-muted-foreground">Technical Skills</Label>
              <div className="mt-1.5 flex flex-wrap gap-1.5 p-2 bg-secondary/50 border border-border/50 rounded-xl min-h-[40px]">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="px-2.5 py-1 text-xs bg-primary/10 text-primary border border-primary/20 gap-1"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-0.5 hover:text-destructive transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                ))}
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  onBlur={addSkill}
                  placeholder={skills.length === 0 ? "Type a skill and press Enter..." : ""}
                  className="flex-1 min-w-[120px] bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
                />
              </div>
              <p className="text-[10px] text-muted-foreground/60 mt-1">
                Press Enter or comma to add a skill
              </p>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Builder Story</Label>
              <Textarea
                value={builderStory}
                onChange={(e) => setBuilderStory(e.target.value)}
                className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl"
                rows={4}
                placeholder="Tell us your builder story..."
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">What are you building or learning?</Label>
              <Textarea
                value={whatBuilding}
                onChange={(e) => setWhatBuilding(e.target.value)}
                className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl"
                rows={3}
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Community Voice</Label>
              <Textarea
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl"
                rows={2}
                placeholder="What would you say to another woman learning cloud?"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">LinkedIn</Label>
              <Input
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl"
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-muted-foreground">GitHub</Label>
                <Input
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl"
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Portfolio</Label>
                <Input
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  className="mt-1.5 bg-secondary/50 border-border/50 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl"
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 rounded-xl gap-2"
              disabled={saving}
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
