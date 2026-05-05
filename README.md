# NSosyal — Frontend Case Study

NSosyal Frontend Developer teknik değerlendirme projesidir.
Modern web geliştirme standartları dikkate alınarak geliştirilmiş bir sosyal medya profil arayüzü içerir.

Temel odak noktaları: performans, kullanıcı deneyimi , erişilebilirlik ve temiz kod yapısı.

---

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development server
npm run dev

# Testleri çalıştır
npm test

# Production build
npm run build
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışır.
Ana sayfa otomatik olarak `/users/1` adresine yönlendirir.

---

## Tech Stack

- **Next.js 15** — App Router
- **TypeScript** — strict mode
- **Tailwind CSS v4**
- **Vitest** + React Testing Library

---

## Proje Yapısı

```
src/app/
├── users/[id]/
│   ├── page.tsx        # Profil sayfası (Server Component)
│   ├── loading.tsx     # Skeleton state
│   └── error.tsx       # Error boundary
├── components/
│   ├── profile/        # ProfileHeader, FollowButton
│   ├── posts/          # PostCard, PostFeed
│   └── ui/             # Reusable UI components
├── lib/
│   ├── users.ts        # Mock user API
│   ├── posts.ts        # Mock posts API
│   └── stats.ts        # Mock stats API
├── types/
│   └── index.ts        # TypeScript interface'leri
├── context/
│   └── UserContext.tsx #ContextAPI tanımlaması
├── utils/
│   └── formatCount.tsx #Sayı formatlama
```

---

## Mimari Kararlar

### Server / Client Ayrımı

`page.tsx` Server Component olarak tasarlandı. Veriler (`getUser`, `getStats`, `getPosts`) server tarafında `Promise.all` ile paralel çekiliyor. Client componentler sadece interaktif alanlarda kullanılıyor:

| Component       | Tür    | Sebep         |
| --------------- | ------ | ------------- |
| `page.tsx`      | Server | Data fetching |
| `ProfileHeader` | Server | Statik render |
| `FollowButton`  | Client | Optimistic UI |
| `Pagination`    | Client | Router state  |
| `DemoDock`      | Client | Debug tools   |

### Mock API

Backend simülasyonu için mock servisler kullanıldı. Her request'e 300ms delay eklendi. `getPosts` pagination destekliyor, `getStats` kullanıcıya özel veri döndürüyor.

### URL-Based Pagination

Pagination tamamen URL üzerinden yönetiliyor:

```
/users/1?page=2&limit=5
```

- Sayfa yenilenince state korunuyor
- Link paylaşılabilir
- Browser geçmişiyle uyumlu

### Optimistic UI

Follow işlemi kullanıcı deneyimini hızlandırmak için optimistic şekilde yapıldı:

1. Kullanıcı butona basar
2. UI anında güncellenir
3. Request arka planda gönderilir
4. Hata olursa rollback yapılır

### Responsive Yapı

- **Desktop:** URL tabanlı pagination
- **Mobil/Tablet:** `IntersectionObserver` tabanlı sonsuz scroll

### Erişilebilirlik

- `aria-label` ve `role` attribute'ları eklendi
- Keyboard navigation desteklendi
- Interactive componentler focusable

`DemoDock` klavye kısayolları:

- `Shift + U` → Kullanıcı değiştir
- `Shift + T` → Tema değiştir

---

## Trade-off'lar

### 1. Promise.all Kullanımı

Tüm data paralel çekiliyor. Herhangi bir request fail olursa tüm sayfa error state'e düşüyor. Suspense boundary ile partial rendering yapılabilirdi — ancak kod basitliği için mevcut yapı tercih edildi.

### 2. Tema Yönetimi

Dark/light mode tercihi `localStorage` yerine DOM class üzerinden yönetiliyor. SSR hydration mismatch'i önlemek ve ekstra dependency kullanmamak için bu yaklaşım tercih edildi. Gerçek uygulamada `next-themes` veya cookie tabanlı çözüm kullanılabilir.

### 3. Global State Kullanılmaması

Redux / Zustand kullanılmadı. Scope küçük, prop drilling kontrol edilebilir seviyede .

### 4. Mock Data

Gerçek backend yerine mock servisler kullanıldı. `Post` interface'inde `userId` alanı bulunmadığı için post havuzu tüm kullanıcılar arasında ortaktır — her kullanıcının post sayısı `getStats`'tan alınır.

---

## Test

```bash
npm test
```

Kapsanan alanlar:

- Pagination logic ve limit değişimi
- DemoDock tema toggle ve DOM manipülasyonları
- UI render doğrulama

---

## Geliştirilebilecek Alanlar

- React Query / SWR ile caching
- Global State Yönetimi
- E2E test (Playwright)
- Daha kapsamlı test coverage
