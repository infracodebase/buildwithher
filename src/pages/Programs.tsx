import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Wrench,
  Video,
  BookOpen,
  Clock,
  RefreshCw,
  Globe,
  Check,
  X,
  ChevronDown,
} from "lucide-react";

/* ───────── programs-page CSS tokens (scoped via [data-programs]) ───────── */
const programsTokensStyle = `
[data-programs] {
  --pg-bg: #0a0c0f;
  --pg-bg2: #0f1115;
  --pg-surface: #141720;
  --pg-surface2: #1a1f2e;
  --pg-border: #1e2230;
  --pg-border2: #262d40;
  --pg-text: #e8eaf0;
  --pg-text2: #7a8099;
  --pg-text3: #4a5068;
  --pg-accent: #4de8c2;
  --pg-check: #4de8c2;
  --pg-check-bg: rgba(77,232,194,0.1);
  --pg-x-bg: rgba(255,255,255,0.05);
  --pg-quote-line: #4de8c2;
}
.light [data-programs] {
  --pg-bg: #FAF8F3;
  --pg-bg2: #F3EFE6;
  --pg-surface: #FFFFFF;
  --pg-surface2: #F3EFE6;
  --pg-border: #E8E4DC;
  --pg-border2: #D0CBBD;
  --pg-text: #1a1a1a;
  --pg-text2: #545454;
  --pg-text3: #888888;
  --pg-check: #1a7a4a;
  --pg-check-bg: #edfaf3;
  --pg-x-bg: #f3efe6;
  --pg-accent: #1a7a4a;
  --pg-quote-line: #1a7a4a;
}
`;

/* ───────── data ───────── */
const tabs = [
  { id: "university", label: "University", icon: GraduationCap },
  { id: "workshops", label: "Workshops", icon: Wrench },
  { id: "webinars", label: "Webinars", icon: Video },
];

interface ProgramData {
  id: string;
  number: string;
  label: string;
  icon: typeof GraduationCap;
  title: string;
  italicWord: string;
  description: string;
  ctaItems: string[];
  ctaButton: string;
  ctaLink: string;
  cadence: { icon: typeof BookOpen; text: string }[];
  includesTitle: string;
  includes: { text: string; check: boolean }[];
  forTitle: string;
  forItems: { text: string; check: boolean }[];
  tags: string[];
  quote?: { text: string; author: string; role: string };
}

