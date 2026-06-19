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
    <main className="min-h-screen bg-[var(--color-surface-muted)]">
      <div className="mx-auto max-w-md px-5 py-16">
        <header className="mb-10">
          <p className="text-[11px] font-bold tracking-[0.22em] text-[var(--color-text-primary)] uppercase">
            health / cycle
          </p>
          <h1 className="mt-2 text-4xl font-extrabold leading-none text-[var(--color-text-primary)]">
            ログイン.
          </h1>
        </header>

        <div className="rounded-[24px] border-2 border-[var(--color-text-primary)] bg-[var(--color-surface-raised)] p-7 shadow-[var(--shadow-2)]">
          {status === "sent" ? (
            <div className="py-4 text-center">
              <div
                className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[var(--color-text-primary)] bg-[var(--color-surface-strong)] text-2xl"
                aria-hidden
              >
                ✉
              </div>
              <h2 className="text-xl font-extrabold text-[var(--color-text-primary)]">
                メールを送信しました
              </h2>
              <p className="mt-3 text-sm text-[var(--color-text-primary)]/70 leading-relaxed">
                <span className="font-semibold text-[var(--color-text-primary)]">{email}</span>
                <br />
                宛にログインリンクを送信しました。
              </p>
              <p className="mt-4 text-xs text-[var(--color-text-primary)]/50">
                メール内のリンクをクリックしてログインしてください。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-sm leading-relaxed text-[var(--color-text-primary)]/70">
                メールアドレスを入力すると、ログイン用のリンクをお送りします。
              </p>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[11px] font-bold tracking-[0.22em] uppercase text-[var(--color-text-primary)]"
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
                  className="w-full rounded-[16px] border-2 border-[var(--color-text-primary)] bg-[var(--color-surface-raised)] px-4 py-3 text-base font-medium text-[var(--color-text-primary)] placeholder-[var(--color-text-primary)]/30 transition-shadow duration-100 focus:outline-none focus:shadow-[var(--shadow-card-strong)]"
                />
              </div>

              {status === "error" && (
                <p
                  role="alert"
                  className="rounded-[12px] border-2 border-[var(--color-text-primary)] bg-[var(--color-surface-raised)] px-3 py-2 text-sm font-semibold text-[var(--color-text-primary)]"
                >
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={!email || status === "loading"}
                className="w-full rounded-[20.8px] border-2 border-[var(--color-text-primary)] bg-[var(--color-text-primary)] py-4 text-base font-bold text-[var(--color-surface-muted)] shadow-[var(--shadow-2)] transition-transform duration-100 hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[rgb(16,24,32)_2px_2px_0px_0px] disabled:cursor-not-allowed disabled:bg-[var(--color-surface-raised)] disabled:text-[var(--color-text-primary)]/30 disabled:shadow-none disabled:hover:translate-x-0 disabled:hover:translate-y-0"
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
