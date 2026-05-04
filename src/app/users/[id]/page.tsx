import PostCard from "@/app/components/profile/PostCard";
import ProfileHeader from "@/app/components/profile/ProfileHeader";
import { getPosts } from "@/app/lib/posts";
import { getStats } from "@/app/lib/stats";
import { getUserById } from "@/app/lib/users";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function UserProfilePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { page } = await searchParams;

  const currentPage = Number(page ?? "1");

  const [user, stats, paginatedPosts] = await Promise.all([
    getUserById(id),
    getStats(id),
    getPosts(id, currentPage, 5),
  ]);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto">
        <ProfileHeader user={user} stats={stats} />
        <section className="mt-4 bg-surface border border-border  overflow-hidden min-h-screen">
          <h2 className="px-6 py-4 border-b border-border font-semibold text-lg text-text-main">
            Gönderiler
          </h2>
          <div className="flex flex-col">
            {paginatedPosts.data.map((post: Post) => (
              <PostCard key={post.id} post={post} user={user} />
            ))}

            {paginatedPosts.data.length === 0 && (
              <div className="p-8 text-center text-text-muted">
                Henüz bir gönderi bulunmuyor.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
