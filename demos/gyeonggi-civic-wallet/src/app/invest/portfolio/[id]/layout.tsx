import { investPortfolio } from "@/data/mock";

export function generateStaticParams() {
  return investPortfolio.map((p) => ({ id: p.id }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
