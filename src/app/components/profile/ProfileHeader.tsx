import FollowButton from "./FollowButton";
import StatsBlock from "../ui/StatBlock";
import AvatarRing from "../ui/AvatarRing";
import Badge from "../ui/Badge";

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
    <header className="relative bg-surface border border-border rounded-2xl xl:rounded-3xl overflow-hidden transition-all duration-300 shadow-sm">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full xl:w-2/3 h-24 bg-primary/10 blur-[60px] -z-10 rounded-full pointer-events-none" />

      <StatsBlock stats={stats} />
      <div className="h-1 bg-primary relative z-20" />

      <div className="h-px bg-border mx-6" />

      <AvatarRing user={user} />

      <div className="flex flex-col items-center gap-1 mt-3 px-6">
        <div className="flex items-center gap-1.5">
          <h1 className="text-base sm:text-lg font-medium text-text-main">
            {user.displayName}
          </h1>
          <Badge isVerified={user.isVerified} />
        </div>

        <p className="text-sm text-text-muted">@{user.username}</p>

        {user.bio && (
          <p className="text-sm text-text-main text-center max-w-xs mt-1 leading-relaxed">
            {user.bio}
          </p>
        )}
      </div>

      <div className="flex justify-center mt-4 pb-6">
        <FollowButton userId={user.id} />
      </div>
    </header>
  );
}
