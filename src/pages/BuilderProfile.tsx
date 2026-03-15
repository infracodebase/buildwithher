import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Linkedin, Globe, Share2, Award, Pencil, Camera, Download } from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBuilders } from "@/hooks/useBuilders";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import EditProfileModal from "@/components/EditProfileModal";
import { generateBuilderCard } from "@/utils/generateBuilderCard";
import { useQueryClient } from "@tanstack/react-query";

const BuilderProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: allBuilders, isLoading } = useBuilders();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const builder = allBuilders?.find((b) => b.slug === slug);
  const [editOpen, setEditOpen] = useState(false);
  const [generatingCard, setGeneratingCard] = useState(false);
  const [generatingProfile, setGeneratingProfile] = useState(false);
  const profileContentRef = useRef<HTMLDivElement>(null);

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
    } catch (err) {
      console.error("Card generation error:", err);
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
        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--background').trim()
          ? `hsl(${getComputedStyle(document.documentElement).getPropertyValue('--background').trim()})`
          : '#0a0a0a',
      });
      const link = document.createElement("a");
      link.download = `build-with-her-profile-${builder.slug || builder.name.replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Profile export error:", err);
      toast({ title: "Error", description: "Could not generate your profile image." });
    } finally {
      setGeneratingProfile(false);
    }
  }, [builder]);

  // Check if current user owns this profile
  const isOwner = !!(user && builder?.userId && user.id === builder.userId);

  const handleCreateBuilderCard = () => {
    navigate("/join-the-builders");
  };

  const handleProfileSaved = () => {
    queryClient.invalidateQueries({ queryKey: ["builders"] });
  };

  // Derive joined year from createdAt if available
  const joinedYear = builder?.createdAt
    ? new Date(builder.createdAt).getFullYear()
    : 2025;

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
    <div className="min-h-screen builder-profile-page">
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

          {/* Banner — standalone */}
          <div
            className={`relative rounded-2xl overflow-hidden group ${isOwner ? "cursor-pointer" : ""}`}
            style={{ height: "clamp(180px, 20vw, 240px)" }}
            onClick={isOwner ? () => setEditOpen(true) : undefined}
          >
            <img
              src={bannerUrl}
              alt="Profile banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />

            {/* Owner: banner hover affordance */}
            {isOwner && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Camera size={18} />
                  Change banner
                </div>
              </div>
            )}
          </div>

          {/* Spacer + owner action row */}
          <div className="mt-4 md:mt-6 mb-4 flex items-center justify-between">
            <div />
            {isOwner && (
              <Button
                size="default"
                className="gap-2 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 font-medium px-5"
                onClick={() => setEditOpen(true)}
              >
                <Pencil size={15} />
                Edit Profile
              </Button>
            )}
          </div>

          {/* Two-column layout */}
          <div ref={profileContentRef} className="flex flex-col lg:flex-row gap-8">
            {/* ============ LEFT SIDEBAR ============ */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-[340px] flex-shrink-0"
            >
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* Identity Card */}
                <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 space-y-5">
                  {/* Photo */}
                  <div className="flex justify-center">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-lg shadow-primary/5">
                      {builder.photo ? (
                        <img
                          src={builder.photo}
                          alt={builder.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                          <span className="font-display font-bold text-4xl text-foreground/60">
                            {builder.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name & Role */}
                  <div className="text-center space-y-1">
                    <h1 className="font-display text-2xl font-bold text-foreground">
                      {builder.name}
                    </h1>
                    <p className="text-muted-foreground text-sm">{builder.role}</p>
                    <p className="text-muted-foreground/60 text-xs">{builder.country}</p>
                  </div>

                  {/* Badge */}
                  <div className="flex justify-center">
                    <span className="inline-flex items-center gap-1.5 text-xs badge-card-primary border rounded-full px-3 py-1">
                      <Award size={12} />
                      Build With Her Builder
                    </span>
                  </div>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {builder.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-secondary/80 text-muted-foreground border border-border/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Metadata */}
                  <div className="text-center text-xs text-muted-foreground/50 space-y-0.5">
                    <p>Joined Build With Her in {joinedYear}</p>
                    {builder.infracodbaseUserId && <p>Infracodebase Portfolio</p>}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5">

                  <Button 
                    asChild 
                    className="w-full gap-2 transition-all duration-200 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-0.5" 
                    size="sm"
                  >
                    <a
                      href={builder.linkedin || `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(builder.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={14} />
                      Connect on LinkedIn
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    asChild
                    className="w-full gap-2 transition-all duration-200 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5"
                    size="sm"
                  >
                    <a
                      href={builder.infracodbaseUserId ? `https://infracodebase.com/users/${builder.infracodbaseUserId}` : "https://infracodebase.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe size={14} />
                      View Infrastructure Portfolio
                    </a>
                  </Button>

                  {/* Share Profile Image */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full gap-2 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5"
                    onClick={handleDownloadProfileImage}
                    disabled={generatingProfile}
                  >
                    {generatingProfile ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Share2 size={14} />
                        Share your builder profile →
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground/60 text-center mt-1">Show the world what you're building.</p>

                  {/* Share Builder Card */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 transition-all duration-200 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5"
                    onClick={handleDownloadBuilderCard}
                    disabled={generatingCard}
                  >
                    {generatingCard ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download size={14} />
                        Share Builder Card
                      </>
                    )}
                  </Button>
                </div>

                {/* Primary CTA — only for non-owners */}
                {!isOwner && (
                  <button
                    onClick={handleCreateBuilderCard}
                    className="block w-full text-center rounded-xl py-3 px-4 text-sm font-semibold text-primary-foreground bg-gradient-to-r from-[hsl(var(--gradient-blue))] via-[hsl(var(--gradient-green))] to-[hsl(var(--gradient-yellow))] transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 hover:brightness-110"
                  >
                    Create Your Builder Card
                  </button>
                )}
              </div>
            </motion.aside>

            {/* ============ RIGHT CONTENT ============ */}
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1 min-w-0 space-y-6"
            >
              {/* 1. Builder Story */}
              <section className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
                <h2 className="font-display text-lg font-semibold text-foreground mb-2">
                  Builder Story
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {builder.bio || "I am currently training in Cloud Computing and DevOps Engineering. I want to build the infrastructure that holds the data, secures the apps, and scales the business.\n\nSo, what do you get when you hire me?\n\nYou get a leader who understands the bottom line. You get a tech-savvy operator who can translate between human teams and AI tools. And you get a future engineer who is building the technical skills to scale your infrastructure."}
                </p>
              </section>

              {/* 2. Technical Skills */}
              <section className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
                <h2 className="font-display text-lg font-semibold text-foreground mb-3">
                  Cloud Focus
                </h2>
                <div className="flex flex-wrap gap-2">
                  {builder.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="px-3 py-1 text-sm bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {builder.cloudPlatforms?.map(
                    (platform) =>
                      !builder.tags.includes(platform) && (
                        <Badge
                          key={platform}
                          className="px-3 py-1 text-sm bg-primary/10 text-primary border border-primary/20"
                        >
                          {platform}
                        </Badge>
                      )
                  )}
                </div>
              </section>

              {/* 3. What I'm Building */}
              <section className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
                <h2 className="font-display text-lg font-semibold text-foreground mb-3">
                  What I'm Building
                </h2>
                <ul className="space-y-2">
                  {(builder.building && builder.building.length > 0 ? builder.building : ["Building in cloud infrastructure"]).map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Motivation — Why I Joined */}
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

              {/* 4. Built on Infracodebase */}
              <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-card/80 backdrop-blur-sm p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1.5">
                      Built on Infracodebase
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Check out all the work I have done creating and managing cloud infrastructures on Infracodebase.
                    </p>
                    <Button 
                      asChild 
                      className="gap-2 transition-all duration-200 hover:shadow-md hover:shadow-primary/20 hover:-translate-y-0.5" 
                      size="sm"
                    >
                      <a
                        href={builder.infracodbaseUserId ? `https://infracodebase.com/users/${builder.infracodbaseUserId}` : "https://infracodebase.com"}
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

              {/* 5. Community Voice */}
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
            </motion.main>
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

      <Footer />
    </div>
  );
};

export default BuilderProfile;
