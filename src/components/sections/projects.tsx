import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/sections/project-card";
import { projects } from "@/data/projects";
import { socials } from "@/data/socials";

const github = socials.find((social) => social.name === "GitHub");

export function Projects() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="w-full py-12 lg:py-8"
    >
      <Container>
        <div className="flex items-center justify-between gap-4">
          <SectionHeading id="projects-heading">Featured projects</SectionHeading>
          {github && (
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-sm text-md text-link hover:underline lg:inline-flex"
            >
              More on GitHub
              <ArrowRight className="size-4" aria-hidden />
            </a>
          )}
        </div>
        <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.name}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
