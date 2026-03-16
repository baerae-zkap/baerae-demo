import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import PaymentOverlay from "@/components/PaymentOverlay";
import { CityProvider } from "@/context/CityContext";
import { PaymentModeProvider } from "@/context/PaymentModeContext";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "경기 시민지갑",
  description: "경기도 시민을 위한 공공 금융 플랫폼",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#F8FAFC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="antialiased">
        <CityProvider>
          <PaymentModeProvider>
            <div className="app-frame">
              <main className="pb-safe page-enter">{children}</main>
              <BottomNav />
              <PaymentOverlay />
            </div>
          </PaymentModeProvider>
        </CityProvider>
      </body>
    </html>
  );
}
