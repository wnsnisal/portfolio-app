import { Code, Layers, Server, Sparkles } from "lucide-react";
import type { Stat } from "@/types";

/** Honest highlights — no fabricated metrics, just what I focus on. */
export const stats: Stat[] = [
  { value: "4+", label: "Years of experience", icon: Code },
  { value: "Frontend", label: "React · Next.js · TypeScript", icon: Layers },
  { value: "Full-stack", label: "Python · Django · Node.js", icon: Server },
  { value: "AI-assisted", label: "Modern workflow", icon: Sparkles },
];
