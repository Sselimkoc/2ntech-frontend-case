import ProfileHeader from "@/app/components/profile/ProfileHeader";
import PostFeed from "@/app/components/post/PostFeed";
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

        <section className="mt-6 bg-surface border border-border rounded-2xl xl:rounded-3xl overflow-hidden shadow-sm flex-1 flex flex-col">
          <h2 className="px-6 py-4 border-b border-border font-semibold text-lg text-text-main">
            Gönderiler
          </h2>

          <PostFeed
            key={`${currentPage}-${currentLimit}`}
            initialPosts={paginatedPosts.data}
            user={user}
            userId={id}
            totalPages={totalPages}
            currentPage={currentPage}
            currentLimit={currentLimit}
          />
        </section>
      </div>
    </main>
  );
}
