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
    <main className="min-h-screen bg-[var(--color-paper)]">
      <div className="on-dark bg-black text-white">
        <div className="mx-auto max-w-md px-5 py-3">
          <p className="text-[13px] italic tracking-[0.06em]">
            to/<span className="not-italic font-medium">cycle</span>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-md px-5 pt-14 pb-20">
        <header className="border-b border-[var(--color-border-muted)] pb-6">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--color-text)]">
            sign in
          </p>
          <h1 className="mt-3 text-[30px] font-normal leading-[1.15] tracking-tight text-black">
            <span className="italic">log</span> in
          </h1>
          <p className="mt-3 text-[13px] leading-[1.7] text-[var(--color-text)]">
            メールアドレス宛にログインリンクをお送りします。
          </p>
        </header>

        <div className="mt-10">
          {status === "sent" ? (
            <div className="py-6 text-center">
              <div
                aria-hidden
                className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-surface-raised)] text-[var(--color-accent-ink)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-[20px] font-normal text-black">
                <span className="italic">mail</span> sent
              </h2>
              <p className="mt-3 text-[13px] leading-[1.7] text-[var(--color-text)]">
                <span className="text-black">{email}</span>
                <br />
                宛にログインリンクを送信しました。
              </p>
              <p className="mt-4 text-[12px] text-[var(--color-text)]">
                メール内のリンクをクリックしてログインしてください。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2.5 block text-[11px] uppercase tracking-[0.28em] text-black"
                >
                  email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-[5px] border border-[var(--color-border-default)] bg-white px-3.5 py-3 text-[14px] text-black placeholder-[var(--color-text)] transition-colors duration-500 focus:outline-none focus:border-black"
                />
              </div>

              {status === "error" && (
                <p
                  role="alert"
                  className="rounded-[5px] border border-[var(--color-error)] bg-[var(--color-error)]/5 px-3 py-2.5 text-[12px] text-[var(--color-error)]"
                >
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={!email || status === "loading"}
                className="w-full rounded-[5px] bg-black py-3.5 text-[13px] uppercase tracking-[0.18em] text-white transition-colors duration-500 hover:bg-[var(--color-accent-ink)] disabled:cursor-not-allowed disabled:bg-[var(--color-border-default)] disabled:text-white"
              >
                {status === "loading" ? "送信中…" : "send link"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-8 text-center text-[12px] italic text-[var(--color-text)]">
          初めての方も、メールアドレスだけで利用を始められます。
        </p>
      </div>
    </main>
  );
}
