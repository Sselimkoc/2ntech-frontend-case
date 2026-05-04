import FollowButton from "./FollowButton";
import StatsBlock from "../ui/StatBlock";
import AvatarRing from "../ui/AvatarRing";

export function formatCount(n: number): string {
  return new Intl.NumberFormat("tr-TR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

interface Props {
  user: User;
  stats: UserStats;
}

export default function ProfileHeader({ user, stats }: Props) {
  return (
    <header className="bg-surface border-b border-border rounded-t-3xl">
      <div className="h-4  bg-primary rounded-t-3xl" />

      <StatsBlock stats={stats} />

      <div className="h-px bg-border mx-6" />

      <AvatarRing user={user} />

      <div className="flex flex-col items-center gap-1 mt-3 px-6">
        <div className="flex items-center gap-1.5">
          <h1 className="text-base sm:text-lg font-medium text-text-main">
            {user.displayName}
          </h1>
        </div>

        <p className="text-sm text-text-muted">@{user.username}</p>

        {user.bio && (
          <p className="text-sm text-text-main text-center max-w-xs mt-1">
            {user.bio}
          </p>
        )}
      </div>

      <div className="flex justify-center mt-4 pb-5">
        <FollowButton userId={user.id} />
      </div>
    </header>
  );
}
