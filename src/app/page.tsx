import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Stats } from "@/components/sections/stats";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Stats />
        <div className="border-t border-border">
          <Container className="grid gap-12 py-12 lg:grid-cols-[360px_1fr] lg:gap-12 lg:py-16">
            <About />
            <Skills />
          </Container>
        </div>
        <Projects />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
