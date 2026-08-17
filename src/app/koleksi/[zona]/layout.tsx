// src/app/koleksi/[zona]/layout.tsx

export function generateStaticParams() {
  return [
    { zona: 'alam' },
    { zona: 'budaya' },
    { zona: 'bawah-laut' }
  ];
}

export default function ZonaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}