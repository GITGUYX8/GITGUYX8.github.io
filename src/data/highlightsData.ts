export type Highlight = {
  id: string;
  title: string;
  badge: string;
  image: string;
  link?: string;
};

export const highlightsData: Highlight[] = [
  {
    id: "oblivion-win",
    title: "Winner — NSUT Oblivion Hackathon",
    badge: "Hackathon Win",
    image: "/highlights/oblivion.jpeg",
  },
  {
    id: "eyantra-iitb",
    title: "Cloud/DevOps Intern — e-Yantra, IIT Bombay",
    badge: "e-Yantra",
    image: "/highlights/eyantra.jpeg",
  },
  {
    id: "icpc-2025",
    title: "ICPC 2025 Kanpur Region — Rank 2027",
    badge: "ICPC",
    image: "/highlights/icpc.png",
  },
  {
    id: "iicpc-2026",
    title: "IICPC CodeFest Global Prelims — Rank 4085 of 13,000+",
    badge: "IICPC",
    image: "/highlights/iicpc.png",
  },
  {
    id: "hwm-2nd",
    title: "Hack WithMait — 2nd Place (AI&I Website)",
    badge: "Hackathon",
    image: "/highlights/hack-with-mait.jpeg",
  },
  {
    id: "sih-2025",
    title: "Smart India Hackathon 2025 — Shortlisted (ARTIFACT Vehicle)",
    badge: "SIH",
    image: "/highlights/sih.jpeg",
  },
];
