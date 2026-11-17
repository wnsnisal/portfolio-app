import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/** Bare hostname of the live URL, e.g. "prodoscore.com", for the address bar. */
function hostOf(url?: string) {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function ProjectCard({ project }: { project: Project }) {
  const host = hostOf(project.liveUrl);

  const preview = (
    <div className="relative h-40 overflow-hidden bg-gradient-to-br from-secondary to-muted">
      {/* Faux browser chrome — reads as a website window even without a shot. */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-1.5 border-b border-border/50 bg-card/70 px-3 py-1.5 backdrop-blur">
        <span className="size-2 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="size-2 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="size-2 rounded-full bg-[#28c840]" aria-hidden />
        <span className="ml-1.5 truncate rounded bg-background/70 px-2 py-0.5 text-[10px] text-muted-foreground">
          {host ?? project.name.toLowerCase().replace(/\s+/g, "")}
        </span>
      </div>

      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--muted-foreground)_1px,transparent_1px)] [background-size:16px_16px]"
          />
          <div className="absolute inset-0 flex items-center justify-center pt-6">
            <span
              aria-hidden
              className="flex size-14 items-center justify-center rounded-xl bg-card/80 text-xl font-bold text-link shadow-sm backdrop-blur transition-transform duration-500 group-hover:scale-110"
            >
              {project.mark}
            </span>
          </div>
        </>
      )}
    </div>
  );

  return (
    <Card className="group flex h-full flex-col overflow-hidden bg-primary/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 dark:bg-card">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} — visit site (opens in a new tab)`}
          className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {preview}
        </a>
      ) : (
        preview
      )}

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="leading-tight font-semibold">{project.name}</h3>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub`}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "-mt-1 -mr-1 size-8 shrink-0 [&_svg]:size-[18px]",
              )}
            >
              <GitHubIcon />
            </a>
          )}
        </div>
        <p className="mt-1 text-xs font-medium tracking-wide text-link">
          {project.stack}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-auto pt-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-link hover:underline"
            >
              Visit site
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
              <span className="sr-only">: {project.name} (opens in a new tab)</span>
            </a>
          ) : (
            <span className="text-sm text-muted-foreground">Private project</span>
          )}
        </div>
      </div>
    </Card>
  );
}
