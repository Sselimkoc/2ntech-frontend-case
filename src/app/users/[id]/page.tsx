import PostCard from "@/app/components/profile/PostCard";
import ProfileHeader from "@/app/components/profile/ProfileHeader";
import Pagination from "@/app/components/ui/Pagination";
import { getPosts } from "@/app/lib/posts";
import { getStats } from "@/app/lib/stats";
import { getUserById } from "@/app/lib/users";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function UserProfilePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { page, limit } = await searchParams;
  const currentLimit = Number(limit ?? "5");
  const currentPage = Number(page ?? "1");

  const [user, stats, paginatedPosts] = await Promise.all([
    getUserById(id),
    getStats(id),
    getPosts(id, currentPage, currentLimit),
  ]);

  const totalPages = Math.ceil(paginatedPosts.total / currentLimit);

  return (
    <main className="min-h-screen relative overflow-x-hidden flex flex-col">
      <div className="bg-glow" />
      <div className="bg-dots" />
      <div className="bg-diagonal" />
      <div className="bg-noise" />

      <div className="w-full max-w-4xl mx-auto pt-6 xl:pt-10 pb-12 px-4 xl:px-0 flex-1 flex flex-col">
        <ProfileHeader user={user} stats={stats} />

        <section className="mt-6 bg-surface border border-border rounded-2xl xl:rounded-3xl overflow-hidden shadow-sm  flex-1 flex flex-col">
          <h2 className="px-6 py-4 border-b border-border font-semibold text-lg text-text-main">
            Gönderiler
          </h2>

          <div className="flex flex-col flex-1">
            {paginatedPosts.data.length > 0 ? (
              paginatedPosts.data.map((post: Post) => (
                <PostCard key={post.id} post={post} user={user} />
              ))
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 md:p-20 text-center ">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/5 mb-6 border border-primary">
                  <svg
                    className="w-10 h-10 text-primary opacity-80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-medium text-text-main mb-2">
                  Burası biraz boş görünüyor.
                </h3>
                <p className="text-base text-text-muted max-w-sm">
                  Bu kullanıcı henüz bir şey paylaşmamış. Takipte kalarak yeni
                  gönderilerden haberdar olabilirsiniz.
                </p>
              </div>
            )}
          </div>

          {paginatedPosts.data.length > 0 && (
            <div className="border-t border-border bg-surface-2/30">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                limit={currentLimit}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
