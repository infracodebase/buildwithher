import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientButton from "@/components/GradientButton";
import QuoteCard from "@/components/QuoteCard";
import { testimonials, sampleBuilders } from "@/data/communityData";
import { motion } from "framer-motion";
import { Sparkles, Eye, Shield, Heart, Award, GraduationCap, Users, Wrench, Radio, Zap, Target, Rocket, UserPlus, Palette, Handshake, ArrowRight, MapPin } from "lucide-react";

const audienceCards = [
{ icon: Rocket, title: "Transitioning into Cloud", desc: "Starting your cloud journey with real guidance and community support." },
{ icon: Zap, title: "Already in Cloud", desc: "Growing faster with advanced practices, visibility, and collaboration." },
{ icon: Target, title: "Junior & Growing", desc: "Strengthening your skills with structured learning and mentorship." },
{ icon: Palette, title: "Building a Personal Brand", desc: "Becoming visible for your discipline, curiosity, and real engineering work." },
{ icon: UserPlus, title: "Freelance & Consulting", desc: "Growing as an independent cloud professional with practical experience." },
{ icon: Handshake, title: "Learning with Community", desc: "Stop learning in isolation. Build alongside women who understand." }];


const valueCards = [
{ icon: Sparkles, title: "Skills", desc: "Real cloud and AI infrastructure practices across AWS, Azure, and GCP.", color: "from-blue-500/20 to-blue-600/5" },
{ icon: Heart, title: "Confidence", desc: "A place where you can ask questions and keep growing.", color: "from-green-500/20 to-green-600/5" },
{ icon: Eye, title: "Visibility", desc: "Opportunities to share your work and be seen.", color: "from-yellow-500/20 to-yellow-600/5" },
{ icon: Shield, title: "Credibility", desc: "Real projects and real engineering thinking.", color: "from-orange-500/20 to-orange-600/5" },
{ icon: Award, title: "Belonging", desc: "A community where you grow with others.", color: "from-red-500/20 to-red-600/5" }];


const programCards = [
{
  icon: GraduationCap,
  title: "Infracodebase University",
  desc: "Learning cloud and infrastructure through real examples.",
  tags: ["Cloud Architecture", "IaC", "Platform Engineering", "Security", "AI Workflows"]
},
{
  icon: Users,
  title: "1:1 Sessions",
  desc: "Personal support to work through architecture, career, and technical questions.",
  tags: ["Architecture", "Career Direction", "Technical Guidance"]
},
{
  icon: Wrench,
  title: "Hands-On Workshops",
  desc: "Collaborative builds: cloud architectures, Kubernetes, landing zones, secure design.",
  tags: ["Kubernetes", "Landing Zones", "Terraform", "Security"]
},
{
  icon: Radio,
  title: "Monthly Webinars",
  desc: "Every month we host conversations with people who are actually doing the work. Real practitioners. Real builders.",
  tags: ["Cloud Architecture", "AI Engineering", "Career Journeys", "Platform Engineering"]
}];


const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.7 }
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true }
};

// Floating mini-profile cards for hero
const FloatingCard = ({ name, role, country, delay, className }: {name: string;role: string;country: string;delay: number;className: string;}) =>
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay }}
  className={`card-glass px-4 py-3 absolute hidden lg:flex items-center gap-3 ${className}`}>
  
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center text-foreground font-display font-bold text-xs flex-shrink-0">
      {name.charAt(0)}
    </div>
    <div className="min-w-0">
      <p className="text-xs font-medium text-foreground truncate">{name.split(' ')[0]}</p>
      <p className="text-[10px] text-muted-foreground truncate">{role}</p>
    </div>
    <div className="flex items-center gap-0.5 text-[9px] text-muted-foreground/60 ml-1">
      <MapPin size={8} />
      {country}
    </div>
  </motion.div>;


