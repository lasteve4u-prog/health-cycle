import Link from "next/link";
import { notFound } from "next/navigation";
import { RecordForm } from "@/app/components/RecordForm";
import { createClient } from "@/lib/supabase/server";
import { type HealthRecord } from "@/types/database";

export const metadata = {
  title: "記録を編集 | health cycle",
};

interface EditRecordPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRecordPage({ params }: EditRecordPageProps) {
  const { id } = await params;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("records")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const record = data as HealthRecord;

  return (
    <main className="min-h-screen bg-[var(--color-surface-soft)]">
      <div className="bg-[var(--color-surface-cream)]">
        <div className="mx-auto flex max-w-md items-center justify-between px-5 pt-5 pb-3">
          <p className="text-[20px] font-bold tracking-tight text-[var(--color-text-strong)]">
            health<span className="text-[var(--color-coral)]">.</span>cycle
          </p>
          <Link
            href="/"
            className="rounded-[var(--radius-pill)] border border-[var(--color-border-default)] bg-white px-3 py-1.5 text-[12px] font-semibold text-[var(--color-text)] transition-colors duration-300 hover:border-[var(--color-coral)] hover:text-[var(--color-coral)]"
          >
            ← 戻る
          </Link>
        </div>

        <div className="mx-auto max-w-md px-5 pb-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--color-coral)]">
            edit entry
          </p>
          <h1 className="mt-2 text-[28px] font-bold leading-[1.25] text-[var(--color-text-strong)]">
            記録を編集
          </h1>
          <p className="mt-3 text-[14px] leading-[1.7] text-[var(--color-text)]">
            過去の記録内容をいつでも更新できます。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-md px-5 pt-6 pb-20">
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-white p-5 shadow-[var(--shadow-soft)]">
          <RecordForm initialRecord={record} />
        </div>

        <p className="mt-6 text-center text-[12px] text-[var(--color-text-soft)]">
          変更は同じ日付の記録に上書き保存されます。
        </p>
      </div>
    </main>
  );
}
