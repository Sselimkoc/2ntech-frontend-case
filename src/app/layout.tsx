import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NSosyal | Kullanıcı Profili",
  description: "NSosyal kullanıcı profil sayfası.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`antialiased bg-background text-text-main min-h-screen transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
