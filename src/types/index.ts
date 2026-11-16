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

export type Skill = {
  name: string;
  description: string;
  /** Short text shown in the skill's icon box. */
  mark: string;
};

export type Project = {
  name: string;
  stack: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
};

export type SocialLink = {
  name: "GitHub" | "LinkedIn";
  href: string;
};
