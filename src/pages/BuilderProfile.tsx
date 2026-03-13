import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Linkedin, Globe, Share2, Award, Copy, Check } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBuilders } from "@/hooks/useBuilders";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const BuilderProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: allBuilders, isLoading } = useBuilders();
  const builder = allBuilders?.find((b) => b.slug === slug);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const profileUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    toast({
      title: "Profile link copied.",
      description: "Share it with your network!",
    });
    setTimeout(() => {
      setCopied(false);
      setShareOpen(false);
    }, 1500);
  };

  const handleShareOnX = () => {
    const text = encodeURIComponent(
      `I'm proud to be part of Build With Her — a global community of women building in cloud, AI, and infrastructure. Check out this builder's profile:`
    );
    const url = encodeURIComponent(profileUrl);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
    setShareOpen(false);
  };

  const handleShareOnLinkedIn = () => {
    const url = encodeURIComponent(profileUrl);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
    setShareOpen(false);
  };

  const handleCreateBuilderCard = () => {
    navigate("/join-the-builders");
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 md:pt-28">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Back link */}
          <Link
            to="/meet-the-builders"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8"
          >
            <ArrowLeft size={16} />
            Back to Builder Wall
          </Link>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-8">
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
                    <span className="inline-flex items-center gap-1.5 text-xs text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
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

                  {/* Share */}
                  <Popover open={shareOpen} onOpenChange={setShareOpen}>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full gap-2 transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5"
                      >
                        <Share2 size={14} />
                        Share your builder profile →
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="center" className="w-48 p-1">
                      <div className="flex flex-col">
                        <button
                          onClick={handleCopyLink}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors text-left"
                        >
                          {copied ? (
                            <Check size={14} className="text-primary" />
                          ) : (
                            <Copy size={14} />
                          )}
                          {copied ? "Copied!" : "Copy link"}
                        </button>
                        <button
                          onClick={handleShareOnX}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors text-left"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                          Share on X
                        </button>
                        <button
                          onClick={handleShareOnLinkedIn}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors text-left"
                        >
                          <Linkedin size={14} />
                          Share on LinkedIn
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <p className="text-xs text-muted-foreground/60 text-center mt-1">Show the world what you're building.</p>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={handleCreateBuilderCard}
                  className="block w-full text-center rounded-xl py-3 px-4 text-sm font-semibold text-primary-foreground bg-gradient-to-r from-[hsl(var(--gradient-blue))] via-[hsl(var(--gradient-green))] to-[hsl(var(--gradient-yellow))] transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 hover:brightness-110"
                >
                  Create Your Builder Card
                </button>
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
                <h2 className="font-display text-lg font-semibold text-foreground mb-3">
                  Builder Story
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  "{builder.bio || builder.statement}"
                </p>
              </section>

              {/* 2. Technical Skills */}
              <section className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
                <h2 className="font-display text-lg font-semibold text-foreground mb-3">
                  Technical Skills
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

      <Footer />
    </div>
  );
};

export default BuilderProfile;
