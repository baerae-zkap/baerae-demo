import { regionOffers, partnerCities } from "@/data/mock";

export function generateStaticParams() {
  return regionOffers.map((o) => ({ cityId: o.cityId, offerId: o.id }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
