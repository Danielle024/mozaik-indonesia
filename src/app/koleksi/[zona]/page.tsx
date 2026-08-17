"use client";

import React, { useEffect, useRef, useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase'; 

interface Artwork {
  id: number;
  zona: string;
  title: string;
  photographer: string;
  image: string;
}

// --- KOMPONEN ANIMASI ---
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); if (currentRef) observer.unobserve(currentRef); }
    }, { threshold: 0.15 });
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);
  
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// --- DATA INFO ZONA ---
const zoneInfo = {
  "alam": { title: "Zona Alam", desc: "Menampilkan keindahan daratan Indonesia dari gunung berkabut, hutan hujan tropis, hingga sabana luas." },
  "budaya": { title: "Zona Budaya", desc: "Merekam denyut budaya Indonesia, menggambarkan hubungan erat antara manusia, nilai, dan ruang melalui visual yang hidup." },
  "bawah-laut": { title: "Bawah Laut & Aerial", desc: "Eksplorasi biodiversitas laut Indonesia dan sudut pandang dinamis dari aerial." }
};

export default function HalamanKoleksi({ params }: { params: Promise<{ zona: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.zona as keyof typeof zoneInfo;
  
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // --- STATE BARU UNTUK MODAL GAMBAR FULL ---
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // Efek untuk mengunci scroll body saat modal terbuka
  useEffect(() => {
    if (selectedArtwork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedArtwork]);

  useEffect(() => {
    async function fetchArtworks() {
      if (!zoneInfo[slug]) return;

      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('zona', slug);
      
      if (error) {
        console.error("Gagal mengambil data dari Supabase:", error.message);
      } else if (data) {
        setArtworks(data as Artwork[]);
      }
      
      setIsLoading(false);
    }
    fetchArtworks();
  }, [slug]);

  const infoZona = zoneInfo[slug];
  if (!infoZona) {
    return notFound();
  }

  const heroImages: Record<string, string> = {
  alam: "/alamawal.jpg",
  budaya: "/budaya-tari.jpg",
  "bawah-laut": "/bunaken.jpeg",
};

const heroImage = heroImages[slug] || "/alamawal.jpg";

  return (
    <main className="min-h-screen text-black font-sans pb-32 overflow-x-hidden relative">
  
  {/* BACKGROUND BATIK */}
  <div className="fixed inset-0 z-[-1] bg-[#FDFCFB]">
    <div
      className="absolute inset-0 opacity-20 pointer-events-none"
      style={{
        backgroundImage: "url('/batikbackground.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  </div>
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-[100] bg-[#FDFCFB]/90 backdrop-blur-md border-b border-gray-100/50 py-4 px-6 md:px-10">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">
          <Link href="/" className="relative w-[110px] h-[60px] cursor-pointer block">
            <Image src="/Pameran Foto Mozaik Indonesia 1.png" alt="Logo Mozaik Indonesia" width={110} height={60} className="object-contain object-left w-full h-full" priority />
          </Link>
          <Link href="/#collection" className="text-[#EBA631] font-bold text-sm tracking-widest uppercase hover:text-black transition-colors">
            &larr; Kembali ke Halaman Utama
          </Link>
        </div>
      </nav>

      {/* HERO SECTION CINEMATIC */}
      <FadeIn delay={100}>
        <section className="relative w-full min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center pt-20">
          <div className="absolute inset-0 w-full h-full bg-gray-900">
            {!isLoading && (
              <Image src={heroImage} alt={infoZona.title} fill className="object-cover object-center opacity-40" priority />
            )}
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-10">
            <p className="text-[#EBA631] text-[14px] font-bold tracking-[0.3em] uppercase mb-4 drop-shadow-md">Exhibition Gallery</p>
            <h1 className="text-[50px] lg:text-[80px] font-black leading-none text-white uppercase tracking-tighter mb-6 drop-shadow-lg">{infoZona.title}</h1>
            <p className="text-gray-200 text-[16px] lg:text-[18px] leading-[1.8] font-medium max-w-2xl mx-auto drop-shadow-md">{infoZona.desc}</p>
          </div>
        </section>
      </FadeIn>

      {/* GRID KARYA */}
      <section className="px-10 max-w-[1440px] mx-auto mt-20 min-h-[400px]">
        {isLoading ? (
          <div className="text-center text-gray-400 font-bold uppercase tracking-widest mt-20">Memuat Karya...</div>
        ) : artworks.length === 0 ? (
          <div className="text-center text-gray-400 font-bold uppercase tracking-widest mt-20">Belum ada karya di zona ini.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {artworks.map((karya, index) => (
              <FadeIn key={karya.id} delay={index * 150}>
                {/* Menambahkan onClick pada kotak polaroid */}
                <div 
                  onClick={() => setSelectedArtwork(karya)}
                  className="bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 group h-full flex flex-col cursor-pointer"
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#F9F9F9] mb-6">
                    <Image src={karya.image} alt={karya.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="mt-auto flex flex-col w-full">
                    {/* BAGIAN TENGAH: Judul & Nama */}
                    <div className="text-center">
                      <h3 className="text-[18px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">{karya.title}</h3>
                      <p className="text-[13px] text-gray-500 font-medium mb-1 italic">{karya.photographer}</p>
                    </div>
                    
                    {/* BAGIAN KANAN: Tombol View Details */}
                    <div className="flex justify-end w-full mt-2 pr-1">
                      {/* Ubah text-gray-400 menjadi text-[#EBA631] */}
                      <span className="text-[11px] font-bold text-[#EBA631] group-hover:text-black transition-colors flex items-center gap-2 uppercase tracking-widest cursor-pointer">
                          View Details <span className="text-lg">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER NAV */}
      <FadeIn delay={200}>
        <div className="mt-24 text-center">
          <Link href="/#collection" className="text-gray-400 hover:text-black transition-colors font-bold tracking-[0.2em] uppercase text-sm">
            [ Back to Collections ]
          </Link>
        </div>
      </FadeIn>

      {/* --- MODAL LIGHTBOX FULL SCREEN --- */}
      {selectedArtwork && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center p-4 md:p-10 opacity-100 transition-opacity duration-300"
          onClick={() => setSelectedArtwork(null)} // Tutup jika background diklik
        >
          {/* Tombol Close */}
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors p-2"
            onClick={() => setSelectedArtwork(null)}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          {/* Kontainer Gambar */}
          <div 
            className="relative w-full max-w-[1200px] h-[75vh] mb-8"
            onClick={(e) => e.stopPropagation()} // Mencegah klik gambar menutup modal
          >
            <Image 
              src={selectedArtwork.image} 
              alt={selectedArtwork.title} 
              fill 
              sizes="100vw"
              className="object-contain" // object-contain memastikan gambar tidak terpotong
              priority
            />
          </div>

          {/* Keterangan Karya */}
          <div className="text-center" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-[24px] md:text-[32px] font-black text-white uppercase tracking-widest mb-2">
              {selectedArtwork.title}
            </h2>
            <p className="text-[#EBA631] text-[16px] md:text-[18px] italic font-medium">
              Karya: {selectedArtwork.photographer}
            </p>
          </div>
        </div>
      )}

    </main>
  );
}

