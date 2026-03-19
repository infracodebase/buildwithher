import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, User, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";

interface FoundProfile {
  slug: string;
  name: string;
  photo_url: string | null;
  role: string;
  country: string;
}

interface ProfileRecoveryProps {
  /** Where to render: inline banner or a dialog trigger */
  variant?: "inline" | "trigger";
  onRecovered?: () => void;
}

function persistProfile(profile: FoundProfile) {
  localStorage.setItem("builderProfileSlug", profile.slug);
  localStorage.setItem("builderProfileName", profile.name);
  localStorage.setItem("builderProfilePhoto", profile.photo_url || "");
  window.dispatchEvent(new Event("builderProfileUpdated"));
}

const ProfileRecovery = ({ variant = "inline", onRecovered }: ProfileRecoveryProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FoundProfile[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const doSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    setSearching(true);
    setSearched(true);
    try {
      const { data, error } = await supabase
        .from("builders")
        .select("slug, name, photo_url, role, country")
        .ilike("name", `%${q.trim()}%`)
        .limit(6);
      if (error) throw error;
      setResults((data || []).filter((d): d is FoundProfile => !!d.slug));
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(query), 350);
    return () => clearTimeout(debounceRef.current);
  }, [query, doSearch]);

  const handleSelect = (profile: FoundProfile) => {
    persistProfile(profile);
    setOpen(false);
    setQuery("");
    setResults([]);
    onRecovered?.();
    navigate(`/builders/${profile.slug}`);
  };

  // Trigger variant: just a text link that opens the search
  if (variant === "trigger" && !open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 decoration-border hover:decoration-foreground"
      >
        Already have a profile?
      </button>
    );
  }

  // Inline variant: banner + search
  if (variant === "inline" && !open) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border/50 bg-secondary/30 backdrop-blur-sm p-4 flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Search size={14} className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">Already created your profile?</p>
            <p className="text-xs text-muted-foreground">Reconnect it to see yourself in the header.</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
        >
          Find my profile
          <ArrowRight size={12} />
        </button>
      </motion.div>
    );
  }

  // Search panel (both variants)
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="rounded-xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-lg p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">Find your builder profile</p>
        <button
          onClick={() => { setOpen(false); setQuery(""); setResults([]); setSearched(false); }}
          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name…"
          className="pl-9 h-9 text-sm bg-secondary/50 border-border/50"
        />
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {searching && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-3 text-center">
            <span className="inline-block w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
          </motion.div>
        )}

        {!searching && searched && results.length === 0 && (
          <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-3 text-center text-xs text-muted-foreground">
            No profiles found. Try a different name.
          </motion.p>
        )}

        {!searching && results.length > 0 && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1 max-h-[240px] overflow-y-auto">
            {results.map((profile) => (
              <button
                key={profile.slug}
                onClick={() => handleSelect(profile)}
                className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-secondary/80 transition-colors group"
              >
                {profile.photo_url ? (
                  <img
                    src={profile.photo_url}
                    alt={profile.name}
                    className="w-9 h-9 rounded-lg object-cover border border-border/50"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <User size={14} className="text-primary" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{profile.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {profile.role} · {profile.country}
                  </p>
                </div>
                <ArrowRight size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-[11px] text-muted-foreground/60 text-center">
        This links your profile to this browser so you can access it from the header.
      </p>
    </motion.div>
  );
};

export default ProfileRecovery;
