export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  desc: string;
}

export interface CaseItem {
  idx: string;
  cat: string;
  name: string;
  tagline: string;
  desc: string;
  tags: string[];
  year: string;
  bg: string;
  device: string;
}

export interface ExperienceItem {
  num: string;
  company: string;
  role: string;
  desc: string;
  tags: string[];
  year: string;
}
