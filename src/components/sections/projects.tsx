import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Parallax } from "@/components/ui/parallax";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/sections/project-card";
import { projects } from "@/data/projects";
import { socials } from "@/data/socials";

const github = socials.find((social) => social.name === "GitHub");

export function Projects() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="w-full py-12 lg:py-16"
    >
      <Container>
        <div className="flex items-center justify-between gap-4">
          <SectionHeading id="projects-heading">Featured projects</SectionHeading>
          {github && (
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-sm text-sm text-link hover:underline lg:inline-flex"
            >
              View all projects
              <ArrowRight className="size-4" aria-hidden />
            </a>
          )}
        </div>
        <ul className="mt-7 grid gap-5 md:grid-cols-2 lg:mt-8 lg:grid-cols-4">
          {projects.map((project, index) => (
            <li key={index}>
              <Parallax
                axis="x"
                speed={index % 2 === 0 ? 0.05 : 0.1}
                className="h-full"
              >
                <ProjectCard project={project} />
              </Parallax>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
