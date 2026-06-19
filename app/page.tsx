import Link from "next/link";
import { RecentRecords } from "@/app/components/RecentRecords";
import { MoodTrendChart } from "@/app/components/MoodTrendChart";
import { LogoutButton } from "@/app/components/LogoutButton";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero strip — light accent surface */}
      <div className="bg-[var(--color-surface-strong)]">
        <div className="mx-auto max-w-md px-5 pt-10 pb-14">
          <div className="flex items-start justify-between gap-4">
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-text-secondary)]">
              health cycle
            </p>
            <LogoutButton />
          </div>
          <h1 className="mt-3 text-[32px] font-semibold leading-[36px] tracking-tight text-[var(--color-text-tertiary)]">
            ダッシュボード
          </h1>
          <p className="mt-2 text-sm font-light text-[var(--color-text-primary)]">
            毎日の気分と体調を記録して、変化のリズムを見つけましょう。
          </p>
        </div>
      </div>

      <div className="mx-auto -mt-8 max-w-md px-5 pb-14">
        <Link
          href="/record"
          className="group flex items-center justify-between rounded-[5px] bg-[var(--color-text-secondary)] px-5 py-4 text-[var(--color-text-inverse)] shadow-[var(--shadow-md)] transition-colors duration-200 hover:bg-[var(--color-purple-hover)]"
        >
          <span className="text-sm font-medium">今日の記録をつける</span>
          <span aria-hidden className="text-sm transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </Link>

        <section className="mt-10">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-xs font-semibold tracking-[0.08em] uppercase text-[var(--color-text-tertiary)]">
              推移グラフ
            </h2>
            <span className="text-xs font-light text-[var(--color-text-primary)]">
              直近 30 日
            </span>
          </div>
          <MoodTrendChart />
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-xs font-semibold tracking-[0.08em] uppercase text-[var(--color-text-tertiary)]">
            直近の記録
          </h2>
          <RecentRecords />
        </section>
      </div>
    </main>
  );
}
