import './globals.css';

export const metadata = {
  title: 'ZKAP',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link
          rel="stylesheet"
          href="https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
