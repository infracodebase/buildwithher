import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientButton from "@/components/GradientButton";
import QuoteCard from "@/components/QuoteCard";
import { testimonials } from "@/data/communityData";
import { motion } from "framer-motion";
import { Sparkles, Eye, Shield, Heart, Award, GraduationCap, Users, Wrench, Radio, Zap, Target, Rocket, UserPlus, Palette, Handshake } from "lucide-react";

const audienceCards = [
  { icon: Rocket, title: "Transitioning into Cloud", desc: "Starting your cloud journey with real guidance and community support." },
  { icon: Zap, title: "Already in Cloud", desc: "Growing faster with advanced practices, visibility, and collaboration." },
  { icon: Target, title: "Junior & Growing", desc: "Strengthening your skills with structured learning and mentorship." },
  { icon: Palette, title: "Building a Personal Brand", desc: "Becoming visible for your discipline, curiosity, and real engineering work." },
  { icon: UserPlus, title: "Freelance & Consulting", desc: "Growing as an independent cloud professional with practical experience." },
  { icon: Handshake, title: "Learning with Community", desc: "Stop learning in isolation. Build alongside women who understand." },
];

const valueCards = [
  { icon: Sparkles, title: "Skills", desc: "Real cloud and AI infrastructure practices across AWS, Azure, and GCP." },
  { icon: Heart, title: "Confidence", desc: "A place where you can ask questions and keep growing." },
  { icon: Eye, title: "Visibility", desc: "Opportunities to share your work and be seen." },
  { icon: Shield, title: "Credibility", desc: "Real projects and real engineering thinking." },
  { icon: Award, title: "Belonging", desc: "A community where you grow with others." },
];

