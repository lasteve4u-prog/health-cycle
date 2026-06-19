import Link from "next/link";
import { RecentRecords } from "@/app/components/RecentRecords";
import { MoodTrendChart } from "@/app/components/MoodTrendChart";
import { LogoutButton } from "@/app/components/LogoutButton";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Top utility bar — Sephora-style thin black bar */}
      <div className="bg-black text-white">
        <div className="mx-auto flex max-w-md items-center justify-between px-5 py-2.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em]">
            health cycle
          </p>
          <LogoutButton />
        </div>
      </div>

      <div className="mx-auto max-w-md px-5 pt-8 pb-16">
        <header className="border-b border-black pb-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black">
            ダッシュボード
          </p>
          <h1 className="mt-2 text-[28px] font-bold leading-[32px] text-black">
            今日の体調を記録する
          </h1>
          <p className="mt-2 text-sm font-normal text-[var(--color-text)]">
            毎日の気分と体調を続けて、変化のリズムを見つけましょう。
          </p>
        </header>

        <Link
          href="/record"
          className="mt-6 flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#1a1a1a]"
        >
          ＋ 記録をつける
        </Link>

        <section className="mt-12">
          <div className="mb-3 flex items-baseline justify-between border-b border-[var(--color-border-subtle)] pb-2">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-black">
              推移グラフ
            </h2>
            <span className="text-xs font-normal text-[var(--color-text)]">
              直近 30 日
            </span>
          </div>
          <MoodTrendChart />
        </section>

        <section className="mt-12">
          <h2 className="mb-3 border-b border-[var(--color-border-subtle)] pb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-black">
            直近の記録
          </h2>
          <RecentRecords />
        </section>
      </div>
    </main>
  );
}
