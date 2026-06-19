import Link from "next/link";
import { RecordForm } from "@/app/components/RecordForm";

export const metadata = {
  title: "今日の記録 | health cycle",
};

export default function RecordPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-black text-white">
        <div className="mx-auto flex max-w-md items-center justify-between px-5 py-2.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em]">
            health cycle
          </p>
          <Link
            href="/"
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-opacity duration-200 hover:opacity-70"
          >
            ← 戻る
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-md px-5 pt-8 pb-16">
        <header className="border-b border-black pb-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black">
            new entry
          </p>
          <h1 className="mt-2 text-[28px] font-bold leading-[32px] text-black">
            今日の記録
          </h1>
          <p className="mt-2 text-sm font-normal text-[var(--color-text)]">
            気分・体調・症状を 1 分で記録できます。
          </p>
        </header>

        <div className="mt-6">
          <RecordForm />
        </div>

        <p className="mt-8 text-center text-xs font-normal text-[var(--color-text)]">
          記録は 1 日 1 件、上書き保存されます。
        </p>
      </div>
    </main>
  );
}