const programsData: ProgramData[] = [
  {
    id: "university",
    number: "01",
    label: "PROGRAM 01",
    icon: GraduationCap,
    title: "Oz",
    italicWord: "University",
    description:
      "Self-paced learning built around real cloud environments — not slides, not theory, not certification prep. Every module is structured around how infrastructure actually behaves in production: how things break, how they scale, how they connect.",
    ctaItems: ["Self-paced modules", "New content monthly", "Lifetime access", "Fully remote"],
    ctaButton: "Enrol now",
    ctaLink: "https://university.oz.xyz/",
    cadence: [
      { icon: BookOpen, text: "Self-paced modules" },
      { icon: Clock, text: "New content monthly" },
      { icon: RefreshCw, text: "Lifetime access" },
      { icon: Globe, text: "Fully remote" },
    ],
    includesTitle: "What's included",
    includes: [
      { text: "Cloud architecture fundamentals (AWS, Azure, GCP)", check: true },
      { text: "Infrastructure as Code (Terraform, Bicep)", check: true },
      { text: "Platform engineering patterns", check: true },
      { text: "Security and compliance thinking", check: true },
      { text: "AI infrastructure and workflow automation", check: true },
      { text: "Community discussion per module", check: true },
    ],
    forTitle: "Who this is for",
    forItems: [
      { text: "Transitioning into cloud from another field", check: true },
      { text: "Early-career engineers wanting a clear path", check: true },
      { text: "Allies who want to understand the space", check: true },
      { text: "Not for senior engineers seeking advanced material only", check: false },
    ],
    tags: ["Cloud Architecture", "IaC", "Platform Engineering", "Security", "AI Workflows", "Terraform", "AWS", "Azure", "GCP"],
    quote: {
      text: "I had been watching YouTube tutorials for months and felt like I was going in circles. University gave me a structure that actually made sense — and showed me what to build, not just what to read.",
      author: "Karthika K.",
      role: "DevOps Intern · India",
    },
  },
  {
    id: "workshops",
    number: "02",
    label: "PROGRAM 02",
    icon: Wrench,
    title: "Hands-On",
    italicWord: "Workshops",
    description:
      "Live sessions where you build real infrastructure together. Not demos — you have your terminal open, your cloud account connected, and you ship something by the time it ends. Kubernetes clusters, landing zones, secure multi-account designs, Terraform modules. The kind of thing you reference for years afterwards.",
    ctaItems: ["3 hours live", "Monthly cadence", "Recording included", "Hands-on from minute one"],
    ctaButton: "See upcoming dates",
    ctaLink: "/events",
    cadence: [
      { icon: Clock, text: "3 hours live" },
      { icon: RefreshCw, text: "Monthly cadence" },
      { icon: Video, text: "Recording included" },
      { icon: Wrench, text: "Hands-on from minute one" },
    ],
    includesTitle: "Recent workshop topics",
    includes: [
      { text: "Multi-account AWS landing zones with Control Tower", check: true },
      { text: "Kubernetes from scratch — cluster to production", check: true },
      { text: "Terraform modules that don't fall apart at scale", check: true },
      { text: "Secure-by-default Azure architecture patterns", check: true },
      { text: "CI/CD pipelines that actually ship to production", check: true },
    ],
    forTitle: "What you walk away with",
    forItems: [
      { text: "Working infrastructure you built yourself", check: true },
      { text: "The code and config files to reference later", check: true },
      { text: "Full session recording", check: true },
      { text: "Access to the cohort Slack channel", check: true },
    ],
    tags: ["Kubernetes", "Landing Zones", "Terraform", "Security", "CI/CD", "AWS", "Azure"],
    quote: {
      text: "We are not watching demos. I had my terminal open from the first minute. By the end I had a Kubernetes cluster running that I had built myself. That is the only way to actually learn this stuff.",
      author: "Lydiah Nganga",
      role: "Platform Engineer · Kenya",
    },
  },
  {
    id: "webinars",
    number: "03",
    label: "PROGRAM 03",
    icon: Video,
    title: "Monthly",
    italicWord: "Webinars",
    description:
      "Every month, one real practitioner. One honest conversation. No slides, no polished keynotes — just someone who has shipped real infrastructure talking about what they learned, what broke, and what they would do differently. Open to everyone in the community.",
    ctaItems: ["Every month", "60–75 minutes", "Live Q&A included", "Recording for all members"],
    ctaButton: "See past sessions",
    ctaLink: "/events",
    cadence: [
      { icon: RefreshCw, text: "Every month" },
      { icon: Clock, text: "60–75 minutes" },
      { icon: BookOpen, text: "Live Q&A included" },
      { icon: Video, text: "Recording for members" },
    ],
    includesTitle: "Recent topics",
    includes: [
      { text: "How I went from helpdesk to cloud architect in 3 years", check: true },
      { text: "AI infrastructure for people who aren't AI engineers", check: true },
      { text: "What platform engineering actually looks like at scale", check: true },
      { text: "Salary negotiation for cloud engineers — real numbers", check: true },
      { text: "Security by default: designing before incidents happen", check: true },
    ],
    forTitle: "Format",
    forItems: [
      { text: "One guest, one moderator, real conversation", check: true },
      { text: "Community submits questions in advance", check: true },
      { text: "30-minute live Q&A at the end", check: true },
      { text: "No sponsors. No pitches. No panels.", check: false },
    ],
    tags: ["Cloud Architecture", "AI Engineering", "Career Journeys", "Security", "Platform Engineering"],
  },
];

const faqData = [
  {
    q: "Do I need cloud experience to join?",
    a: "No. Oz University and the webinars are designed to work from the beginning. If you are completely new to cloud, start with University. The workshops are better suited to people with at least some hands-on exposure.",
  },
  {
    q: "Is this only for women?",
    a: "No. Build with Her is for women and for the allies — men and otherwise — who believe the gender gap in cloud and infrastructure needs to close. The name reflects the mission, not an exclusion. Everyone who shows up with that intention is welcome.",
  },
  {
    q: "How is this different from a bootcamp or a certification course?",
    a: "Bootcamps teach you to pass tests. Certifications teach you to pass other tests. Build with Her teaches you how infrastructure actually behaves — in real environments, under real constraints, with real failure modes. There are no exams here. There is just real work.",
  },
  {
    q: "What timezone are the workshops and webinars?",
    a: "Sessions are run at different times to serve the community across 12 countries. All sessions are recorded and the recording is available within 24 hours, so missing a live session never means missing the content.",
  },
  {
    q: "How do I get started?",
    a: "Join the community and you get immediate access to everything — University, the webinar archive, and upcoming workshops. No application, no waitlist, no setup required. Just join and start.",
  },
];

