# Page Override — Benefits (`/benefits`)

> **Role**: Personal inbox for public benefits. Document progress. Status tracking.

---

## Override: Layout

```
[TopNav — "혜택" title]
[Consent Unlock Banner (if ungiven consent unlocks benefits)]
[Life Event List — urgency-sorted triggers]
[Primary Benefit Hero Card]
--- fold ---
[Recommended Benefits — section list]
[Application Status — section list]
[All Benefits CTA]
```

## Override: Hero Card

- One primary benefit card with strongest eligibility match.
- Shows: title, amount, eligibility confidence, WhyChip.
- Green accent for eligible, blue for likely.
- **Guard**: Use optional chaining. If no eligible benefit, skip hero. Don't crash.

## Override: Consent Banner

- Only shown when ungiven consent scopes would unlock additional benefits.
- Pattern: `UnlockPreviewCard` — "건강보험 정보 동의하면 N건의 혜택을 더 확인할 수 있어요".
- Dismissable. Respects suppression memory (don't nag every session).
- Fallback: "나중에" hides for 7 days.

## Override: Application Status

- Status rows link to contextually correct destination:
  - `submitted` / `reviewing` / `approved` → `/benefits/[id]/status`
  - `additional-docs` → `/benefits/[id]/documents` (NOT status page)
  - `rejected` → `/benefits/[id]/status` with appeal/re-apply guidance
- Status badges: color-coded by status config.

## Override: Sub-pages

### `/benefits/[id]`
- Benefit detail with eligibility criteria, documents needed, timeline.
- WhyRecommended bottom sheet for explainability.
- Primary CTA: "신청하기" or "서류 준비하기".

### `/benefits/[id]/documents`
- Document preparation flow.
- **Fallback route pattern**: auto-fetch (primary) → 직접 첨부 (manual) → 나중에 (defer).
- Tradeoff text: "자동 불러오기가 가장 빠른 방법이에요 · 직접 첨부도 가능해요".
- Progress bar with count. Batch fetch with animation.

### `/benefits/[id]/submitted`
- Success interstitial → status page.
- Review timeline card + notification assurance.
- Next-best-action: "진행 상태 보기" or "다른 혜택 보기".

### `/benefits/[id]/status`
- StatusTimeline component (done/current/pending steps).
- If `additional-docs`: prominent "서류 보완하기" CTA.
- If `rejected`: show reason + "재신청" or "다른 혜택 보기".

## Specific Rules

- Benefits are sorted: eligible → likely → requires-info → ineligible.
- Amount always shown as formatted KRW.
- Eligibility confidence shown as met/unmet criteria (WhyChip).
- Life events sorted by urgency: urgent → upcoming → info.
- "왜 안내됐나요?" button on every life event card.
