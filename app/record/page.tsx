import { RecordForm } from "@/app/components/RecordForm";

export const metadata = {
  title: "体調を記録 | health cycle",
};

export default function RecordPage() {
  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="mx-auto max-w-md px-4 py-10">
        {/* ヘッダー */}
        <header className="mb-10">
          <p className="text-xs tracking-widest text-stone-400 uppercase">health cycle</p>
          <h1 className="mt-1 text-2xl font-semibold text-stone-800">今日の記録</h1>
        </header>

        {/* フォーム */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <RecordForm />
        </div>
      </div>
    </main>
  );
}
