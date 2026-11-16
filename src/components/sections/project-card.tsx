import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-colors hover:border-primary/50">
      <div className="flex h-40 items-center justify-center bg-muted text-xs tracking-widest text-muted-foreground uppercase lg:h-[150px]">
        [Project screenshot]
      </div>
      <div className="flex-1 p-[18px]">
        <h3 className="text-lg leading-6 font-semibold">{project.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{project.stack}</p>
        <p className="mt-2 text-sm leading-[22px] text-muted-foreground">
          {project.description}
        </p>
      </div>
      <div className="flex items-center justify-between px-[18px] pb-2">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            className="inline-flex h-11 items-center gap-1.5 rounded-sm text-sm text-link hover:underline"
          >
            Live demo
            <ArrowUpRight className="size-3.5" aria-hidden />
            <span className="sr-only">: {project.name}</span>
          </a>
        ) : (
          <span />
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            aria-label={`${project.name} on GitHub`}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "[&_svg]:size-[22px]",
            )}
          >
            <GitHubIcon />
          </a>
        )}
      </div>
    </Card>
  );
}
