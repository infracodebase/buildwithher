import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Globe, Pencil, Copy } from "lucide-react";
import { useState, useCallback, useRef, useEffect } from "react";
import { toPng } from "html-to-image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBuilders } from "@/hooks/useBuilders";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import EditProfileModal from "@/components/EditProfileModal";
import ShareOverlay from "@/components/ShareOverlay";
import { generateBuilderCard } from "@/utils/generateBuilderCard";
import { useQueryClient } from "@tanstack/react-query";

import ProfileBanner from "@/components/builder-profile/ProfileBanner";
import ProfileHeader from "@/components/builder-profile/ProfileHeader";
import BuilderStatsCard from "@/components/builder-profile/BuilderStatsCard";
import InfraProjectsSection from "@/components/builder-profile/InfraProjectsSection";
import BuilderActivity from "@/components/builder-profile/BuilderActivity";
import ActionsSidebar from "@/components/builder-profile/ActionsSidebar";

const BuilderProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: allBuilders, isLoading } = useBuilders();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const builder = allBuilders?.find((b) => b.slug === slug);
  const [editOpen, setEditOpen] = useState(false);
  const [generatingCard, setGeneratingCard] = useState(false);
  const [generatingProfile, setGeneratingProfile] = useState(false);
  const [showShareOverlay, setShowShareOverlay] = useState(false);
  const profileContentRef = useRef<HTMLDivElement>(null);

  // Pure ownership: authenticated user's id matches builder's user_id
  const isOwner = !!(user && builder?.userId && user.id === builder.userId);

  const joinedYear = builder?.createdAt
    ? new Date(builder.createdAt).getFullYear()
    : 2025;

  // Show share overlay when arriving from profile creation
  useEffect(() => {
    if (searchParams.get("welcome") === "true" && builder) {
      const timer = setTimeout(() => {
        setShowShareOverlay(true);
        setSearchParams({}, { replace: true });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [searchParams, builder, setSearchParams]);

  const handleEditClick = useCallback(() => {
    if (isOwner) {
      setEditOpen(true);
    }
  }, [isOwner]);

  const handleDownloadBuilderCard = useCallback(async () => {
    if (!builder) return;
    setGeneratingCard(true);
    try {
      const dataUrl = await generateBuilderCard({
        name: builder.name,
        role: builder.role?.split(" at ")[0] || builder.role,
        country: builder.country,
        company: builder.role?.includes(" at ") ? builder.role.split(" at ")[1] : undefined,
        skills: builder.tags || [],
        photoDataUrl: builder.photo || null,
      });
      const link = document.createElement("a");
      link.download = `BuildWithHer-${builder.name.replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      toast({ title: "Error", description: "Could not generate your Builder Card." });
    } finally {
      setGeneratingCard(false);
    }
  }, [builder]);

  const handleDownloadProfileImage = useCallback(async () => {
    if (!profileContentRef.current || !builder) return;
    setGeneratingProfile(true);
    try {
      const dataUrl = await toPng(profileContentRef.current, {
        pixelRatio: 2,
        backgroundColor: '#0d1117',
        cacheBust: true,
        style: {
          overflow: 'visible',
        },
      });
      const link = document.createElement("a");
      link.download = `build-with-her-profile-${builder.slug || builder.name.replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      toast({ title: "Error", description: "Could not generate your profile image." });
    } finally {
      setGeneratingProfile(false);
    }
  }, [builder]);

  const handleProfileSaved = () => {
    queryClient.invalidateQueries({ queryKey: ["builders"] });
    window.dispatchEvent(new Event("builderProfileUpdated"));
  };

  const handleCopyLink = useCallback(() => {
    const url = `https://buildwithher.lovable.app/builders/${builder?.slug || slug}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Copied!", description: "Profile link copied to clipboard." });
  }, [builder, slug]);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 pb-20 text-center">
          <p className="text-muted-foreground">Loading builder profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!builder) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 pb-20 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Builder not found</h1>
          <Link to="/meet-the-builders" className="text-primary hover:underline">
            Back to Builder Wall
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const bannerUrl = builder.bannerImageUrl || "/images/build-with-her-background.png";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 md:pt-28">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Back link */}
          <Link
            to="/meet-the-builders"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-6"
          >
            <ArrowLeft size={16} />
            Back to Builder Wall
          </Link>

          <div ref={profileContentRef}>
          {/* Banner */}
          <ProfileBanner
            bannerUrl={bannerUrl}
            isOwner={isOwner}
            onEdit={() => handleEditClick()}
          />

          {/* Profile Header — overlapping avatar */}
          <ProfileHeader
            name={builder.name}
            role={builder.role}
            country={builder.country}
            photo={builder.photo}
            joinedYear={joinedYear}
            isOwner={isOwner}
            onEdit={handleEditClick}
          />

          {/* Owner CTA bar */}
          {isOwner && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 mx-4 md:mx-6 rounded-xl border border-primary/20 bg-primary/5 backdrop-blur-sm p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">This is your profile</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  You can edit and manage your builder profile anytime.
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  className="gap-2 rounded-xl"
                  onClick={handleEditClick}
                >
                  <Pencil size={14} />
                  Edit your profile
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 rounded-xl"
                  onClick={handleCopyLink}
                >
                  <Copy size={14} />
                  Copy link
                </Button>
              </div>
            </motion.div>
          )}

          {/* Main content grid */}
          <div className="mt-8 flex flex-col lg:flex-row gap-6">
            {/* ============ LEFT SIDEBAR ============ */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-[300px] flex-shrink-0"
            >
              <div className="lg:sticky lg:top-28 space-y-5">
                <BuilderStatsCard
                  tags={builder.tags}
                  cloudPlatforms={builder.cloudPlatforms}
                  building={builder.building}
                  joinedYear={joinedYear}
                />

                <ActionsSidebar
                  builder={{
                    name: builder.name,
                    linkedin: builder.linkedin,
                    ozUserId: builder.ozUserId,
                  }}
                  isOwner={isOwner}
                  generatingProfile={generatingProfile}
                  generatingCard={generatingCard}
                  onDownloadProfile={handleDownloadProfileImage}
                  onDownloadCard={handleDownloadBuilderCard}
                  onCreateCard={() => navigate("/join-the-builders")}
                />
              </div>
            </motion.aside>

            {/* ============ RIGHT CONTENT ============ */}
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1 min-w-0 space-y-6"
            >
              {/* Builder Story */}
              <section className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
                <h2 className="font-display text-lg font-semibold text-foreground mb-2">
                  Builder Story
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {builder.bio || "I am currently training in Cloud Computing and DevOps Engineering. I want to build the infrastructure that holds the data, secures the apps, and scales the business.\n\nSo, what do you get when you hire me?\n\nYou get a leader who understands the bottom line. You get a tech-savvy operator who can translate between human teams and AI tools. And you get a future engineer who is building the technical skills to scale your infrastructure."}
                </p>
              </section>

              {/* Cloud Focus */}
              <section className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
                <h2 className="font-display text-lg font-semibold text-foreground mb-3">
                  Cloud Focus
                </h2>
                <div className="flex flex-wrap gap-2">
                  {builder.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm border">
                      {tag}
                    </Badge>
                  ))}
                  {builder.cloudPlatforms?.map(
                    (platform) =>
                      !builder.tags.includes(platform) && (
                        <Badge key={platform} variant="secondary" className="px-3 py-1 text-sm border">
                          {platform}
                        </Badge>
                      )
                  )}
                </div>
              </section>

              {/* Infrastructure Projects */}
              <InfraProjectsSection building={builder.building} />

              {/* Motivation */}
              {builder.motivation && (
                <section className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-2">
                    Why I Joined Build With Her
                  </h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {builder.motivation}
                  </p>
                </section>
              )}

              {/* Built on Oz */}
              <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-card/80 backdrop-blur-sm p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1.5">
                      Built on Oz
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Check out all the work I have done creating and managing cloud infrastructures on Oz.
                    </p>
                    <Button asChild className="gap-2 transition-all duration-200 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-0.5" size="sm">
                      <a
                        href={builder.ozUserId ? `https://oz.xyz/users/${builder.ozUserId}` : "https://oz.xyz"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Infrastructure Portfolio
                        <ExternalLink size={14} />
                      </a>
                    </Button>
                  </div>
                </div>
              </section>

              {/* Community Voice */}
              <section className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
                <h2 className="font-display text-lg font-semibold text-foreground mb-3">
                  Community Voice
                </h2>
                <blockquote className="border-l-2 border-primary/50 pl-5 py-1">
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{builder.statement}"
                  </p>
                </blockquote>
              </section>

              {/* Builder Activity */}
              <BuilderActivity joinedYear={joinedYear} />
            </motion.main>
          </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isOwner && builder.dbId && (
        <EditProfileModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          onSaved={handleProfileSaved}
          builderId={builder.dbId}
          userId={builder.userId || ""}
          initialData={{
            name: builder.name,
            role: builder.role,
            country: builder.country,
            photo_url: builder.photo,
            banner_image_url: builder.bannerImageUrl,
            cloud_focus: builder.tags,
            builder_story: builder.bio,
            what_building: builder.building?.join("\n"),
            statement: builder.statement,
            linkedin: builder.linkedin,
            github: builder.github,
            portfolio: builder.website,
          }}
        />
      )}

      {/* Share Overlay for new builders */}
      {builder && (
        <ShareOverlay
          visible={showShareOverlay}
          onDismiss={() => setShowShareOverlay(false)}
          profileUrl={`https://buildwithher.lovable.app/builders/${builder.slug || slug}`}
          builder={{
            name: builder.name,
            role: builder.role,
            country: builder.country,
            company: builder.role?.includes(" at ") ? builder.role.split(" at ")[1] : undefined,
            tags: builder.tags || [],
            photo: builder.photo,
          }}
        />
      )}

      <Footer />
    </div>
  );
};

export default BuilderProfile;
