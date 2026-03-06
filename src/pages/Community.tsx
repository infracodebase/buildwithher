import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import SectionWrapper from "@/components/SectionWrapper";
import GradientButton from "@/components/GradientButton";

const sections = [
  { title: "Why Community Matters", copy: "Learning alone is possible. But growing in isolation is exhausting. Community gives you context, encouragement, and a sense of shared purpose. It reminds you that the questions you are asking, the frustrations you are facing, and the progress you are making are all part of a larger story." },
  { title: "Belonging Changes Everything", copy: "When you belong somewhere, you stop questioning whether you should be here. You start focusing on what you can build, what you can learn, and how you can contribute. Belonging does not mean you are the same as everyone else. It means you are welcome exactly as you are." },
  { title: "Visibility Matters", copy: "You do not need to be the loudest voice in the room. But you deserve to be seen. Visibility opens doors: to opportunities, to mentorship, to collaboration, and to belief in yourself. Build with Her creates opportunities for you to share your work and your journey." },
  { title: "Personal Brand", copy: "Your personal brand is not about marketing. It is about clarity. Who you are, what you do, and where you are going. When you can communicate that with honesty and confidence, you stand out — not because you are performing, but because you are being yourself." },
  { title: "Open Collaboration", copy: "The best engineers learn from each other. Build with Her encourages open collaboration: sharing resources, pair programming, joint projects, and honest conversations about what is working and what is not." },
];

const Community = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <PageHero title="A community built around we, not just me">
      <p>You can be ambitious and still need support.</p>
      <p className="mt-1">You can be talented and still need belonging.</p>
      <p className="mt-1">You can be disciplined and still not want to do everything alone.</p>
    </PageHero>

    {sections.map(({ title, copy }, i) => (
      <SectionWrapper key={title} className={i > 0 ? "border-t border-border/30" : ""}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">{title}</h2>
          <p className="text-muted-foreground leading-relaxed">{copy}</p>
        </div>
      </SectionWrapper>
    ))}

    <SectionWrapper className="border-t border-border/30">
      <div className="text-center">
        <GradientButton to="/meet-the-builders">Join the Community</GradientButton>
      </div>
    </SectionWrapper>

    <Footer />
  </div>
);

export default Community;
