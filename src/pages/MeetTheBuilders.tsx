import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientButton from "@/components/GradientButton";
import BuilderCard, { BuilderProfile } from "@/components/BuilderCard";
import ProfileModal from "@/components/ProfileModal";
import { sampleBuilders } from "@/data/communityData";
import { motion } from "framer-motion";
import { Users, Clock, ArrowRight } from "lucide-react";

const MeetTheBuilders = () => {
  const [builders, setBuilders] = useState<BuilderProfile[]>(sampleBuilders);
  const [modalOpen, setModalOpen] = useState(false);

  const handleNewProfile = (profile: BuilderProfile) => {
    setBuilders((prev) => [profile, ...prev]);
  };

  const totalCount = builders.length + 66;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 gradient-arc pointer-events-none" />
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
            <p>Women across the world are learning and building in cloud infrastructure. What connects them is simple — <span className="text-foreground font-medium">they kept building</span>.</p>
            <p className="mt-3">Because visibility matters. And because no one should feel like they are building alone.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-3 justify-center"
          >
            <GradientButton onClick={() => setModalOpen(true)} size="lg" icon>Create Your Profile</GradientButton>
            <GradientButton to="/community" variant="outline" size="lg">Join the Community</GradientButton>
          </motion.div>
        </div>
      </section>

      {/* Builder Count Module */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-glow"
      >
        <div className="container py-16">
          <div className="max-w-md mx-auto">
            <div className="card-premium p-10 text-center gradient-border-card glow-gradient">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Users className="w-8 h-8 text-primary" />
                <span className="font-display text-6xl font-bold gradient-text">{totalCount}</span>
              </div>
              <p className="text-muted-foreground font-medium mb-5">Builders and growing</p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-5">
                <Clock size={13} />
                <span>Takes less than 60 seconds</span>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors font-display"
              >
                Create Your Profile <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Builder Grid */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-glow"
      >
        <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {builders.map((builder, i) => (
              <BuilderCard key={builder.id} profile={builder} index={i} />
            ))}
          </div>
        </div>
      </motion.section>

      <ProfileModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleNewProfile}
      />

      <Footer />
    </div>
  );
};

export default MeetTheBuilders;
