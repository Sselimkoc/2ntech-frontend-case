import { getStats} from "./stats";

export const mockPosts: Post[] = [
  {
    id: "1",
    content:
      "Bugün Next.js App Router ile çalıştım. Server Components mantığını oturtunca yapı gerçekten daha anlaşılır hale geliyor.",
    likeCount: 58,
    commentCount: 12,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    content:
      "TypeScript strict mode açtım. Başta zorladı ama hataları erkenden görmek baya fark yaratıyor.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    likeCount: 34,
    commentCount: 6,
    createdAt: "2024-01-14T09:00:00Z",
  },
  {
    id: "3",
    content:
      "Tailwind ile responsive layout yazmak gerçekten hız kazandırıyor. Eskiden daha fazla uğraşıyordum.",
    likeCount: 41,
    commentCount: 9,
    createdAt: "2024-01-13T14:30:00Z",
  },
  {
    id: "4",
    content:
      "Server ve Client Component ayrımını anlamak biraz zaman aldı ama oturunca mantıklı geliyor.",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    likeCount: 72,
    commentCount: 18,
    createdAt: "2024-01-12T11:00:00Z",
  },
  {
    id: "5",
    content:
      "Optimistic UI denedim. Kullanıcının aksiyon sonrası sonucu anında görmesi deneyimi baya iyileştiriyor.",
    likeCount: 26,
    commentCount: 4,
    createdAt: "2024-01-11T16:45:00Z",
  },
  {
    id: "6",
    content:
      "React Testing Library ile ilk testimi yazdım ve geçti.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=400&fit=crop",
    likeCount: 63,
    commentCount: 11,
    createdAt: "2024-01-10T08:20:00Z",
  },
  {
    id: "7",
    content:
      "Projeye dark mode ekledim. CSS variables ile yönetmek oldukça kolay oldu.",
    likeCount: 37,
    commentCount: 7,
    createdAt: "2024-01-09T13:10:00Z",
  },
  {
    id: "8",
    content:
      "next/image ile görselleri optimize etmek oldukça pratik. Performansa direkt katkısı var.",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    likeCount: 52,
    commentCount: 15,
    createdAt: "2024-01-08T10:55:00Z",
  },
  {
    id: "9",
    content:
      "Pagination’ı URL state ile yönetmek iyi bir çözüm oldu. Refresh yapsan bile state korunuyor.",
    likeCount: 29,
    commentCount: 5,
    createdAt: "2024-01-07T15:30:00Z",
  },
  {
    id: "11",
    content:
      "Accessibility tarafına daha fazla odaklanmaya başladım. Küçük detaylar büyük fark yaratıyor.",
    likeCount: 18,
    commentCount: 3,
    createdAt: "2024-01-05T12:00:00Z",
  },
  {
    id: "12",
    content:
      "Generic TypeScript tipleri yazmak kod tekrarını ciddi anlamda azaltıyor.",
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
    likeCount: 33,
    commentCount: 12,
    createdAt: "2024-01-04T17:20:00Z",
  },
  {
    id: "13",
    content:
      "Promise.all ile API çağrılarını paralel yaptım. Yüklenme süresi gözle görülür şekilde düştü.",
    likeCount: 59,
    commentCount: 19,
    createdAt: "2024-01-03T11:15:00Z",
  },
  {
    id: "14",
    content:
      "ESLint kurallarını baştan sıkı tutmak uzun vadede çok işime yaradı.",
    imageUrl:
      "https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=600&h=400&fit=crop",
    likeCount: 31,
    commentCount: 6,
    createdAt: "2024-01-02T14:50:00Z",
  },
  {
    id: "15",
    content:
      "useMemo ve useCallback gereksiz kullanıldığında işleri daha karmaşık hale getirebiliyor.",
    likeCount: 74,
    commentCount: 25,
    createdAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "16",
    content:
      "Yeni yıla yeni bir proje ile başladım. Bu yıl daha düzenli ilerlemeyi hedefliyorum.",
    imageUrl:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=600&h=400&fit=crop",
    likeCount: 96,
    commentCount: 34,
    createdAt: "2023-12-31T23:00:00Z",
  },
  {
    id: "17",
    content:
      "Yılın son gününde bile kod yazmaya devam ettim. Geçen yıl çok şey öğrendim.",
    likeCount: 121,
    commentCount: 48,
    createdAt: "2023-12-31T20:00:00Z",
  },
];

export async function getPosts(
  userId: string,
  page: number,
  limit: number,
): Promise<PaginatedResponse<Post>> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const stats = await getStats(userId);
  const total = Math.min(stats.postCount, mockPosts.length);

  if (total === 0) {
    return {
      data: [],
      total: 0,
      page,
      limit,
      hasNextPage: false,
    };
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: mockPosts.slice(start, Math.min(end, total)),
    total,
    page,
    limit,
    hasNextPage: end < total,
  };
}
