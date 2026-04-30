import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientButton from "@/components/GradientButton";
import QuoteCard from "@/components/QuoteCard";
import { testimonials, sampleBuilders } from "@/data/communityData";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Eye, Shield, Heart, Award, GraduationCap, Users, Wrench, Radio, Zap, Target, Rocket, UserPlus, Palette, Handshake, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";

const builderPathData = [
  {
    title: "What to learn",
    subtitle: "How to focus when cloud feels overwhelming",
    bullets: ["compute", "networking", "security", "automation"],
    intro: "Cloud can feel endless: AWS, Azure, GCP services, Kubernetes, DevOps tools, AI infrastructure. Instead of trying to learn everything, focus on understanding how infrastructure layers work together. Start with the foundations:",
    outro: "Once these layers make sense, the rest of the ecosystem becomes much easier to navigate.",
  },
  {
    title: "What really matters",
    subtitle: "The difference between learning and building",
    bullets: ["design cloud architectures", "analyze existing infrastructure", "automate infrastructure workflows", "identify security, compliance, and reliability risks"],
    intro: "Certifications help you understand concepts. But what really matters is learning how infrastructure systems behave in real environments. You grow when you start to:",
    outro: "This is where learning becomes engineering.",
  },
  {
    title: "How to stand out",
    subtitle: "Visibility turns learning into opportunity",
    bullets: ["infrastructure architectures", "infrastructure code", "cloud experiments", "lessons from real systems"],
    intro: "Many talented builders stay invisible. They learn quietly but never show what they build. Standing out comes from sharing your work:",
    outro: "Sharing what you build, not just the certifications you earn, is what creates visibility and opportunity.",
  },
];

