import { useState, useMemo, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import GradientButton from "@/components/GradientButton";
import PartnerCard from "@/components/PartnerCard";
import { partners, PARTNER_CATEGORIES, type PartnerCategory } from "@/data/partnersData";
import { motion, AnimatePresence } from "framer-motion";
import { Users, GraduationCap, Building2, Network, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const collaborationTypes = [
  "Community Partnership",
  "University Partnership",
  "Company Partnership",
  "Ecosystem Partnership",
] as const;

type CollaborationType = typeof collaborationTypes[number];

const partnerTypes: {
  icon: typeof Users;
  title: string;
  desc: string;
  cta: string;
  collab: CollaborationType;
}[] = [
  {
    icon: Users,
    title: "Community Partnerships",
    desc: "Co-host events, share resources, and amplify women in cloud and infrastructure. Together, we can reach more women who are building in silence.",
    cta: "Become a Partner",
    collab: "Community Partnership",
  },
  {
    icon: GraduationCap,
    title: "Universities",
    desc: "Help students discover cloud, AI, and infrastructure early. We work with universities to introduce women to real-world cloud practices.",
    cta: "Connect Your University",
    collab: "University Partnership",
  },
  {
    icon: Building2,
    title: "Companies",
    desc: "From sponsoring workshops to providing mentorship, there are meaningful ways to support diversity in cloud and infrastructure.",
    cta: "Partner as a Company",
    collab: "Company Partnership",
  },
  {
    icon: Network,
    title: "Ecosystem Partners",
    desc: "Cloud providers, training platforms, and developer communities. Let's build stronger access together.",
    cta: "Join the Ecosystem",
    collab: "Ecosystem Partnership",
  },
];


const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6 },
};

const Partners = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [collabType, setCollabType] = useState<string>("");
  const [partnerFilter, setPartnerFilter] = useState<PartnerCategory>("All Partners");
  const { toast } = useToast();

  const filteredPartners = useMemo(
    () => partnerFilter === "All Partners" ? partners : partners.filter((p) => p.category === partnerFilter),
    [partnerFilter]
  );

  const scrollToForm = (type: CollaborationType) => {
    setCollabType(type);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const org = formData.get("org") as string;
    const email = formData.get("email") as string;

    if (!org?.trim() || !email?.trim() || !collabType) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    toast({ title: "Partnership inquiry sent!", description: "We'll be in touch soon." });
    (e.target as HTMLFormElement).reset();
    setCollabType("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHero title="Let's build more access together" badge="Partners">
        <p>If more women are going to access cloud and infrastructure opportunities, we need stronger ecosystems around them.</p>
      </PageHero>

      {/* ── Our Network (first major section) ── */}
      <motion.section {...fadeUp} className="section-glow">
        <div className="container py-24 md:py-32">
          {/* Trusted-by strip */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Trusted by communities including</p>
            <a
              href="https://www.linkedin.com/company/she-builds-tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="badge-glow text-sm inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              She Builds Tech <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Partnership pathway cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {partnerTypes.map(({ icon: Icon, title, desc, cta, collab }) => (
              <div key={title} className="card-premium p-8 group flex flex-col">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{desc}</p>
                <button
                  onClick={() => scrollToForm(collab)}
                  className="text-sm text-primary font-display font-medium text-left hover:underline transition-colors cursor-pointer"
                >
                  {cta} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Partner Directory ── */}
      <motion.section {...fadeUp} className="section-glow">
        <div className="container py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-3 block">Our Network</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-5">
              Partners Building With Us
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              We collaborate with communities, universities, companies, and ecosystem organizations helping more builders grow in cloud, AI, and infrastructure.
            </p>
          </div>

          {/* Filters — same pattern as Events page */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground shrink-0">Filter</span>
              <div className="inline-flex items-center gap-1 rounded-full bg-muted/60 p-1 border border-border/50">
                {PARTNER_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPartnerFilter(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      partnerFilter === cat
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Partner Grid */}
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={partnerFilter}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredPartners.map((p) => (
                  <PartnerCard key={p.name} partner={p} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredPartners.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-16">
                No partners in this category yet. More partnerships will be announced soon.
              </p>
            )}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-10">
            More community partnerships will be announced as the Build With Her ecosystem grows.
          </p>
        </div>
      </motion.section>

      {/* Partner Inquiry Form */}
      <motion.section {...fadeUp} className="section-glow" id="partner-form" ref={formRef}>
        <div className="container py-24 md:py-32">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-5">
                Partner with Build With Her
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Tell us about your organization and how you would like to collaborate with Build With Her.
              </p>
              <p className="text-sm text-muted-foreground/70 mt-3">
                Interested in collaborating? Choose the partnership path that fits your organization.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="card-premium p-8 md:p-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="org">Organization Name *</Label>
                  <Input id="org" name="org" placeholder="Your organization" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" name="website" placeholder="https://" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Person</Label>
                  <Input id="contact" name="contact" placeholder="Full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" placeholder="you@org.com" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Type of Collaboration *</Label>
                <Select value={collabType} onValueChange={setCollabType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select collaboration type" />
                  </SelectTrigger>
                  <SelectContent>
                    {collaborationTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us how you'd like to collaborate..."
                  rows={4}
                />
              </div>

              <GradientButton type="submit" icon className="w-full md:w-auto">
                Send Partnership Inquiry
              </GradientButton>
            </form>
          </div>
        </div>
      </motion.section>

      {/* CTA Band */}
      <section className="relative cta-band section-glow">
        <div className="container py-28 md:py-36">
          <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-6">Partner with Build with Her</h2>
            <p className="text-muted-foreground text-lg mb-10">Let's create more access, more visibility, and more opportunity for women in cloud and infrastructure.</p>
            <GradientButton to="/community" size="lg" icon>Get in Touch</GradientButton>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partners;
