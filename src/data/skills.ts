import {
  Code,
  Database,
  Globe,
  Palette,
  PenTool,
  Server,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: Code,
    items: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    title: "Styling & UI",
    icon: Palette,
    items: ["Tailwind CSS", "Material UI", "SCSS"],
  },
  {
    title: "Backend Development",
    icon: Server,
    items: ["Node.js", "Python", "Django", "FastAPI", "PHP"],
  },
  {
    title: "Database",
    icon: Database,
    items: ["MySQL", "MongoDB"],
  },
  {
    title: "Development Tools",
    icon: Wrench,
    items: ["Git", "GitHub", "Jira"],
  },
  {
    title: "WordPress Web Development",
    icon: Globe,
    items: ["WordPress", "WooCommerce", "Elementor", "Custom Themes"],
  },
  {
    title: "AI-Assisted Development",
    icon: Sparkles,
    items: ["GitHub Copilot", "Claude Code", "OpenCode"],
  },
  {
    title: "UI/UX & Design",
    icon: PenTool,
    items: ["Figma", "Adobe XD", "Photoshop", "Illustrator"],
  },
];
