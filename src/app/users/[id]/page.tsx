import ProfileHeader from "@/app/components/profile/ProfileHeader";
import { getPosts } from "@/app/lib/posts";
import { getStats } from "@/app/lib/stats";
import { getUserById } from "@/app/lib/users";
import { notFound } from "next/navigation";



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

          <pre className="p-4 text-xs">
            {JSON.stringify(paginatedPosts, null, 2)}
          </pre>
        </div>
      </main>
    );
 
}