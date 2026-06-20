import Link from "next/link";
import { RecordForm } from "@/app/components/RecordForm";

export const metadata = {
  title: "今日の記録 | health cycle",
};

export default function RecordPage() {
  return (
    <main className="min-h-screen bg-[var(--color-paper)]">
      <div className="on-dark bg-black text-white">
        <div className="mx-auto flex max-w-md items-center justify-between px-5 py-3">
          <p className="text-[13px] italic tracking-[0.06em]">
            to/<span className="not-italic font-medium">cycle</span>
          </p>
          <Link
            href="/"
            className="text-[11px] uppercase tracking-[0.28em] text-white transition-opacity duration-500 hover:opacity-60"
          >
            ← back
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-md px-5 pt-10 pb-20">
        <header className="border-b border-[var(--color-border-muted)] pb-6">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--color-text)]">
            new entry
          </p>
          <h1 className="mt-3 text-[30px] font-normal leading-[1.15] tracking-tight text-black">
            today’s <span className="italic">記録</span>
          </h1>
          <p className="mt-3 text-[13px] leading-[1.7] text-[var(--color-text)]">
            気分・体調・症状を 1 分で記録できます。
          </p>
        </header>

        <div className="mt-8">
          <RecordForm />
        </div>

        <p className="mt-10 text-center text-[12px] italic text-[var(--color-text)]">
          記録は 1 日 1 件、上書き保存されます。
        </p>
      </div>
    </main>
  );
}
