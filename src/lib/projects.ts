export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  tech: string[];
}

export const projects: Project[] = [
  {
    id: "fade-barbershop",
    title: "FADE Barbershop",
    description: "Premium landing page and comprehensive administrative dashboard with booking system, inventory management, and push notifications.",
    image: "/images/barbershop_preview_1777785817298.png",
    url: "https://fade-barbershop.vercel.app",
    tech: ["Next.js 15", "Supabase", "Prisma", "Tailwind v4", "PWA"],
  },
  {
    id: "centro-educativo",
    title: "Centro Educativo Don Honorio",
    description: "Robust school management platform facilitating student tracking, grade reporting, and administrative workflow optimization.",
    image: "/images/school_system_preview_1777785833641.png",
    url: "#",
    tech: ["Next.js", "Supabase", "TypeScript", "PostgreSQL"],
  },
  {
    id: "mec-system",
    title: "MEC - Management System",
    description: "Internal management tool designed for organizations to handle complex data structures, search, and analytics with a professional UI.",
    image: "/images/mec_preview_1777785849488.png",
    url: "#",
    tech: ["React", "Node.js", "Express", "Tailwind CSS"],
  },
  {
    id: "alanyadielmm",
    title: "Alan Yadiel MM",
    description: "Personal brand and portfolio project showcasing creative works and professional identity with a modern minimalist aesthetic.",
    image: "/images/ps4_background_abstract_1777785802204.png", // Fallback image or custom one if I generate more
    url: "#",
    tech: ["Next.js", "Framer Motion", "Tailwind v4"],
  }
];
