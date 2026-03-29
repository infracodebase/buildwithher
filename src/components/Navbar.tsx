import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Plus, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import BrandLockup from "./BrandLockup";
import ThemeToggle from "./ThemeToggle";
import AuthGateModal from "./AuthGateModal";

const navLinks = [
  { label: "Our Story", path: "/manifest" },
  { label: "Programs", path: "/programs" },
  { label: "Community", path: "/community" },
  { label: "Events", path: "/events" },
  { label: "Builders", path: "/meet-the-builders" },
  { label: "Member Wall", path: "/member-wall" },
  { label: "Partners", path: "/partners" },
  { label: "Resources", path: "/resources" },
];

interface AuthProfile {
  slug: string;
  name: string;
  photo: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const ProfileAvatar = ({ profile, size = "sm" }: { profile: AuthProfile | null; size?: "sm" | "md" }) => {
  const dim = size === "sm" ? "w-7 h-7" : "w-8 h-8";
  const textSize = size === "sm" ? "text-[10px]" : "text-xs";

  if (!profile) {
    return (
      <div className={`${dim} rounded-full bg-secondary/80 border border-border/50 flex items-center justify-center`}>
        <User size={size === "sm" ? 13 : 15} className="text-muted-foreground" />
      </div>
    );
  }

  if (profile.photo) {
    return (
      <img
        src={profile.photo}
        alt={profile.name}
        className={`${dim} rounded-full object-cover border-2 border-primary/40 ring-1 ring-primary/20`}
      />
    );
  }

  return (
    <div className={`${dim} rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center`}>
      <span className={`${textSize} font-semibold text-primary`}>
        {getInitials(profile.name)}
      </span>
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authProfile, setAuthProfile] = useState<AuthProfile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch builder profile for authenticated user
  useEffect(() => {
    if (!user) {
      setAuthProfile(null);
      return;
    }

    let cancelled = false;
    supabase
      .from("builders")
      .select("slug, name, photo_url")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        if (data) {
          setAuthProfile({
            slug: data.slug!,
            name: data.name,
            photo: data.photo_url || "",
          });
        } else {
          setAuthProfile(null);
        }
      });

    return () => { cancelled = true; };
  }, [user]);

  // Re-fetch on custom event (after profile creation/update)
  useEffect(() => {
    const handler = () => {
      if (!user) return;
      supabase
        .from("builders")
        .select("slug, name, photo_url")
        .eq("user_id", user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            setAuthProfile({
              slug: data.slug!,
              name: data.name,
              photo: data.photo_url || "",
            });
          }
        });
    };
    window.addEventListener("builderProfileUpdated", handler);
    return () => window.removeEventListener("builderProfileUpdated", handler);
  }, [user]);

  const handleSignOut = useCallback(async () => {
    await signOut();
    setAuthProfile(null);
    setShowDropdown(false);
  }, [signOut]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!showDropdown) return;
    const handler = () => setShowDropdown(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [showDropdown]);

  const firstName = authProfile?.name?.split(" ")[0];

  const handleProfileClick = () => {
    if (authProfile) {
      navigate(`/builders/${authProfile.slug}`);
    } else if (user) {
      navigate("/join-the-builders");
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
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

            {/* Authenticated with profile */}
            {user && authProfile && (
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowDropdown(!showDropdown); }}
                  className={`h-8 px-2 pr-3 inline-flex items-center gap-2 rounded-full text-[13px] font-medium transition-all ${
                    location.pathname.startsWith("/builders/")
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <ProfileAvatar profile={authProfile} />
                  {firstName}
                  <ChevronDown size={12} className="text-muted-foreground" />
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-xl py-1 z-50"
                    >
                      <Link
                        to={`/builders/${authProfile.slug}`}
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary/80 transition-colors"
                      >
                        <User size={14} /> My Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Authenticated without profile */}
            {user && !authProfile && !authLoading && (
              <>
                <Link
                  to="/join-the-builders"
                  className="h-8 px-3 inline-flex items-center gap-2 rounded-full text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all"
                >
                  <Plus size={14} /> Create Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-[11px] text-muted-foreground/60 hover:text-muted-foreground transition-colors"
                >
                  Sign out
                </button>
              </>
            )}

            {/* Not authenticated */}
            {!user && !authLoading && (
              <button
                onClick={() => setShowAuthModal(true)}
                className="h-8 px-2 pr-3 inline-flex items-center gap-2 rounded-full text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all"
              >
                <ProfileAvatar profile={null} />
                Sign In
              </button>
            )}

            {/* Only show Join Community when user has no profile */}
            {!(user && authProfile) && (
              <Link
                to="/join-the-builders"
                className="h-8 px-4 inline-flex items-center rounded-lg bg-primary text-primary-foreground text-[13px] font-semibold hover:bg-primary/90 transition-all glow-blue"
              >
                Join Community
              </Link>
            )}
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button onClick={handleProfileClick} className="p-1">
              <ProfileAvatar profile={authProfile} size="md" />
            </button>
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
                {user && authProfile && (
                  <Link
                    to={`/builders/${authProfile.slug}`}
                    onClick={() => setOpen(false)}
                    className="px-3 py-3 rounded-xl text-sm font-medium transition-colors inline-flex items-center gap-3 mb-1 text-foreground bg-secondary/50 hover:bg-secondary"
                  >
                    <ProfileAvatar profile={authProfile} size="md" />
                    <div className="flex flex-col">
                      <span className="font-semibold">{authProfile.name}</span>
                      <span className="text-xs text-muted-foreground">View Profile</span>
                    </div>
                  </Link>
                )}

                {user && !authProfile && !authLoading && (
                  <Link
                    to="/join-the-builders"
                    onClick={() => setOpen(false)}
                    className="px-3 py-3 rounded-xl text-sm font-medium transition-colors inline-flex items-center gap-3 mb-1 text-foreground bg-secondary/50 hover:bg-secondary"
                  >
                    <ProfileAvatar profile={null} size="md" />
                    <div className="flex flex-col">
                      <span className="font-semibold">Create Your Profile</span>
                      <span className="text-xs text-muted-foreground">Join the community</span>
                    </div>
                  </Link>
                )}

                {!user && !authLoading && (
                  <button
                    onClick={() => { setOpen(false); setShowAuthModal(true); }}
                    className="px-3 py-3 rounded-xl text-sm font-medium transition-colors inline-flex items-center gap-3 mb-1 text-foreground bg-secondary/50 hover:bg-secondary w-full text-left"
                  >
                    <ProfileAvatar profile={null} size="md" />
                    <div className="flex flex-col">
                      <span className="font-semibold">Sign In</span>
                      <span className="text-xs text-muted-foreground">Create or manage your profile</span>
                    </div>
                  </button>
                )}

                {user && (
                  <div className="flex items-center gap-3 px-3 mb-2">
                    <button
                      onClick={() => { handleSignOut(); setOpen(false); }}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
                    >
                      Sign out
                    </button>
                  </div>
                )}

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

      <AuthGateModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="Sign in to Build With Her"
        subtitle="Sign in to create and manage your builder profile."
      />
    </>
  );
};

export default Navbar;
