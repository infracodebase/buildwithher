import { useState, useMemo, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientButton from "@/components/GradientButton";
import BuilderCard from "@/components/BuilderCard";
import BuilderFilters from "@/components/BuilderFilters";
import GlobalMap from "@/components/GlobalMap";
import NewBuildersSignal from "@/components/NewBuildersSignal";
import { sampleBuilders } from "@/data/communityData";
import { motion } from "framer-motion";
import { Clock, Users, Globe, Cpu } from "lucide-react";

const MeetTheBuilders = () => {
  const [filters, setFilters] = useState({
    cloudPlatforms: [] as string[],
    roles: [] as string[],
    skills: [] as string[],
    regions: [] as string[],
  });

  // Shuffle once on mount using a stable ref
  const shuffledBuilders = useRef(
    [...sampleBuilders].sort(() => Math.random() - 0.5)
  ).current;

  const filteredBuilders = useMemo(() => {
    return shuffledBuilders.filter((builder) => {
      if (filters.cloudPlatforms.length > 0) {
        const builderPlatforms = builder.cloudPlatforms || [];
        const hasMatch = filters.cloudPlatforms.some(
          (p) => builderPlatforms.includes(p) || builder.tags.includes(p)
        );
        if (!hasMatch) return false;
      }
      if (filters.roles.length > 0) {
        const hasMatch = filters.roles.some(
          (r) => builder.roleCategory === r || builder.role.toLowerCase().includes(r.toLowerCase())
        );
        if (!hasMatch) return false;
      }
      if (filters.skills.length > 0) {
        const hasMatch = filters.skills.some((s) =>
          builder.tags.some((t) => t.toLowerCase().includes(s.toLowerCase()))
        );
        if (!hasMatch) return false;
      }
      if (filters.regions.length > 0) {
        if (!builder.region || !filters.regions.includes(builder.region)) return false;
      }
      return true;
    });
  }, [filters, shuffledBuilders]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* 1. Hero */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 gradient-arc pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/images/colors.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.12,
            mixBlendMode: 'screen',
          }}
        />
        <div className="container relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge-glow">Builder Wall</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text"
          >
            Meet the Builders
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            <p>Women across the world are learning and building in cloud infrastructure. What connects them is simple. <span className="text-foreground font-medium">They keep building</span>.</p>
            <p className="mt-3">Because visibility matters. And because no one should feel like they are building alone.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-3 justify-center"
          >
            <GradientButton to="/join-the-builders" size="lg" icon>Create Your Builder Card</GradientButton>
            <GradientButton to="/join-the-builders" variant="outline" size="lg">Join the Community</GradientButton>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-4 text-xs text-muted-foreground/60 flex items-center justify-center gap-1.5"
          >
            <Clock size={12} />
            Create your builder card in under 60 seconds.
          </motion.p>
        </div>
      </section>

      {/* 2. Community Snapshot — Stats + Map */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="band-gradient section-glow"
      >
        <div className="container pt-8 pb-20 md:pt-8 md:pb-28">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-4">Community Snapshot</h2>
            <p className="text-muted-foreground leading-relaxed">Women in this community are building across cloud, AI, infrastructure, DevOps, and platform engineering from many countries.</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-14">
            <div className="rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm p-5 text-center">
              <Users size={20} className="mx-auto mb-2 text-primary" />
              <p className="font-display text-2xl font-bold text-foreground">{sampleBuilders.length}+</p>
              <p className="text-xs text-muted-foreground mt-1">Builders</p>
            </div>
            <div className="rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm p-5 text-center">
              <Globe size={20} className="mx-auto mb-2 text-primary" />
              <p className="font-display text-2xl font-bold text-foreground">{new Set(sampleBuilders.map(b => b.country)).size}</p>
              <p className="text-xs text-muted-foreground mt-1">Countries</p>
            </div>
            <div className="rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm p-5 text-center">
              <Cpu size={20} className="mx-auto mb-2 text-primary" />
              <p className="font-display text-2xl font-bold text-foreground">Cloud + AI</p>
              <p className="text-xs text-muted-foreground mt-1">Infrastructure Focus</p>
            </div>
          </div>

          <GlobalMap />
        </div>
      </motion.section>

      {/* 3. Filters + New Builders Signal + Builder Grid */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-glow"
      >
        <div className="container py-16 md:py-24">
          <BuilderFilters selectedFilters={filters} onFilterChange={setFilters} />

          <NewBuildersSignal builders={sampleBuilders} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredBuilders.map((builder, i) => (
              <BuilderCard key={builder.id} profile={builder} index={i} />
            ))}
          </div>

          {filteredBuilders.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No builders match your selected filters.</p>
            </div>
          )}
        </div>
      </motion.section>

      {/* 7. Final CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="cta-band section-glow relative overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/images/colors.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            opacity: 0.1,
            mixBlendMode: 'screen',
          }}
        />
        <div className="container relative z-10 py-28 md:py-36 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-6">
            Become a Builder Today
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Add your story to the wall and become visible with women building across the world.
            <br />
            <span className="text-foreground font-medium">Now it is your turn to be seen.</span>
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <GradientButton to="/join-the-builders" size="lg" icon>Create Your Builder Card</GradientButton>
            <GradientButton to="/join-the-builders" variant="outline" size="lg">Join the Community</GradientButton>
          </div>
          <p className="mt-4 text-xs text-muted-foreground/60 flex items-center justify-center gap-1.5">
            <Clock size={12} />
            Takes less than 60 seconds.
          </p>
          <p className="mt-2 text-xs text-muted-foreground/50">
            Join {sampleBuilders.length}+ builders across {new Set(sampleBuilders.map(b => b.country)).size} countries.
          </p>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default MeetTheBuilders;
