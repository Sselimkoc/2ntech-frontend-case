"use client";

import { useState } from "react";
import PostCard from "./PostCard";
import Pagination from "@/app/components/ui/Pagination";
import MobileInfiniteScroll from "@/app/components/ui/MobileInfiniteScroll";
import { getPosts } from "@/app/lib/posts";

interface Props {
  initialPosts: Post[];
  user: User;
  userId: string;
  totalPages: number;
  currentPage: number;
  currentLimit: number;
}

export default function PostFeed({
  initialPosts,
  user,
  userId,
  totalPages,
  currentPage,
  currentLimit,
}: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(currentPage);
  const [loading, setLoading] = useState(false);

  const loadMorePosts = async () => {
    if (loading || page >= totalPages) return;
    setLoading(true);

    try {
      const nextPage = page + 1;
      const response = await getPosts(userId, nextPage, currentLimit);
      setPosts((prev) => [...prev, ...response.data]);
      setPage(nextPage);
    } catch (error) {
      console.error("Gönderiler yüklenirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  if (posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} user={user} />
        ))}
      </div>

      <MobileInfiniteScroll
        hasMore={page < totalPages}
        loadMore={loadMorePosts}
      />
      <div className="hidden xl:block border-t border-border bg-surface-2/30">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          limit={currentLimit}
        />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
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
  );
}
