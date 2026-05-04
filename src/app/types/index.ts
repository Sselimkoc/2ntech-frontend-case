interface User {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  isVerified: boolean;
  createdAt: string; // ISO 8601
}

interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  likeCount: number;
  commentCount: number;
  createdAt: string; // ISO 8601
}

interface UserStats {
  followerCount: number;
  followingCount: number;
  postCount: number;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
}
