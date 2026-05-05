"use client";

import { useProfile } from "@/app/context/UserContext";
import StatItem from "./StatItem";

export default function StatsBlock({
  stats,
}: {
  stats: UserStats;
}) {
  const { followerCount } = useProfile();

  return (
    <div className="grid grid-cols-3 py-3 sm:py-4">
      <StatItem value={stats.postCount} label="Gönderi" />
      <div className="flex items-center justify-center border-x border-border">
        <StatItem value={followerCount} label="Takipçi" />
      </div>
      <StatItem value={stats.followingCount} label="Takip" />
    </div>
  );
}