import { CircleCheck, Code, Layers, Users } from "lucide-react";
import type { Stat } from "@/types";

export const stats: Stat[] = [
  { value: "4+", label: "Years experience", icon: Code },
  { value: "20+", label: "Projects completed", icon: CircleCheck },
  { value: "10+", label: "Happy clients", icon: Users },
  { value: "5+", label: "Technologies", icon: Layers },
];
