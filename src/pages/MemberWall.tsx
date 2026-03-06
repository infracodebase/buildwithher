import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionWrapper from "@/components/SectionWrapper";
import GradientButton from "@/components/GradientButton";
import QuoteCard from "@/components/QuoteCard";
import { testimonials } from "@/data/communityData";
import { Users, Globe, Cloud, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, label: "78 Members" },
  { icon: Globe, label: "12 Countries" },
  { icon: Cloud, label: "Cloud • AI • Infrastructure" },
  { icon: TrendingUp, label: "Growing every month" },
];

const MemberWall = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageHero
      title="Build with Her Member Wall"
      actions={<GradientButton to="/meet-the-builders">Join the Wall</GradientButton>}
    >
      <div className="space-y-3 text-left max-w-xl mx-auto">
        <p>You are not the only one building quietly.</p>
        <p>This wall exists to make women in cloud, infrastructure, AI, DevOps, security, and platform engineering more visible.</p>
        <p>Some are transitioning. Some are already working in tech. Some are still learning. Some are already leading.</p>
        <p>What connects them is simple. <span className="text-foreground font-medium">They kept going.</span></p>
      </div>
    </PageHero>

    {/* Stats strip */}
    <SectionWrapper>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label }) => (
          <div key={label} className="rounded-xl bg-card border border-border/50 p-5 text-center card-hover">
            <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="font-display font-semibold text-sm text-foreground">{label}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>

    {/* Intro */}
    <SectionWrapper className="border-t border-border/30">
      <div className="max-w-2xl mx-auto space-y-4 text-muted-foreground leading-relaxed">
        <p>When you are learning or growing in cloud, it is easy to feel invisible.</p>
        <p>You study. You practice. You apply. You improve.</p>
        <p>And sometimes it feels like no one sees the discipline behind it.</p>
        <p className="text-foreground font-medium">This wall exists to change that.</p>
        <p>It exists to make your journey more visible. And to remind every woman who lands here that she is not building alone.</p>
      </div>
    </SectionWrapper>

    {/* Quote Grid */}
    <SectionWrapper className="border-t border-border/30">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Community Voices</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <QuoteCard key={t.name} name={t.name} role={t.role} quote={t.quote} />
        ))}
      </div>
    </SectionWrapper>

    {/* Why This Wall Exists */}
    <SectionWrapper className="border-t border-border/30">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Why This Wall Exists</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>Visibility matters. Not because attention is everything. But because being seen can lead to connection, confidence, opportunities, and belief.</p>
          <p>When more women become visible in cloud, AI, and infrastructure, more women can imagine themselves there too.</p>
        </div>
      </div>
    </SectionWrapper>

    {/* Final CTA */}
    <SectionWrapper className="border-t border-border/30">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold gradient-text mb-4">Add your story to the wall</h2>
        <p className="text-muted-foreground mb-8">Let yourself be seen for your work, your growth, your discipline, and your journey.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <GradientButton to="/meet-the-builders">Join the Wall</GradientButton>
          <GradientButton to="/community" variant="outline">Join the Community</GradientButton>
        </div>
      </div>
    </SectionWrapper>

    <Footer />
  </div>
);

export default MemberWall;
