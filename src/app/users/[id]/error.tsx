"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  const router = useRouter();
  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };
  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      <div className="bg-glow opacity-50" />
      <div className="bg-dots" />
      <div className="bg-noise" />

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="bg-surface border border-primary/30 rounded-3xl p-8 md:p-12 text-center shadow-2xl backdrop-blur-xl">
          <div className="relative mb-6 inline-flex">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative w-20 h-20 rounded-2xl bg-surface border border-primary/20 flex items-center justify-center shadow-inner">
              <svg
                className="w-10 h-10 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-text-main mb-2 tracking-tight">
            Veri Akışı Kesildi
          </h2>

          <p className="text-sm text-text-muted mb-8 leading-relaxed max-w-70 mx-auto">
            İstediğin veriye şu an ulaşılamıyor. Daha sonra tekrar denemek iyi
            olabilir.
          </p>
          {/* for debugging */}
          <div className="mb-8 p-3 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-[10px] font-mono text-primary/70 break-all uppercase tracking-widest">
              Error Log: {error.message || "Unknown error"}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleRetry}
              className="w-full py-3 px-6 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(230,0,0,0.3)] active:scale-95"
            >
              Tekrar Dene
            </button>

            <Link
              href="/"
              className="text-xs text-text-muted hover:text-text-main transition-colors underline underline-offset-4"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
