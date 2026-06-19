import Link from "next/link";
import { RecentRecords } from "@/app/components/RecentRecords";
import { MoodTrendChart } from "@/app/components/MoodTrendChart";
import { LogoutButton } from "@/app/components/LogoutButton";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface-muted)]">
      <div className="mx-auto max-w-md px-5 py-10">
        <header className="mb-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.22em] text-[var(--color-text-primary)] uppercase">
              health / cycle
            </p>
            <h1 className="mt-2 text-4xl font-extrabold leading-none text-[var(--color-text-primary)]">
              Dashboard.
            </h1>
          </div>
          <LogoutButton />
        </header>

        <Link
          href="/record"
          className="mb-8 flex items-center justify-between rounded-[20.8px] bg-[var(--color-text-primary)] px-6 py-5 text-[var(--color-surface-muted)] shadow-[var(--shadow-card-strong)] transition-transform duration-100 hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[rgb(16,24,32)_0px_0px_0px_2px,rgb(16,24,32)_2px_2px_0px_0px]"
        >
          <span className="text-base font-bold tracking-tight">＋ 今日を記録する</span>
          <span aria-hidden className="text-2xl leading-none">→</span>
        </Link>

        <section className="mb-10">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-xs font-bold tracking-[0.22em] uppercase text-[var(--color-text-primary)]">
              推移グラフ
            </h2>
            <span className="text-[11px] font-medium text-[var(--color-text-primary)]/60">
              直近 30 日
            </span>
          </div>
          <MoodTrendChart />
        </section>

        <section className="pb-12">
          <h2 className="mb-4 text-xs font-bold tracking-[0.22em] uppercase text-[var(--color-text-primary)]">
            直近の記録
          </h2>
          <RecentRecords />
        </section>
      </div>
    </main>
  );
}
