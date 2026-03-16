import { governmentBenefits } from "@/data/mock";

export function generateStaticParams() {
  return governmentBenefits.map((gb) => ({ id: gb.id }));
}

export default function GovBenefitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
