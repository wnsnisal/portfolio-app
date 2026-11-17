import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { AmbientBackground } from "@/components/layout/ambient-background";
import { ThemeScript } from "@/components/layout/theme-script";
import { profile } from "@/data/profile";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nisalhasindu.dev";
const title = `${profile.fullName} — ${profile.role}`;
const description =
  "Nisal Hasindu is a Senior Software Engineer and frontend specialist with 4+ years of experience building scalable, high-performance web applications with React, Next.js and TypeScript.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${profile.fullName}`,
  },
  description,
  applicationName: `${profile.fullName} Portfolio`,
  authors: [{ name: profile.fullName, url: siteUrl }],
  creator: profile.fullName,
  keywords: [
    "Nisal Hasindu",
    "Senior Software Engineer",
    "Frontend Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Web3",
    "Software Engineer Sri Lanka",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${profile.fullName} — Portfolio`,
    title,
    description,
    images: [
      {
        url: profile.photo.light,
        width: profile.photo.width,
        height: profile.photo.height,
        alt: `Portrait of ${profile.fullName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [profile.photo.light],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col">
        <AmbientBackground />
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
