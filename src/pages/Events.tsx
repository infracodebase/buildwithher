import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionWrapper from "@/components/SectionWrapper";
import GradientButton from "@/components/GradientButton";

const eventTypes = [
  { title: "Webinars", desc: "Monthly sessions with real practitioners sharing technical lessons and career journeys. Cloud architecture, AI workflows, security thinking, and more." },
  { title: "Workshops", desc: "Hands-on collaborative sessions where you build real infrastructure alongside other women. From Kubernetes to landing zones." },
  { title: "Community Conversations", desc: "Open, honest discussions on career pivots, emerging tools, imposter syndrome, and the realities of growing in cloud and infrastructure." },
  { title: "Featured Speakers", desc: "Women and allies from across the industry sharing what they've learned — not polished talks, but real stories, real lessons, and real encouragement." },
];

const Events = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageHero title="Learn. Build. Grow.">
      <p>Events help you learn in public and connect with others who understand the journey.</p>
    </PageHero>

    <SectionWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {eventTypes.map(({ title, desc }) => (
          <div key={title} className="rounded-xl bg-card border border-border/50 p-7 card-hover">
            <h3 className="font-display font-semibold text-foreground text-lg mb-3">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <GradientButton to="/meet-the-builders">Join the Community</GradientButton>
      </div>
    </SectionWrapper>

    <Footer />
  </div>
);

export default Events;
