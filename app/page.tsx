import Link from "next/link";
import { RecentRecords } from "@/app/components/RecentRecords";
import { MoodTrendChart } from "@/app/components/MoodTrendChart";
import { LogoutButton } from "@/app/components/LogoutButton";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[var(--color-paper)]">
      {/* Top utility bar — slim black bar with serif wordmark */}
      <div className="on-dark bg-black text-white">
        <div className="mx-auto flex max-w-md items-center justify-between px-5 py-3">
          <p className="text-[13px] italic tracking-[0.06em]">
            to/<span className="not-italic font-medium">cycle</span>
          </p>
          <LogoutButton />
        </div>
      </div>

      <div className="mx-auto max-w-md px-5 pt-10 pb-20">
        <header className="border-b border-[var(--color-border-muted)] pb-6">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--color-text)]">
            dashboard
          </p>
          <h1 className="mt-3 text-[30px] font-normal leading-[1.15] tracking-tight text-black">
            today’s <span className="italic">記録</span>
          </h1>
          <p className="mt-3 text-[13px] leading-[1.7] text-[var(--color-text)]">
            毎日の気分と体調を続けて、変化のリズムを見つけましょう。
          </p>
        </header>

        <Link
          href="/record"
          className="mt-7 flex items-center justify-center gap-2 rounded-[5px] bg-black px-6 py-3.5 text-[13px] tracking-[0.18em] text-white uppercase transition-colors duration-500 hover:bg-[var(--color-accent-ink)]"
        >
          <span aria-hidden className="text-base leading-none">＋</span>
          new entry
        </Link>

        <section className="mt-14">
          <div className="mb-4 flex items-baseline justify-between border-b border-[var(--color-border-subtle)] pb-2.5">
            <h2 className="text-[11px] uppercase tracking-[0.32em] text-black">
              trend
            </h2>
            <span className="text-[12px] italic text-[var(--color-text)]">
              past 30 days
            </span>
          </div>
          <MoodTrendChart />
        </section>

        <section className="mt-14">
          <div className="mb-4 flex items-baseline justify-between border-b border-[var(--color-border-subtle)] pb-2.5">
            <h2 className="text-[11px] uppercase tracking-[0.32em] text-black">
              recent entries
            </h2>
            <span className="text-[12px] italic text-[var(--color-text)]">
              直近の記録
            </span>
          </div>
          <RecentRecords />
        </section>
      </div>
    </main>
  );
}
