import type { Metadata } from "next";
import "./globals.css"; // <--- Ini wajib ada
import { LanguageProvider } from "@/context/LanguageContext"; // Import Provider Bahasa

export const metadata: Metadata = {
  title: "Mozaik Indonesia",
  description: "Pesona Alam dan Budaya Nusantara",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        {/* Bungkus seluruh konten website dengan LanguageProvider */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}