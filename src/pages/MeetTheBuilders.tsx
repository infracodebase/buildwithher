import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientButton from "@/components/GradientButton";
import BuilderCard, { BuilderProfile } from "@/components/BuilderCard";
import ProfileModal from "@/components/ProfileModal";
import GlobalMap from "@/components/GlobalMap";
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
            className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text">
            
            Meet the Builders
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            
            <p>Women across the world are learning and building in cloud infrastructure. What connects them is simple. <span className="text-foreground font-medium">They kept building</span>.</p>
            <p className="mt-3">Because visibility matters. And because no one should feel like they are building alone.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-3 justify-center">
            
            <GradientButton onClick={() => setModalOpen(true)} size="lg" icon>Be Part of the Movement</GradientButton>
            <GradientButton to="/community" variant="outline" size="lg">Join the Community</GradientButton>
          </motion.div>
        </div>
      </section>

      {/* Builder Count Module */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-glow">
        
        



















        
      </motion.section>

      {/* Global Map */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="band-gradient section-glow">
        
        <div className="container py-20 md:py-28">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-4">Building Across the World</h2>
            <p className="text-muted-foreground leading-relaxed">Women in this community are building across cloud, AI, infrastructure, DevOps, and platform engineering from many countries.</p>
          </div>
          <GlobalMap />
        </div>
      </motion.section>

      {/* Builder Grid */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-glow">
        
        <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {builders.map((builder, i) =>
            <BuilderCard key={builder.id} profile={builder} index={i} />
            )}
          </div>
        </div>
      </motion.section>

      <ProfileModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleNewProfile} />
      

      <Footer />
    </div>);

};

export default MeetTheBuilders;