import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  HorizontalScroll,
  type PanelDef,
} from "@/components/layout/horizontal-scroll";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Stats } from "@/components/sections/stats";
import { Container } from "@/components/ui/container";

const panels: PanelDef[] = [
  {
    id: "home",
    node: (
      <>
        <Hero />
        <Stats className="pt-0 lg:py-0" />
      </>
    ),
  },
  {
    id: "about",
    node: (
      <Container>
        <About />
      </Container>
    ),
  },
  {
    id: "skills",
    node: (
      <Container>
        <Skills />
      </Container>
    ),
  },
  {
    id: "experience",
    node: (
      <Container>
        <Experience />
      </Container>
    ),
  },
  { id: "projects", node: <Projects /> },
  { id: "contact", node: <Contact /> },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HorizontalScroll panels={panels} />
      </main>
      <SiteFooter />
    </>
  );
}
