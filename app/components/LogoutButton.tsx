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
      className="text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-opacity duration-200 hover:opacity-70"
    >
      ログアウト
    </button>
  );
}
