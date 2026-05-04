export const mockStats: Record<string, UserStats> = {
  "1": {
    followerCount: 462,
    followingCount: 221,
    postCount: 7,
  },
  "2": {
    followerCount: 432,
    followingCount: 210,
    postCount: 12,
  },
};

export async function getStats(userId: string): Promise<UserStats> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const stats = mockStats[userId];

  if (!stats) {
    throw new Error(`Stats not found: ${userId}`);
  }

  return stats;
}
