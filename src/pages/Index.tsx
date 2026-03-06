import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import GradientButton from "@/components/GradientButton";
import QuoteCard from "@/components/QuoteCard";
import { testimonials } from "@/data/communityData";
import { motion } from "framer-motion";
import { Sparkles, Eye, Shield, Heart, Award } from "lucide-react";

const whatYouBuild = [
  { icon: Sparkles, title: "Skills", desc: "Real cloud and AI infrastructure practices across AWS, Azure, and GCP." },
  { icon: Heart, title: "Confidence", desc: "A place where you can ask questions and keep growing." },
  { icon: Eye, title: "Visibility", desc: "Opportunities to share your work and be seen." },
  { icon: Shield, title: "Credibility", desc: "Real projects and real engineering thinking." },
  { icon: Award, title: "Belonging", desc: "A community where you grow with others." },
];

const programs = [
  { title: "Infracodebase University", desc: "Learning cloud and infrastructure through real examples: cloud architecture, IaC, platform engineering, security thinking, AI-assisted infrastructure workflows." },
  { title: "1:1 Sessions", desc: "Personal support to work through architecture, infrastructure, career, and technical questions." },
  { title: "Hands-On Workshops", desc: "Collaborative builds: cloud architectures, Kubernetes, landing zones, secure infrastructure design." },
  { title: "Monthly Webinars", desc: "Real practitioners sharing technical lessons and career journeys across cloud, AI, infrastructure, security, and platform engineering." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 gradient-arc pointer-events-none" />
        <div className="container relative z-10 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center gradient-text"
          >
            Build with Her
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-muted-foreground text-base md:text-lg leading-loose space-y-4"
          >
            <p>You may be learning cloud alone right now.</p>
            <p>Studying AWS, Azure, or GCP at night. Trying to improve your skills. Trying to stand out in a market where thousands of people share the same job titles.</p>
            <p className="text-foreground font-medium">Cloud engineer. DevOps engineer. Platform engineer.</p>
            <p>Competition keeps increasing. And sometimes it feels like you are doing all of this alone.</p>
            <p>For many women, it becomes even harder. Fewer role models. Fewer opportunities. More pressure to prove yourself.</p>
            <p>You might even wonder whether you truly belong here.</p>
            <p className="text-foreground font-display font-semibold text-xl">You do.</p>
            <p><span className="gradient-text font-semibold">Build with Her</span> exists so you do not have to grow alone.</p>
            <p>We share real best practices for using AI to design, build, and manage infrastructure across AWS, Azure, GCP, and modern cloud platforms.</p>
            <p>We learn together. We build together. And we help you become visible for the discipline, curiosity, and potential you already have.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-3 justify-center"
          >
            <GradientButton to="/meet-the-builders">Join the Community</GradientButton>
            <GradientButton to="/programs" variant="outline">Explore Programs</GradientButton>
          </motion.div>
        </div>
      </section>

      {/* You Are Not The Problem */}
      <SectionWrapper>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-8">You Are Not the Problem</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>If learning cloud feels slow, confusing, or lonely, it does not mean you lack talent.</p>
            <p>Many women are simply trying to learn in isolation. Without enough support. Without enough visibility. Without enough guidance.</p>
            <p>At the same time, the market keeps getting more competitive. More people entering the field. More identical job titles. More noise online.</p>
            <p>It becomes harder to know: What to learn. What really matters. How to stand out.</p>
            <p className="text-foreground font-medium">Build with Her exists to change that.</p>
          </div>
        </div>
      </SectionWrapper>

      {/* Why This Matters */}
      <SectionWrapper className="border-t border-border/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-8">Why This Matters</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Cloud infrastructure is where modern systems are built. Architecture. Automation. Security. Compliance. Reliability. AI infrastructure.</p>
            <p>These roles shape how companies operate. They also sit in some of the highest pay bands in technology.</p>
            <p>Yet women remain heavily underrepresented in these roles.</p>
            <p>When women are missing from these positions, it affects more than representation. It affects:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
              {["Income", "Influence", "Leadership", "Decision-making"].map((item) => (
                <div key={item} className="rounded-lg bg-card border border-border/50 p-4 text-center">
                  <span className="text-foreground font-display font-semibold text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-foreground font-medium">Build with Her exists to help change that reality.</p>
          </div>
        </div>
      </SectionWrapper>

      {/* Who This Is For */}
      <SectionWrapper className="border-t border-border/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-8">Who This Is For</h2>
          <div className="space-y-3 text-muted-foreground leading-relaxed">
            <p>Build with Her is for you if:</p>
            {[
              "You are transitioning into cloud.",
              "You already work in cloud but want to grow faster.",
              "You are junior and want to strengthen your skills.",
              "You want practical experience that helps you earn a living.",
              "You want to grow as an employee, freelancer, consultant, or future founder.",
              "You want to build a personal brand that reflects who you really are.",
              "And you want to stop learning alone.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* What You Build Here */}
      <SectionWrapper className="border-t border-border/30">
        <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-10 text-center">What You Build Here</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {whatYouBuild.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl bg-card border border-border/50 p-6 card-hover text-center">
              <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* How We Help */}
      <SectionWrapper className="border-t border-border/30">
        <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-10 text-center">How We Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {programs.map(({ title, desc }) => (
            <div key={title} className="rounded-xl bg-card border border-border/50 p-7 card-hover">
              <h3 className="font-display font-semibold text-foreground text-lg mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Why We Use AI */}
      <SectionWrapper className="border-t border-border/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-8">Why We Use AI</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>AI is changing how infrastructure is built. But using AI well requires discipline.</p>
            <p>Build with Her explores practical AI workflows that help engineers:</p>
            {["Design architectures", "Generate infrastructure code", "Document systems", "Think through security and compliance", "Improve engineering clarity"].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <p>{item}</p>
              </div>
            ))}
            <p>The goal is not to replace engineers. The goal is to help engineers think better and build faster.</p>
            <p className="text-xs text-muted-foreground">This exploration is powered by <span className="text-foreground font-medium">Infracodebase</span>.</p>
          </div>
        </div>
      </SectionWrapper>

      {/* Community Voices */}
      <SectionWrapper className="border-t border-border/30">
        <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-10 text-center">Community Voices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <QuoteCard key={t.name} name={t.name} role={t.role} quote={t.quote} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <GradientButton to="/member-wall" variant="outline">View the Member Wall</GradientButton>
        </div>
      </SectionWrapper>

      {/* Final CTA */}
      <SectionWrapper className="border-t border-border/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-6">You do not have to build alone</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>If you are trying to grow in cloud, infrastructure, or AI, this space was created with your reality in mind.</p>
            <p>You are not late. You are not alone.</p>
            <p className="text-foreground font-medium">And you are capable of far more than you might currently see.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <GradientButton to="/meet-the-builders">Join the Community</GradientButton>
            <GradientButton to="/member-wall" variant="outline">View the Member Wall</GradientButton>
          </div>
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  );
};

export default Index;
