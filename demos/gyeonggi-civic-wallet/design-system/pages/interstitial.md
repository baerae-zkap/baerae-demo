# Page Override — Interstitials

> **Role**: Contextual next-best-action after a meaningful success event. Not a marketing popup.

---

## Override: When to Show

Interstitials appear ONLY after a success event:
- Top-up complete → TopUpInterstitial
- Payment complete → PaymentSuccessInterstitial
- Family sync complete → FamilySyncInterstitial
- Documents ready → DocumentReadyInterstitial
- Benefit submitted → BenefitSubmittedInterstitial
- First investment → EventInterstitial

**Never** show interstitials:
- On page load without a triggering event.
- More than once per session for the same prompt.
- During an in-progress flow (don't interrupt).
- After a failed or cancelled action.

## Override: Layout Pattern

All interstitials follow the bottom sheet pattern:

```
[Backdrop rgba(0,0,0,0.4)]
┌─────────────────────────────────┐
│         [Handle bar]            │
│                          [X]    │
│                                 │
│ [Context Icon — tint bg]        │
│ [Title — what just happened]    │
│ [Value — what was gained]       │
│                                 │
│ [Contextual Cards — 1-3 items]  │
│                                 │
│ [Primary CTA — next best action]│
│ [Text dismiss — "나중에"]       │
└─────────────────────────────────┘
```

## Override: Tone

MASTER says "warm and useful, not flashy." Interstitials apply:
- Title: state what happened. "충전이 완료됐어요", not "축하합니다!"
- Value: show what the user gained. "3,200원 절약", "혜택 3건 열림".
- Next action: contextually relevant. Not cross-selling.
- Dismiss: always "나중에" or "닫기". Never guilt-trip.

## Override: Contextual Content

Each interstitial shows 1-3 contextual cards:

### TopUpInterstitial
- Savings highlight: "지역화폐로 결제하면 최대 10% 할인".
- Nearby merchant cards: top 3 by distance, with discount rate.
- CTA: "가맹점 둘러보기".

### PaymentSuccessInterstitial
Three branches based on payment context:
- (A) Savings achieved + nearby merchants → "더 찾아보기"
- (B) Non-optimal method used → "다음엔 지역화폐로" suggestion
- (C) General → "주변 가맹점 둘러보기"
- Secondary: "결제 내역 보기".

### FamilySyncInterstitial
- Unlocked capabilities count: benefits, auto-docs, family members.
- Highlight: "정보 확인으로 N건의 혜택이 열렸어요".
- Preview card for top eligible benefit.
- CTA: context-dependent `nextHref`.

### DocumentReadyInterstitial
- Dynamic title: "서류가 모두 준비됐어요" vs "N개만 더 준비하면 돼요".
- Cards: auto-fetch celebration, ready count, manual remaining.
- CTA: "혜택 신청하기" or "서류 추가하기".

### BenefitSubmittedInterstitial
- Review timeline card (expected duration).
- Notification assurance: "진행 상황은 알림으로 안내해드릴게요".
- Other benefit recommendation.
- CTA: "진행 상태 보기".

### EventInterstitial (generic one-time events)
- Config-driven from `interstitialEventConfigs`.
- Cooldown and dedup enforcement via `useEventInterstitial`.
- One-time events (cooldown=0): show only if never seen.

## Override: Suppression Rules

| Rule | Behavior |
|------|----------|
| Session dedup | Never show same interstitial twice per session |
| Dismiss cooldown | 168 hours (7 days) after dismiss |
| Max show count | 2 times total before auto-suppression |
| Downgrade after dismiss | Show as quiet card on home instead of popup |
| State change resurface | OK to resurface if user eligibility changes |

## Override: Animation

- `sheet-enter` CSS class for bottom-up slide.
- Backdrop fade-in.
- ESC to dismiss. Backdrop tap to dismiss.
- Body scroll lock while open.
- Respect `prefers-reduced-motion`: skip animation, show immediately.

## Specific Rules

- Interstitial content must be self-contained. User should understand it without context from the previous page.
- Primary CTA should navigate forward, not back.
- "나중에" dismiss should return to the success page (not home).
- Max 3 contextual cards. Never more.
- No auto-dismiss timers. User controls when to close.
- Icons: 44px in tint container for main icon, 36px for card icons.
