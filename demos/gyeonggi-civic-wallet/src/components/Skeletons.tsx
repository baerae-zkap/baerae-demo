function Pulse({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`animate-pulse rounded-lg ${className ?? ""}`}
      style={{ background: "var(--color-border)", ...style }}
    />
  );
}

export function PayHomeSkeleton() {
  return (
    <div className="px-5 pt-2 pb-6">
      {/* Wallet summary skeleton */}
      <div
        className="mb-5 rounded-2xl p-5"
        style={{ background: "var(--color-bg-card)" }}
      >
        <div className="flex items-center gap-3">
          <Pulse className="h-10 w-10 rounded-xl" />
          <div className="flex-1">
            <Pulse className="h-3 w-20" />
            <Pulse className="mt-2 h-5 w-28" />
          </div>
          <Pulse className="h-9 w-14 rounded-lg" />
        </div>
      </div>

      {/* Hero card skeleton */}
      <Pulse className="mb-5 h-36 w-full rounded-2xl" style={{ background: "var(--color-border)" }} />

      {/* Search skeleton */}
      <Pulse className="mb-4 h-12 w-full rounded-xl" />

      {/* Filter chips skeleton */}
      <div className="mb-4 flex gap-2">
        <Pulse className="h-8 w-12 rounded-lg" />
        <Pulse className="h-8 w-16 rounded-lg" />
        <Pulse className="h-8 w-12 rounded-lg" />
      </div>

      {/* Merchant cards skeleton */}
      <Pulse className="mb-2 h-4 w-24" />
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="mb-3 rounded-2xl p-5"
          style={{ background: "var(--color-bg-card)" }}
        >
          <div className="flex items-start gap-3">
            <Pulse className="h-11 w-11 rounded-xl" />
            <div className="flex-1">
              <Pulse className="h-4 w-28" />
              <Pulse className="mt-2 h-3 w-20" />
            </div>
          </div>
          <Pulse className="mt-3 h-10 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="px-5 pt-2 pb-6">
      {/* Greeting */}
      <Pulse className="h-3 w-24" />

      {/* Balance + savings badge */}
      <div className="mt-3 flex items-center gap-3">
        <Pulse className="h-6 w-36" />
        <Pulse className="h-5 w-20 rounded-full" />
      </div>

      {/* Quick action grid */}
      <div className="mt-5 grid grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <Pulse key={i} className="h-16 rounded-xl" />
        ))}
      </div>

      {/* Hero card */}
      <Pulse className="mt-5 h-32 w-full rounded-2xl" />

      {/* Info cards */}
      <Pulse className="mt-4 h-20 w-full rounded-2xl" />
      <Pulse className="mt-3 h-20 w-full rounded-2xl" />

      {/* Todo section */}
      <Pulse className="mt-5 h-4 w-20" />
      <Pulse className="mt-3 h-12 w-full rounded-xl" />
      <Pulse className="mt-2 h-12 w-full rounded-xl" />
    </div>
  );
}

export function BenefitsSkeleton() {
  return (
    <div className="px-5 pt-2 pb-6">
      {/* Greeting */}
      <Pulse className="h-6 w-48" />
      <Pulse className="mt-2 h-3 w-32" />

      {/* Primary card with blue top bar */}
      <div className="mt-5 overflow-hidden rounded-2xl" style={{ background: "var(--color-bg-card)" }}>
        <div className="h-2" style={{ background: "var(--color-cta)" }} />
        <div className="p-5">
          <Pulse className="h-5 w-36" />
          <Pulse className="mt-3 h-4 w-full" />
          <Pulse className="mt-2 h-4 w-3/4" />
          <Pulse className="mt-4 h-10 w-full rounded-xl" />
        </div>
      </div>

      {/* Urgent section */}
      <Pulse className="mt-6 h-4 w-24" />
      <Pulse className="mt-3 h-14 w-full rounded-2xl" />

      {/* Documents section */}
      <Pulse className="mt-6 h-4 w-28" />
      <Pulse className="mt-3 h-14 w-full rounded-2xl" />
      <Pulse className="mt-2 h-14 w-full rounded-2xl" />

      {/* Status section */}
      <Pulse className="mt-6 h-4 w-20" />
      <Pulse className="mt-3 h-14 w-full rounded-2xl" />
      <Pulse className="mt-2 h-14 w-full rounded-2xl" />

      {/* Bottom CTA */}
      <Pulse className="mt-6 h-12 w-full rounded-2xl" />
    </div>
  );
}

export function InvestSkeleton() {
  return (
    <div className="px-5 pt-2 pb-6">
      {/* Dark hero block */}
      <Pulse className="h-32 w-full rounded-2xl" style={{ background: "var(--color-primary)" }} />

      {/* Featured project card */}
      <Pulse className="mt-5 h-48 w-full rounded-2xl" />

      {/* Portfolio preview */}
      <Pulse className="mt-4 h-16 w-full rounded-2xl" />

      {/* Category filter chips */}
      <div className="mt-5 flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <Pulse key={i} className="h-8 w-16 rounded-full" />
        ))}
      </div>

      {/* Project list cards */}
      <Pulse className="mt-4 h-28 w-full rounded-2xl" />
      <Pulse className="mt-3 h-28 w-full rounded-2xl" />
    </div>
  );
}

