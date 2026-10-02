import type { CaseItem, ExperienceItem, StatItem } from "@/types/site";

export const navLinks = [
  { href: "#top", label: "/home", active: true },
  { href: "#work", label: "/work" },
  { href: "#experience", label: "/experience" },
  { href: "#about", label: "/about" },
  { href: "#contact", label: "/contact" },
];

export const skillsMarquee = [
  "Product Strategy",
  "Design Systems",
  "Art Direction",
  "UX Research",
  "Interaction Design",
  "Creative Leadership",
  "Results-Driven Design",
];

export const clientsMarquee = [
  "Brand One",
  "Brand Two",
  "Brand Three",
  "Brand Four",
  "Studio Five",
  "Your City",
  "Brand One",
];

export const stats: StatItem[] = [
  {
    value: 15,
    suffix: "+",
    label: "Years of experience",
    desc: "Placeholder copy describing a long career across product, brand and design leadership.",
  },
  {
    value: 20,
    suffix: "+",
    label: "Designers",
    desc: "Placeholder copy about the size of the team led and the culture built around it.",
  },
  {
    value: 2,
    suffix: "",
    label: "Awards",
    desc: "Placeholder copy about recognition received for design work and craft.",
  },
];

export const cases: CaseItem[] = [
  {
    idx: "01",
    cat: "Lead Product Designer",
    name: "Project One",
    tagline: "A short, punchy tagline for the first case study.",
    desc: "Placeholder description. Replace with a two-sentence summary of the challenge, your role and the measurable outcome of this project.",
    tags: ["Marketplace", "Rebrand", "Design System", "UX/UI"],
    year: "2021 — 2022",
    bg: "/images/bg-one.svg",
    device: "/images/device-one.svg",
  },
  {
    idx: "02",
    cat: "Senior Product Designer",
    name: "Project Two",
    tagline: "A short, punchy tagline for the second case study.",
    desc: "Placeholder description. Replace with a two-sentence summary of the challenge, your role and the measurable outcome of this project.",
    tags: ["Fintech", "Gamification", "UX Research", "UX/UI"],
    year: "2021",
    bg: "/images/bg-two.svg",
    device: "/images/device-two.svg",
  },
  {
    idx: "03",
    cat: "Group Design Manager",
    name: "Project Three",
    tagline: "A short, punchy tagline for the third case study.",
    desc: "Placeholder description. Replace with a two-sentence summary of the challenge, your role and the measurable outcome of this project.",
    tags: ["Conversion", "Growth Strategy", "Product Design", "UX/UI"],
    year: "2025 — 2026",
    bg: "/images/bg-three.svg",
    device: "/images/device-three.svg",
  },
];

export const experience: ExperienceItem[] = [
  {
    num: "01",
    company: "Company One",
    role: "Group Design Manager",
    desc: "Placeholder text describing responsibilities, team size and the scope of impact in this role.",
    tags: ["Design Leadership", "Product Strategy", "Team Building"],
    year: "2022 — Present",
  },
  {
    num: "02",
    company: "Company One",
    role: "Senior Product Designer",
    desc: "Placeholder text describing end-to-end product design work and the outcomes it produced.",
    tags: ["Product Design", "UX Research", "Prototyping"],
    year: "2021 — 2022",
  },
  {
    num: "03",
    company: "Company Two",
    role: "Art Director",
    desc: "Placeholder text describing art direction, campaigns and production responsibilities.",
    tags: ["Art Direction", "Brand Campaign", "Production"],
    year: "2015 — 2017",
  },
];
