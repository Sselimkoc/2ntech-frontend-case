"use client";

import { useState} from "react";
import { useRouter, useParams } from "next/navigation";

export default function DemoDock() {
  const router = useRouter();
  const params = useParams();

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setIsDark(!isDark);
  };

  const switchUser = () => {
    const currentId = (params.id as string) || "1";
    const nextId = currentId === "1" ? "2" : currentId === "2" ? "3" : "1";
    router.push(`/users/${nextId}`);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center p-1.5 rounded-full backdrop-blur-md bg-surface/80 border border-border shadow-lg transition-all duration-300">
      <button
        onClick={switchUser}
        title="Farklı Kullanıcıya Geç"
        className="p-2.5 rounded-full text-text-muted hover:bg-surface-2 hover:text-primary transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="w-px h-5 bg-border mx-1"></div>
      <button
        onClick={toggleTheme}
        title="Temayı Değiştir"
        className="p-2.5 rounded-full text-text-muted hover:bg-surface-2 hover:text-warning transition-colors"
      >
        {isDark ? (
          <svg
            className="w-5 h-5 text-warning"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
