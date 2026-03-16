# Page Override — Home (`/home`)

> **Role**: Assistant-like action hub. The single daily touchpoint.

---

## Override: Layout

MASTER says max 3 blocks above the fold. Home specifies:

```
[TopNav — no title, notification bell only]
[Greeting + Balance + Savings badge]     ← block 1
[Resume Capsule (if active task)]        ← block 2 (conditional)
[Quick Action Row 4-grid]               ← block 3
--- fold ---
[Readiness Cards horizontal scroll]
[Life Event Triggers (top 2)]
[Weekly Digest Summary]
[Hero Payment Card OR fallback]
[Benefits Card]
[Documents Card]
[Civic Project Card]
[Todo List OR Completion State]
```

## Override: Hero Card

MASTER says max 1 hero card. Home uses it for **best payment**:
- Full-width `rounded-2xl` with `--color-cta` background.
- White text on blue. No card bg.
- Contains: merchant name, rate, estimated savings, WhyChip, CTA.
- **Fallback**: When no eligible merchant, show dashed-border card: "가맹점을 둘러볼까요?" linking to `/pay`.

## Override: Balance Display

- `text-2xl font-bold` in `--color-primary`. Not centered.
- "지역화폐" label in `text-tertiary` beside balance.
- Savings badge right-aligned: green tint when savings > 0.
- **First-payment nudge**: When no monthly savings, show `--color-badge-recommend-bg` pill: "첫 결제로 절약 시작" linking to `/pay`.

## Override: Quick Actions

4-column grid. Each item:
- 40x40 icon container → label below.
- QR/바코드 and QR 스캔 in CTA blue.
- 혜택 in success green.
- 내 서류 in warning amber.
- Rounded-xl cards on white bg. No shadow.

## Override: Todo Completion

MASTER says success should feel warm. Home applies:
- When all todos complete: show success-bg banner with CircleCheck: "오늘 할 일을 모두 마쳤어요".
- No next-action in the completion state (home already has enough cards below).

## Override: Conditional Sections

Every conditional section (benefits, project, hero) has a fallback:
- No bestMerchant → dashed merchant discovery card.
- No primaryBenefit → section hidden (benefits card is secondary, readiness cards cover it).
- No openProject → section hidden (project is optional discovery).
- No marchSaved → first-payment nudge replaces savings badge.

## Specific Rules

- No centered text anywhere on home.
- ResumeCapsule: left-border accent color by task type. Dismiss via X. Shows progress fraction.
- DigestSummaryCard: only shown when unread items > 0. Links to `/my/notifications`.
- LifeEventHome: max 2 cards. "N건 모두 보기" overflow link to `/benefits`.
- ReadinessCards: horizontal scroll, priority-sorted. Dismiss low-priority cards via X.
