import Link from "next/link";
import { Code } from "lucide-react";
import { profile } from "@/data/profile";

export function Logo() {
  return (
    <Link
      href="#home"
      className="flex items-center gap-2.5 rounded-md text-lg font-semibold tracking-tight"
      aria-label={`${profile.fullName} – home`}
    >
      <Code className="size-[26px] text-primary" aria-hidden />
      <span>
        {profile.firstName} <span className="text-primary">{profile.lastName}</span>
      </span>
    </Link>
  );
}