const programCards = [
  {
    icon: GraduationCap,
    title: "Infracodebase University",
    desc: "Learning cloud and infrastructure through real examples.",
    tags: ["Cloud Architecture", "IaC", "Platform Engineering", "Security", "AI Workflows"],
  },
  {
    icon: Users,
    title: "1:1 Sessions",
    desc: "Personal support to work through architecture, career, and technical questions.",
    tags: ["Architecture", "Career Direction", "Technical Guidance"],
  },
  {
    icon: Wrench,
    title: "Hands-On Workshops",
    desc: "Collaborative builds: cloud architectures, Kubernetes, landing zones, secure design.",
    tags: ["Kubernetes", "Landing Zones", "Terraform", "Security"],
  },
  {
    icon: Radio,
    title: "Monthly Webinars",
    desc: "Every month we host conversations with people who are actually doing the work. Real practitioners. Real builders.",
    tags: ["Cloud Architecture", "AI Engineering", "Career Journeys", "Platform Engineering"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6 },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-36 overflow-hidden">
        <div className="absolute inset-0 gradient-arc pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge-glow">Community for Women in Cloud & AI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            <span className="text-foreground">Build with </span>
            <span className="gradient-text">Her</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            You may be learning cloud alone right now. Studying at night. Trying to stand out in a market full of identical job titles.{" "}
            <span className="text-foreground font-medium">You don't have to do this alone.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-3 justify-center"
          >
            <GradientButton to="/meet-the-builders" size="lg" icon>Join the Community</GradientButton>
            <GradientButton to="/programs" variant="outline" size="lg">Explore Programs</GradientButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
          >
            <span>AWS • Azure • GCP</span>
            <span className="w-1 h-1 rounded-full bg-border hidden sm:block" />
            <span>Cloud • AI • Infrastructure</span>
            <span className="w-1 h-1 rounded-full bg-border hidden sm:block" />
            <span>Powered by <span className="text-foreground font-medium">Infracodebase</span></span>
          </motion.div>
        </div>
      </section>

      {/* ─── PAIN BAND ─── */}
      <motion.section {...fadeUp} className="relative band-gradient section-glow">
        <div className="container py-20 md:py-28">
          <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                You are <span className="gradient-text">not</span> the problem
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>If learning cloud feels slow, confusing, or lonely, it does not mean you lack talent.</p>
                <p>Many women are simply trying to learn in isolation — without enough support, visibility, or guidance.</p>
                <p>The market keeps getting more competitive. More people. More identical job titles. More noise.</p>
                <p className="text-foreground font-medium">Build with Her exists to change that.</p>
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-3">
              {["What to learn", "What really matters", "How to stand out"].map((item, i) => (
                <div key={item} className="stat-card flex items-center gap-3 text-left !p-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-display font-bold text-sm">{i + 1}</span>
                  </div>
                  <span className="text-sm text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── WHY THIS MATTERS — SPLIT ─── */}
      <motion.section {...fadeUp} className="section-glow">
        <div className="container py-24 md:py-32">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-8">Why This Matters</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Cloud infrastructure is where modern systems are built — architecture, automation, security, compliance, reliability, AI infrastructure.</p>
                <p>These roles shape how companies operate. They also sit in some of the <span className="text-foreground font-medium">highest pay bands</span> in technology.</p>
                <p>Yet women remain heavily underrepresented in these roles. When women are missing from these positions, it affects more than representation.</p>
                <p className="text-foreground font-medium">Build with Her exists to help change that reality.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "Income", sub: "Higher earning potential" },
                { value: "Influence", sub: "Shape technical decisions" },
                { value: "Leadership", sub: "Lead engineering teams" },
                { value: "Decision-making", sub: "Build what matters" },
              ].map((item) => (
                <div key={item.value} className="stat-card">
                  <p className="font-display font-bold text-foreground text-lg">{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── WHO THIS IS FOR — CARDS ─── */}
      <motion.section {...fadeUp} className="band-gradient section-glow">
        <div className="container py-24 md:py-32">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Who This Is <span className="gradient-text">For</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">Build with Her is for you if you want to grow in cloud — whether you are just starting or already leading.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {audienceCards.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-premium p-6 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ─── WHAT YOU BUILD HERE — 5 PREMIUM CARDS ─── */}
      <motion.section {...fadeUp} className="section-glow">
        <div className="container py-24 md:py-32">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text">What You Build Here</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {valueCards.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-premium p-6 text-center group gradient-border-card">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ─── HOW WE HELP — PROGRAM CARDS ─── */}
      <motion.section {...fadeUp} className="band-gradient section-glow">
        <div className="container py-24 md:py-32">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              How We <span className="gradient-text">Help</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {programCards.map(({ icon: Icon, title, desc, tags }) => (
              <div key={title} className="card-premium p-8 group">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-foreground text-lg mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-secondary/80 text-muted-foreground border border-border/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ─── WHY WE USE AI — FEATURED PANEL ─── */}
      <motion.section {...fadeUp} className="section-glow">
        <div className="container py-24 md:py-32">
          <div className="max-w-4xl mx-auto card-premium p-10 md:p-14 gradient-border-card">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <span className="badge-glow mb-4 inline-flex">Powered by Infracodebase</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mt-4 mb-6">Why We Use AI</h2>
                <p className="text-muted-foreground leading-relaxed">
                  AI is changing how infrastructure is built. But using AI well requires discipline. The goal is not to replace engineers — it is to help engineers <span className="text-foreground font-medium">think better and build faster</span>.
                </p>
              </div>
              <div className="space-y-3">
                {["Design architectures", "Generate infrastructure code", "Document systems", "Think through security and compliance", "Improve engineering clarity"].map((item) => (
                  <div key={item} className="flex items-center gap-3 py-2.5 px-4 rounded-xl bg-secondary/50 border border-border/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── COMMUNITY VOICES ─── */}
      <motion.section {...fadeUp} className="band-gradient section-glow">
        <div className="container py-24 md:py-32">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Community <span className="gradient-text">Voices</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Real words from real women building in cloud and infrastructure.</p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {testimonials.map((t) => (
              <div key={t.name} className="break-inside-avoid">
                <QuoteCard name={t.name} role={t.role} quote={t.quote} />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <GradientButton to="/member-wall" variant="outline" icon>View the Member Wall</GradientButton>
          </div>
        </div>
      </motion.section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative cta-band section-glow">
        <div className="container py-28 md:py-36">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-6">
              You do not have to build alone
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              If you are trying to grow in cloud, infrastructure, or AI, this space was created with your reality in mind.
            </p>
            <p className="text-foreground font-medium text-lg mb-10">
              You are not late. You are not alone. And you are capable of far more than you might currently see.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <GradientButton to="/meet-the-builders" size="lg" icon>Join the Community</GradientButton>
              <GradientButton to="/member-wall" variant="outline" size="lg">View the Member Wall</GradientButton>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
