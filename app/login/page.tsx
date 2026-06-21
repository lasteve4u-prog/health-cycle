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
    <main className="min-h-screen bg-[var(--color-surface-soft)]">
      <div className="bg-[var(--color-surface-cream)]">
        <div className="mx-auto max-w-md px-5 pt-5 pb-3">
          <p className="text-[20px] font-bold tracking-tight text-[var(--color-text-strong)]">
            health<span className="text-[var(--color-coral)]">.</span>cycle
          </p>
        </div>

        <div className="mx-auto max-w-md px-5 pb-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--color-coral)]">
            sign in
          </p>
          <h1 className="mt-2 text-[28px] font-bold leading-[1.25] text-[var(--color-text-strong)]">
            ログイン
          </h1>
          <p className="mt-3 text-[14px] leading-[1.7] text-[var(--color-text)]">
            メールアドレス宛にログインリンクをお送りします。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-md px-5 pt-6 pb-20">
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-white p-6 shadow-[var(--shadow-soft)]">
          {status === "sent" ? (
            <div className="py-4 text-center">
              <div
                aria-hidden
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-coral)] text-white shadow-[var(--shadow-glow)]"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-[20px] font-bold text-[var(--color-text-strong)]">
                メールを送信しました
              </h2>
              <p className="mt-3 text-[14px] leading-[1.7] text-[var(--color-text)]">
                <span className="font-bold text-[var(--color-text-strong)]">{email}</span>
                <br />
                宛にログインリンクを送信しました。
              </p>
              <p className="mt-4 text-[12px] text-[var(--color-text-soft)]">
                メール内のリンクをクリックしてログインしてください。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[14px] font-bold text-[var(--color-text-strong)]"
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
                  className="w-full rounded-[var(--radius-md)] border border-[var(--color-border-default)] bg-white px-4 py-3 text-[14px] text-[var(--color-text)] placeholder-[var(--color-text-soft)] transition-colors duration-300 focus:border-[var(--color-coral)] focus:outline-none"
                />
              </div>

              {status === "error" && (
                <p
                  role="alert"
                  className="rounded-[var(--radius-md)] border border-[var(--color-error)] bg-white px-4 py-3 text-[13px] font-semibold text-[var(--color-error)]"
                >
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={!email || status === "loading"}
                className="w-full rounded-[var(--radius-pill)] bg-[var(--color-coral)] py-4 text-[15px] font-bold text-white shadow-[var(--shadow-glow)] transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:bg-[var(--color-border-default)] disabled:text-white disabled:shadow-none"
              >
                {status === "loading" ? "送信中…" : "ログインリンクを送る"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-[12px] text-[var(--color-text-soft)]">
          初めての方も、メールアドレスだけで利用を始められます。
        </p>
      </div>
    </main>
  );
}
