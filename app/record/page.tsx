import Link from "next/link";
import { RecordForm } from "@/app/components/RecordForm";

export const metadata = {
  title: "今日の記録 | health cycle",
};

export default function RecordPage() {
  return (
    <main className="min-h-screen bg-[var(--color-surface-muted)]">
      <div className="mx-auto max-w-md px-5 py-10">
        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.22em] text-[var(--color-text-primary)] uppercase">
              health / cycle
            </p>
            <h1 className="mt-2 text-4xl font-extrabold leading-none text-[var(--color-text-primary)]">
              今日の記録.
            </h1>
          </div>
          <Link
            href="/"
            className="rounded-full border-2 border-[var(--color-text-primary)] bg-[var(--color-surface-raised)] px-3 py-1.5 text-xs font-bold text-[var(--color-text-primary)] transition-transform duration-100 hover:-translate-y-[1px]"
          >
            ← 戻る
          </Link>
        </header>

        <div className="rounded-[24px] border-2 border-[var(--color-text-primary)] bg-[var(--color-surface-raised)] p-6 shadow-[var(--shadow-2)]">
          <RecordForm />
        </div>

        <p className="mt-6 text-center text-xs text-[var(--color-text-primary)]/60">
          記録は1日1件、上書き保存されます。
        </p>
      </div>
    </main>
  );
}
