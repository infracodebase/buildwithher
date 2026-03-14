import type { SessionData } from "@/components/SessionCard";

export const pastSessions: SessionData[] = [
  {
    title: "Legal Background to Cloud Engineering: What It Really Takes",
    description:
      "A conversation exploring how professionals transition into cloud engineering from non-traditional backgrounds and how skills from fields like law translate into infrastructure careers.",
    speaker: "Tarak",
    role: "Co-Founder, Infracodebase",
    imageUrl: "/images/legal_background_to_cloud.png",
    source: "Build with Her",
    sessionType: "Career Talk",
    videoUrl: "https://www.youtube.com/watch?v=mlIePKsqa-4",
  },
  {
    title: "No Straight Lines — Breaking into Tech and Rising to Leadership",
    description:
      "A conversation exploring non-linear career paths in technology and how professionals break into cloud and platform engineering before growing into leadership roles.",
    speaker: "Shannon Eldridge-Kuehn",
    role: "Principal Solutions Architect",
    embedUrl: "https://www.youtube.com/embed/SLpgv8zCzPU",
    source: "Build with Her",
    sessionType: "Conversation",
  },
  {
    title: "Operating Cloud Engineering at Scale in Regulated Enterprises",
    description:
      "A conversation exploring what it takes to operate cloud engineering at scale in regulated enterprises where governance, hybrid infrastructure, and organizational complexity create execution challenges.",
    speaker: "Alex",
    role: "Director of Cloud Engineering",
    embedUrl: "https://www.youtube.com/embed/H8Osx6GcLSE",
    source: "Infracodebase",
    sessionType: "Conversation",
  },
  {
    title: "Building with AI You Can Trust",
    description:
      "A technical session exploring how modern AI systems work and how engineers can design AI workflows that are predictable, auditable, and reliable in production environments.",
    speaker: "Fatima",
    role: "Software Engineer",
    embedUrl: "https://www.youtube.com/embed/vOMo1RquRsY",
    source: "Infracodebase",
    sessionType: "Technical Session",
  },
  {
    title: "Delivering Secure Cloud Infrastructure at Scale with AI",
    description:
      "A technical session exploring how AI accelerates engineering delivery while introducing new security risks and how teams can ship faster using secure-by-default workflows.",
    speaker: "Seif",
    role: "Principal Security Engineer",
    embedUrl: "https://www.youtube.com/embed/Ld8WG8CtagA",
    source: "Infracodebase",
    sessionType: "Technical Session",
  },
];

export const upcomingSessions: SessionData[] = [
  {
    title: "Building Self-Service, Secure, and Scalable Developer Platforms",
    description:
      "A session exploring how organizations build internal developer platforms that enable secure self-service infrastructure, standardized deployments, and governed infrastructure workflows.",
    speaker: "Lalit Kale",
    role: "Senior Cloud Architect",
    imageUrl: "/images/webinar_with_lalit.png",
    source: "Infracodebase",
    sessionType: "Live Webinar",
    status: "Live Webinar",
    registerLink:
      "https://www.linkedin.com/events/7437983286372626433/?viewAsMember=true",
  },
];
