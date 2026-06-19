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
            edit entry
          </p>
          <h1 className="mt-2 text-[28px] font-bold leading-[32px] text-black">
            記録を編集
          </h1>
          <p className="mt-2 text-sm font-normal text-[var(--color-text)]">
            過去の記録内容をいつでも更新できます。
          </p>
        </header>

        <div className="mt-6">
          <RecordForm initialRecord={record} />
        </div>

        <p className="mt-8 text-center text-xs font-normal text-[var(--color-text)]">
          変更は同じ日付の記録に上書き保存されます。
        </p>
      </div>
    </main>
  );
}
