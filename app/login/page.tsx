"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "loading" | "sent" | "error";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
    } else {
      setStatus("sent");
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      <div className="mx-auto max-w-md px-4 py-16">
        <header className="mb-10 text-center">
          <p className="text-xs tracking-widest text-stone-400 uppercase">health cycle</p>
          <h1 className="mt-1 text-2xl font-semibold text-stone-800">ログイン</h1>
        </header>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          {status === "sent" ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">📩</div>
              <h2 className="text-base font-semibold text-stone-800">メールを送信しました</h2>
              <p className="text-sm text-stone-500 mt-2">
                <span className="font-medium text-stone-700">{email}</span> 宛にログインリンクを送信しました。
              </p>
              <p className="text-xs text-stone-400 mt-3">
                メール内のリンクをクリックしてログインしてください。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-sm text-stone-600 leading-relaxed">
                メールアドレスを入力すると、ログイン用のリンクをお送りします。
              </p>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold tracking-widest text-stone-400 uppercase mb-2">
                  メールアドレス
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl bg-stone-100 px-4 py-3 text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#1C3130] transition"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={!email || status === "loading"}
                className="w-full rounded-full bg-[#1C3130] py-3.5 text-sm font-semibold text-stone-50 transition-all hover:bg-[#2a4a48] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "送信中..." : "ログインリンクを送信"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
