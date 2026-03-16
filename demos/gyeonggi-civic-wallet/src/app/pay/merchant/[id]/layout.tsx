import { Suspense } from "react";
import { merchants } from "@/data/mock";

export function generateStaticParams() {
  return merchants.map((m) => ({ id: m.id }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
