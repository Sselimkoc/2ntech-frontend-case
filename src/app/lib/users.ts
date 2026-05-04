export const mockUsers: User[] = [
  {
    id: "1",
    username: "sselimkoc",
    displayName: "Selim Koc",
    bio: "Software Engineer",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sselimkoc",
    isVerified: true,
    createdAt: "2026-03-01T00:00:00Z",
  },
  {
    id: "2",
    username: "mmusaberdemir",
    displayName: "Musab Erdemir",
    bio: "Product Manager",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=mmusaberdemir",
    isVerified: false,
    createdAt: "2026-03-02T00:00:00Z",
  },
  {
    id: "3",
    username: "aaysecan",
    displayName: "Ayşe Can",
    bio: "UX Designer",
    avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=aysecan",
    isVerified: true,
    createdAt: "2026-03-03T00:00:00Z",
  },
];

export async function getUserById(userId: string): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const user = mockUsers.find((user) => user.id === userId);
  if (!user) {
    throw new Error("User not found");
  }
  console.log(user);
  return user;
}
