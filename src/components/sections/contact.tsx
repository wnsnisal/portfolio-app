import { Mail, Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { buttonVariants } from "@/components/ui/button";
import { contact } from "@/data/contact";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="w-full py-12 lg:py-14"
    >
      <Container>
        <Card className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:p-[33px]">
          <div className="flex gap-4 lg:max-w-[397px]">
            <IconBox className="size-12">
              <Mail aria-hidden />
            </IconBox>
            <div>
              <h2
                id="contact-heading"
                className="text-xl leading-7 font-semibold lg:text-2xl lg:leading-[30px]"
              >
                {contact.heading}
              </h2>
              <p className="mt-1 text-sm leading-[22px] text-muted-foreground">
                {contact.pitch}
              </p>
            </div>
          </div>

          <dl className="flex flex-col gap-5 lg:flex-row lg:gap-10">
            <div>
              <dt className="text-sm text-muted-foreground">Email</dt>
              <dd className="mt-0.5">
                <a href={`mailto:${profile.email}`} className="hover:underline">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Location</dt>
              <dd className="mt-0.5">{profile.location}</dd>
            </div>
          </dl>

          <a
            href={`mailto:${profile.email}`}
            className={buttonVariants({ className: "w-full lg:w-auto" })}
          >
            Get in touch
            <Send aria-hidden />
          </a>
        </Card>
      </Container>
    </section>
  );
}
