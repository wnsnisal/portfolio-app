import type { Project } from "@/types";

export const projects: Project[] = [
  {
    name: "Prodoscore",
    mark: "Pd",
    stack: "Next.js · Python · Django",
    description:
      "An employee productivity monitoring platform built for modern remote and hybrid teams.",
    contributions: [
      "Developed frontend features with Next.js.",
      "Contributed to backend development with Python and Django.",
      "Worked on architectural improvements and performance optimisation.",
    ],
    image: "/images/prodoscore.png",
    liveUrl: "https://www.prodoscore.com",
  },
  {
    name: "Apollo NFT Dashboard",
    mark: "Ap",
    stack: "Next.js",
    description:
      "A platform to manage users and their NFTs and to create curated playlists.",
    contributions: [
      "Frontend application development.",
      "UI/UX design in Figma.",
      "Collaboration with the wider development team.",
    ],
  },
  {
    name: "Apollo.art",
    mark: "Aa",
    stack: "Next.js",
    description:
      "A company website showcasing art galleries and featured artists, promoting the mobile and TV apps.",
    contributions: [
      "Frontend development.",
      "Collaboration with other developers.",
    ],
    image: "/images/apollo_art.png",
    liveUrl: "https://apollo.art",
  },
  {
    name: "Apollo Art TV App",
    mark: "Tv",
    stack: "LG webOS · Samsung Tizen · JavaScript",
    description:
      "A Smart TV app that displays playlists created in the mobile app on LG and Samsung televisions.",
    contributions: [
      "Initial research into webOS and Tizen integration.",
      "Smart TV app development for both platforms.",
    ],
    image: "/images/apollo_tv.JPG",
  },
  {
    name: "EggBurn.xyz",
    mark: "Eb",
    stack: "React.js",
    description:
      "A Web3 platform for the Chikn NFT community where users connect wallets to burn egg tokens and earn rewards.",
    contributions: [
      "Created the UI/UX mockups.",
      "Initial frontend application development.",
    ],
    liveUrl: "https://eggburn.xyz",
  },
];
