"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface ProfileContextValue {
  isFollowing: boolean;
  followerCount: number;
  isPending: boolean;
  error: string | null;
  toggle: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}

interface Props {
  children: React.ReactNode;
  initialFollowerCount: number;
  initialIsFollowing?: boolean;
}
//for debugging 
// async function mockToggleFollow(): Promise<void> {
//   await new Promise((res) => setTimeout(res, 800));
//   if (Math.random() < 0.2) throw new Error("Sunucu hatası");
// }

export function ProfileProvider({
  children,
  initialFollowerCount,
  initialIsFollowing = false,
}: Props) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [followerCount, setFollowerCount] = useState(initialFollowerCount);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = useCallback(async () => {
    if (isPending) return;

    const nextFollowing = !isFollowing;

    setIsFollowing(nextFollowing);
    setFollowerCount((prev) => (nextFollowing ? prev + 1 : prev - 1));
    setIsPending(true);
    setError(null);

    try {
      await mockToggleFollow();
    } catch {
      // Rollback
      setIsFollowing(isFollowing);
      setFollowerCount(initialFollowerCount);
      setError(
        nextFollowing
          ? "Takip işlemi gerçekleştirilemedi. Lütfen tekrar dene."
          : "Takip bırakma işlemi gerçekleştirilemedi. Lütfen tekrar dene.",
      );
    } finally {
      setIsPending(false);
    }
  }, [isPending, isFollowing, initialFollowerCount]);

  return (
    <ProfileContext.Provider
      value={{ isFollowing, followerCount, isPending, error, toggle }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