export function MySkeleton() {
  return (
    <div className="px-5 pt-2 pb-6">
      {/* User avatar + greeting */}
      <div className="flex items-center gap-3">
        <Pulse className="h-14 w-14 rounded-full" />
        <div className="flex-1">
          <Pulse className="h-4 w-24" />
          <Pulse className="mt-2 h-3 w-32" />
        </div>
      </div>

      {/* Balance card */}
      <Pulse className="mt-5 h-24 w-full rounded-2xl" style={{ background: "var(--color-cta)" }} />

      {/* Readiness card */}
      <Pulse className="mt-4 h-32 w-full rounded-2xl" />

      {/* 2x2 action cards */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <Pulse key={i} className="h-20 rounded-2xl" />
        ))}
      </div>

      {/* Menu list */}
      <div className="mt-5">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Pulse key={i} className="mt-2 h-12 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export function BenefitDetailSkeleton() {
  return (
    <div className="px-5 pt-2 pb-6">
      {/* Title area */}
      <Pulse className="h-5 w-full" />
      <Pulse className="mt-2 h-3 w-20" />

      {/* Amount */}
      <Pulse className="mt-4 h-8 w-28" />

      {/* Plain explanation box */}
      <Pulse className="mt-5 h-16 w-full rounded-2xl" />

      {/* Prepared items */}
      <Pulse className="mt-4 h-12 w-full rounded-xl" />
      <Pulse className="mt-2 h-12 w-full rounded-xl" />
      <Pulse className="mt-2 h-12 w-full rounded-xl" />

      {/* User todo */}
      <Pulse className="mt-4 h-12 w-full rounded-xl" />
      <Pulse className="mt-2 h-12 w-full rounded-xl" />

      {/* CTA button */}
      <Pulse className="mt-5 h-14 w-full rounded-2xl" />
    </div>
  );
}

export function WalletSkeleton() {
  return (
    <div className="px-5 pt-2 pb-6">
      {/* Balance hero */}
      <Pulse className="h-32 w-full rounded-2xl" style={{ background: "var(--color-cta)" }} />

      {/* Savings summary card */}
      <Pulse className="mt-4 h-16 w-full rounded-2xl" />

      {/* Connected services section */}
      <Pulse className="mt-5 h-4 w-28" />
      <Pulse className="mt-3 h-14 w-full rounded-2xl" />
      <Pulse className="mt-2 h-14 w-full rounded-2xl" />

      {/* Transaction section */}
      <Pulse className="mt-5 h-4 w-24" />
      {[1, 2, 3, 4, 5].map((i) => (
        <Pulse key={i} className="mt-2 h-14 w-full rounded-xl" />
      ))}
    </div>
  );
}

export function MerchantDetailSkeleton() {
  return (
    <div className="px-5 pt-2 pb-6">
      {/* Merchant info skeleton */}
      <div className="mb-5 flex items-start gap-4">
        <Pulse className="h-14 w-14 rounded-2xl" />
        <div className="flex-1">
          <Pulse className="h-5 w-32" />
          <Pulse className="mt-2 h-3 w-40" />
        </div>
      </div>

      {/* Purchase amount skeleton */}
      <Pulse className="mb-5 h-12 w-full rounded-xl" />

      {/* Recommendation card skeleton */}
      <div
        className="mb-5 overflow-hidden rounded-2xl"
        style={{ border: "1.5px solid var(--color-border)" }}
      >
        <Pulse className="h-9 w-full rounded-none" />
        <div className="p-5">
          <div className="flex items-center gap-3">
            <Pulse className="h-10 w-10 rounded-xl" />
            <div className="flex-1">
              <Pulse className="h-4 w-24" />
              <Pulse className="mt-1.5 h-3 w-32" />
            </div>
          </div>
          <Pulse className="mt-4 h-20 w-full rounded-xl" />
          <Pulse className="mt-3 h-4 w-28" />
        </div>
      </div>

      {/* Other options skeleton */}
      <Pulse className="mb-3 h-4 w-24" />
      {[1, 2].map((i) => (
        <div
          key={i}
          className="mb-2.5 flex items-center justify-between rounded-2xl p-4"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <div className="flex items-center gap-3">
            <Pulse className="h-10 w-10 rounded-xl" />
            <div>
              <Pulse className="h-4 w-20" />
              <Pulse className="mt-1.5 h-3 w-24" />
            </div>
          </div>
          <div className="text-right">
            <Pulse className="h-4 w-16" />
            <Pulse className="mt-1.5 h-3 w-12" />
          </div>
        </div>
      ))}

      {/* CTA skeletons */}
      <Pulse className="mt-5 h-14 w-full rounded-2xl" />
      <Pulse className="mt-3 h-11 w-full rounded-2xl" />
    </div>
  );
}
