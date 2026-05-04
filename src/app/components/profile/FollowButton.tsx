"use client";

interface Props {
  userId: string;
}

export default function FollowButton({ userId }: Props) {
  return (
    <button
      className={`
        px-10 py-2 rounded-full text-sm font-medium
        border border-border text-text-main hover:border-primary hover:text-primary
      `}
    >
      {"Takip Et"}
    </button>
  );
}
