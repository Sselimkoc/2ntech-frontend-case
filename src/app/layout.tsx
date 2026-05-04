import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NSosyal",
  description: "NSosyal kullanıcı profil sayfası",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
