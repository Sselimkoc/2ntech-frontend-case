export const mockPosts: Post[] = [
  {
    id: "1",
    content:
      "Next.js App Router gerçekten çok güçlü ve esnek. Server Components ile performans inanılmaz!",
    likeCount: 42,
    commentCount: 8,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    content:
      "TypeScript strict mode kullanmak başlangıçta zor ama sonunda çok değerli.",
    imageUrl: "https://picsum.photos/seed/post2/600/400",
    likeCount: 28,
    commentCount: 5,
    createdAt: "2024-01-14T09:00:00Z",
  },
  {
    id: "3",
    content:
      "Tailwind CSS ile responsive tasarım yapmak hiç bu kadar kolay olmamıştı.",
    likeCount: 35,
    commentCount: 12,
    createdAt: "2024-01-13T14:30:00Z",
  },
  {
    id: "4",
    content:
      "Server Components ve Client Components ayrımını kavramak biraz zaman aldı ama artık çok mantıklı geliyor.",
    imageUrl: "https://picsum.photos/seed/post4/600/400",
    likeCount: 61,
    commentCount: 17,
    createdAt: "2024-01-12T11:00:00Z",
  },
  {
    id: "5",
    content:
      "Optimistic UI update kullanıcı deneyimini inanılmaz derecede iyileştiriyor.",
    likeCount: 19,
    commentCount: 3,
    createdAt: "2024-01-11T16:45:00Z",
  },
  {
    id: "6",
    content:
      "React Testing Library ile yazdığım ilk test geçti. Küçük bir zafer! ",
    imageUrl: "https://picsum.photos/seed/post6/600/400",
    likeCount: 54,
    commentCount: 9,
    createdAt: "2024-01-10T08:20:00Z",
  },
  {
    id: "7",
    content:
      "Dark mode desteği eklemek düşündüğümden çok daha kolaydı. CSS variables hayat kurtarıyor.",
    likeCount: 33,
    commentCount: 6,
    createdAt: "2024-01-09T13:10:00Z",
  },
  {
    id: "8",
    content:
      "next/image komponenti ile görsel optimizasyonu otomatik hale geliyor. Kesinlikle kullanın! ",
    imageUrl: "https://picsum.photos/seed/post8/600/400",
    likeCount: 47,
    commentCount: 14,
    createdAt: "2024-01-08T10:55:00Z",
  },
  {
    id: "9",
    content:
      "URL-based state management pagination için mükemmel bir çözüm. Sayfayı yenilesen bile state korunuyor.",
    likeCount: 22,
    commentCount: 4,
    createdAt: "2024-01-07T15:30:00Z",
  },
  {
    id: "10",
    content:
      "Skeleton loading shimmer effect ile uygulama çok daha profesyonel görünüyor. ",
    imageUrl: "https://picsum.photos/seed/post10/600/400",
    likeCount: 38,
    commentCount: 7,
    createdAt: "2024-01-06T09:40:00Z",
  },
  {
    id: "11",
    content:
      "Accessibility konusunda ne kadar az şey bildiğimi fark ettim. ARIA labels çok önemli!",
    likeCount: 15,
    commentCount: 2,
    createdAt: "2024-01-05T12:00:00Z",
  },
  {
    id: "12",
    content:
      "Generic TypeScript tipleri yazmak kodun ne kadar reusable olduğunu artırıyor.",
    imageUrl: "https://picsum.photos/seed/post12/600/400",
    likeCount: 29,
    commentCount: 11,
    createdAt: "2024-01-04T17:20:00Z",
  },
  {
    id: "13",
    content:
      "Promise.all ile paralel API çağrısı yapmak sayfa yükleme süresini yarıya indirdi.",
    likeCount: 51,
    commentCount: 16,
    createdAt: "2024-01-03T11:15:00Z",
  },
  {
    id: "14",
    content:
      "ESLint kurallarını baştan sıkı tutmak sonradan çok işe yarıyor. Teknik borç birikiyor yoksa.",
    imageUrl: "https://picsum.photos/seed/post14/600/400",
    likeCount: 24,
    commentCount: 5,
    createdAt: "2024-01-02T14:50:00Z",
  },
  {
    id: "15",
    content:
      "useCallback ve useMemo'yu gereksiz yere kullanmak performansı artırmıyor, aksine zorlaştırıyor.",
    likeCount: 67,
    commentCount: 23,
    createdAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "16",
    content: "2024'e yeni bir proje ile giriyorum. Heyecanlıyım! ",
    imageUrl: "https://picsum.photos/seed/post16/600/400",
    likeCount: 89,
    commentCount: 31,
    createdAt: "2023-12-31T23:00:00Z",
  },
  {
    id: "17",
    content:
      "Yılın son günü kod yazmak ayrı bir his. 2025'te çok şey öğrendim, 2026 daha iyi olacak! ",
    likeCount: 112,
    commentCount: 45,
    createdAt: "2023-12-31T20:00:00Z",
  },
];

export async function getPosts(
  userId: string,
  page: number,
  limit: number,
): Promise<PaginatedResponse<Post>> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (page < 1 || limit < 1) {
    throw new Error("Page and limit must be greater than 0");
  }
  const total = mockPosts.length;
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: mockPosts.slice(start, end),
    total,
    page,
    limit,
    hasNextPage: end < total,
  };
}