/* ───────── reveal hook ───────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.07 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, style: { opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.6s ease, transform 0.6s ease" } as React.CSSProperties };
}

/* ───────── gradient word spans for hero ───────── */
const heroWords: { word: string; gradient?: string }[] = [
  { word: "Programs", gradient: "linear-gradient(90deg, #4de8c2, #4d9ef5)" },
  { word: "designed", gradient: "linear-gradient(90deg, #f5c842, #f5734d)" },
  { word: "for" },
  { word: "how", gradient: "linear-gradient(90deg, #4de8c2, #a855f7)" },
  { word: "you" },
  { word: "actually", gradient: "linear-gradient(90deg, #f5734d, #f5c842)" },
  { word: "learn" },
];

/* ───────── Components ───────── */

const CheckIcon = () => (
  <span className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--pg-check-bg)" }}>
    <Check size={11} style={{ color: "var(--pg-check)" }} />
  </span>
);

const XIcon = () => (
  <span className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--pg-x-bg)" }}>
    <X size={11} style={{ color: "var(--pg-text3)" }} />
  </span>
);

const ProgramSection = ({ program, isLast }: { program: ProgramData; isLast: boolean }) => {
  const reveal = useReveal();
  const Icon = program.icon;
  const isExternal = program.ctaLink.startsWith("http");

  return (
    <section
      id={program.id}
      ref={reveal.ref}
      style={{ ...reveal.style, borderBottom: isLast ? "none" : "1px solid var(--pg-border)", padding: "72px 0" }}
    >
      {/* Header grid */}
      <div className="grid gap-8" style={{ gridTemplateColumns: "1fr 220px", alignItems: "start" }}>
        {/* Left */}
        <div>
          <span className="block font-dm text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: "var(--pg-accent)" }}>
            {program.label}
          </span>
          <div className="flex items-center gap-3 mb-4">
            <Icon size={32} style={{ color: "var(--pg-accent)" }} strokeWidth={1.5} />
          </div>
          <h2 className="font-serif mb-3" style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, color: "var(--pg-text)" }}>
            {program.title}{" "}
            <span className="font-serif italic" style={{ fontWeight: 300 }}>{program.italicWord}</span>
          </h2>
          <p className="font-serif" style={{ fontSize: 17, fontWeight: 300, color: "var(--pg-text2)", lineHeight: 1.7 }}>
            {program.description}
          </p>
        </div>

        {/* CTA card */}
        <div className="rounded-[14px] p-[22px]" style={{ background: "var(--pg-surface)", border: "1px solid var(--pg-border2)" }}>
          {program.ctaItems.map((item, i) => (
            <span
              key={i}
              className="block font-dm py-2"
              style={{
                fontSize: 13,
                color: "var(--pg-text2)",
                borderBottom: i < program.ctaItems.length - 1 ? "1px solid var(--pg-border)" : "none",
              }}
            >
              {item.split(" ").map((w, wi) => {
                const bold = wi === 0 || (i === 0 && wi <= 0);
                return bold ? <strong key={wi} style={{ color: "var(--pg-text)", fontWeight: 500 }}>{w} </strong> : <span key={wi}>{w} </span>;
              })}
            </span>
          ))}
          {isExternal ? (
            <a
              href={program.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center mt-4 font-dm"
              style={{
                background: "linear-gradient(135deg, #4de8c2, #4d9ef5)",
                color: "#0a0c0f",
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 600,
                padding: "10px 0",
              }}
            >
              {program.ctaButton}
            </a>
          ) : (
            <Link
              to={program.ctaLink}
              className="block w-full text-center mt-4 font-dm"
              style={{
                background: "linear-gradient(135deg, #4de8c2, #4d9ef5)",
                color: "#0a0c0f",
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 600,
                padding: "10px 0",
              }}
            >
              {program.ctaButton}
            </Link>
          )}
        </div>
      </div>

      {/* Cadence pills */}
      <div className="flex flex-wrap gap-2 mt-8">
        {program.cadence.map(({ icon: CIcon, text }, i) => (
          <span key={i} className="inline-flex items-center gap-2 rounded-[10px] px-3.5 py-2 font-dm" style={{ fontSize: 13, color: "var(--pg-text2)", background: "var(--pg-surface)", border: "1px solid var(--pg-border)" }}>
            <CIcon size={15} style={{ color: "var(--pg-text3)" }} strokeWidth={1.5} />
            {text}
          </span>
        ))}
      </div>

      {/* Includes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-9 mt-10">
        <div>
          <span className="block font-dm text-[11px] uppercase tracking-wider mb-3" style={{ color: "var(--pg-text3)" }}>
            {program.includesTitle}
          </span>
          <div className="flex flex-col gap-2.5">
            {program.includes.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                {item.check ? <CheckIcon /> : <XIcon />}
                <span className="font-serif" style={{ fontSize: 15, fontWeight: 300, color: "var(--pg-text2)" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="block font-dm text-[11px] uppercase tracking-wider mb-3" style={{ color: "var(--pg-text3)" }}>
            {program.forTitle}
          </span>
          <div className="flex flex-col gap-2.5">
            {program.forItems.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                {item.check ? <CheckIcon /> : <XIcon />}
                <span className="font-serif" style={{ fontSize: 15, fontWeight: 300, color: "var(--pg-text2)" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-8">
        {program.tags.map((tag) => (
          <span key={tag} className="font-dm" style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: "var(--pg-surface)", border: "1px solid var(--pg-border2)", color: "var(--pg-text2)" }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Pull quote */}
      {program.quote && (
        <div className="mt-8 rounded-r-xl" style={{ background: "var(--pg-surface)", borderLeft: "3px solid var(--pg-quote-line)", padding: "20px 24px" }}>
          <p className="font-serif italic" style={{ fontSize: 17, fontWeight: 300, color: "var(--pg-text)" }}>
            <span style={{ color: "var(--pg-accent)" }}>"</span>
            {program.quote.text}"
          </p>
          <p className="mt-2 font-dm" style={{ fontSize: 13, fontWeight: 600, color: "var(--pg-text2)" }}>
            — {program.quote.author}{" "}
            <span style={{ fontSize: 12, fontWeight: 400, color: "var(--pg-text3)" }}>{program.quote.role}</span>
          </p>
        </div>
      )}
    </section>
  );
};

