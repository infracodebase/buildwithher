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
    copy: "You do not need to be the loudest voice. But you deserve to be seen. Visibility opens doors to opportunities, mentorship, collaboration, and belief in yourself.",
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

const communityPhotos = [
  "/images/community_1.jpeg",
  "/images/community_2.jpeg",
  "/images/community_3.jpeg",
  "/images/community_4.jpeg",
  "/images/community_5.jpeg",
];

const Community = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageHero
      title="A community built around we, not just me"
      badge="Community"
    >
      <p>
        You can be ambitious and still need support. You can be talented and
        still need belonging. You can be disciplined and still not want to do
        everything alone.
      </p>
    </PageHero>

    {/* Community Moments */}
    <motion.section {...fadeUp} className="py-24 md:py-32 overflow-hidden">
      <div className="container text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Community Moments
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Real sessions. Real builders. Real conversations.
          <br />
          Across cloud, infrastructure, DevOps, AI, and platform engineering.
        </p>
      </div>

      <div
        className="group overflow-hidden"
        style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
      >
        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "transform" }}
          whileHover={{ animationPlayState: "paused" } as any}
        >
          {[...communityPhotos, ...communityPhotos].map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-[260px] md:h-[300px] w-[380px] md:w-[440px] rounded-[14px] overflow-hidden shadow-md dark:shadow-primary/5 hover:shadow-xl transition-shadow"
            >
              <img
                src={src}
                alt={`Build with Her community session ${(i % communityPhotos.length) + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container text-center mt-12 max-w-2xl mx-auto">
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          Weekly Build with Her community sessions bringing together builders
          across continents.
        </p>
        <p className="text-foreground font-display font-semibold text-sm md:text-base mt-4">
          These are not webinars.
          <br />
          They are working sessions where people learn, ask questions, and build
          together.
        </p>
      </div>
    </motion.section>

    <motion.section {...fadeUp} className="section-glow">
      <div className="container py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {sections.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="card-premium p-8 group">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-lg mb-3">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {copy}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <GradientButton to="/meet-the-builders" size="lg" icon>
            Join the Community
          </GradientButton>
        </div>
      </div>
    </motion.section>

    <Footer />
  </div>
);

export default Community;
