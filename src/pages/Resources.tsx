import { motion, type Easing } from "framer-motion";
import { BookOpen, LayoutTemplate, Youtube, Linkedin, Activity, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay, ease: "easeOut" as Easing },
});

interface ResourceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

interface ResourceSection {
  title: string;
  items: ResourceItem[];
}

const sections: ResourceSection[] = [
  {
    title: "Learning",
    items: [
      {
        icon: <BookOpen size={20} />,
        title: "Introduction to Infracodebase",
        description: "Start here to understand what Infracodebase is, how it works, and how to begin.",
        href: "https://infracodebase.com/docs/getting-started/introduction",
      },
      {
        icon: <LayoutTemplate size={20} />,
        title: "Templates Library",
        description: "Explore infrastructure templates and examples to accelerate your cloud builds.",
        href: "https://infracodebase.com/templates",
      },
    ],
  },
  {
    title: "Updates",
    items: [
      {
        icon: <Youtube size={20} />,
        title: "Infracodebase on YouTube",
        description: "Watch product walkthroughs, tutorials, and infrastructure content.",
        href: "https://www.youtube.com/@infracodebase",
      },
      {
        icon: <Linkedin size={20} />,
        title: "Infracodebase on LinkedIn",
        description: "Follow company updates, product news, and ecosystem announcements.",
        href: "https://www.linkedin.com/company/infracodebase/?viewAsMember=true",
      },
    ],
  },
  {
    title: "Platform",
    items: [
      {
        icon: <Activity size={20} />,
        title: "Platform Status",
        description: "Check the current status of Infracodebase and monitor availability.",
        href: "https://infracodebase.com/status",
      },
    ],
  },
];

const ResourceRow = ({ item, index }: { item: ResourceItem; index: number }) => (
  <motion.a
    {...fade(index * 0.05)}
    href={item.href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-4 py-5 border-b border-border/40 last:border-b-0 transition-colors hover:bg-accent/30 -mx-4 px-4 rounded-lg"
  >
    <span className="flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-colors">
      {item.icon}
    </span>
    <div className="flex-1 min-w-0">
      <p className="font-display text-sm font-semibold text-foreground">{item.title}</p>
      <p className="text-muted-foreground text-sm mt-0.5 leading-relaxed">{item.description}</p>
    </div>
    <ArrowRight
      size={16}
      className="flex-shrink-0 text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 transition-all"
    />
  </motion.a>
);

const Resources = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Header */}
    <section className="pt-32 pb-12 md:pt-44 md:pb-16">
      <div className="container max-w-[640px] mx-auto text-center">
        <motion.h1
          {...fade()}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text"
        >
          Resources
        </motion.h1>
        <motion.p
          {...fade(0.1)}
          className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed"
        >
          Everything you need to start building with Infracodebase. Learn the platform, explore
          templates, follow updates, and check platform status.
        </motion.p>
      </div>
    </section>

    {/* Sections */}
    <section className="pb-24 md:pb-32">
      <div className="container max-w-[640px] mx-auto space-y-14">
        {sections.map((section) => (
          <motion.div key={section.title} {...fade()}>
            <h2 className="font-display text-lg font-bold text-foreground mb-2">{section.title}</h2>
            <div>
              {section.items.map((item, i) => (
                <ResourceRow key={item.title} item={item} index={i} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <Footer />
  </div>
);

export default Resources;
