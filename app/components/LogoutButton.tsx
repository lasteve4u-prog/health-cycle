"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border-2 border-[var(--color-text-primary)] bg-[var(--color-surface-raised)] px-3 py-1.5 text-xs font-bold text-[var(--color-text-primary)] transition-transform duration-100 hover:-translate-y-[1px]"
    >
      ログアウト
    </button>
  );
}
