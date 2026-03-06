import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionWrapper from "@/components/SectionWrapper";
import GradientButton from "@/components/GradientButton";
import BuilderCard, { BuilderProfile } from "@/components/BuilderCard";
import ProfileModal from "@/components/ProfileModal";
import { sampleBuilders } from "@/data/communityData";
import { motion } from "framer-motion";
import { Users, Clock } from "lucide-react";

const MeetTheBuilders = () => {
  const [builders, setBuilders] = useState<BuilderProfile[]>(sampleBuilders);
  const [modalOpen, setModalOpen] = useState(false);

  const handleNewProfile = (profile: BuilderProfile) => {
    setBuilders((prev) => [profile, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero
        title="Meet the Builders"
        actions={
          <>
            <GradientButton onClick={() => setModalOpen(true)}>Create Your Profile</GradientButton>
            <GradientButton to="/community" variant="outline">Join the Community</GradientButton>
          </>
        }
      >
        <div className="space-y-3 text-left max-w-xl mx-auto">
          <p>Women across the world are learning and building in cloud infrastructure.</p>
          <p>Some are transitioning. Some are already working in tech. Some are just starting. Some are already leading.</p>
          <p>What connects them is simple. <span className="text-foreground font-medium">They kept building.</span></p>
          <p>This page highlights women in the Build with Her community who are learning, growing, and sharing their journeys.</p>
          <p>Because visibility matters. And because no one should feel like they are building alone.</p>
        </div>
      </PageHero>

      {/* Builder Count */}
      <SectionWrapper>
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 rounded-2xl bg-card border border-border/50 px-10 py-8 glow-gradient"
          >
            <Users className="w-10 h-10 text-primary" />
            <div>
              <p className="font-display text-5xl font-bold gradient-text">{builders.length + 66}</p>
              <p className="text-muted-foreground text-sm font-medium">Builders</p>
            </div>
          </motion.div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Clock size={14} />
            <span>Takes less than 60 seconds</span>
          </div>
          <GradientButton onClick={() => setModalOpen(true)}>Create Your Profile</GradientButton>
        </div>
      </SectionWrapper>

      {/* Builder Grid */}
      <SectionWrapper className="border-t border-border/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {builders.map((builder) => (
            <BuilderCard key={builder.id} profile={builder} />
          ))}
        </div>
      </SectionWrapper>

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
