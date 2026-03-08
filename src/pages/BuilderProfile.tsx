import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Linkedin, Github, Globe, Share2, Award, Copy, Check } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientButton from "@/components/GradientButton";
import { sampleBuilders, ExtendedBuilderProfile } from "@/data/communityData";
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
  const builder = sampleBuilders.find((b) => b.slug === slug);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const profileUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Profile link has been copied to your clipboard.",
    });
    setTimeout(() => {
      setCopied(false);
      setShareOpen(false);
    }, 1500);
  };

  const handleShareOnX = () => {
    const text = encodeURIComponent(`I'm proud to be part of Build With Her — a global community of women building in cloud, AI, and infrastructure. Check out this builder's profile:`);
    const url = encodeURIComponent(profileUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
    setShareOpen(false);
  };

  const handleShareOnLinkedIn = () => {
    const url = encodeURIComponent(profileUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
    setShareOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 gradient-arc pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/images/colors.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.08,
            mixBlendMode: 'screen',
          }}
        />
        
        <div className="container relative z-10 max-w-4xl mx-auto">
          {/* Back link */}
          <Link 
            to="/meet-the-builders" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Builder Wall
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row gap-8 items-start"
          >
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-border/50 bg-secondary/50 shadow-xl">
                {builder.photo ? (
                  <img 
                    src={builder.photo} 
                    alt={builder.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display font-bold text-4xl text-foreground/60">
                      {builder.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3 mb-2">
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {builder.name}
                </h1>
                <Badge variant="outline" className="flex-shrink-0 mt-2 text-[10px] border-primary/30 text-primary">
                  <Award size={10} className="mr-1" />
                  Builder
                </Badge>
              </div>
              
              <p className="text-lg text-muted-foreground mb-1">{builder.role}</p>
              <p className="text-sm text-muted-foreground/70 mb-4">{builder.country}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-6">
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

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {builder.linkedin && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                    className="gap-2"
                  >
                    <a href={builder.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin size={14} />
                      Connect on LinkedIn
                    </a>
                  </Button>
                )}
                {builder.github && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                    className="gap-2"
                  >
                    <a href={builder.github} target="_blank" rel="noopener noreferrer">
                      <Github size={14} />
                      View GitHub
                    </a>
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleShare}
                  className="gap-2"
                >
                  <Share2 size={14} />
                  Share Profile
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl mx-auto space-y-12">
          
          {/* Builder Story */}
          {builder.bio && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="font-display text-xl font-semibold text-foreground">Builder Story</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                "{builder.bio}"
              </p>
            </motion.div>
          )}

          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="font-display text-xl font-semibold text-foreground">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {builder.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  className="px-4 py-1.5 text-sm bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
              {builder.cloudPlatforms?.map((platform) => (
                !builder.tags.includes(platform) && (
                  <Badge 
                    key={platform} 
                    className="px-4 py-1.5 text-sm bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    {platform}
                  </Badge>
                )
              ))}
            </div>
          </motion.div>

          {/* What I'm Building */}
          {builder.building && builder.building.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="font-display text-xl font-semibold text-foreground">What I'm Building</h2>
              <ul className="space-y-2">
                {builder.building.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Built on Infracodebase */}
          {builder.infracodbaseUserId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border/50 bg-card/50 p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    Built on Infracodebase
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Explore the cloud architectures and infrastructure platforms this builder has created on Infracodebase.
                  </p>
                  <Button asChild className="gap-2">
                    <a 
                      href={`https://infracodebase.com/users/${builder.infracodbaseUserId}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Infrastructure Portfolio
                      <ExternalLink size={14} />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Community Voice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="font-display text-xl font-semibold text-foreground">Community Voice</h2>
            <blockquote className="border-l-2 border-primary/50 pl-6 py-2">
              <p className="text-muted-foreground italic text-lg leading-relaxed">
                "{builder.statement}"
              </p>
            </blockquote>
          </motion.div>

          {/* External Links */}
          {(builder.linkedin || builder.github || builder.website) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="font-display text-xl font-semibold text-foreground">Connect</h2>
              <div className="flex flex-wrap gap-3">
                {builder.linkedin && (
                  <a 
                    href={builder.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors text-sm"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                )}
                {builder.github && (
                  <a 
                    href={builder.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors text-sm"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                )}
                {builder.website && (
                  <a 
                    href={builder.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors text-sm"
                  >
                    <Globe size={16} />
                    Website
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 md:py-28 border-t border-border/30"
      >
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold gradient-text mb-4">
            Join the Builder Community
          </h2>
          <p className="text-muted-foreground mb-8">
            Create your own builder profile and become visible with women building across the world.
          </p>
          <GradientButton to="/join-the-builders" size="lg" icon>
            Create Your Builder Card
          </GradientButton>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default BuilderProfile;
