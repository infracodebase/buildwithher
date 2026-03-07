import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import GradientButton from "@/components/GradientButton";
import { motion } from "framer-motion";
import { GraduationCap, Users, Wrench, Radio, MessageCircle } from "lucide-react";

const programs = [
  {
    icon: GraduationCap,
    title: "Infracodebase University",
    desc: "A structured learning experience covering cloud architecture, Infrastructure as Code, platform engineering, security thinking, and AI-assisted infrastructure workflows.",
    tags: ["Cloud Architecture", "IaC", "Security", "AI Workflows"],
    highlight: true,
  },
  {
    icon: Users,
    title: "1:1 Sessions",
    desc: "Personal sessions to work through architecture decisions, infrastructure challenges, career direction, and technical questions. You are not expected to figure everything out alone.",
    tags: ["Architecture", "Career", "Technical Guidance"],
  },
  {
    icon: Wrench,
    title: "Hands-On Workshops",
    desc: "Collaborative builds where you practice cloud architectures, Kubernetes deployments, landing zones, and secure infrastructure design alongside other women.",
    tags: ["Kubernetes", "Terraform", "Landing Zones"],
  },
  {
    icon: Radio,
    title: "Monthly Webinars",
    desc: "Every month we host conversations with people who are actually doing the work. Real practitioners sharing technical lessons and career journeys.",
    tags: ["Cloud Architecture", "AI Engineering", "Career Journeys"],
  },
  {
    icon: MessageCircle,
    title: "Community Conversations",
    desc: "Open discussions on topics that matter, from career pivots to emerging tools, from imposter syndrome to infrastructure patterns.",
    tags: ["Career", "Community", "Learning"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6 },
};

const Programs = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageHero title="Programs designed for how you actually learn" badge="Learning by Doing">
      <p>Learning cloud is not about consuming endless content. It is about practice, feedback, support, and momentum.</p>
    </PageHero>

    <motion.section {...fadeUp} className="section-glow">
      <div className="container py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {programs.map(({ icon: Icon, title, desc, tags, highlight }) => (
            <div
              key={title}
              className={`card-premium p-8 group ${highlight ? "md:col-span-2 gradient-border-card" : ""}`}
            >
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

        <div className="mt-16 text-center">
          <GradientButton to="/meet-the-builders" size="lg" icon>Join the Community</GradientButton>
        </div>
      </div>
    </motion.section>

    <Footer />
  </div>
);

export default Programs;
