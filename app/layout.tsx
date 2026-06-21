import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "health cycle",
  description: "PMS と体調を毎日記録する",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--color-surface-soft)]">{children}</body>
    </html>
  );
}