/* ───────── FAQ ───────── */
const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const reveal = useReveal();

  return (
    <section ref={reveal.ref} style={reveal.style} className="container max-w-3xl mx-auto py-20">
      <h2 className="font-serif mb-10" style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "var(--pg-text)" }}>
        Common questions
      </h2>
      <div>
        {faqData.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} style={{ borderBottom: "1px solid var(--pg-border)" }}>
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left font-dm"
                style={{ fontSize: 15, fontWeight: 600, color: "var(--pg-text)", cursor: "pointer" }}
              >
                {item.q}
                <ChevronDown
                  size={18}
                  style={{
                    color: "var(--pg-text3)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    flexShrink: 0,
                  }}
                />
              </button>
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.3s ease",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <p className="font-serif pb-5" style={{ fontSize: 16, fontWeight: 300, color: "var(--pg-text2)", lineHeight: 1.7 }}>
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

/* ───────── Main page ───────── */
const Programs = () => {
  const [activeTab, setActiveTab] = useState("university");
  const tabNavRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = tabs.map((t) => document.getElementById(t.id));
      let current = "university";
      for (const sec of sections) {
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 150) current = sec.id;
        }
      }
      setActiveTab(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div data-programs className="min-h-screen" style={{ background: "var(--pg-bg)", color: "var(--pg-text)" }}>
      <style>{programsTokensStyle}</style>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ padding: "116px 24px 80px", textAlign: "center", position: "relative" }}>
        {/* Badge pill */}
        <div className="mb-6">
          <span className="inline-block font-dm rounded-full" style={{ background: "var(--pg-surface)", border: "1px solid var(--pg-border2)", fontSize: 12, color: "var(--pg-text2)", padding: "6px 16px" }}>
            Learning by Doing
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-dm mx-auto" style={{ fontWeight: 700, fontSize: "clamp(32px, 5.5vw, 60px)", letterSpacing: "-0.02em", lineHeight: 1.1, maxWidth: 700 }}>
          {heroWords.map(({ word, gradient }, i) => (
            <span key={i}>
              {gradient ? (
                <span style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {word}
                </span>
              ) : (
                <span style={{ color: "var(--pg-text)" }}>{word}</span>
              )}
              {/* line break after "for" */}
              {word === "for" ? <br /> : " "}
            </span>
          ))}
        </h1>

        {/* Subtext */}
        <p className="font-serif mx-auto mt-6" style={{ fontSize: 17, fontWeight: 300, color: "var(--pg-text2)", maxWidth: 480, lineHeight: 1.65 }}>
          Learning cloud is not about consuming endless content. It is about practice, feedback, support, and momentum.
        </p>

        {/* Info pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {["No application required", "Open to everyone", "Fully remote"].map((text) => (
            <span key={text} className="inline-flex items-center gap-2 font-dm rounded-full" style={{ background: "var(--pg-surface)", border: "1px solid var(--pg-border2)", fontSize: 13, color: "var(--pg-text2)", padding: "7px 14px" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--pg-accent)" }} />
              {text}
            </span>
          ))}
        </div>

        {/* Rainbow bar */}
        <div className="mt-12 mx-auto" style={{ height: 3, maxWidth: 600, background: "linear-gradient(90deg, #4de8c2 0%, #4d9ef5 25%, #a855f7 50%, #f5734d 75%, #f5c842 100%)", borderRadius: 2 }} />
      </section>

      {/* ── Sticky Tab Nav ── */}
      <div
        ref={tabNavRef}
        className="sticky z-40"
        style={{ top: 56, background: "var(--pg-bg)", borderBottom: "1px solid var(--pg-border)" }}
      >
        <div className="container flex items-center gap-6 max-w-3xl mx-auto" style={{ height: 48 }}>
          {tabs.map(({ id, label, icon: TIcon }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); scrollToSection(id); }}
              className="flex items-center gap-2 font-dm relative pb-px"
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: activeTab === id ? "var(--pg-accent)" : "var(--pg-text2)",
                borderBottom: activeTab === id ? "2px solid var(--pg-accent)" : "2px solid transparent",
                transition: "color 0.2s, border-color 0.2s",
                paddingBottom: 12,
                paddingTop: 12,
              }}
            >
              <TIcon size={14} strokeWidth={1.5} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Program sections ── */}
      <div className="container max-w-3xl mx-auto">
        {programsData.map((p, i) => (
          <ProgramSection key={p.id} program={p} isLast={i === programsData.length - 1} />
        ))}
      </div>

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── Bottom CTA ── */}
      <section className="text-center" style={{ background: "var(--pg-surface2)", borderTop: "1px solid var(--pg-border)", padding: "80px 24px" }}>
        <h2 className="font-serif mx-auto" style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, color: "var(--pg-text)", maxWidth: 520 }}>
          You don't have to figure this out{" "}
          <span style={{ background: "linear-gradient(90deg, #4de8c2, #4d9ef5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            alone
          </span>
        </h2>
        <p className="font-serif mx-auto mt-4" style={{ fontSize: 16, fontWeight: 300, color: "var(--pg-text2)", maxWidth: 500 }}>
          Join the community and get access to everything — University, workshops, webinars. Start whenever you're ready.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Link
            to="/join-the-builders"
            className="font-dm inline-flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, #4de8c2, #4d9ef5)",
              color: "#0a0c0f",
              borderRadius: 20,
              fontSize: 14,
              fontWeight: 600,
              padding: "10px 24px",
            }}
          >
            Join the community →
          </Link>
          <button
            onClick={() => scrollToSection("university")}
            className="font-dm"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--pg-text2)",
              padding: "10px 20px",
              border: "1px solid var(--pg-border2)",
              borderRadius: 20,
              background: "transparent",
            }}
          >
            Explore programs
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid var(--pg-border)", padding: "24px 0", textAlign: "center" }}>
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 font-dm" style={{ fontSize: 13, color: "var(--pg-text3)" }}>
          <div className="flex items-center gap-2">
            <span style={{ color: "var(--pg-text2)", fontWeight: 600 }}>Build with</span>
            <span style={{ background: "linear-gradient(90deg, #4de8c2, #f5c842)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Her</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/programs" style={{ color: "var(--pg-text2)" }}>Programs</Link>
            <Link to="/community" style={{ color: "var(--pg-text2)" }}>Community</Link>
            <Link to="/member-wall" style={{ color: "var(--pg-text2)" }}>Member Wall</Link>
          </div>
          <span>© {new Date().getFullYear()} Build with Her · Powered by Infracodebase</span>
        </div>
      </footer>
    </div>
  );
};

export default Programs;
