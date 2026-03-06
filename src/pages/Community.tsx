import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import GradientButton from "@/components/GradientButton";
import { motion } from "framer-motion";
import { Heart, Eye, Users, Palette, Handshake } from "lucide-react";

const sections = [
  {
    icon: Heart,
    title: "Why Community Matters",
    copy: "Learning alone is possible. But growing in isolation is exhausting. Community gives you context, encouragement, and a sense of shared purpose.",
  },
  {
    icon: Users,
    title: "Belonging Changes Everything",
    copy: "When you belong somewhere, you stop questioning whether you should be here. You start focusing on what you can build, learn, and contribute.",
  },
  {
    icon: Eye,
    title: "Visibility Matters",
    copy: "You do not need to be the loudest voice. But you deserve to be seen. Visibility opens doors — to opportunities, mentorship, collaboration, and belief in yourself.",
  },
  {
    icon: Palette,
    title: "Personal Brand",
    copy: "Your personal brand is not about marketing. It is about clarity. Who you are, what you do, and where you are going. Honest and confident.",
  },
  {
    icon: Handshake,
    title: "Open Collaboration",
    copy: "The best engineers learn from each other. Build with Her encourages sharing resources, pair programming, joint projects, and honest conversations.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6 },
};

const Community = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageHero title="A community built around we, not just me" badge="Community">
      <p>You can be ambitious and still need support. You can be talented and still need belonging. You can be disciplined and still not want to do everything alone.</p>
    </PageHero>

    <motion.section {...fadeUp} className="section-glow">
      <div className="container py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {sections.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="card-premium p-8 group">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-lg mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <GradientButton to="/meet-the-builders" size="lg" icon>Join the Community</GradientButton>
        </div>
      </div>
    </motion.section>

    <Footer />
  </div>
);

export default Community;
