import { investProjects } from "@/data/mock";

export function generateStaticParams() {
  return investProjects.map((p) => ({ id: p.id }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
