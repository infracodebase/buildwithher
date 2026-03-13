import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import GradientButton from "@/components/GradientButton";
import SessionCard from "@/components/SessionCard";
import { pastSessions, upcomingSessions } from "@/data/sessionsData";
import { motion } from "framer-motion";
import { Radio, Wrench, MessageCircle, Mic, Globe, Calendar, Zap } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6 },
};

const SERIES_FILTERS = ["All", "Build with Her", "Infracodebase"] as const;
type SeriesFilter = (typeof SERIES_FILTERS)[number];

const eventTypes = [
  {
    icon: Radio,
    title: "Webinars",
    desc: "Monthly sessions with real practitioners sharing technical lessons and career journeys.",
    details: ["Cloud architecture", "AI-assisted engineering", "Security & compliance", "Career perspectives"],
    status: "Monthly",
  },
  {
    icon: Wrench,
    title: "Workshops",
    desc: "Hands-on collaborative sessions where you build real infrastructure alongside other women.",
    details: ["Kubernetes deployments", "Landing zones", "Terraform modules", "Secure design"],
    status: "Quarterly",
  },
  {
    icon: MessageCircle,
    title: "Community Conversations",
    desc: "Open, honest discussions on topics that matter to women in cloud and infrastructure.",
    details: ["Career pivots", "Impostor syndrome", "Emerging tools", "Infrastructure patterns"],
    status: "Bi-weekly",
  },
  {
    icon: Mic,
    title: "Featured Speakers",
    desc: "Women and allies sharing what they've learned. Real stories, real lessons, real encouragement.",
    details: ["Transitioning into cloud", "Building confidence", "Standing out", "Leadership journeys"],
    status: "Monthly",
  },
];

const sessionPoints = [
  "Real architecture discussions",
  "Hands-on problem solving",
  "Open technical questions",
  "Shared learning from real experiences",
  "Builders helping builders",
];

const stats = [
  { icon: Globe, label: "Builders from 12+ countries" },
  { icon: Calendar, label: "Weekly live sessions" },
  { icon: Zap, label: "Cloud · AI · Infrastructure" },
];

const Events = () => {
  const [activeFilter, setActiveFilter] = useState<SeriesFilter>("All");

  const filteredPast = useMemo(
    () => (activeFilter === "All" ? pastSessions : pastSessions.filter((s) => s.source === activeFilter)),
    [activeFilter]
  );
  const filteredUpcoming = useMemo(
    () => (activeFilter === "All" ? upcomingSessions : upcomingSessions.filter((s) => s.source === activeFilter)),
    [activeFilter]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero title="Learn. Build. Grow." badge="Events">
        <p>Events help you learn in public and connect with others who understand the journey.</p>
      </PageHero>

      {/* ── Series Filter ── */}
      <div className="container pt-16 pb-4">
        <div className="flex justify-center overflow-x-auto scrollbar-none">
          <div className="inline-flex items-center gap-1 rounded-full bg-muted/60 p-1 border border-border/50">
            {SERIES_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Upcoming Sessions ── */}
      {filteredUpcoming.length > 0 && (
        <motion.section {...fadeUp} className="band-gradient-warm">
          <div className="container py-20 md:py-28">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="badge-glow mb-4 inline-block">Up Next</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-4">Upcoming Sessions</h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Join upcoming sessions and learn alongside the community.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {filteredUpcoming.map((s) => (
                <SessionCard key={s.title} session={s} />
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ── Past Sessions ── */}
      {filteredPast.length > 0 && (
        <motion.section {...fadeUp} className="section-glow">
          <div className="container py-20 md:py-28">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-4">Past Sessions</h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Watch previous sessions and learn from real cloud, AI, and infrastructure practitioners.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {filteredPast.map((s) => (
                <SessionCard key={s.title} session={s} />
              ))}
            </div>
          </div>
        </motion.section>
      )}

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
            {eventTypes.map(({ icon: Icon, title, desc, details, status }) => (
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
                  {details.map((d) => (
                    <div key={d} className="flex items-center gap-2.5">
                      <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-xs text-secondary-foreground">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
              {sessionPoints.map((point) => (
                <span key={point} className="badge-glow !py-2 !px-5 text-[13px]">
                  {point}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {stats.map(({ icon: Icon, label }) => (
                <div key={label} className="stat-card flex items-center gap-3 px-6 py-4">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              ))}
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
          <GradientButton to="/join-the-builders" size="lg" icon>
            Join the Community
          </GradientButton>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Events;