const Index = () => {
  const spotlightBuilders = sampleBuilders.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 lg:pt-48 lg:pb-40 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 gradient-arc pointer-events-none" />
        <div className="absolute top-32 left-[15%] w-[500px] h-[500px] orb-blue rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-[10%] w-[400px] h-[400px] orb-green rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-[30%] w-[300px] h-[300px] orb-warm rounded-full pointer-events-none" />

        {/* Floating builder cards */}
        <FloatingCard name="Elizabeth W." role="Cloud & DevOps" country="Kenya" delay={0.8} className="top-36 left-[8%] float-slow" />
        <FloatingCard name="Comfort B." role="Cloud Engineer" country="US" delay={1.0} className="top-52 right-[6%] float-medium" />
        <FloatingCard name="Karthika K." role="DevOps Intern" country="India" delay={1.2} className="bottom-32 left-[12%] float-fast" />
        <FloatingCard name="Maria S." role="Technical Writer" country="Germany" delay={1.4} className="bottom-44 right-[10%] float-slow" />

        <div className="container relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge-glow">Community for Women in Cloud & AI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            
            <span className="text-foreground">Build with </span>
            <span className="gradient-text">Her</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            
            You may be learning cloud alone right now. Studying at night. Trying to stand out in a market full of identical job titles.{" "}
            <span className="text-foreground font-medium">You don't have to do this alone.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-3 justify-center">
            
            <GradientButton to="/meet-the-builders" size="lg" icon>Join the Community</GradientButton>
            <GradientButton to="/programs" variant="outline" size="lg">Explore Programs</GradientButton>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
            
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>AWS • Azure • GCP</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Cloud • AI • Infrastructure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-orange" />
              <span>Powered by <span className="text-foreground font-medium">Infracodebase</span></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── BUILDER SPOTLIGHT STRIP ─── */}
      <section className="relative gradient-border-bottom">
        <div className="container py-10">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-shrink-0 text-center md:text-left">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-display font-medium">Community Builders</p>
              <p className="font-display text-3xl font-bold text-foreground mt-1">78+</p>
            </div>
            <div className="w-px h-10 bg-border/50 hidden md:block" />
            <div className="flex -space-x-3 flex-shrink-0">
              {spotlightBuilders.map((b, i) =>
              <motion.div
                key={b.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="w-10 h-10 rounded-full border-2 border-background overflow-hidden bg-gradient-to-br from-secondary to-muted flex items-center justify-center text-foreground font-display font-bold text-xs"
                title={b.name}>
                  {b.photo ? (
                    <img src={b.photo} alt={b.name} className="w-full h-full object-cover" />
                  ) : (
                    b.name.charAt(0)
                  )}
                </motion.div>
              )}
              <div className="w-10 h-10 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                +72
              </div>
            </div>
            <div className="flex-1 hidden md:block" />
            <GradientButton to="/meet-the-builders" variant="ghost" icon>
              Meet the Builders
            </GradientButton>
          </motion.div>
        </div>
      </section>

      {/* ─── PAIN BAND ─── */}
      <motion.section {...fadeUp} className="relative band-gradient-warm">
        <div className="container py-24 md:py-32">
          <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3">
              <span className="badge-glow mb-6 inline-flex">The Reality</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                You are <span className="gradient-text">not</span> the problem
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
                <p>If learning cloud feels slow, confusing, or lonely, it does not mean you lack talent.</p>
                <p>Many women are simply trying to learn in isolation, without enough support, visibility, or guidance.</p>
                <p>The market keeps getting more competitive. More people. More identical job titles. More noise.</p>
                <p className="text-foreground font-medium text-lg">Build with Her exists to change that.</p>
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-3">
              {["What to learn", "What really matters", "How to stand out"].map((item, i) =>
              <motion.div
                key={item}
                {...stagger}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="card-premium gradient-border-card flex items-center gap-4 !p-5">
                
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-display font-bold">{i + 1}</span>
                  </div>
                  <div>
                    <span className="text-foreground font-display font-semibold">{item}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">The question every builder faces</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── WHY THIS MATTERS — SPLIT ─── */}
      <motion.section {...fadeUp} className="section-glow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] orb-blue rounded-full pointer-events-none opacity-50" />
        <div className="container py-24 md:py-32">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="badge-glow mb-6 inline-flex">Why It Matters</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold gradient-text-blue mb-8 leading-tight">
                The roles that shape<br />modern systems
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Cloud infrastructure is where modern systems are built: architecture, automation, security, compliance, reliability, AI infrastructure.</p>
                <p>These roles shape how companies operate. They also sit in some of the <span className="text-foreground font-medium">highest pay bands</span> in technology.</p>
                <p>Yet women remain heavily underrepresented in these roles. When women are missing from these positions, it affects more than representation.</p>
                <p className="text-foreground font-medium">Build with Her exists to help change that reality.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 self-center">
              {[
              { value: "Income", sub: "Higher earning potential", icon: "💰" },
              { value: "Influence", sub: "Shape technical decisions", icon: "⚡" },
              { value: "Leadership", sub: "Lead engineering teams", icon: "🎯" },
              { value: "Decision-making", sub: "Build what matters", icon: "🔑" }].
              map((item, i) =>
              <motion.div
                key={item.value}
                {...stagger}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="card-premium p-6 group">
                
                  
                  <p className="font-display font-bold text-foreground text-lg">{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── WHO THIS IS FOR — CARDS ─── */}
      <motion.section {...fadeUp} className="band-gradient section-glow">
        <div className="container py-24 md:py-32">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <span className="badge-glow mb-6 inline-flex">For You</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Who This Is <span className="gradient-text">For</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">Whether you are just starting or already leading — this is your space to grow.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {audienceCards.map(({ icon: Icon, title, desc }, i) =>
            <motion.div
              key={title}
              {...stagger}
              transition={{ delay: 0.05 + i * 0.08 }}
              className="card-premium p-6 group">
              
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      {/* ─── BE PART OF THE MOVEMENT ─── */}
      <motion.section {...fadeUp} className="section-glow relative overflow-hidden">
        <div className="absolute bottom-0 left-[20%] w-[400px] h-[400px] orb-warm rounded-full pointer-events-none opacity-40" />
        <div className="container py-24 md:py-32 relative z-10">
          <div className="text-center mb-6 max-w-2xl mx-auto">
            <span className="badge-glow mb-6 inline-flex">The Movement</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Be Part of the <span className="gradient-text">Movement</span>
            </h2>
          </div>
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2 text-muted-foreground leading-relaxed">
            <p>Women across the world are building careers in cloud, AI, infrastructure, DevOps, security, and platform engineering.</p>
            <p>Some are transitioning into tech. Some are already working in cloud. Some are still learning.</p>
            <p>What connects them is simple.</p>
            <p className="text-foreground font-medium text-lg">They kept building.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {sampleBuilders.slice(0, 8).map((builder, i) => (
              <motion.div
                key={builder.id}
                {...stagger}
                transition={{ delay: 0.05 + i * 0.06 }}
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] builder-card-wrapper">
                  <div className="absolute inset-0 builder-card-gradient" />
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />
                  <div className="relative z-10 h-full flex flex-col items-center justify-between p-5 md:p-6 text-center">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-display font-semibold tracking-widest uppercase builder-card-text-primary">Build with Her</p>
                      <p className="text-[8px] tracking-wider uppercase builder-card-text-muted">Powered by Infracodebase</p>
                    </div>
                    <div className="w-20 h-20 rounded-full border-2 border-white/20 overflow-hidden flex items-center justify-center bg-secondary/50 shadow-lg">
                      {builder.photo ? (
                        <img src={builder.photo} alt={builder.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-display font-bold text-2xl builder-card-text-primary">{builder.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="space-y-1 min-w-0 w-full">
                      <h3 className="font-display font-bold text-[15px] builder-card-text-primary leading-tight truncate">{builder.name}</h3>
                      <p className="text-[11px] builder-card-text-secondary truncate">{builder.role}</p>
                      <p className="text-[10px] builder-card-text-muted">{builder.country}</p>
                      <p className="text-[9px] builder-card-text-muted leading-relaxed truncate">{builder.tags.join(" • ")}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="font-display text-xl md:text-2xl font-semibold text-foreground mb-6">Your story could be here.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <GradientButton to="/meet-the-builders" size="lg" icon>View the Member Wall</GradientButton>
              <GradientButton to="/meet-the-builders" variant="outline" size="lg">Add Your Profile</GradientButton>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── WHAT YOU BUILD HERE — 5 PREMIUM CARDS ─── */}
      <motion.section {...fadeUp} className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-arc-top pointer-events-none" />
        <div className="container py-24 md:py-32 relative z-10">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">What You Build Here</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {valueCards.map(({ icon: Icon, title, desc }, i) =>
            <motion.div
              key={title}
              {...stagger}
              transition={{ delay: 0.05 + i * 0.08 }}
              className="card-premium p-6 text-center group gradient-border-card">
              
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2 text-lg">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      {/* ─── HOW WE HELP — PROGRAM CARDS ─── */}
      <motion.section {...fadeUp} className="band-gradient-warm section-glow">
        <div className="container py-24 md:py-32">
          <div className="text-center mb-14">
            <span className="badge-glow mb-6 inline-flex">Programs</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              How We <span className="gradient-text">Help</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {programCards.map(({ icon: Icon, title, desc, tags }, i) =>
            <motion.div
              key={title}
              {...stagger}
              transition={{ delay: 0.05 + i * 0.1 }}
              className="card-premium p-8 group">
              
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-foreground text-xl mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) =>
                    <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-secondary/80 text-muted-foreground border border-border/30">
                          {tag}
                        </span>
                    )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          <div className="mt-10 text-center">
            <GradientButton to="/programs" variant="outline" icon>View All Programs</GradientButton>
          </div>
        </div>
      </motion.section>

      {/* ─── WHY WE USE AI — FEATURED PANEL ─── */}
      <motion.section {...fadeUp} className="relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] orb-blue rounded-full pointer-events-none opacity-40" />
        <div className="container py-24 md:py-32">
          <div className="max-w-5xl mx-auto card-premium p-10 md:p-16 gradient-border-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] orb-warm rounded-full pointer-events-none" />
            <div className="grid md:grid-cols-2 gap-12 items-start relative z-10">
              <div>
                <span className="badge-glow mb-6 inline-flex">Powered by Infracodebase</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mt-4 mb-6">Why We Use AI</h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  AI is changing how infrastructure is built. But using AI well requires discipline. The goal is not to replace engineers — it is to help engineers <span className="text-foreground font-medium">think better and build faster</span>.
                </p>
              </div>
              <div className="space-y-2.5">
                {["Design architectures", "Generate infrastructure code", "Document systems", "Think through security and compliance", "Improve engineering clarity"].map((item, i) =>
                <motion.div
                  key={item}
                  {...stagger}
                  transition={{ delay: 0.05 + i * 0.08 }}
                  className="flex items-center gap-3 py-3 px-5 rounded-xl bg-secondary/40 border border-border/20 group hover:border-primary/20 transition-all">
                  
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 group-hover:shadow-[0_0_8px_hsl(210,100%,56%,0.5)] transition-shadow" />
                    <span className="text-sm text-foreground">{item}</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── WOMEN IN CLOUD IDENTITY ─── */}
      <section className="relative section-glow band-gradient overflow-hidden">
        <div className="absolute inset-0 gradient-arc pointer-events-none opacity-60" />
        <div className="container py-24 md:py-32 relative z-10">
          <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              This is what it looks like when <br className="hidden md:block" />
              <span className="gradient-text">women build in cloud</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
              Real women. Real roles. Real infrastructure. Growing together across AWS, Azure, GCP, and beyond.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {sampleBuilders.slice(0, 8).map((b, i) =>
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="card-premium p-5 text-center group">
              
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center text-foreground font-display font-bold text-lg mx-auto mb-3 group-hover:from-primary/30 group-hover:to-accent/20 transition-all">
                  {b.name.charAt(0)}
                </div>
                <p className="font-display font-semibold text-sm text-foreground truncate">{b.name.split(' ')[0]}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{b.role}</p>
                <div className="flex items-center justify-center gap-1 mt-1.5 text-[10px] text-muted-foreground/60">
                  <MapPin size={8} />
                  {b.country}
                </div>
                <div className="flex flex-wrap gap-1 justify-center mt-3">
                  {b.tags.slice(0, 2).map((tag) =>
                <span key={tag} className="px-2 py-0.5 rounded-full text-[9px] bg-secondary/80 text-muted-foreground border border-border/20">{tag}</span>
                )}
                </div>
              </motion.div>
            )}
          </div>
          <div className="mt-10 text-center">
            <GradientButton to="/meet-the-builders" icon>Meet All Builders</GradientButton>
          </div>
        </div>
      </section>

      {/* ─── COMMUNITY VOICES ─── */}
      <motion.section {...fadeUp} className="relative overflow-hidden">
        <div className="absolute top-0 left-[20%] w-[500px] h-[300px] orb-blue rounded-full pointer-events-none opacity-30" />
        <div className="container py-24 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <span className="badge-glow mb-4 inline-flex">Testimonials</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Community <span className="gradient-text">Voices</span>
              </h2>
              <p className="mt-3 text-muted-foreground max-w-md">Real words from real women building in cloud and infrastructure.</p>
            </div>
            <GradientButton to="/member-wall" variant="outline" icon>View the Member Wall</GradientButton>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {testimonials.map((t, i) =>
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="break-inside-avoid">
              
                <QuoteCard name={t.name} role={t.role} quote={t.quote} photo={t.photo} />
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative cta-band">
        <div className="absolute inset-0 gradient-arc pointer-events-none" />
        {/* Gradient line at top */}
        <div className="gradient-line w-full" />
        <div className="container py-28 md:py-40">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6 leading-tight">
              You do not have to build alone
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              If you are trying to grow in cloud, infrastructure, or AI, this space was created with your reality in mind.
            </p>
            <p className="text-foreground font-medium text-lg mb-12">
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
    </div>);

};

export default Index;