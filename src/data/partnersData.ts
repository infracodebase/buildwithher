export interface PartnerData {
  category: "Community Partners" | "University Partners" | "Company Partners" | "Ecosystem Sponsors";
  featured?: boolean;
  featuredLabel?: string;
  name: string;
  description: string;
  tags: string[];
  logoUrl?: string;
  cta_label: string;
  cta_url: string;
}

export const PARTNER_CATEGORIES = [
  "All Partners",
  "Community Partners",
  "University Partners",
  "Company Partners",
  "Ecosystem Sponsors",
] as const;

export type PartnerCategory = (typeof PARTNER_CATEGORIES)[number];

export const partners: PartnerData[] = [
  {
    category: "Community Partners",
    featured: true,
    featuredLabel: "Featured Community Partner",
    name: "She Builds Tech",
    description:
      "She Builds Tech is a community dedicated to empowering women to grow and thrive in technology. Through mentorship, learning initiatives, and community support, they help women develop technical skills and build sustainable careers in tech.",
    tags: ["Mentorship", "Learning Initiatives", "Community Support"],
    logoUrl: "/images/she_builds_tech.jpeg",
    cta_label: "Visit Community",
    cta_url: "https://www.linkedin.com/company/she-builds-tech/",
  },
];
