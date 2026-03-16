# Page Override — Invest (`/invest`)

> **Role**: Educational, calm public-project participation. Not a trading platform.

---

## Override: Layout

```
[TopNav — "참여" title]
[Featured Project Hero Card (max 1, if open)]
[Portfolio Preview Strip (if invested)]
[Category Filter Chips]
--- fold ---
[Project List — section list]
[Education Section — "쉽게 설명 보기"]
```

## Override: Tone

MASTER says "trust before excitement." Invest doubles down:
- No financial jargon. No "투자 수익률". Use "참여", "기여", "지역 발전".
- Social impact metrics alongside financial: "CO2 감소", "일자리 창출".
- Returns framed as "예상 수익" with clear risk disclaimers.

## Override: Hero Card

- Only shown when a project is `open` or `nearly-funded`.
- **Fallback**: When no open project, show: "현재 모집 중인 프로젝트가 없어요" with "알림 받기" CTA. Never an empty gap.
- Progress bar showing funding %. "거의 완료" badge for nearly-funded.

## Override: Project Cards

- ListRow pattern with progress bars.
- Open: full opacity, ChevronRight, progress bar in `--color-cta`.
- Nearly-funded: "마감 임박" badge in `--color-error`.
- Closed: `opacity-60`, "모집 완료" badge. Still tappable for info.
- **Empty filter**: "이 분야의 프로젝트는 아직 준비 중이에요" + "전체 프로젝트 보기" reset button.

## Override: Portfolio Strip

- Compact summary: "N건 참여 · 총 금액".
- Add social impact line from aggregated portfolio data.
- Link to `/invest/portfolio` for detail.

## Override: Education Section

- "쉽게 설명 보기" links to generic `/invest/how-it-works`, NOT a specific project.
- Calm explainer cards. No urgent CTAs.

## Override: Sub-pages

### `/invest/project/[id]`
- Project detail with tabs: 개요, 진행 현황, 위험 안내, 세금 안내, 참여 혜택.
- Primary CTA: "참여하기" (requires identity verification).
- **Fallback**: If unverified, offer: "본인 확인하기" (primary) → "둘러보기만 하기" (manual) → "나중에" (defer).

### `/invest/project/[id]/success`
- Warm success: "참여가 완료됐어요" + EventInterstitial for first investment.
- Social impact preview: "이 참여로 CO2 X톤 감소에 기여해요".
- Next action: "포트폴리오 보기" or "다른 프로젝트 보기".

## Specific Rules

- All amounts in `formatCompactKRW` (억원, 만원).
- Risk information always accessible but not fear-inducing.
- No countdown timers. Use "마감 임박" badge instead.
- WhyChip on featured project: "왜 이 프로젝트가 추천됐나요?".
