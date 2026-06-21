import Link from "next/link";
import { RecentRecords } from "@/app/components/RecentRecords";
import { MoodTrendChart } from "@/app/components/MoodTrendChart";
import { LogoutButton } from "@/app/components/LogoutButton";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface-soft)]">
      {/* Soft pink hero banner */}
      <div className="bg-[var(--color-surface-cream)]">
        <div className="mx-auto flex max-w-md items-center justify-between px-5 pt-5 pb-3">
          <p className="text-[20px] font-bold tracking-tight text-[var(--color-text-strong)]">
            health<span className="text-[var(--color-coral)]">.</span>cycle
          </p>
          <LogoutButton />
        </div>

        <div className="mx-auto max-w-md px-5 pb-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--color-coral)]">
            today
          </p>
          <h1 className="mt-2 text-[28px] font-bold leading-[1.25] text-[var(--color-text-strong)]">
            今日の気分を、<br />やさしく記録。
          </h1>
          <p className="mt-3 text-[14px] leading-[1.7] text-[var(--color-text)]">
            毎日のちょっとした変化を残して、自分のリズムを見つけましょう。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-md px-5 pt-6 pb-20">
        <Link
          href="/record"
          className="flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-coral)] px-6 py-4 text-[15px] font-bold text-white shadow-[var(--shadow-glow)] transition-opacity duration-300 hover:opacity-90"
        >
          <span aria-hidden className="text-lg leading-none">＋</span>
          今日の記録をつける
        </Link>

        <section className="mt-10">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-[16px] font-bold text-[var(--color-text-strong)]">
              気分の推移
            </h2>
            <span className="text-[13px] text-[var(--color-text-soft)]">
              past 30 days
            </span>
          </div>
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-white p-5 shadow-[var(--shadow-soft)]">
            <MoodTrendChart />
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-[16px] font-bold text-[var(--color-text-strong)]">
              最近の記録
            </h2>
            <span className="text-[13px] text-[var(--color-text-soft)]">
              直近 10 件
            </span>
          </div>
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-white shadow-[var(--shadow-soft)] overflow-hidden">
            <RecentRecords />
          </div>
        </section>
      </div>
    </main>
  );
}
