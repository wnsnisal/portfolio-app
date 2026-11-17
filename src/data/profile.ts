export const profile = {
  firstName: "Nisal",
  lastName: "Hasindu",
  fullName: "Nisal Hasindu",
  role: "Software Engineer | Frontend Specialist",
  availability: "Hello, I'm",
  intro:
    "I build scalable, high-performance web applications and intuitive digital experiences with React, Next.js and TypeScript. With 4+ years of professional experience, I specialise in modern frontend development, UI/UX implementation and reliable applications that solve real-world problems.",
  email: "wmnhasindu@gmail.com",
  location: "Sri Lanka",
  cvPath: "/Nisal-Hasindu-CV.pdf",
  /** Theme-specific portraits: `light` is shown in light mode, `dark` in dark mode. */
  photo: {
    light: "/images/profile_image_light.png",
    dark: "/images/profile_image_dark.png",
    width: 900,
    height: 1000,
  },
  /**
   * Simpler portrait shown on mobile (below `lg`) in place of the desktop
   * composition. Points at the existing files for now — swap these two paths
   * for dedicated mobile images when ready.
   */
  photoMobile: {
    light: "/images/profile_image_mobile_light.png",
    dark: "/images/profile_image_mobile_dark.png",
    width: 900,
    height: 1000,
  },
  yearsExperience: "4+",
  coreStack: "React . Next.js",
} as const;
