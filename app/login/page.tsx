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
      <div className="bg-[var(--color-surface-strong)]">
        <div className="mx-auto max-w-md px-5 pt-12 pb-14">
          <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-text-secondary)]">
            health cycle
          </p>
          <h1 className="mt-3 text-[32px] font-semibold leading-[36px] tracking-tight text-[var(--color-text-tertiary)]">
            ログイン
          </h1>
          <p className="mt-2 text-sm font-light text-[var(--color-text-primary)]">
            メールアドレス宛にログインリンクをお送りします。
          </p>
        </div>
      </div>

      <div className="mx-auto -mt-8 max-w-md px-5 pb-14">
        <div className="rounded-[5px] border border-[var(--color-border-subtle)] bg-white p-7 shadow-[var(--shadow-md)]">
          {status === "sent" ? (
            <div className="py-4 text-center">
              <div
                aria-hidden
                className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-purple-soft)] text-[var(--color-text-secondary)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-[var(--color-text-tertiary)]">
                メールを送信しました
              </h2>
              <p className="mt-2 text-sm font-light leading-relaxed text-[var(--color-text-primary)]">
                <span className="font-medium text-[var(--color-text-tertiary)]">{email}</span>
                <br />
                宛にログインリンクを送信しました。
              </p>
              <p className="mt-4 text-xs font-light text-[var(--color-text-primary)]">
                メール内のリンクをクリックしてログインしてください。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-medium text-[var(--color-text-tertiary)]"
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
                  className="w-full rounded-[5px] border border-[var(--color-border-default)] bg-white px-3 py-2.5 text-sm font-normal text-[var(--color-text-tertiary)] placeholder-[var(--color-text-primary)]/50 transition-shadow duration-200 focus:outline-none focus:border-[var(--color-text-secondary)] focus:shadow-[var(--shadow-focus)]"
                />
              </div>

              {status === "error" && (
                <p
                  role="alert"
                  className="rounded-[5px] border border-[var(--color-error)]/30 bg-[var(--color-error)]/5 px-3 py-2 text-xs font-medium text-[var(--color-error)]"
                >
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={!email || status === "loading"}
                className="w-full rounded-[5px] bg-[var(--color-text-secondary)] py-2.5 text-sm font-medium text-[var(--color-text-inverse)] shadow-[var(--shadow-sm)] transition-colors duration-200 hover:bg-[var(--color-purple-hover)] disabled:cursor-not-allowed disabled:bg-[var(--color-text-secondary)]/40"
              >
                {status === "loading" ? "送信中…" : "ログインリンクを送信"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-5 text-center text-xs font-light text-[var(--color-text-primary)]">
          初めての方も、メールアドレスだけで利用を始められます。
        </p>
      </div>
    </main>
  );
}
