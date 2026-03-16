# Page Override — My (`/my`)

> **Role**: Control center. Not a settings dump.

---

## Override: Layout

```
[TopNav — "마이" title]
[User Card — name, residence, linked services count]
[Balance Card — balance + savings + charge CTA]
--- fold ---
[Readiness Checklist — tappable items]
[ReadinessCardStack]
[Resume Tasks]
[Quick Links Menu — section list]
[Recent Activity]
```

## Override: User Card

- Avatar placeholder (initials circle) + name + residence.
- Linked services count: "연결된 서비스 N개".
- No decorative elements. Clean, informational.

## Override: Balance Card

- Balance: `text-xl font-bold` (slightly smaller than home).
- Savings summary: total + this month.
- **Zero savings nudge**: "첫 결제로 절약을 시작해보세요" linking to `/pay`.
- Charge CTA: `--color-cta` outline button.

## Override: Readiness Checklist

MASTER says items should be tappable. My page enforces:
- Each item is a `Link` to its action page.
- Done items: `CircleCheck` green + green text. Still tappable (for management).
- Incomplete items: `AlertCircle` warning + warning text + `ChevronRight`.
- Never plain `div`. Always interactive.

## Override: Quick Links Menu

Section list pattern:
```
┌──────────────────────────┐
│ 지갑 관리                │ → /my/wallet
│──────────────────────────│
│ 알림                     │ → /my/notifications (with unread badge)
│──────────────────────────│
│ 연결 서비스              │ → /my/linked-services
│──────────────────────────│
│ 내 서류                  │ → /my/documents
│──────────────────────────│
│ 가족 정보                │ → /my/family
│──────────────────────────│
│ 동의 관리                │ → /my/consents
│──────────────────────────│
│ 설정                     │ → /my/settings
└──────────────────────────┘
```
- Each row: icon (18px in tint container) → label → ChevronRight.
- Unread notification badge: red dot or count on the 알림 row.

## Override: Recent Activity

- Max 3 recent transactions as compact list rows.
- Each row: amount + merchant + date + savings.
- **Must be tappable** (Link to wallet or transaction detail).
- Empty state: "아직 결제 내역이 없어요" with link to `/pay`.

## Override: Logout

- Logout is NOT a plain `Link`. It should be a button with confirmation dialog.
- "정말 로그아웃 하시겠어요?" confirmation before action.

## Sub-pages

### `/my/notifications`
- Weekly digest inbox (see MASTER bottom sheet + list patterns).
- Grouped by category. Collapsible. Urgency badges.
- Snooze/dismiss actions via SnoozeMenu.
- Title: "알림" (not "주간 요약" — that's an internal section label).

### `/my/documents`
- Document progress with batch auto-fetch.
- **Fallback route**: 자동 불러오기 → 직접 첨부 → 나중에.
- Progress bar with percentage.

### `/my/linked-services`
- Connected/available services list.
- Toggle or connect/disconnect actions.

## Specific Rules

- My page is a control center: information density is higher than other pages.
- Still left-aligned. Still section-list pattern.
- No promotional language. No "더 많은 혜택을 받으세요" banners.
- ReadinessCardStack: vertical stacked variant of home's horizontal scroll.
