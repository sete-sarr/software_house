export interface TechCategory {
  category: string;
  items: string[];
}

export const technologyCategories: TechCategory[] = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["NestJS", "Node.js", "TypeScript", "REST", "Prisma"],
  },
  {
    category: "Données & Infra",
    items: ["PostgreSQL", "Docker", "CI/CD", "Cloud"],
  },
];
