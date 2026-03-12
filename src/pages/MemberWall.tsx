import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import GradientButton from "@/components/GradientButton";
import QuoteCard from "@/components/QuoteCard";
import { testimonials } from "@/data/communityData";
import { motion } from "framer-motion";
import { Users, Globe, Cloud, TrendingUp, Shield } from "lucide-react";

const stats = [
{ icon: Users, value: "78", label: "Members" },
{ icon: Globe, value: "12", label: "Countries" },
{ icon: Cloud, value: "Cloud • AI", label: "Infrastructure" },
{ icon: TrendingUp, value: "Growing", label: "Every week" }];


const snapshotCards = [
  { icon: Users, value: "78+", label: "Builders in the community" },
  { icon: Globe, value: "13", label: "Countries represented" },
  { icon: Cloud, value: "Cloud • AI • Infrastructure", label: "Technologies builders are working with" },
  { icon: TrendingUp, value: "Growing every week", label: "New builders joining the movement" }];


const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6 }
};

const MemberWall = () =>
<div className="min-h-screen bg-background">
    <Navbar />
    <PageHero
    title="Build with Her Member Wall"
    badge="Community Wall"
    actions={<GradientButton to="/meet-the-builders" size="lg" icon>Join the Wall</GradientButton>}>
    
      <p>You are not the only one building quietly. This wall exists to make women in cloud, infrastructure, AI, DevOps, security, and platform engineering more visible.</p>
    </PageHero>

    {/* Community Snapshot */}
    <motion.section {...fadeUp} className="section-glow">
      <div className="container pt-8 pb-24 md:pt-8 md:pb-32">
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <span className="badge-glow mb-6 inline-flex">Overview</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Community <span className="gradient-text">Snapshot</span>
          </h2>
          <p className="mt-4 text-muted-foreground">A growing global community of women building real cloud infrastructure.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {snapshotCards.map(({ icon: Icon, value, label, desc }, i) =>
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="card-premium p-6 text-center">
          
              <Icon className="w-6 h-6 mx-auto mb-3 text-primary" />
              <p className="font-display font-bold text-foreground text-xl">{value}</p>
              <p className="text-sm font-medium text-foreground mt-1">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </motion.div>
        )}
        </div>
      </div>
    </motion.section>

    {/* Stats Strip */}
    <motion.section {...fadeUp}>
      









    
    </motion.section>

    {/* Intro */}
    <motion.section {...fadeUp} className="band-gradient section-glow">
      <div className="container py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center space-y-4 text-muted-foreground leading-relaxed">
          <p className="text-lg">When you are learning or growing in cloud, it is easy to feel invisible.</p>
          <p>You study. You practice. You apply. You improve. And sometimes it feels like no one sees the discipline behind it.</p>
          <p className="text-foreground font-medium text-lg">This wall exists to change that.</p>
          <p>It exists to make your journey more visible. And to remind every woman who lands here that she is not building alone.</p>
        </div>
      </div>
    </motion.section>

    {/* Community Voices / Profile Wall */}
    <motion.section {...fadeUp} className="band-gradient section-glow">
      <div className="container py-24 md:py-32">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="badge-glow mb-6 inline-flex">Testimonials</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Community <span className="gradient-text">Voices</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Real words from real women building in cloud and infrastructure.</p>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {testimonials.map((t) =>
        <div key={t.name} className="break-inside-avoid">
              <QuoteCard name={t.name} role={t.role} quote={t.quote} photo={t.photo} />
            </div>
        )}
        </div>
      </div>
    </motion.section>

    {/* Why This Wall Exists */}
    <motion.section {...fadeUp} className="section-glow">
      <div className="container py-20 md:py-28">
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-6">Why This Wall Exists</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Visibility matters. Not because attention is everything. But because being seen can lead to connection, confidence, opportunities, and belief.</p>
              <p>When more women become visible in cloud, AI, and infrastructure, more women can imagine themselves there too.</p>
            </div>
          </div>
          <div className="card-premium p-8 text-center gradient-border-card">
            <p className="font-display text-5xl font-bold gradient-text mb-2">78+</p>
            <p className="text-muted-foreground text-sm mb-1">Women builders visible</p>
            <p className="text-xs text-muted-foreground">across 12 countries</p>
          </div>
        </div>
      </div>
    </motion.section>

    {/* Final CTA */}
    <section className="relative cta-band section-glow">
      <div className="container py-28 md:py-36">
        <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-6">Add your story to the wall</h2>
          <p className="text-muted-foreground text-lg mb-10">Let yourself be seen for your work, your growth, your discipline, and your journey.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <GradientButton to="/meet-the-builders" size="lg" icon>Join the Wall</GradientButton>
            <GradientButton to="/community" variant="outline" size="lg">Join the Community</GradientButton>
          </div>
        </motion.div>
      </div>
    </section>

    <Footer />
  </div>;


export default MemberWall;