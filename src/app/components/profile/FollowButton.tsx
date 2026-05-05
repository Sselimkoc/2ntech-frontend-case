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
        className={`
          px-10 py-2 rounded-full text-sm font-medium
          transition-all duration-200
          disabled:opacity-60 disabled:cursor-not-allowed
          ${
            isFollowing
              ? "border border-border text-text-main hover:border-primary hover:text-primary"
              : "bg-primary text-white hover:bg-primary-hover"
          }
        `}
      >
        {isFollowing ? "Takip Ediliyor" : "Takip Et"}
      </button>

      {error && <p className="text-xs text-primary">{error}</p>}
    </div>
  );
}
