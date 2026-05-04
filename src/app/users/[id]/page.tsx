import { getPosts } from "@/app/lib/posts";
import { getStats } from "@/app/lib/stats";
import { getUserById } from "@/app/lib/users";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function UserProfilePage({ params }: Props) {
  const { id } = await params;
  //todo error handling
  const [user, stats, posts] = await Promise.all([
    getUserById(id),
    getStats(id),
    getPosts(id, 2, 4),
  ]);

  return <pre>{JSON.stringify({ user, stats, posts }, null, 2)}</pre>;
}
