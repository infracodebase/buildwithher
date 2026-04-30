import { motion, type Easing } from "framer-motion";
import { Rocket, Code2, BookOpen, Eye, Users, Globe, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientButton from "@/components/GradientButton";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px 120px 0px" },
  transition: { duration: 0.6, ease: "easeOut" as Easing },
};

const fadeUpDelay = (delay: number) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay },
});

const principles = [
  { icon: Rocket, title: "Start anywhere", body: "You do not need the perfect background to enter cloud engineering. Curiosity and discipline matter more than credentials." },
  { icon: Code2, title: "Learn by building", body: "The best way to learn cloud infrastructure is by building real systems. Real architectures. Real deployments." },
  { icon: BookOpen, title: "Document the journey", body: "Sharing what you learn helps others grow faster." },
  { icon: Eye, title: "Build in public", body: "Visibility creates opportunity. The Builder Wall exists for this reason." },
  { icon: Users, title: "No one builds alone", body: "Community accelerates learning and confidence." },
  { icon: Globe, title: "Access matters", body: "Talent is everywhere. Opportunity is not." },
];

const stats = [
  { num: "14–16%", color: "text-primary", desc: "women in the cloud workforce overall" },
  { num: "<15%", color: "text-accent", desc: "in cloud architecture, DevOps and SRE" },
  { num: "<10%", color: "text-[hsl(var(--gradient-yellow))]", desc: "at principal and distinguished levels" },
  { num: "8–12%", color: "text-[hsl(var(--gradient-orange))]", desc: "in cloud security and platform leadership" },
];

const infraCards = [
  { border: "border-l-primary", title: "Real cloud projects", desc: "Build real infrastructure, not sandboxes. Own what you deploy." },
  { border: "border-l-accent", title: "Infrastructure portfolios", desc: "Publish your work to the Builder Wall as you build it." },
  { border: "border-l-[hsl(var(--gradient-yellow))]", title: "Engineering tools", desc: "AI-powered Terraform workflows used in real production environments." },
  { border: "border-l-[hsl(var(--gradient-orange))]", title: "A verifiable credential", desc: "A badge that proves what you built, not just what you watched." },
];

const PullQuote = ({ children }: { children: string }) => (
  <motion.blockquote
    {...fadeUp}
    className="border-l-4 border-primary pl-6 py-2 my-10"
  >
    <p className="font-serif text-xl md:text-2xl italic text-foreground/70">
      "{children}"
    </p>
  </motion.blockquote>
);

const SectionBadge = ({ children, className = "" }: { children: string; className?: string }) => (
  <span className={`badge-glow mb-6 inline-flex ${className}`}>{children}</span>
);

