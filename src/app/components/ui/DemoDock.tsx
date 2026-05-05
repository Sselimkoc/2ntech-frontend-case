"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { mockUsers } from "@/app/lib/users";

export default function DemoDock() {
  const router = useRouter();
  const params = useParams();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });
  const [showUsers, setShowUsers] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const currentId = (params.id as string) || "1";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setShowUsers(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dockRef} className="fixed bottom-6 right-6 z-50">
      {showUsers && (
        <div className="absolute bottom-14 right-0 mb-2 w-52 rounded-2xl backdrop-blur-md bg-surface/90 border border-border shadow-xl overflow-hidden">
          {mockUsers.map((u) => (
            <button
              key={u.id}
              onClick={() => {
                router.push(`/users/${u.id}`);
                setShowUsers(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-surface-2 transition-colors ${
                u.id === currentId ? "bg-surface-2" : ""
              }`}
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-border flex-shrink-0">
                <Image
                  src={u.avatarUrl}
                  alt={u.displayName}
                  fill
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
          title="Kullanıcı Seç"
          className="p-2.5 rounded-full hover:bg-surface-2 transition-colors"
        >
          <svg
            className={`w-5 h-5 text-primary`}
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
          title="Temayı Değiştir"
          className="p-2.5 rounded-full text-text-muted hover:bg-surface-2 hover:text-primary transition-colors"
        >
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
