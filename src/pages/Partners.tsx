import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import GradientButton from "@/components/GradientButton";
import { motion } from "framer-motion";
import { Users, GraduationCap, Building2, Network, ExternalLink } from "lucide-react";

const partnerTypes = [
{
  icon: Users,
  title: "Community Partnerships",
  desc: "Co-host events, share resources, and amplify women in cloud and infrastructure. Together, we can reach more women who are building in silence.",
  cta: "Become a Partner"
},
{
  icon: GraduationCap,
  title: "Universities",
  desc: "Help students discover cloud, AI, and infrastructure early. We work with universities to introduce women to real-world cloud practices.",
  cta: "Connect Your University"
},
{
  icon: Building2,
  title: "Companies",
  desc: "From sponsoring workshops to providing mentorship, there are meaningful ways to support diversity in cloud and infrastructure.",
  cta: "Sponsor a Program"
},
{
  icon: Network,
  title: "Ecosystem Partners",
  desc: "Cloud providers, training platforms, and developer communities. Let's build stronger access together.",
  cta: "Join the Ecosystem"
}];


const communityPartners = [
{
  name: "She Builds Tech",
  type: "Community Partner",
  description:
  "She Builds Tech is a community dedicated to empowering women to grow and thrive in technology. Through mentorship, learning initiatives, and community support, they help women develop technical skills and build sustainable careers in tech.",
  link: "https://www.linkedin.com/company/she-builds-tech/",
  cta: "Visit Community"
}];


const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6 }
};

const Partners = () =>
<div className="min-h-screen bg-background">
    <Navbar />
    <PageHero title="Let's build more access together" badge="Partners">
      <p>If more women are going to access cloud and infrastructure opportunities, we need stronger ecosystems around them.</p>
    </PageHero>

    {/* Trust Signal */}
    <motion.section {...fadeUp} className="pb-8">
      <div className="container">
        













      
      </div>
    </motion.section>

    <motion.section {...fadeUp} className="section-glow">
      <div className="container py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {partnerTypes.map(({ icon: Icon, title, desc, cta }) =>
        <div key={title} className="card-premium p-8 group flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-lg mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{desc}</p>
              <span className="text-sm text-primary font-display font-medium">{cta} →</span>
            </div>
        )}
        </div>
      </div>
    </motion.section>

    {/* Community Partners */}
    <motion.section {...fadeUp} className="section-glow">
      <div className="container py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-5">
            Community Partners
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Build With Her collaborates with communities that are helping more women access opportunities in cloud, infrastructure, AI, and modern engineering roles.
          </p>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-3">
            These communities share our mission to support women who are building technical careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {communityPartners.map(({ name, type, description, link, cta }) =>
        <div key={name} className="card-premium p-8 group flex flex-col">
              <span className="badge-glow text-[11px] self-start mb-5">{type}</span>
              <h3 className="font-display font-semibold text-foreground text-lg mb-3">{name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{description}</p>
              <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary font-display font-medium hover:underline">
            
                {cta} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
        )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          More community partnerships will be announced as the Build With Her ecosystem grows.
        </p>
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
  </div>;


export default Partners;