const Manifest = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ─── Section 1 — Hero ─── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 gradient-arc pointer-events-none" />
        <div className="container relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="badge-glow">Our Story</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
          >
            Talent is everywhere.<br />
            <span className="gradient-text">Access is not.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl mx-auto"
          >
            Build with Her exists to close the gap in cloud engineering. This is why we built it.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-3 justify-center"
          >
            <GradientButton to="/join-the-builders" size="lg" icon>Create Your Builder Card</GradientButton>
            <GradientButton to="/join-the-builders" variant="outline" size="lg">Join the Community →</GradientButton>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 2 — Why I'm building this ─── */}
      <section className="py-20 md:py-28">
        <div className="container max-w-3xl mx-auto">
          <motion.div {...fadeUp}>
            <SectionBadge>Why I'm building this</SectionBadge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-8 leading-tight">
              For me, becoming a founder again means something else.
            </h2>
            <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed font-body">
              <p>Over the past few months, I took a step back to rethink my role as a founder.</p>
              <p>For some people, becoming a founder means shipping products, raising money, optimizing growth.</p>
              <p>For me, it means driving impact. Choosing a direction even when it is uncomfortable.</p>
              <p>And right now, it is uncomfortable.</p>
            </div>

            {/* Founder card */}
            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-5">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-border/50 shrink-0">
                <img src="/images/tarak.jpeg" alt="Tarak, Co-Founder of Oz" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-display text-base font-bold text-foreground">Tarak</p>
                <p className="text-muted-foreground text-sm">Co-Founder, Oz</p>
              </div>
            </div>

            <PullQuote>Talent is everywhere. Access is not.</PullQuote>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 3 — The moment we are in ─── */}
      <section className="band-gradient-warm section-glow py-20 md:py-28">
        <div className="container max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <SectionBadge>The moment we are in</SectionBadge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-12 leading-tight max-w-3xl">
              We are living through massive layoffs. AI is reshaping entire professions in real time.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <motion.div {...fadeUp} className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed font-body">
              <p>And many people — especially women — are quietly questioning whether they truly belong in tech.</p>
              <p>These roles sit at the highest pay bands. They shape the systems. They influence decisions. They define how technology evolves.</p>
              <p className="text-foreground font-medium">When women are missing there, it does not just affect visibility. It affects income, influence, and leadership.</p>
            </motion.div>
            <motion.div {...fadeUpDelay(0.15)}>
              <p className="font-mono text-xs tracking-widest text-muted-foreground/60 uppercase mb-4">In cloud computing today</p>
              <div className="space-y-3">
                {stats.map((s) => (
                  <div key={s.num} className="card-premium flex items-center gap-4 p-4">
                    <span className={`font-display text-2xl md:text-3xl font-bold ${s.color} shrink-0 w-24 text-right`}>{s.num}</span>
                    <span className="text-muted-foreground text-sm">{s.desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Section 4 — Why the gap exists ─── */}
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl mx-auto">
          <motion.div {...fadeUp}>
            <SectionBadge>Why the gap exists</SectionBadge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-8 leading-tight">
              The problem is not talent. The problem is access.
            </h2>
            <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed font-body">
              <p>Technology is changing faster than access to opportunity. AI is accelerating software development. Cloud infrastructure is becoming the backbone of nearly every modern system.</p>
              <p>But while technology moves fast, access to opportunity does not move at the same speed.</p>
              <p>Many talented people are still locked out of these fields because they do not have access to advanced training, engineering communities, or people like them in leadership roles.</p>
              <p className="text-foreground font-medium">The result is a silent gap. A gap between who could build the future and who is given the opportunity to do so.</p>
              <p>And the gap does not start at the top. Women are significantly less likely to access advanced cloud skills — far less likely, especially in low and middle income countries, to access cloud training at all. The issue is not talent. It is not ambition. It is access.</p>
            </div>
            <PullQuote>The problem is not talent. The problem is access.</PullQuote>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 5 — Why Build with Her exists ─── */}
      <section className="band-gradient section-glow py-20 md:py-28">
        <div className="container max-w-2xl mx-auto">
          <motion.div {...fadeUp}>
            <SectionBadge>Why Build with Her exists</SectionBadge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-8 leading-tight">
              Real journeys. Not polished stories.
            </h2>
            <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed font-body">
              <p>Build with Her exists to make cloud engineering more accessible. Not through polished success stories. Not through unrealistic promises about becoming a cloud engineer overnight.</p>
              <p>But through real journeys. The lessons. The confusion. The small wins. And yes, the mistakes.</p>
              <p className="text-foreground font-medium">Because real learning rarely looks perfect. And people should not have to go through that journey alone.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 6 — Why community matters ─── */}
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl mx-auto">
          <motion.div {...fadeUp}>
            <SectionBadge>Why community matters</SectionBadge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-8 leading-tight">
              When you are learning, it is easy to feel invisible.
            </h2>
            <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed font-body">
              <p>You study. You practice. You apply. You improve. Sometimes it feels like no one sees the work behind it.</p>
              <p>Build with Her exists to change that. This community exists to make those journeys visible — so people can learn together, and so every woman entering this space is reminded that she is not building alone.</p>
            </div>
            <PullQuote>No one should have to build alone.</PullQuote>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 7 — Principles ─── */}
      <section className="band-gradient-warm section-glow py-20 md:py-28">
        <div className="container max-w-5xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12 md:mb-16">
            <SectionBadge>How we operate</SectionBadge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
              Our <span className="gradient-text">principles</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Build with Her is more than a platform. It is a community guided by shared principles.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  {...fadeUpDelay(i * 0.08)}
                  className="card-premium p-6 md:p-8"
                >
                  <Icon size={24} className="text-primary mb-4" />
                  <h3 className="font-display text-lg font-bold text-foreground mb-3">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Section 8 — Backed by Oz ─── */}
      <section className="py-20 md:py-28">
        <div className="container max-w-5xl mx-auto">
          <motion.div {...fadeUp}>
            <SectionBadge className="border-accent/40">Why being backed by Oz matters</SectionBadge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-12 leading-tight max-w-3xl">
              Community becomes more powerful when backed by a real platform.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <motion.div {...fadeUp}>
              <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed font-body">
                <p>Build with Her is supported by Oz. This means the community is not just about conversation.</p>
                <p>Through <strong className="text-foreground">Oz University</strong>, members can build real cloud projects, create infrastructure portfolios, access engineering tools, and connect learning with real environments.</p>
                <p className="text-foreground font-medium">A community backed by a platform can advocate for better opportunities and open doors that individuals alone cannot. That leverage benefits the entire community — and it matters especially for women entering cloud engineering.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://university.ozlunara.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 px-5 inline-flex items-center rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/90 transition-all"
                >
                  Explore University →
                </a>
                <a
                  href="https://university.ozlunara.com/training"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 px-5 inline-flex items-center rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
                >
                  View the curriculum
                </a>
              </div>
            </motion.div>
            <motion.div {...fadeUpDelay(0.15)} className="space-y-4">
              {infraCards.map((c) => (
                <div
                  key={c.title}
                  className={`card-premium border-l-2 ${c.border} rounded-l-none p-5`}
                >
                  <h4 className="font-display text-sm font-bold text-foreground mb-1">{c.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}

              {/* Info strip */}
              <div className="flex items-center gap-3 rounded-[10px] border border-accent/30 bg-card p-3 mt-4">
                <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
                <span className="text-muted-foreground text-xs">464 learners · 20+ countries · 50+ lessons</span>
                <a
                  href="https://university.ozlunara.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-accent text-xs font-medium hover:underline whitespace-nowrap flex items-center gap-1"
                >
                  university.ozlunara.com <ExternalLink size={10} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Section 9 — The world we want to build ─── */}
      <section className="band-gradient section-glow py-20 md:py-28">
        <div className="container max-w-2xl mx-auto">
          <motion.div {...fadeUp}>
            <SectionBadge>The world we want to build</SectionBadge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-8 leading-tight">
              Imagine a world where access to cloud engineering is not limited by geography or opportunity.
            </h2>
            <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed font-body">
              <p>A world where talent is recognised before credentials.</p>
              <p>A world where the next generation of cloud architects, platform engineers, and security leaders reflects the diversity of the people using technology.</p>
              <p className="text-foreground font-medium">That is the world Build with Her is working toward.</p>
              <p>If you believe talent should not be limited by access, you can help build something bigger than yourself.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 10 — Team (preserved exactly) ─── */}
      <section className="py-20 md:py-28">
        <div className="container max-w-[760px] mx-auto text-center">
          <motion.div {...fadeUp}>
            <div className="grid grid-cols-3 gap-8 lg:gap-6 justify-items-center max-w-lg mx-auto">
              {[
                { src: "/images/tarak.jpeg", name: "Tarak", title: "Co-Founder, Oz", alt: "Tarak, Co-Founder of Build with Her" },
                { src: "/images/manisha.png", name: "Manisha Sarkar", title: "Co-Founder, Oz", alt: "Manisha Sarkar, Co-Founder of Oz" },
                { src: "/images/deborah_maiyaki.jpeg", name: "Deborah Maiyaki", title: "Community Lead at Oz", alt: "Deborah Maiyaki, Community Lead at Oz" },
              ].map((person) => (
                <div key={person.name} className="flex flex-col items-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-border/50 shadow-lg">
                    <img src={person.src} alt={person.alt} className="w-full h-full object-cover" />
                  </div>
                  <p className="mt-4 font-display text-base md:text-lg font-bold text-foreground text-center">{person.name}</p>
                  <p className="text-muted-foreground text-xs md:text-sm text-center">{person.title}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-foreground text-base md:text-lg leading-relaxed">
              This is the kind of world we are building.
            </p>
            <p className="text-foreground text-base md:text-lg leading-relaxed">
              And this is the stand we are taking.
            </p>
            <p className="mt-8 text-muted-foreground text-sm">2026</p>
            <p className="mt-4 font-caveat text-2xl md:text-3xl text-primary/80">The Build with Her Team</p>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 11 — Final CTA ─── */}
      <section className="relative cta-band">
        <div className="absolute inset-0 gradient-arc pointer-events-none" />
        <div className="gradient-line w-full" />
        <div className="container py-28 md:py-40">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center relative z-10">
            <p className="font-mono text-xs tracking-widest text-muted-foreground/60 uppercase mb-8">
              Talent is everywhere. Access is not.
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6 leading-tight">
              Be part of closing the gap.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-12">
              If you believe talent should not be limited by access, you can help build something bigger than yourself.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <GradientButton to="/join-the-builders" size="lg" icon>Create Your Builder Card</GradientButton>
              <GradientButton to="/join-the-builders" variant="outline" size="lg">Join the Community →</GradientButton>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Manifest;
