import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import BrandLockup from "./BrandLockup";
import ThemeToggle from "./ThemeToggle";
import ProfileRecovery from "./ProfileRecovery";

const navLinks = [
  { label: "Manifest", path: "/manifest" },
  { label: "Programs", path: "/programs" },
  { label: "Community", path: "/community" },
  { label: "Events", path: "/events" },
  { label: "Builders", path: "/meet-the-builders" },
  { label: "Member Wall", path: "/member-wall" },
  { label: "Partners", path: "/partners" },
  { label: "Resources", path: "/resources" },
];

interface BuilderPresence {
  slug: string;
  name: string;
  photo: string;
}

function getBuilderPresence(): BuilderPresence | null {
  const slug = localStorage.getItem("builderProfileSlug");
  if (!slug) return null;
  return {
    slug,
    name: localStorage.getItem("builderProfileName") || "",
    photo: localStorage.getItem("builderProfilePhoto") || "",
  };
}

export function clearBuilderPresence() {
  localStorage.removeItem("builderProfileSlug");
  localStorage.removeItem("builderProfileName");
  localStorage.removeItem("builderProfilePhoto");
  window.dispatchEvent(new Event("builderProfileUpdated"));
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const ProfileAvatar = ({ presence, size = "sm" }: { presence: BuilderPresence | null; size?: "sm" | "md" }) => {
  const dim = size === "sm" ? "w-7 h-7" : "w-8 h-8";
  const textSize = size === "sm" ? "text-[10px]" : "text-xs";

  if (!presence) {
    return (
      <div className={`${dim} rounded-full bg-secondary/80 border border-border/50 flex items-center justify-center`}>
        <User size={size === "sm" ? 13 : 15} className="text-muted-foreground" />
      </div>
    );
  }

  if (presence.photo) {
    return (
      <img
        src={presence.photo}
        alt={presence.name}
        className={`${dim} rounded-full object-cover border-2 border-primary/40 ring-1 ring-primary/20`}
      />
    );
  }

  return (
    <div className={`${dim} rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center`}>
      <span className={`${textSize} font-semibold text-primary`}>
        {getInitials(presence.name)}
      </span>
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [presence, setPresence] = useState<BuilderPresence | null>(null);
  const [validated, setValidated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Refresh presence on route change and custom events
  const refreshPresence = useCallback(() => {
    setPresence(getBuilderPresence());
  }, []);

  useEffect(() => {
    refreshPresence();
  }, [location.pathname, refreshPresence]);

  useEffect(() => {
    const handler = () => {
      refreshPresence();
      setValidated(true); // skip re-validation after explicit update
    };
    window.addEventListener("builderProfileUpdated", handler);
    return () => window.removeEventListener("builderProfileUpdated", handler);
  }, [refreshPresence]);

  // Validate stored profile against Supabase on first load
  useEffect(() => {
    if (validated) return;
    const stored = getBuilderPresence();
    if (!stored) {
      setValidated(true);
      return;
    }

    let cancelled = false;
    supabase
      .from("builders")
      .select("slug, name, photo_url")
      .eq("slug", stored.slug)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        if (!data) {
          // Profile no longer exists in Supabase — clear stale data
          clearBuilderPresence();
          setPresence(null);
        } else {
          // Sync localStorage with latest Supabase data
          localStorage.setItem("builderProfileName", data.name);
          localStorage.setItem("builderProfilePhoto", data.photo_url || "");
          setPresence({
            slug: data.slug!,
            name: data.name,
            photo: data.photo_url || "",
          });
        }
        setValidated(true);
      });

    return () => { cancelled = true; };
  }, [validated]);

  const handleReset = useCallback(() => {
    clearBuilderPresence();
    setPresence(null);
  }, []);

  const profilePath = presence ? `/builders/${presence.slug}` : "/join-the-builders";
  const firstName = presence?.name?.split(" ")[0];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/40 shadow-lg shadow-background/50"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <BrandLockup size="sm" />

        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-foreground bg-secondary/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />
          {!presence && (
            <ProfileRecovery variant="trigger" onRecovered={refreshPresence} />
          )}
          {presence && (
            <button
              onClick={handleReset}
              className="text-[11px] text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              Not you?
            </button>
          )}
          <Link
            to={profilePath}
            className={`h-8 px-2 pr-3 inline-flex items-center gap-2 rounded-full text-[13px] font-medium transition-all ${
              location.pathname.startsWith("/builders/")
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            }`}
          >
            <ProfileAvatar presence={presence} />
            {presence ? firstName : "My Profile"}
          </Link>
          <Link
            to="/join-the-builders"
            className="h-8 px-4 inline-flex items-center rounded-lg bg-primary text-primary-foreground text-[13px] font-semibold hover:bg-primary/90 transition-all glow-blue"
          >
            Join Community
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <Link to={profilePath} className="p-1">
            <ProfileAvatar presence={presence} size="md" />
          </Link>
          <button onClick={() => setOpen(!open)} className="p-2 text-foreground">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/30 bg-background/98 backdrop-blur-xl overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-1">
              {/* Profile presence row in mobile menu */}
              <Link
                to={profilePath}
                onClick={() => setOpen(false)}
                className={`px-3 py-3 rounded-xl text-sm font-medium transition-colors inline-flex items-center gap-3 mb-1 ${
                  location.pathname.startsWith("/builders/")
                    ? "text-foreground bg-secondary"
                    : "text-foreground bg-secondary/50 hover:bg-secondary"
                }`}
              >
                <ProfileAvatar presence={presence} size="md" />
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {presence ? presence.name : "My Profile"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {presence ? "View Profile" : "Create your builder profile"}
                  </span>
                </div>
              </Link>

              {/* Mobile: Not you? / Find profile */}
              <div className="flex items-center gap-3 px-3 mb-2">
                {presence ? (
                  <button
                    onClick={() => { handleReset(); setOpen(false); }}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                  >
                    Not you? Switch profile
                  </button>
                ) : (
                  <ProfileRecovery variant="trigger" onRecovered={() => { refreshPresence(); setOpen(false); }} />
                )}
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/join-the-builders"
                onClick={() => setOpen(false)}
                className="mt-2 h-10 flex items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
              >
                Join Community
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
