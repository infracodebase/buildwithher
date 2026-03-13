import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import GradientButton from "@/components/GradientButton";
import { motion } from "framer-motion";
import { Radio, Wrench, MessageCircle, Mic, Calendar, Globe, Zap, Play } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6 }
};

const upcomingEvents = [
{
  title: "Cloud Architecture Foundations",
  format: "Live Webinar",
  status: "Coming Soon",
  desc: "A practical session covering cloud architecture patterns used in real production environments."
},
{
  title: "Terraform Landing Zones Workshop",
  format: "Hands-on Workshop",
  status: "Coming Soon",
  desc: "Build a reusable landing zone structure using Terraform with guided collaboration."
},
{
  title: "Women in Platform Engineering",
  format: "Community Conversation",
  status: "Coming Soon",
  desc: "An open conversation about career paths, challenges, and opportunities in platform engineering."
}];


const pastEvents = [
{
  title: "No Straight Lines — Breaking into Tech and Rising to Leadership",
  speaker: "Shannon Eldridge-Kuehn",
  videoId: "SLpgv8zCzPU",
  source: "Build with Her"
},
{
  title: "Operating Cloud Engineering at Scale",
  speaker: "Alex",
  videoId: "H8Osx6GcLSE",
  source: "Build with Her"
},
{
  title: "Building with AI You Can Trust",
  speaker: "Fatima",
  videoId: "vOMo1RquRsY",
  source: "Build with Her"
},
{
  title: "Delivering Secure Cloud Infrastructure at Scale with AI",
  speaker: "Seif",
  videoId: "Ld8WG8CtagA",
  source: "Build with Her"
}];


const eventTypes = [
{
  icon: Radio,
  title: "Webinars",
  desc: "Monthly sessions with real practitioners sharing technical lessons and career journeys.",
  details: ["Cloud architecture", "AI-assisted engineering", "Security & compliance", "Career perspectives"],
  status: "Monthly"
},
{
  icon: Wrench,
  title: "Workshops",
  desc: "Hands-on collaborative sessions where you build real infrastructure alongside other women.",
  details: ["Kubernetes deployments", "Landing zones", "Terraform modules", "Secure design"],
  status: "Quarterly"
},
{
  icon: MessageCircle,
  title: "Community Conversations",
  desc: "Open, honest discussions on topics that matter to women in cloud and infrastructure.",
  details: ["Career pivots", "Impostor syndrome", "Emerging tools", "Infrastructure patterns"],
  status: "Bi-weekly"
},
{
  icon: Mic,
  title: "Featured Speakers",
  desc: "Women and allies sharing what they've learned. Real stories, real lessons, real encouragement.",
  details: ["Transitioning into cloud", "Building confidence", "Standing out", "Leadership journeys"],
  status: "Monthly"
}];


const sessionPoints = [
"Real architecture discussions",
"Hands-on problem solving",
"Open technical questions",
"Shared learning from real experiences",
"Builders helping builders"];


const stats = [
{ icon: Globe, label: "Builders from 12+ countries" },
{ icon: Calendar, label: "Weekly live sessions" },
{ icon: Zap, label: "Cloud · AI · Infrastructure" }];


const Events = () =>
<div className="min-h-screen bg-background">
    <Navbar />
    <PageHero title="Learn. Build. Grow." badge="Events">
      <p>Events help you learn in public and connect with others who understand the journey.</p>
    </PageHero>

    {/* ── Past Sessions ── */}
    <motion.section {...fadeUp} className="section-glow">
      <div className="container py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-4">Past Sessions</h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Watch previous sessions and learn from real cloud, AI, and infrastructure practitioners.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {pastEvents.map((evt) =>
        <div key={evt.title} className="card-premium overflow-hidden group flex flex-col">
              <div className="relative aspect-video w-full">
                <iframe
              src={evt.embedUrl}
              title={evt.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 w-full h-full" />
            
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {evt.source}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-foreground text-base mb-1 leading-snug">{evt.title}</h3>
                {evt.subtitle &&
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{evt.subtitle}</p>
            }
                <div className="mt-auto pt-3 border-t border-border/40">
                  <p className="text-sm font-medium text-foreground">{evt.speaker}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{evt.role}</p>
                </div>
              </div>
            </div>
        )}
        </div>
      </div>
    </motion.section>

    {/* ── Upcoming Sessions ── */}
    <motion.section {...fadeUp} className="band-gradient-warm">
      <div className="container py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge-glow mb-4 inline-block">Up Next</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-4">Upcoming Infracodebase community events</h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Join upcoming Build with Her sessions and learn alongside the community.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {upcomingEvents.map((evt) =>
        <div key={evt.title} className="card-premium p-7 group flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {evt.format}
                </span>
                <span className="badge-glow !py-1 !px-3 text-[11px]">{evt.status}</span>
              </div>
              <h3 className="font-display font-semibold text-foreground text-lg mb-2 leading-snug">{evt.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{evt.desc}</p>
            </div>
        )}
        </div>
      </div>
    </motion.section>

    {/* ── Event Types ── */}
    <motion.section {...fadeUp} className="section-glow">
      <div className="container py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-4">Event Formats</h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Different ways to learn, connect, and grow with the community.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {eventTypes.map(({ icon: Icon, title, desc, details, status }) =>
        <div key={title} className="card-premium p-8 group">
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="badge-glow !py-1 !px-3">{status}</span>
              </div>
              <h3 className="font-display font-semibold text-foreground text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{desc}</p>
              <div className="space-y-2">
                {details.map((d) =>
            <div key={d} className="flex items-center gap-2.5">
                    <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-xs text-secondary-foreground">{d}</span>
                  </div>
            )}
              </div>
            </div>
        )}
        </div>
      </div>
    </motion.section>

    {/* ── What Happens in a Session ── */}
    <motion.section {...fadeUp} className="band-gradient">
      <div className="container py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-4">What Happens in a Session</h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-10">
            Build with Her sessions are collaborative and practical. You can expect:
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {sessionPoints.map((point) =>
          <span key={point} className="badge-glow !py-2 !px-5 text-[13px]">{point}</span>
          )}
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {stats.map(({ icon: Icon, label }) =>
          <div key={label} className="stat-card flex items-center gap-3 px-6 py-4">
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
          )}
          </div>
        </div>
      </div>
    </motion.section>

    {/* ── CTA ── */}
    <motion.section {...fadeUp} className="cta-band">
      <div className="container py-20 md:py-28 text-center relative z-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-4">Start Building Together</h2>
        <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-lg mx-auto">
          Start learning and building together.
        </p>
        <GradientButton to="/join-the-builders" size="lg" icon>Join the Community</GradientButton>
      </div>
    </motion.section>

    <Footer />
  </div>;


export default Events;