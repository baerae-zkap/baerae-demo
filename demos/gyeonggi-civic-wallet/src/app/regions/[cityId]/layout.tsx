import { partnerCities } from "@/data/mock";

export function generateStaticParams() {
  return partnerCities.map((c) => ({ cityId: c.id }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
