"use client";

import { useProfile } from "@/app/context/UserContext";

export default function FollowButton() {
  const { isFollowing, isPending, error, toggle } = useProfile();

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={toggle}
        disabled={isPending}
        aria-label={isFollowing ? "Takibi bırak" : "Takip et"}
        className={`btn-follow ${isFollowing ? "bg-primary/10 border-primary text-primary" : ""}`}
      >
        {isFollowing ? "Takip Ediliyor" : "Takip Et"}
      </button>

      {error && <p className="text-xs text-primary">{error}</p>}
    </div>
  );
}
