import { motion, type Easing } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientButton from "@/components/GradientButton";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: "easeOut" as Easing },
});

const principles = [
  {
    title: "Start Anywhere",
    body: "You do not need the perfect background to enter cloud engineering.\n\nCuriosity and discipline matter more than credentials.",
  },
  {
    title: "Learn by Building",
    body: "The best way to learn cloud infrastructure is by building real systems.\n\nReal architectures.\nReal deployments.",
  },
  {
    title: "Document the Journey",
    body: "Sharing what you learn helps others grow faster.",
  },
  {
    title: "Build in Public",
    body: "Visibility creates opportunity.\n\nThe Builder Wall exists for this reason.",
  },
  {
    title: "No One Builds Alone",
    body: "Community accelerates learning and confidence.",
  },
  {
    title: "Access Matters",
    body: "Talent is everywhere.\n\nOpportunity is not.",
  },
];

const HandwrittenQuote = ({ children }: { children: string }) => (
  <motion.div {...fade()} className="py-16 md:py-20 text-center">
    <p className="font-caveat text-2xl md:text-3xl lg:text-4xl text-primary/80 italic leading-relaxed max-w-2xl mx-auto">
      "{children}"
    </p>
  </motion.div>
);

const SectionBlock = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div {...fade()} className={`max-w-3xl mx-auto ${className}`}>
    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-8">
      {title}
    </h2>
    <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed font-body">
      {children}
    </div>
  </motion.div>
);

