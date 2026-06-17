import Link from "next/link";
import { RecentRecords } from "@/app/components/RecentRecords";
import { MoodTrendChart } from "@/app/components/MoodTrendChart";
import { LogoutButton } from "@/app/components/LogoutButton";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="mx-auto max-w-md px-4 py-10">
        <header className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs tracking-widest text-stone-400 uppercase">health cycle</p>
            <h1 className="mt-1 text-2xl font-semibold text-stone-800">ダッシュボード</h1>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Link
              href="/record"
              className="rounded-full bg-[#1C3130] px-4 py-2 text-sm font-medium text-stone-50 hover:bg-[#2a4a48] transition-colors"
            >
              ＋ 記録する
            </Link>
            <LogoutButton />
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-4">
            推移グラフ
          </h2>
          <MoodTrendChart />
        </section>

        <section>
          <h2 className="text-xs font-semibold tracking-widest text-stone-400 uppercase mb-4">
            直近の記録
          </h2>
          <RecentRecords />
        </section>
      </div>
    </main>
  );
}
