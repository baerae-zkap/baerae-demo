# Page Override — Pay (`/pay`)

> **Role**: QR/barcode payment hub. Scan, compare, confirm, save.

---

## Override: Layout

```
[TopNav — "결제" title, no notification]
[Balance Strip — balance + charge link]
[Quick Action Buttons — QR/바코드, QR 스캔]
[Category Filter Chips — horizontal scroll]
--- fold ---
[Nearby Merchant List — section list pattern]
[Recent Payments — compact list]
```

## Override: Balance Strip

- Compact: single row with balance left, "충전" link right.
- `text-lg font-bold` for balance (smaller than home's `2xl`).
- **Zero-balance warning**: When balance is 0, highlight strip in `--color-warning-bg` with "충전이 필요해요" and prominent charge CTA.

## Override: Merchant List

Use **Section List** pattern (not card soup):
- ListRow for each merchant: icon container → name + category + distance → savings hint badge.
- Eligible merchants: normal styling with `ChevronRight`.
- Ineligible merchants: `opacity-50`, "지역화폐 이용 불가" in `text-tertiary`. No chevron. Add hint: "다른 결제수단으로 결제 가능".
- Never a complete dead end for ineligible items.

## Override: Filter Chips

- Horizontal scroll row: 전체, 자주 가는 곳, 마트, 약국, 카페, etc.
- Active: `--color-cta` bg, white text.
- Inactive: `--color-divider` bg, `--color-text-secondary` text.
- **Empty filter fallback**: When filter returns zero, show: "아직 자주 가는 가맹점이 없어요" (for recent) or "이 분야의 가맹점을 찾고 있어요" (for category). NOT the search-empty component.

## Override: Sub-pages

### `/pay/merchant/[id]`
- Merchant detail with payment method comparison table.
- One recommended method highlighted with `--color-success` badge.
- WhyChip for explainability.
- Primary CTA: "이 수단으로 결제하기".

### `/pay/compare/[id]`
- Side-by-side method comparison.
- Clear winner highlight. Difference in savings shown.

### `/pay/confirm/[id]`
- Final confirmation screen.
- Amount, method, merchant, expected savings.
- One "결제하기" CTA. No distractions.

### `/pay/success/[id]`
- Warm success state → contextual interstitial.
- Next-best-action: nearby merchants or benefits.

## Specific Rules

- QR code screens: full-width, no chrome, brightness auto-max hint.
- Savings always shown as absolute KRW amount, not percentage (user cares about "3,200원", not "10%").
- Recent payments: compact list, `text-xs`, newest first. Max 5.
