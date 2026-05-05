"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { mockUsers } from "@/app/lib/users";

export default function DemoDock() {
  const router = useRouter();
  const params = useParams();

  const [showUsers, setShowUsers] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);

  const currentId = (params.id as string) || "1";

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const nextTheme = !prev;
      if (nextTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return nextTheme;
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setShowUsers(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (e.shiftKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        toggleTheme();
      }

      if (e.shiftKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
        const currentIndex = mockUsers.findIndex((u) => u.id === currentId);
        const nextIndex = (currentIndex + 1) % mockUsers.length;
        router.push(`/users/${mockUsers[nextIndex].id}`);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentId, router, toggleTheme]);

  return (
    <div ref={dockRef} className="fixed bottom-6 right-6 z-50">
      {showUsers && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute bottom-14 right-0 mb-2 w-52 rounded-2xl backdrop-blur-md bg-surface/90 border border-border shadow-xl overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-200"
        >
          {mockUsers.map((u) => (
            <button
              key={u.id}
              role="menuitem"
              onClick={() => {
                router.push(`/users/${u.id}`);
                setShowUsers(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors text-left ${
                u.id === currentId ? "bg-surface-2" : "hover:bg-surface-2"
              }`}
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-border shrink-0">
                <Image
                  src={u.avatarUrl}
                  alt={u.displayName}
                  fill
                  priority
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-start min-w-0">
                <span className="text-sm font-medium text-text-main truncate w-full">
                  {u.displayName}
                </span>
                <span className="text-xs text-text-muted truncate w-full">
                  @{u.username}
                </span>
              </div>
              {u.id === currentId && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary ml-auto shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center p-1.5 rounded-full backdrop-blur-md bg-surface/80 border border-border shadow-lg">
        <button
          onClick={() => setShowUsers(!showUsers)}
          aria-expanded={showUsers}
          aria-haspopup="true"
          aria-label="Kullanıcı Değiştir"
          className="relative group p-2.5 rounded-full text-text-muted hover:bg-surface-2 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2.5 py-1.5 rounded-lg bg-surface border border-border shadow-lg text-xs font-medium text-text-main opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap flex items-center gap-2 translate-y-1 group-hover:translate-y-0">
            Kullanıcı Seç
            <span className="flex items-center gap-0.5 text-[10px] text-text-muted">
              <kbd className="bg-surface-2 border border-border rounded px-1.5 py-0.5 font-sans">
                Shift
              </kbd>
              <kbd className="bg-surface-2 border border-border rounded px-1.5 py-0.5 font-sans">
                U
              </kbd>
            </span>
          </div>

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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>

        <div className="w-px h-5 bg-border mx-0.5" />

        <button
          onClick={toggleTheme}
          aria-label="Temayı Değiştir"
          className="relative group p-2.5 rounded-full text-text-muted hover:bg-surface-2 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="absolute bottom-full right-0 mb-3 px-2.5 py-1.5 rounded-lg bg-surface border border-border shadow-lg text-xs font-medium text-text-main opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap flex items-center gap-2 translate-y-1 group-hover:translate-y-0">
            Temayı Değiştir
            <span className="flex items-center gap-0.5 text-[10px] text-text-muted">
              <kbd className="bg-surface-2 border border-border rounded px-1.5 py-0.5 font-sans">
                Shift
              </kbd>
              <kbd className="bg-surface-2 border border-border rounded px-1.5 py-0.5 font-sans">
                T
              </kbd>
            </span>
          </div>

          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isDark ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}
