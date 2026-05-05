"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
  limit: number;
}

const LIMIT_OPTIONS = [5, 10, 20];

export default function Pagination({ currentPage, totalPages, limit }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  const changeLimit = (newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", String(newLimit));
    params.set("page", "1"); 
    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1 && limit === 5) return null;

  return (
    <div className="flex items-center justify-between px-4 py-6 border-t border-border">
      <div className="flex items-center gap-2">
        <span className="text-sm text-text-muted">Sayfa başına:</span>
        <div className="flex gap-1">
          {LIMIT_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => changeLimit(option)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                limit === option
                  ? "bg-primary text-white border-primary"
                  : "border-border text-text-muted hover:bg-surface-2"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-text-main border border-border rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-2 transition-colors"
          >
            ← Önceki
          </button>

          <span className="text-sm text-text-muted">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-text-main border border-border rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-2 transition-colors"
          >
            Sonraki →
          </button>
        </div>
      )}
    </div>
  );
}
