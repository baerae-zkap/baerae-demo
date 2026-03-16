import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baerae Demo",
  description: "Product demo collection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily:
            "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {children}
      </body>
    </html>
  );
}