const Manifest = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 gradient-arc pointer-events-none" />
        <div className="absolute inset-0 gradient-arc-top pointer-events-none" />
        <div className="container relative z-10 max-w-3xl mx-auto text-center">
          <motion.div {...fade()}>
            <span className="badge-glow">Manifest</span>
          </motion.div>
          <motion.h1
            {...fade(0.1)}
            className="mt-8 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text leading-tight"
          >
            Talent is everywhere.
            <br />
            Access is not.
          </motion.h1>
          <motion.p
            {...fade(0.2)}
            className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Build with Her exists to close that gap in cloud engineering.
          </motion.p>
          <motion.div {...fade(0.3)} className="mt-8">
            <GradientButton to="/join-the-builders" icon size="lg">
              Create Your Builder Card
            </GradientButton>
          </motion.div>
        </div>
      </section>

      {/* ── Founding Statement ── */}
      <section className="pt-8 pb-16 md:pb-20">
        <div className="container max-w-3xl mx-auto">
          <motion.div
            {...fade()}
            className="rounded-2xl border border-border/50 p-8 md:p-12 text-center"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--card-elevated)) 0%, hsl(var(--card)) 100%)",
            }}
          >
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6">
              Founding Statement
            </h2>
            <p className="text-foreground text-lg md:text-xl leading-relaxed font-body max-w-xl mx-auto">
              Build with Her exists because talent is everywhere, but access is not.
            </p>
            <p className="mt-6 text-muted-foreground text-sm">Written in 2026</p>
          </motion.div>
        </div>
      </section>

      {/* ── Why I'm Building This ── */}
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionBlock title="Why I'm Building This">
            <p>
              Over the past few months, I took a step back to rethink my role as a founder.
            </p>
            <p>For some people, becoming a founder means:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>shipping products</li>
              <li>raising money</li>
              <li>optimizing growth</li>
            </ul>
            <p>For me, becoming a founder again means something else.</p>
            <p>
              Driving impact.
              <br />
              Choosing a direction even when it is uncomfortable.
            </p>
            <p>And right now, it is uncomfortable.</p>
          </SectionBlock>
        </div>
      </section>

      <HandwrittenQuote>Talent is everywhere. Access is not.</HandwrittenQuote>

      {/* ── The Moment We Are In ── */}
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionBlock title="The Moment We Are In">
            <p>We are living through massive layoffs.</p>
            <p>
              Artificial intelligence is reshaping entire professions in real time.
            </p>
            <p>
              And many people especially women are quietly questioning whether they truly belong in
              tech.
            </p>
            <p>In cloud computing today:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>women represent roughly 14 to 16 percent of the workforce</li>
              <li>
                in cloud architecture DevOps and SRE that number drops below 15 percent
              </li>
              <li>at principal and distinguished levels it falls under 10 percent</li>
              <li>
                in cloud security and platform leadership it hovers around 8 to 12 percent
              </li>
            </ul>
            <p>These roles sit at the highest pay bands.</p>
            <p>
              They shape the systems.
              <br />
              They influence decisions.
              <br />
              They define how technology evolves.
            </p>
            <p>When women are missing there it does not just affect visibility.</p>
            <p>It affects income influence and leadership.</p>
          </SectionBlock>
        </div>
      </section>

      {/* ── Why This Moment Matters ── */}
      <section className="py-16 md:py-24 band-gradient-warm">
        <div className="container">
          <SectionBlock title="Why This Moment Matters">
            <p>Technology is changing faster than access to opportunity.</p>
            <p>Artificial intelligence is accelerating software development.</p>
            <p>
              Cloud infrastructure is becoming the backbone of nearly every modern system.
            </p>
            <p>Entire professions are being reshaped.</p>
            <p>
              But while technology moves fast access to opportunity does not move at the same speed.
            </p>
            <p>Many talented people are still locked out of these fields because:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>they do not have access to advanced training</li>
              <li>they do not have access to engineering communities</li>
              <li>they do not see people like them in leadership roles</li>
            </ul>
            <p>The result is a silent gap.</p>
            <p>
              A gap between who could build the future and who is given the opportunity to do so.
            </p>
            <p className="text-foreground font-medium">
              Build with Her exists to close that gap.
            </p>
          </SectionBlock>
        </div>
      </section>

      <HandwrittenQuote>The problem is not talent. The problem is access.</HandwrittenQuote>

      {/* ── The Gap Starts Earlier ── */}
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionBlock title="The Gap Starts Earlier">
            <p>And the gap does not start at the top.</p>
            <p>Women are still:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>significantly less likely to access advanced cloud skills</li>
              <li>
                far less likely especially in low and middle income countries to access cloud
                training
              </li>
            </ul>
            <p>The issue is not talent.</p>
            <p>It is not ambition.</p>
            <p className="text-foreground font-medium">It is access.</p>
            <p>Once you see that it becomes difficult to ignore.</p>
          </SectionBlock>
        </div>
      </section>

      {/* ── Why Build with Her Exists ── */}
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionBlock title="Why Build with Her Exists">
            <p>Build with Her exists to make cloud engineering more accessible.</p>
            <p>Not through polished success stories.</p>
            <p>
              Not through unrealistic promises about becoming a cloud engineer overnight.
            </p>
            <p>But through real journeys.</p>
            <p>
              The lessons.
              <br />
              The confusion.
              <br />
              The small wins.
              <br />
              And yes the mistakes.
            </p>
            <p>Because real learning rarely looks perfect.</p>
            <p>And people should not have to go through that journey alone.</p>
          </SectionBlock>
        </div>
      </section>

      {/* ── Why Community Matters ── */}
      <section className="py-16 md:py-24 band-gradient">
        <div className="container">
          <SectionBlock title="Why Community Matters">
            <p>When you are learning cloud engineering it is easy to feel invisible.</p>
            <p>
              You study.
              <br />
              You practice.
              <br />
              You apply.
              <br />
              You improve.
            </p>
            <p>Sometimes it feels like no one sees the work behind it.</p>
            <p className="text-foreground font-medium">
              Build with Her exists to change that.
            </p>
            <p>This community exists to make those journeys visible.</p>
            <p>It exists so people can learn together.</p>
            <p>
              And it reminds every woman entering this space that she is not building alone.
            </p>
          </SectionBlock>
        </div>
      </section>

      <HandwrittenQuote>No one should have to build alone.</HandwrittenQuote>

      {/* ── Our Principles ── */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl mx-auto">
          <motion.div {...fade()} className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
              Our Principles
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Build with Her is more than a platform.
              <br />
              It is a community guided by shared principles.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                {...fade(i * 0.08)}
                className="card-premium p-6 md:p-8"
              >
                <h3 className="font-display text-lg font-bold text-foreground mb-3">
                  {p.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Backed by Infracodebase ── */}
      <section className="py-16 md:py-24 band-gradient-warm">
        <div className="container">
          <SectionBlock title="Why Being Backed by Infracodebase Matters">
            <p>Build with Her is supported by Infracodebase.</p>
            <p>
              Communities become more powerful when they are backed by real infrastructure and a
              larger platform.
            </p>
            <p>
              Being connected to Infracodebase means this community is not just about conversation.
            </p>
            <p>Members can:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>build real cloud projects</li>
              <li>create infrastructure portfolios</li>
              <li>access engineering tools</li>
              <li>connect learning with real environments</li>
            </ul>
            <p>It also creates leverage.</p>
            <p>
              A community backed by a platform can advocate for better opportunities and open doors
              that individuals alone cannot.
            </p>
            <p>That leverage benefits the entire community.</p>
            <p className="text-foreground font-medium">
              And it matters especially for women entering cloud engineering.
            </p>
          </SectionBlock>
        </div>
      </section>

      {/* ── The World We Want To Build ── */}
      <section className="py-16 md:py-24">
        <div className="container">
          <SectionBlock title="The World We Want To Build">
            <p>
              Imagine a world where access to cloud engineering is not limited by geography or
              opportunity.
            </p>
            <p>A world where talent is recognized before credentials.</p>
            <p>
              A world where the next generation of cloud architects platform engineers and security
              leaders reflects the diversity of the people using technology.
            </p>
            <p className="text-foreground font-medium">
              That is the world Build with Her is working toward.
            </p>
          </SectionBlock>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 md:py-32 cta-band section-glow">
        <div className="container max-w-3xl mx-auto text-center relative z-10">
          <motion.p
            {...fade()}
            className="text-foreground text-lg md:text-xl lg:text-2xl leading-relaxed font-body max-w-2xl mx-auto"
          >
            If you believe talent should not be limited by access
            <br />
            you can help build something bigger than yourself.
          </motion.p>
          <motion.div {...fade(0.15)} className="mt-10">
            <GradientButton to="/join-the-builders" icon size="lg">
              Create Your Builder Card
            </GradientButton>
          </motion.div>
        </div>
      </section>

      {/* ── Founder Signature ── */}
      <section className="py-20 md:py-28">
        <div className="container max-w-2xl mx-auto text-center">
          <motion.div {...fade()}>
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden mx-auto border-2 border-border/50 shadow-lg">
              <img
                src="/images/tarak.jpeg"
                alt="Tarak Bach, Founder of Build with Her"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-6 font-display text-lg font-bold text-foreground">Tarak Bach</p>
            <p className="text-muted-foreground text-sm">Founder, Build with Her</p>
            <p className="mt-8 text-foreground text-base md:text-lg leading-relaxed">
              This is the kind of founding I care about.
            </p>
            <p className="text-foreground text-base md:text-lg leading-relaxed">
              And this is the stand I am taking.
            </p>
            <p className="mt-8 text-muted-foreground text-sm">Written in 2026</p>
            <p className="mt-4 font-caveat text-2xl md:text-3xl text-primary/80">Tarak</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Manifest;
