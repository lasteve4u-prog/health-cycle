import Link from "next/link";
import { RecordForm } from "@/app/components/RecordForm";

export const metadata = {
  title: "今日の記録 | health cycle",
};

export default function RecordPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-[var(--color-surface-strong)]">
        <div className="mx-auto max-w-md px-5 pt-10 pb-14">
          <div className="flex items-start justify-between gap-4">
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-text-secondary)]">
              health cycle
            </p>
            <Link
              href="/"
              className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-purple-hover)]"
            >
              ← 戻る
            </Link>
          </div>
          <h1 className="mt-3 text-[32px] font-semibold leading-[36px] tracking-tight text-[var(--color-text-tertiary)]">
            今日の記録
          </h1>
          <p className="mt-2 text-sm font-light text-[var(--color-text-primary)]">
            気分と体調、症状を 1 分で記録できます。
          </p>
        </div>
      </div>

      <div className="mx-auto -mt-8 max-w-md px-5 pb-14">
        <div className="rounded-[5px] border border-[var(--color-border-subtle)] bg-white p-6 shadow-[var(--shadow-md)]">
          <RecordForm />
        </div>

        <p className="mt-6 text-center text-xs font-light text-[var(--color-text-primary)]">
          記録は 1 日 1 件、上書き保存されます。
        </p>
      </div>
    </main>
  );
}
