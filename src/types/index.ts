import type { LucideIcon } from "lucide-react";

export type NavItem = {
  /** Section id the link scrolls to (without the leading #). */
  id: string;
  label: string;
};

export type Stat = {
  value: string;
  label: string;
  icon: LucideIcon;
};

/** A named group of related technologies (no proficiency bars by design). */
export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

export type Project = {
  name: string;
  /** Technologies, e.g. "Next.js · Python · Django". */
  stack: string;
  description: string;
  /** What I personally contributed to the project. */
  contributions: string[];
  /** Two-letter mark shown on the placeholder visual. */
  mark: string;
  /**
   * Screenshot of the live site, shown inside the card's browser frame.
   * Put files in `/public/images/projects/` and reference e.g.
   * "/images/projects/prodoscore.png". Falls back to the branded mark.
   */
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary?: string;
  points: string[];
  /** Role progression within the company, earliest first. */
  progression?: string[];
  /** Marks the current role (shows an "active" indicator). */
  current?: boolean;
};

export type EducationItem = {
  qualification: string;
  institution: string;
  detail?: string;
};

export type SocialLink = {
  name: "GitHub" | "LinkedIn";
  href: string;
};
