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
    <main className="min-h-screen relative">
      <div className="bg-glow" />
      <div className="bg-dots" />
      <div className="bg-diagonal" /> 
      <div className="bg-noise" />
      <div className="max-w-2xl mx-auto">
        <ProfileHeader user={user} stats={stats} />
        <section className="mt-4 bg-surface border border-border  overflow-hidden ">
          <h2 className="px-6 py-4 border-b border-border font-semibold text-lg text-text-main">
            Gönderiler
          </h2>
          <div className="flex flex-col">
            {paginatedPosts.data.map((post: Post) => (
              <PostCard key={post.id} post={post} user={user} />
            ))}

            {paginatedPosts.data.length === 0 && (
              <div className="p-16 text-center">
                {/* İkon: Kırmızı parlamalı (Glow) bir dosya veya mesaj ikonu */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 shadow-[0_0_20px_rgba(230,0,0,0.1)]">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>

                <h3 className="text-md  text-text-main mb-1">
                  Burası biraz boş görünüyor.
                </h3>
                <p className="text-sm text-text-muted">
                  Bu kullanıcı henüz bir şey paylaşmamış.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
