import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionWrapper from "@/components/SectionWrapper";
import GradientButton from "@/components/GradientButton";

const programSections = [
  {
    title: "Infracodebase University",
    desc: "A structured learning experience covering cloud architecture, Infrastructure as Code, platform engineering, security thinking, and AI-assisted infrastructure workflows. Real examples. Real systems. Real growth.",
  },
  {
    title: "1:1 Sessions",
    desc: "Personal sessions to work through architecture decisions, infrastructure challenges, career direction, and technical questions. You are not expected to figure everything out alone.",
  },
  {
    title: "Hands-On Workshops",
    desc: "Collaborative builds where you practice cloud architectures, Kubernetes deployments, landing zones, and secure infrastructure design alongside other women in the community.",
  },
  {
    title: "Monthly Webinars",
    desc: "Real practitioners sharing technical lessons and career journeys across cloud, AI, infrastructure, security, and platform engineering. Practical. Honest. Valuable.",
  },
  {
    title: "Community Conversations",
    desc: "Open discussions on topics that matter — from career pivots to emerging tools, from imposter syndrome to infrastructure patterns. A space to speak and be heard.",
  },
];

const Programs = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageHero title="Programs designed for how you actually learn">
      <p>Learning cloud is not about consuming endless content.</p>
      <p className="mt-2">It is about practice, feedback, support, and momentum.</p>
    </PageHero>

    <SectionWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {programSections.map(({ title, desc }) => (
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

export default Programs;
