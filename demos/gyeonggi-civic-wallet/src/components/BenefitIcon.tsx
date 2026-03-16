const emojiConfig: Record<string, { emoji: string; bg: string }> = {
  "elementary-prep": { emoji: "🎒", bg: "#EBF5FF" },
  "after-school-care": { emoji: "🏫", bg: "#FFF4E6" },
  "child-vaccine": { emoji: "💉", bg: "#E6FCF5" },
  "youth-culture": { emoji: "🎭", bg: "#F3F0FF" },
  "postpartum-care": { emoji: "🤱", bg: "#FFF0F6" },
  "gov-basic-pension": { emoji: "👴", bg: "#F3F0FF" },
  "gov-child-allowance": { emoji: "👶", bg: "#EBF5FF" },
  "gov-youth-job": { emoji: "💼", bg: "#FFF4E6" },
  "gov-disability": { emoji: "♿", bg: "#E6FCF5" },
  "gov-energy-voucher": { emoji: "⚡", bg: "#FFF9DB" },
  "gov-national-scholarship": { emoji: "🎓", bg: "#EBF5FF" },
  "gov-housing-voucher": { emoji: "🏠", bg: "#FFF4E6" },
  "gov-medical-aid": { emoji: "🏥", bg: "#E6FCF5" },
  "gov-multicultural": { emoji: "🌏", bg: "#F3F0FF" },
  "gov-single-parent": { emoji: "👨‍👧", bg: "#FFF0F6" },
  "gov-veteran": { emoji: "🎖️", bg: "#FFF9DB" },
  "gov-farm-subsidy": { emoji: "🌾", bg: "#E6FCF5" },
};

const typeEmoji: Record<string, { emoji: string; bg: string }> = {
  교육: { emoji: "📚", bg: "#EBF5FF" },
  의료: { emoji: "🏥", bg: "#E6FCF5" },
  문화: { emoji: "🎨", bg: "#F3F0FF" },
  현금: { emoji: "💰", bg: "#FFF4E6" },
  "school-entry": { emoji: "🎒", bg: "#EBF5FF" },
  vaccination: { emoji: "💉", bg: "#E6FCF5" },
  "new-program": { emoji: "🎉", bg: "#FFF9DB" },
  childcare: { emoji: "📚", bg: "#EBF5FF" },
  housing: { emoji: "🏠", bg: "#FFF4E6" },
  culture: { emoji: "🎨", bg: "#F3F0FF" },
};

const defaultEmoji = { emoji: "🎁", bg: "#F1F3F5" };

export default function BenefitIcon({
  id,
  type,
  size = 48,
}: {
  id: string;
  type: string;
  size?: number;
}) {
  const config =
    emojiConfig[id] ??
    Object.entries(typeEmoji).find(([key]) => type.includes(key))?.[1] ??
    defaultEmoji;

  const emojiSize = Math.round(size * 0.5);
  const radius = Math.round(size * 0.33);

  return (
    <div
      className="flex shrink-0 items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: config.bg,
      }}
    >
      <span style={{ fontSize: emojiSize, lineHeight: 1 }}>{config.emoji}</span>
    </div>
  );
}
