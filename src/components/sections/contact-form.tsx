"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  message: z.string().trim().min(10, "Please write at least a few words."),
  // Honeypot: real users leave this empty; bots tend to fill every field.
  company: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

const fieldClass =
  "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-md text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/25";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    // Silently succeed for bots that tripped the honeypot.
    if (values.company) return;

    if (!configured) {
      toast.error("The contact form isn't configured yet.", {
        description: `Please email me directly at ${profile.email}.`,
      });
      return;
    }

    try {
      await emailjs.send(
        SERVICE_ID!,
        TEMPLATE_ID!,
        {
          name: values.name,
          email: values.email,
          message: values.message,
          time: new Date().toLocaleString(),
        },
        { publicKey: PUBLIC_KEY! },
      );
      toast.success("Message sent — thanks!", {
        description: "I'll get back to you as soon as I can.",
      });
      reset();
    } catch {
      toast.error("Something went wrong sending your message.", {
        description: `Please try again, or email me at ${profile.email}.`,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            className={fieldClass}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1.5 text-sm text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            className={fieldClass}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Tell me about your project or opportunity…"
          aria-invalid={Boolean(errors.message)}
          className={cn(fieldClass, "resize-y")}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot — visually hidden, not announced, not tabbable. */}
      <div aria-hidden className="hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(buttonVariants({ size: "md" }), "w-full sm:w-auto")}
      >
        {isSubmitting ? "Sending…" : "Send message"}
        <Send aria-hidden />
      </button>
    </form>
  );
}
