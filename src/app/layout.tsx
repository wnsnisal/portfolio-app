import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeScript } from "@/components/layout/theme-script";
import { profile } from "@/data/profile";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.fullName} | ${profile.role}`,
  description: `${profile.fullName} is a ${profile.role} specialising in modern frontend development with React, Next.js and TypeScript.`,
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
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
