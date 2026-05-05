"use client";

import { useEffect, useRef } from "react";

interface Props {
  hasMore: boolean;
  loadMore: () => void;
}

export default function MobileInfiniteScroll({ hasMore, loadMore }: Props) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  if (!hasMore) return null;

  return (
    <div ref={loaderRef} className="xl:hidden flex justify-center p-4">
      <span className="text-sm text-text-muted animate-pulse">
        Daha fazla yükleniyor...
      </span>
    </div>
  );
}