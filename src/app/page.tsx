import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import { navItems } from "@/data/navigation";

/** Temporary scaffold: real sections arrive in Phase 3. */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {navItems.map((item) => (
          <section key={item.id} id={item.id} className="py-32">
            <Container>
              <p className="text-muted-foreground">{item.label} section</p>
            </Container>
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
