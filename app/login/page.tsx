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
    <main className="min-h-screen bg-white">
      <div className="bg-black text-white">
        <div className="mx-auto max-w-md px-5 py-2.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em]">
            health cycle
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-md px-5 pt-12 pb-16">
        <header className="border-b border-black pb-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black">
            sign in
          </p>
          <h1 className="mt-2 text-[28px] font-bold leading-[32px] text-black">
            ログイン
          </h1>
          <p className="mt-2 text-sm font-normal text-[var(--color-text)]">
            メールアドレス宛にログインリンクをお送りします。
          </p>
        </header>

        <div className="mt-8">
          {status === "sent" ? (
            <div className="py-4 text-center">
              <div
                aria-hidden
                className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-black">
                メールを送信しました
              </h2>
              <p className="mt-2 text-sm font-normal text-[var(--color-text)]">
                <span className="font-bold text-black">{email}</span>
                <br />
                宛にログインリンクを送信しました。
              </p>
              <p className="mt-3 text-xs font-normal text-[var(--color-text)]">
                メール内のリンクをクリックしてログインしてください。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-black"
                >
                  メールアドレス
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-[4px] border border-[var(--color-border-default)] bg-white px-3 py-3 text-sm font-normal text-black placeholder-[var(--color-text)] transition-colors duration-200 focus:outline-none focus:border-black"
                />
              </div>

              {status === "error" && (
                <p
                  role="alert"
                  className="border border-[var(--color-error)] bg-[var(--color-error)]/5 px-3 py-2 text-xs font-bold text-[var(--color-error)]"
                >
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={!email || status === "loading"}
                className="w-full rounded-full bg-black py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:bg-[#1a1a1a] disabled:cursor-not-allowed disabled:bg-[var(--color-border-default)] disabled:text-white"
              >
                {status === "loading" ? "送信中…" : "ログインリンクを送信"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs font-normal text-[var(--color-text)]">
          初めての方も、メールアドレスだけで利用を始められます。
        </p>
      </div>
    </main>
  );
}
