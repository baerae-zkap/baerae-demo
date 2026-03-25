"use client";

const demos = [
  {
    id: "wallet",
    title: "경기지갑 월렛",
    desc: "지역화폐 결제, 맞춤 복지 혜택, 서류 자동 준비까지 — 경기도 시민을 위한 공공 금융 플랫폼",
    href: "/baerae-demo/gyeonggi-civic-wallet-demo/home",
    preview: "/baerae-demo/gyeonggi-civic-wallet-demo/home",
    icon: "/baerae-demo/gyeonggi-icon.webp",
    heroBg: "linear-gradient(135deg, #1e40af, #3b82f6)",
    iframeW: 430, iframeH: 932, scale: 0.605,
  },
  {
    id: "zkap",
    title: "ZKAP 구매·스테이킹",
    desc: "여러 거래소 시세를 실시간 비교하고 최적 가격으로 구매·스테이킹까지 한 번에",
    href: "/baerae-demo/zkap-app/",
    preview: "/baerae-demo/zkap-app/",
    icon: "/baerae-demo/zkap-icon.png",
    heroBg: "linear-gradient(135deg, #1a1a2e, #4a1d96)",
    iframeW: 390, iframeH: 844, scale: 0.667,
  },
  {
    id: "zkap-home-explore",
    title: "ZKAP 홈·탐색",
    desc: "오늘의 소식, 조건형 카테고리, 테마 묶음 — 정보 중심의 홈과 탐색 탭 UX",
    href: "/baerae-demo/zkap-home-explore/",
    preview: "/baerae-demo/zkap-home-explore/",
    icon: "/baerae-demo/zkap-icon.png",
    heroBg: "linear-gradient(135deg, #0f172a, #3B82F6)",
    iframeW: 390, iframeH: 844, scale: 0.667,
  },
];

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        padding: "48px 48px 60px",
        background: "#f5f5f7",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 8,
        }}
      >
        <img
          src="/baerae-demo/baerae.png"
          alt="Baerae"
          style={{
            height: 36,
            objectFit: "contain",
          }}
        />
        <div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#111",
              margin: 0,
            }}
          >
            Baerae Demo
          </h1>
          <p style={{ fontSize: 13, color: "#888", margin: "2px 0 0" }}>
            Product demo collection
          </p>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: "#e0e0e0",
          margin: "16px 0 32px",
        }}
      />

      {/* Demo grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 40,
        }}
      >
        {demos.map((d) => (
          <a
            key={d.id}
            href={d.href}
            style={{ display: "block", textDecoration: "none" }}
          >
            {/* Hero - gradient bg + iframe device preview */}
            <div
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                background: d.heroBg,
              }}
            >
              {/* Decorative circles */}
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.07)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -30,
                  left: -30,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                }}
              />

              {/* Screen preview */}
              <div
                style={{
                  position: "absolute",
                  bottom: -120,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 260,
                  height: 563,
                  borderRadius: 20,
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                }}
              >
                <iframe
                  src={d.preview}
                  style={{
                    width: d.iframeW + "px",
                    height: d.iframeH + "px",
                    border: "none",
                    transform: `scale(${d.scale})`,
                    transformOrigin: "top left",
                    pointerEvents: "none",
                  }}
                  tabIndex={-1}
                  loading="lazy"
                />
              </div>

              {/* Overlay */}
              <div style={{ position: "absolute", inset: 0, zIndex: 1 }} />
            </div>

            {/* App info row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 14,
              }}
            >
              <img
                src={d.icon}
                alt={d.title}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#111",
                    lineHeight: 1.3,
                  }}
                >
                  {d.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#888",
                    marginTop: 2,
                    lineHeight: 1.4,
                  }}
                >
                  {d.desc}
                </div>
              </div>
              <div
                style={{
                  padding: "6px 18px",
                  borderRadius: 100,
                  background: "rgba(0,122,255,0.12)",
                  color: "#007AFF",
                  fontSize: 14,
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                열기
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
