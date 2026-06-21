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
      className="rounded-[var(--radius-pill)] border border-[var(--color-border-default)] bg-white px-3 py-1.5 text-[12px] font-semibold text-[var(--color-text)] transition-colors duration-300 hover:border-[var(--color-coral)] hover:text-[var(--color-coral)]"
    >
      ログアウト
    </button>
  );
}
