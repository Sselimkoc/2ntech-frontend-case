import { formatCount } from "@/app/utils/formatCount";
import Image from "next/image";

interface Props {
  post: Post;
  user: User;
}

export default function PostCard({ post, user }: Props) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
  });

  return (
    <article
      aria-label={`${user.displayName} adlı kullanıcının gönderisi`}
      className="border-b border-border p-4 sm:p-6 hover:bg-surface-2/30 transition-colors duration-200"
    >
      <div className="flex gap-3 sm:gap-4">
        <div className="shrink-0">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-border">
            <Image
              src={user.avatarUrl}
              alt={`${user.displayName} profil resmi`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) 40px, 48px"
            />
          </div>
        </div>

        <div className="flex flex-col grow">
          <div className="flex items-center gap-1.5 text-sm sm:text-base">
            <span className="font-semibold text-text-main hover:underline cursor-pointer">
              {user.displayName}
            </span>
            <span className="text-text-muted truncate">@{user.username}</span>
            <span className="text-text-muted">·</span>
            <span className="text-text-muted hover:underline cursor-pointer whitespace-nowrap">
              {formattedDate}
            </span>
          </div>

          <p className="text-text-main mt-1 text-[15px] sm:text-base leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>

          {post.imageUrl && (
            <div className="mt-3 relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-border">
              <Image
                src={post.imageUrl}
                alt="Gönderi görseli"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>
          )}

          <div className="flex items-center gap-6 sm:gap-8 mt-3 text-text-muted">
            <button
              className="btn-ghost group"
              aria-label={`${post.commentCount} yorum. Yorum yapmak için tıklayın.`}
            >
              <svg
                className="w-5 h-5 transition-transform group-active:scale-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="text-sm font-medium">
                {formatCount(post.commentCount)}
              </span>
            </button>

            <button
              className="btn-ghost group"
              aria-label={`${post.likeCount} beğeni. Beğenmek için tıklayın.`}
            >
              <svg
                className="w-5 h-5 transition-transform group-active:scale-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="text-sm font-medium">
                {formatCount(post.likeCount)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
