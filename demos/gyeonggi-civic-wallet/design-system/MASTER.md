# Design System — MASTER

> Gyeonggi Civic Wallet (경기 시민지갑)
> Korean consumer civic wallet for 10M+ Gyeonggi Province residents.

---

## Visual Thesis

**Quiet civic wallet. Premium but calm. Everyday utility first.**

This is not a government portal, enterprise dashboard, or fintech landing page.
It is a personal assistant for public money — a tool people open daily to pay, save, and receive benefits.

Trust before excitement.
Numbers before narrative.
Utility before personality.

---

## Design Principles

| # | Principle | Rule |
|---|-----------|------|
| 1 | **Mobile-first** | Max-width 430px. Touch targets 44px+. No desktop breakpoints. |
| 2 | **Left-aligned** | All text left-aligned. No centered compositions except rare onboarding/success moments. |
| 3 | **One hero max** | No more than 1 hero card above the fold. Maximum 3 information blocks above the fold. |
| 4 | **List over cards** | Prefer ListRow / section list / bottom sheet over card soup. Cards are for scannable summaries, not content. |
| 5 | **One CTA per screen** | One primary action. Secondary actions are text links or ghost buttons. Defer options are `text-tertiary`. |
| 6 | **Numbers first** | Show the number. Explanation on tap. Progressive disclosure via bottom sheet, not inline paragraphs. |
| 7 | **Korean-first** | All UI copy in Korean. No English slogans. Code identifiers in English. |
| 8 | **Soft surfaces** | Restrained shadows. No heavy borders. Card bg is `#FFFFFF`, page bg is `#F8FAFC`. |
| 9 | **Warm success** | Success states feel useful and warm, not flashy. Green check + calm copy. No confetti. |
| 10 | **Editorial, not promotional** | Default layout feels like a well-organized product, not a marketing site. |

---

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#0F172A` | Headings, primary text |
| `--color-secondary` | `#334155` | — |
| `--color-text-secondary` | `#475569` | Body text, descriptions |
| `--color-text-tertiary` | `#64748B` | Timestamps, hints, deferred labels |
| `--color-cta` | `#0369A1` | Primary buttons, links, accent badges |
| `--color-cta-hover` | `#025d8f` | CTA hover state |
| `--color-bg` | `#F8FAFC` | Page background |
| `--color-bg-card` | `#FFFFFF` | Card surfaces |
| `--color-border` | `#E2E8F0` | Subtle borders, progress bar tracks |
| `--color-divider` | `#F1F5F9` | List dividers, pill backgrounds |
| `--color-success` | `#059669` | Completion, savings, ready states |
| `--color-success-bg` | `#ECFDF5` | Success tint backgrounds |
| `--color-warning` | `#D97706` | Attention needed, document action |
| `--color-warning-bg` | `#FFFBEB` | Warning tint backgrounds |
| `--color-error` | `#DC2626` | Urgent, deadline, error |
| `--color-error-bg` | `#FEF2F2` | Error tint backgrounds |
| `--color-badge-recommend` | `#0369A1` | Recommendation badges |
| `--color-badge-recommend-bg` | `#E0F2FE` | Recommendation tint |

### Color Usage Rules

- CTA blue (`#0369A1`) is reserved for primary actions and system accent. Do not overuse.
- Success green is for confirmed/completed states only.
- Warning amber is for action-required states — not decorative.
- Error red is reserved for urgency and errors only. Never use for emphasis.
- Background tints (`-bg` tokens) are for icon containers, badges, and highlight areas. Never as full-section fills.

---

## Typography

| Element | Size | Weight | Line-height | Token |
|---------|------|--------|-------------|-------|
| Page heading | 22px | 700 | tight | `text-[22px] font-bold` |
| Section heading | 14px | 600 | normal | `text-sm font-semibold` |
| Card title | 14–15px | 600 | snug | `text-sm font-semibold leading-snug` |
| Body | 14px | 400 | relaxed | `text-sm` |
| Description | 12px | 400 | relaxed | `text-xs leading-relaxed` |
| Badge / label | 10–11px | 600–700 | normal | `text-[10px] font-bold` or `text-[11px] font-semibold` |
| Timestamp | 11px | 400 | normal | `text-[11px]` |
| Balance large | 24px | 700 | tight | `text-2xl font-bold` |