const BuilderPathCards = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="md:col-span-2 flex flex-col">
      <p className="text-xs text-muted-foreground/80 text-center mb-4 font-medium tracking-wide">
        Explore the three questions every builder faces.
      </p>
      <div className="flex flex-col gap-3">
        {builderPathData.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.1 }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`card-premium gradient-border-card !p-5 cursor-default transition-all duration-200 ${
              hoveredIdx === i ? "-translate-y-1 shadow-[0_12px_40px_hsl(var(--primary)/0.12)] border-[hsl(var(--primary)/0.4)]" : "border-transparent"
            } ${hoveredIdx !== null && hoveredIdx !== i ? "opacity-60" : "opacity-100"}`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                hoveredIdx === i ? "bg-primary/20" : ""
              }`}>
                <span className={`text-primary font-display font-bold transition-all duration-200 ${
                  hoveredIdx === i ? "brightness-125" : ""
                }`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-foreground font-display font-semibold">{item.title}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
              </div>
              <div className="flex-shrink-0">
                <motion.div
                  animate={{ rotate: hoveredIdx === i ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground/60" />
                </motion.div>
              </div>
            </div>

            {/* Expanded content on hover */}
            <motion.div
              initial={false}
              animate={{
                height: hoveredIdx === i ? "auto" : 0,
                opacity: hoveredIdx === i ? 1 : 0,
              }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-2 text-xs text-muted-foreground leading-relaxed">
                <p>{item.intro}</p>
                <ul className="space-y-1 pl-1">
                  {item.bullets.map((b, bi) => (
                    <motion.li
                      key={b}
                      initial={false}
                      animate={{
                        opacity: hoveredIdx === i ? 1 : 0.5,
                        y: hoveredIdx === i ? 0 : 2,
                      }}
                      transition={{ delay: hoveredIdx === i ? bi * 0.04 : 0, duration: 0.2 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-primary mt-0.5">•</span>
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </ul>
                <p className="text-foreground/80 font-medium">{item.outro}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

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
  title: "Oz University",
  desc: "A structured path from zero prior knowledge to certified cloud engineer. Best for career changers, early-career engineers, and anyone who wants to go from tutorials to real systems.",
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
  viewport: { once: true, margin: "0px 0px 120px 0px" as const },
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


// Intentionally mixed homepage builder order — one unified community
const homepageFeaturedOrder = [
"tarak",
"manisha-sarkar",
"deborah-maiyaki",
"diamantino-almeida",
"emmanuella-blessing-udeh",
"comfort-benton",
"sarshar-roshan",
"elizabeth-waithiru",
"lydiah-nganga",
"maria-sivenkova",
"karthika-k",
"bunmi-olatunji"];

const roleCardsData = [
  {
    value: "Income",
    sub: "Higher earning potential",
    icon: "💰",
    content: {
      intro: "The people who design and run infrastructure often hold some of the highest-impact roles in technology.\n\nThese roles sit close to the systems that power entire companies.\n\nBut many women never receive clear pathways into these positions.\n\nWhen you step into infrastructure work, you gain access to opportunities such as:",
      bullets: ["higher compensation", "stronger career mobility", "global demand for your skills", "the ability to choose where you work"],
      outro: "Access to these roles can transform how your career grows over time."
    }
  },
  {
    value: "Influence",
    sub: "Shape technical decisions",
    icon: "⚡",
    content: {
      intro: "Infrastructure work gives you a voice in how systems are built.\n\nInstead of only implementing features, you influence how technology is designed across teams.\n\nThis means your perspective can shape decisions about:",
      bullets: ["how platforms evolve", "how teams build and ship software", "how systems remain secure and reliable", "how engineering organizations scale"],
      outro: "These decisions affect the direction of entire products and companies."
    }
  },
  {
    value: "Leadership",
    sub: "Lead engineering teams",
    icon: "🎯",
    content: {
      intro: "Infrastructure engineers often become the people others turn to when systems become complex.\n\nBecause you see how everything connects, you are naturally positioned to guide teams.\n\nOver time this opens paths such as:",
      bullets: ["leading platform teams", "guiding architecture decisions", "mentoring other engineers", "shaping engineering culture"],
      outro: "Leadership grows naturally when your work touches the foundation of how systems operate."
    }
  },
  {
    value: "Decision-making",
    sub: "Build what matters",
    icon: "🔑",
    content: {
      intro: "Infrastructure roles place you closer to the decisions that determine what gets built.\n\nYou are not just executing work, you help shape where engineering effort goes.\n\nYour perspective can influence:",
      bullets: ["which systems scale first", "how reliability is prioritized", "where teams invest engineering time", "how technology supports real users"],
      outro: "Being part of these decisions means your work shapes outcomes that matter."
    }
  }
];

const RoleCards = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const activeIdx = expandedIdx ?? hoveredIdx;

  return (
    <div className="grid grid-cols-2 gap-4 self-center items-start">
      {roleCardsData.map((item, i) => {
        const isExpanded = expandedIdx === i;
        return (
          <motion.div
            key={item.value}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`card-premium p-6 cursor-pointer transition-all duration-200 ${
              hoveredIdx === i ? "-translate-y-1 border-[hsl(var(--primary)/0.4)] shadow-[0_12px_40px_hsl(var(--primary)/0.12)]" : ""
            } ${activeIdx !== null && activeIdx !== i ? "opacity-60" : ""}`}
            onClick={() => setExpandedIdx(isExpanded ? null : i)}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display font-bold text-foreground text-lg">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground/60" />
              </motion.div>
            </div>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  key={`${item.value}-content`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                    {item.content.intro.split("\n\n").map((p, pi) => (
                      <p key={pi}>{p}</p>
                    ))}
                    <ul className="space-y-1.5 pl-1">
                      {item.content.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-foreground font-medium">{item.content.outro}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};


const Index = () => {
  const featuredBuilders = homepageFeaturedOrder.
  map((slug) => sampleBuilders.find((b) => b.slug === slug)).
  filter(Boolean) as typeof sampleBuilders;
  const spotlightBuilders = featuredBuilders.slice(0, 6);

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
            
            <GradientButton to="/join-the-builders" size="lg" icon>Join the Community</GradientButton>
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
                  {b.photo ?
                <img src={b.photo} alt={b.name} className="w-full h-full object-cover" /> :

                b.name.charAt(0)
                }
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
      <motion.section {...fadeUp} className="relative band-gradient-warm pb-8">
        <div className="container py-24 md:py-32">
          <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3">
              <span className="badge-glow mb-6 inline-flex">The Reality</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                You are <span className="gradient-text font-extrabold brightness-125">not</span> the problem
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-base max-w-[520px]">
                <p>If learning cloud feels slow, confusing, or lonely, it does not mean you lack talent.</p>
                <p>Many women are simply trying to learn in isolation, without enough visibility, support, or guidance.</p>
                <p>The market keeps getting louder. More people. More identical job titles.</p>
                <p className="text-foreground font-medium text-lg">Build with Her exists to change that.</p>
              </div>
            </div>
            <BuilderPathCards />
          </div>
        </div>
      </motion.section>

      {/* ─── START HERE ─── */}
      <motion.section {...fadeUp} className="band-gradient-warm section-glow">
        <div className="container py-20 md:py-28">
          <div className="max-w-2xl mx-auto">
            <span className="badge-glow mb-6 inline-flex">Your path</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-3 leading-tight">
              Not sure where to begin?<br />Start here.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-xl mb-10">
              The junior-to-senior journey has five stages. Here is where Build with Her and Oz University each fit.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { num: "01", title: "New to cloud — not sure where to start", pills: ["bwh"], desc: "Community, welcome, real guidance. You are not alone and you don't need to know anything yet." },
                { num: "02", title: "Ready to learn — want structure", pills: ["uni"], desc: "Prerequisites, core modules, video library. Designed for zero prior knowledge." },
                { num: "03", title: "Actively learning — need support and momentum", pills: ["bwh"], desc: "Live workshops, webinars, community sessions, live Q&A alongside your studies." },
                { num: "04", title: "Building — need visibility and feedback", pills: ["bwh"], desc: "Builder Wall, member profiles, build in public. Publish your work and get seen." },
                { num: "05", title: "Job-ready — need credentials and connections", pills: ["uni", "bwh"], desc: "badge and certification → events, community, network." },
              ].map((row, i) => (
                <motion.div
                  key={row.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 + i * 0.08 }}
                  className="card-premium p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-display font-semibold text-muted-foreground text-sm">{row.num}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-foreground text-sm mb-1">{row.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {row.pills.map((p) =>
                        p === "bwh" ? (
                          <span key={p} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mr-1.5">Build with Her</span>
                        ) : (
                          <span key={p} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20 mr-1.5">University</span>
                        )
                      )}
                      {row.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <GradientButton to="/join-the-builders" size="lg" icon>Join Build with Her</GradientButton>
              <a href="https://university.ozlunara.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/60 bg-background/50 px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary/80 transition-all duration-200">Enrol now →</a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── WHY THIS EXISTS ─── */}
      <motion.section {...fadeUp} className="band-gradient-warm section-glow">
        <div className="container py-24 md:py-32">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">

            <div>
              <span className="badge-glow mb-6 inline-flex">Why this exists</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Women hold fewer than{" "}
                <span className="gradient-text">25%</span>{" "}
                of cloud engineering roles globally.
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed max-w-[460px]">
                <p>
                  Not because of ability. Because of access — to mentorship, to
                  structured paths, to communities that signal{" "}
                  <em className="text-foreground not-italic font-medium">
                    this is for you too.
                  </em>
                </p>
                <p className="text-foreground font-medium text-lg">
                  Build with Her and Oz University exist to close that gap.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="stat-card text-center">
                <p className="font-display text-4xl font-bold text-primary mb-2">&lt;25%</p>
                <p className="text-xs text-muted-foreground leading-relaxed">of cloud engineering roles held by women globally</p>
              </div>
              <div className="stat-card text-center">
                <p className="font-display text-4xl font-bold gradient-text-blue mb-2">78+</p>
                <p className="text-xs text-muted-foreground leading-relaxed">women building in cloud through this community</p>
              </div>
              <div className="stat-card text-center">
                <p className="font-display text-4xl font-bold text-accent mb-2">20+</p>
                <p className="text-xs text-muted-foreground leading-relaxed">countries represented in the community</p>
              </div>
              <div className="stat-card text-center">
                <p className="font-display text-4xl font-bold gradient-text mb-2">464</p>
                <p className="text-xs text-muted-foreground leading-relaxed">active learners on Oz University</p>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* ─── WHY THIS MATTERS — SPLIT ─── */}
      <motion.section {...fadeUp} className="section-glow relative overflow-hidden mt-12 md:mt-16">
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
            <RoleCards />
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
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">Whether you are just starting or already leading, this is your space to grow.</p>
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
            <p>Builders across the world are building careers in cloud, AI, infrastructure, DevOps, security, and platform engineering.</p>
            <p>Some are transitioning into tech. Some are already working in cloud. Some are still learning.</p>
            <p>What connects them is simple.</p>
            <p className="text-foreground font-medium text-lg">They kept building.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {featuredBuilders.slice(0, 12).map((builder, i) =>
            <motion.div
              key={builder.id}
              {...stagger}
              transition={{ delay: 0.05 + i * 0.06 }}>
              
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] builder-card-wrapper">
                  <div className="absolute inset-0 builder-card-gradient" />
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />
                  <div className="relative z-10 h-full flex flex-col items-center justify-between p-5 md:p-6 text-center">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-display font-semibold tracking-widest uppercase builder-card-text-primary">Build with Her</p>
                      <p className="text-[8px] tracking-wider uppercase builder-card-text-muted">Built by Oz</p>
                    </div>
                    <div className="w-20 h-20 rounded-full border-2 border-white/20 overflow-hidden flex items-center justify-center bg-secondary/50 shadow-lg">
                      {builder.photo ?
                    <img src={builder.photo} alt={builder.name} className="w-full h-full object-cover" /> :

                    <span className="font-display font-bold text-2xl builder-card-text-primary">{builder.name.charAt(0)}</span>
                    }
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
            )}
          </div>

          <div className="mt-14 text-center">
            <p className="font-display text-xl md:text-2xl font-semibold text-foreground mb-6">Your story could be here.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <GradientButton to="/meet-the-builders" size="lg" icon>View the Member Wall</GradientButton>
              <GradientButton to="/join-the-builders" variant="outline" size="lg">Add Your Profile</GradientButton>
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
                    {title === "Oz University" && (
                      <p className="text-xs text-muted-foreground mt-3 mb-3 pl-3 border-l border-accent/30">
                        Not sure where to start? Begin with the{" "}
                        <a href="https://university.ozlunara.com/path/cloud-infrastructure-intro" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                          prerequisites
                        </a>{" "}
                        — designed for zero prior knowledge.
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) =>
                    <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-secondary/80 text-muted-foreground border border-border/30">
                          {tag}
                        </span>
                    )}
                    </div>
                    {title === "Oz University" && (
                      <a href="https://university.ozlunara.com" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-3 inline-block">
                        Start learning →
                      </a>
                    )}
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
                <span className="badge-glow mb-6 inline-flex">Built by Oz</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mt-4 mb-6">Why We Use AI</h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  AI is changing how infrastructure is built. But using AI well requires discipline. The goal is not to replace engineers. It is to help engineers <span className="text-foreground font-medium">think better and build faster</span>.
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
              <p className="mt-3 text-muted-foreground max-w-md">Real words from real builders in cloud and infrastructure.</p>
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
            <p className="font-mono text-xs tracking-widest text-muted-foreground/60 uppercase mb-6">
              Talent is everywhere. Access is not.
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6 leading-tight">
              You do not have to build alone
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Whether you are a woman growing in cloud, or someone who believes access to this field should be equal — this space is built with your values in mind.
            </p>
            <p className="text-foreground font-medium text-lg mb-12">
              You are not late. You are not alone. And the work you do here actually matters.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <GradientButton to="/join-the-builders" size="lg" icon>Join the Community</GradientButton>
              <GradientButton to="/member-wall" variant="outline" size="lg">View the Member Wall</GradientButton>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>);

};

export default Index;