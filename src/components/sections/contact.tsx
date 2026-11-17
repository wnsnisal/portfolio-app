import { Download, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { socialIcons } from "@/components/ui/icons";
import { ContactForm } from "@/components/sections/contact-form";
import { contact } from "@/data/contact";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { cn } from "@/lib/utils";

export function Contact() {
  return (
    <section aria-labelledby="contact-heading" className="w-full py-12 lg:py-14">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: intro + direct ways to reach me */}
          <div>
            <h2
              id="contact-heading"
              className="text-3xl leading-tight font-semibold lg:text-4xl"
            >
              {contact.heading}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              {contact.pitch}
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="size-5 shrink-0 text-link" aria-hidden />
                <a
                  href={`mailto:${profile.email}`}
                  className="text-md font-medium hover:text-link hover:underline"
                >
                  {profile.email}
                </a>
              </li>

              {socials.map((social) => {
                const Icon = socialIcons[social.name];
                return (
                  <li key={social.name} className="flex items-center gap-3">
                    <Icon className="size-5 shrink-0 text-link" aria-hidden />
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-md font-medium hover:text-link hover:underline"
                    >
                      {social.name === "GitHub" ? "@wnsnisal" : "nisal-hasindu"}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}

              <li className="flex items-center gap-3">
                <MapPin className="size-5 shrink-0 text-link" aria-hidden />
                <span className="text-md font-medium">{profile.location}</span>
              </li>
            </ul>

            <a
              href={profile.cvPath}
              download
              className={cn(
                buttonVariants({ variant: "outline", size: "md" }),
                "mt-8",
              )}
            >
              Download CV
              <Download aria-hidden />
            </a>
          </div>

          {/* Right: the form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
