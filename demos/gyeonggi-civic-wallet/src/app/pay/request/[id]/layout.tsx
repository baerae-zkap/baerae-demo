import { benefits } from "@/data/mock";

export function generateStaticParams() {
  return benefits.map((b) => ({ id: b.id }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
