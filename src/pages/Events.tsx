import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import GradientButton from "@/components/GradientButton";
import { motion } from "framer-motion";
import { Radio, Wrench, MessageCircle, Mic } from "lucide-react";

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
    desc: "Women and allies sharing what they've learned — real stories, real lessons, real encouragement.",
    details: ["Transitioning into cloud", "Building confidence", "Standing out", "Leadership journeys"],
    status: "Monthly",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6 },
};

const Events = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageHero title="Learn. Build. Grow." badge="Events">
      <p>Events help you learn in public and connect with others who understand the journey.</p>
    </PageHero>

    <motion.section {...fadeUp} className="section-glow">
      <div className="container py-24 md:py-32">
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

        <div className="mt-16 text-center">
          <GradientButton to="/meet-the-builders" size="lg" icon>Join the Community</GradientButton>
        </div>
      </div>
    </motion.section>

    <Footer />
  </div>
);

export default Events;
