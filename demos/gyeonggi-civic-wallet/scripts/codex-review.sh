#!/bin/bash
# Codex CLI cross-review script
# Usage: ./scripts/codex-review.sh <file_or_directory> [review_type]
# review_type: "ui" | "code" | "a11y" (default: "ui")

TARGET="${1:-.}"
REVIEW_TYPE="${2:-ui}"

case "$REVIEW_TYPE" in
  ui)
    PROMPT="Review this UI code for a Korean government civic wallet app. Check: 1) Toss-like simplicity 2) Korean copy quality 3) Mobile-first layout 4) Accessible & Ethical design (WCAG AAA) 5) No emoji icons 6) cursor-pointer on clickable elements 7) Color contrast (#0F172A primary, #0369A1 CTA, #F8FAFC bg). List specific issues with file:line references."
    ;;
  code)
    PROMPT="Review this Next.js + TypeScript code for quality. Check: 1) Type safety 2) Component structure 3) No unused imports 4) Proper React patterns 5) Clean mock data usage. List specific issues."
    ;;
  a11y)
    PROMPT="Review this code for accessibility. Check: 1) WCAG AAA compliance 2) aria-labels 3) keyboard navigation 4) focus states 5) 44x44px touch targets 6) prefers-reduced-motion 7) semantic HTML. List specific issues."
    ;;
  *)
    PROMPT="$REVIEW_TYPE"
    ;;
esac

echo "=== Codex Review: $REVIEW_TYPE ==="
echo "Target: $TARGET"
echo "---"

cd /Users/jaden/gyeonggi-civic-wallet

if [ -f "$TARGET" ]; then
  codex exec --full-auto -C /Users/jaden/gyeonggi-civic-wallet "Read the file $TARGET and: $PROMPT" 2>&1
elif [ -d "$TARGET" ]; then
  codex exec --full-auto -C /Users/jaden/gyeonggi-civic-wallet "Look at the files in $TARGET and: $PROMPT" 2>&1
else
  echo "Error: $TARGET not found"
  exit 1
fi