**Font**: Noto Sans KR (weights 300–700) via `--font-sans`.

### Typography Rules

- Body text minimum 14px. Never go below 10px for any visible text.
- Heading hierarchy: one `text-2xl` per page max (balance or page title). Section titles at `text-sm font-semibold`.
- Don't combine bold + color accent on the same element unless it's a primary metric.
- Timestamps and hints always `text-tertiary`.

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Cards, resting state |
| `--shadow-md` | `0 2px 8px rgba(0,0,0,0.08)` | Elevated cards, hero sections |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)` | Bottom sheets, modals |

### Shadow Rules

- Default card: `--shadow-sm`. No shadow is acceptable for grouped list items.
- Hero/featured card: `--shadow-md`.
- Bottom sheets, overlays: `--shadow-lg`.
- Never stack shadows. One shadow per element.
- Hover state: elevate from `sm` to `md` with `hover:shadow-md`. No scale transforms.

---

## Spacing

| Size | Value | Usage |
|------|-------|-------|
| xs | 4px | Icon gaps, tight badge padding |
| sm | 8px | Between badges, compact lists |
| md | 12–16px | Card padding, section gaps |
| lg | 20–24px | Section margins, major gaps |
| xl | 32px | Page top/bottom padding |
| 2xl | 40px | Onboarding spacing |

### Spacing Rules

- Page horizontal padding: `px-5` (20px).
- Card internal padding: `px-4 py-4` or `px-5 py-4`.
- Section margin-bottom: `mb-4` to `mb-6`.
- Never exceed 24px between items within a section.
- Between-section spacing: 16–24px (`mb-4` to `mb-6`).

---

## Layout Patterns

### ListRow (default for most content)
```
[Icon 40x40] [Title + Description + Meta] [Action / Chevron]
```
- Icon in rounded-xl container with tint bg
- Title: `text-sm font-semibold` primary
- Description: `text-xs` secondary
- Meta: `text-[11px]` tertiary
- Action: text link or ChevronRight 14px

### Section List (grouped items)
```
[Section Title]
┌─────────────────────────────┐
│ ListRow                     │
│─────────────────────────────│
│ ListRow                     │
│─────────────────────────────│
│ ListRow                     │
└─────────────────────────────┘
```
- Container: `rounded-2xl` white bg, `shadow-sm`
- Dividers: `1px solid var(--color-divider)`
- Section title: outside the container, `text-sm font-semibold` primary

### Hero Card (max 1 per page)
```
┌─────────────────────────────┐
│ [Label small]               │
│ [Title large bold]          │
│ [Subtitle / metric]         │
│ [CTA button]                │
└─────────────────────────────┘
```
- Full-width `rounded-2xl`, `shadow-md`
- CTA bg: `var(--color-cta)` or filled accent

### Bottom Sheet
```
┌─────────────────────────────┐
│      [Handle bar]           │
│                      [X]    │
│ [Title]                     │
│ [Content]                   │
│ [Primary CTA full-width]    │
│ [Text dismiss link]         │
└─────────────────────────────┘
```
- `rounded-t-3xl`, `max-w-[430px]`, `mx-auto`
- Backdrop: `rgba(0,0,0,0.4)`
- Body scroll lock on open
- ESC to dismiss
- Animation: `sheet-enter` class

### Fallback Route Pattern (every blocking action)
```
[Primary CTA — easiest path]
[Secondary — manual alternative]
[Tertiary text — "나중에"]
[Tradeoff explanation — text-tertiary 11px]
```

---

## Component Rules

### Icons
- Lucide React only. No emojis. No custom SVGs unless brand.
- Default size: 18px in 40x40 containers, 14–16px inline.
- Icon containers: `rounded-xl` with tint bg matching category.
- `aria-hidden="true"` on decorative icons.

### Buttons
- Primary: `rounded-2xl py-4 text-base font-semibold text-white` on `--color-cta`.
- Secondary: same shape, white bg, `--color-cta` text, `1px solid --color-border`.
- Ghost/defer: no border, `text-sm font-medium` in `--color-text-tertiary`.
- All buttons: `cursor-pointer`, `transition-colors duration-200`, `active:opacity-90`.

### Badges
- Urgency: `rounded-md px-1.5 py-0.5 text-[10px] font-bold` with matching `bg` + `color`.
- Category: same shape, softer contrast.
- Count: `rounded-full px-2 py-0.5 text-[11px] font-bold`.

### Progress Bars
- Track: `h-1.5 rounded-full` in `--color-border`.
- Fill: `rounded-full transition-all duration-500` in status color.
- Label: right-aligned `text-[11px] font-medium` in status color.

### Transitions
- Color/opacity: `duration-200`.
- Layout/width: `duration-500`.
- No scale transforms on interactive elements (causes layout shift).
- `hover:shadow-md` for card hover. `hover:bg-black/[0.02]` for list row hover.

---

## Interaction Patterns

### Progressive Disclosure
1. Show the number or status.
2. On tap, show the detail or explanation.
3. "왜 추천됐나요?" opens bottom sheet, not inline expansion.

### Suppression / Snooze
- Dismissed prompts: respect cooldown hours per prompt type.
- After dismissal + cooldown: resurface as quiet card, not popup.
- Session dedup: never show same prompt twice per session.
- Permanent hide: user choice, reversible in settings.

### Fallback Routes
- Every blocking screen offers: primary (easiest) → manual → defer.
- Tradeoff text explains what user gains/loses.
- "나중에" always available. Never dead-end.

### Success → Next Action
- Every success state suggests one relevant next action.
- Keep it contextual: "서류가 준비됐어요 → 혜택 신청하기".
- Don't cross-sell unrelated features in success moments.

---

## Copy Direction

| Do | Don't |
|----|-------|
| 받을 수 있는 혜택이 있어요 | You have eligible benefits! |
| 서류 1개만 더 준비하면 돼요 | Complete your remaining document |
| 이번 결제로 3,200원을 아꼈어요 | You saved 3,200 KRW |
| 가장 유리한 결제수단을 추천해드릴게요 | We recommend the optimal payment |
| 동의하면 바로 확인할 수 있어요 | Consent to unlock |

### Copy Rules
- Speak as a helpful assistant, not a system notification.
- End sentences with ~어요/~해요 (polite informal).
- Numbers before explanation: "3건" not "여러 건".
- Avoid "축하합니다" — use "완료됐어요" or "준비됐어요".
- Error copy: state what happened + what to do next. Never blame the user.

---

## Accessibility

- Color contrast: 4.5:1 minimum for text.
- Focus states: visible focus ring on all interactive elements.
- `aria-label` on icon-only buttons.
- `aria-hidden="true"` on decorative icons.
- `role="dialog"` + `aria-modal="true"` on bottom sheets.
- Tab order matches visual order.
- `prefers-reduced-motion`: skip `sheet-enter` animation.

---

## File Structure Reference

```
src/
  app/globals.css          — CSS custom properties
  components/
    TopNav.tsx             — sticky header with back + notification
    BottomNav.tsx          — tab bar
    EdgeStates.tsx         — empty/error/offline states
    ReadinessCards.tsx      — horizontal scroll + vertical stack
    ResumeCapsules.tsx      — resume interrupted tasks
    WhyRecommended.tsx      — explainability bottom sheet + chips
    LifeEventCards.tsx      — urgency-sorted trigger cards
    WeeklyDigestCard.tsx    — digest items + summary
    SnoozeMenu.tsx          — snooze/dismiss/hide bottom sheet
    NextBestActionBanner.tsx — next-best-action cards
    FallbackRouteCard.tsx   — primary/manual/defer route options
    ConsentValueCard.tsx    — consent unlock previews
    StatusTimeline.tsx      — vertical step timeline
    DocumentProgressCard.tsx — document readiness with progress bar
    UnlockPreviewCard.tsx   — locked/unlocked feature preview
    ConsentBottomSheet.tsx  — data consent flow
    EventInterstitial.tsx   — one-time event framework
    *Interstitial.tsx       — context-specific success interstitials
  data/mock.ts             — all mock data + types
  hooks/useSuppressionMemory.ts — snooze/suppression logic
```
