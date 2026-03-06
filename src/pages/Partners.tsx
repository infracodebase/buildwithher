import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionWrapper from "@/components/SectionWrapper";
import GradientButton from "@/components/GradientButton";

const partnerTypes = [
  { title: "Community Partnerships", desc: "Partner with Build with Her to co-host events, share resources, and amplify women in cloud and infrastructure. Together, we can reach more women who are building in silence." },
  { title: "Universities", desc: "Help students discover cloud, AI, and infrastructure early. We work with universities to introduce women to real-world cloud practices before they enter the job market." },
  { title: "Companies", desc: "If your company is committed to diversity in cloud and infrastructure, let's collaborate. From sponsoring workshops to providing mentorship, there are meaningful ways to support." },
  { title: "Ecosystem Partners", desc: "Cloud providers, training platforms, and developer communities — let's build stronger access together. Women in cloud need more pathways, not fewer." },
];

const Partners = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageHero title="Let's build more access together">
      <p>If more women are going to access cloud and infrastructure opportunities, we need stronger ecosystems around them.</p>
    </PageHero>

    <SectionWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {partnerTypes.map(({ title, desc }) => (
          <div key={title} className="rounded-xl bg-card border border-border/50 p-7 card-hover">
            <h3 className="font-display font-semibold text-foreground text-lg mb-3">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>

    <SectionWrapper className="border-t border-border/30">
      <div className="max-w-lg mx-auto text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold gradient-text mb-4">Partner with Build with Her</h2>
        <p className="text-muted-foreground mb-8">Let's create more access, more visibility, and more opportunity for women in cloud and infrastructure.</p>
        <GradientButton to="/community">Get in Touch</GradientButton>
      </div>
    </SectionWrapper>

    <Footer />
  </div>
);

export default Partners;
