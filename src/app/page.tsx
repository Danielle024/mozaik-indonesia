"use client";

import { useLanguage } from '@/context/LanguageContext';
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RSVPForm from '@/components/RSVPForm';
import HUTModal from '@/components/HUTModal';

// --- KOMPONEN ANIMASI FADE-IN (DIPERBARUI) ---
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (currentRef) observer.unobserve(currentRef); // Cukup animasi 1x saja
        }
      },
      { 
        root: null,
        rootMargin: "0px", // Trigger ketika masuk layar
        threshold: 0.15 // Sedikit lebih sensitif (15% elemen terlihat langsung animasi)
      }
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={ref}
      // Tambahkan class 'transform' agar translate-y bekerja maksimal di semua browser
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function Home() { 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // TAMBAHKAN BARIS INI: Untuk menyimpan status gambar yang diklik
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // PANGGIL FITUR BAHASA DI SINI (Digabungkan ke dalam Home yang asli)
  const { lang, setLang, t } = useLanguage();

  const agendas = [
    { 
      day: "SAB", date: "24", month: "OKT",
      title: "Opening Ceremony & Talkshow", 
      desc: "Peresmian pameran dan dialog pembukaan interaktif bersama kurator serta fotografer utama." 
    },
    { 
      day: "MIN", date: "25", month: "OKT", 
      title: "Workshop & Dialog", 
      desc: "Sesi edukasi dan dialog mendalam mengenai teknik fotografi serta kurasi karya visual." 
    },
    { 
      day: "SEN", date: "26", month: "OKT", 
      title: "Diskusi Panel Padat (Sesi 1)", 
      desc: "Pemaparan ringkasan pameran yang dipadatkan melalui ruang diskusi komunitas." 
    },
    { 
      day: "SEL", date: "27", month: "OKT", 
      title: "Diskusi Panel Padat (Sesi 2)", 
      desc: "Lanjutan sesi bedah karya dan eksplorasi narasi visual Nusantara." 
    },
    { 
      day: "RAB", date: "28", month: "OKT", 
      title: "Sumpah Pemuda: Performing Arts & Closing", 
      desc: "Puncak acara bertepatan dengan Hari Sumpah Pemuda. Dimeriahkan oleh performing arts sekaligus upacara penutupan pameran." 
    }
  ];

  const contributors = [
    { name: "Nama Pemateri 1", role: "Creative Director", image: "/contributors2.png", isActive: false },
    { name: "Ibu Nining", role: "Anthropologist & Cultural Memory Archivist.", image: "/ibunining.png", isActive: true },
    { name: "Hana Pratiwi", role: "Archivist & Curator.", image: "/contributors3.png", isActive: false },
    { name: "Kartini Dewi", role: "Documentary Film Maker.", image: "/contributors2.png", isActive: false },
  ];

  const sponsors = [
    "RP1 MICE", "NATIONAL GALLERY CIRCLE", "JAKARTA CREATIVE FORUM", "ARCHIPELAGO FUTURES", "NUSANTARA MEDIA", "MANDIRI"
  ];
  const scrollingSponsors = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

  return (
    // Class bg-color pada <main> harus tetap kosong
    <main className="min-h-screen text-black pb-32 overflow-x-hidden relative">
      <HUTModal /> {/* Tambahkan di sini */}
      {/* --- BACKGROUND WRAPPER (Warna Dasar & Batik Digabung) --- */}
      <div className="fixed inset-0 z-[-1] bg-[#FDFCFB]">
        <div 
          // Kita tes dengan opacity-20 (20%) agar terlihat jelas dulu
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "url('/batikbackground.webp')",
            backgroundSize: "cover",       
            backgroundPosition: "center",  
            backgroundRepeat: "no-repeat"  
          }}
        />
      </div>
      
      {/* SUNTIKAN CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          html { scroll-behavior: smooth; }
          @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
          .animate-marquee { animation: marquee 35s linear infinite; }
          .animate-marquee:hover { animation-play-state: paused; }
        `
      }} />
      
      {/* --- HEADER / NAVBAR (FIXED TOP & DINAMIS) --- */}
      {/* Perubahan: Hapus bg-color, backdrop-blur, dan border pada div ini agar transparan */}
      <div className="fixed top-0 left-0 w-full z-[100] pt-4 pb-2 px-4 md:pt-6 md:pb-3 md:px-10 pointer-events-none">
        
        {/* Tambahkan pointer-events-auto di header agar menu tetap bisa diklik */}
        <header className="relative flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 lg:py-5 bg-[#FCFAF9] shadow-[3px_0_4px_rgba(0,0,0,0.25)] font-serif max-w-[1440px] mx-auto rounded-sm z-50 pointer-events-auto">
          
          {/* BAGIAN KIRI: LOGO */}
          <div className="flex items-center flex-shrink-0">
            {/* AREA KLIK: Hanya pada kotak logo Mozaik saja */}
            <div 
              className="relative w-[75px] h-[40px] sm:w-[90px] sm:h-[50px] lg:w-[110px] lg:h-[60px] mr-3 sm:mr-5 cursor-pointer transition-transform duration-200 ease-out hover:scale-105 active:scale-95"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Image src="/Pameran Foto Mozaik Indonesia 1.png" alt="Logo Mozaik Indonesia" fill className="object-contain object-left" priority />
            </div>

            {/* Garis pemisah dan teks */}
            <div className="h-[30px] sm:h-[45px] w-[1px] bg-gray-300 mr-3 sm:mr-5 hidden xs:block"></div>
            <div className="text-[10px] sm:text-[12px] lg:text-[14px] leading-[1.3] text-black tracking-wide hidden md:block">
              Mozaik Indonesia:<br />Pesona Alam dan<br />Budaya Nusantara
            </div>
          </div>

          {/* BAGIAN TENGAH: MENU DESKTOP (SUDAH DINAMIS) */}
          <div className="flex-1 flex justify-center">
            <nav className="hidden lg:flex flex-row items-center gap-7">
              <a href="#about" className="text-black no-underline hover:text-[#EBA631] transition-colors text-[16.5px] font-medium block">{t.nav.about}</a>
              <a href="#collection" className="text-black no-underline hover:text-[#EBA631] transition-colors text-[16.5px] font-medium block">{t.nav.collection}</a>
              <a href="#schedule" className="text-black no-underline hover:text-[#EBA631] transition-colors text-[16.5px] font-medium block">{t.nav.schedule}</a>
              <a href="#contributors" className="text-black no-underline hover:text-[#EBA631] transition-colors text-[16.5px] font-medium block">{t.nav.contributors}</a>
              <a href="#partners" className="text-black no-underline hover:text-[#EBA631] transition-colors text-[16.5px] font-medium block">{t.nav.partners}</a>
              <a href="#kemitraan" className="hover:text-[#EBA631] transition-colors">{t.nav.partnership}</a>
            </nav>
          </div>

          {/* --- TOMBOL SWITCH BAHASA (ID / EN) --- */}
          <div className="hidden lg:flex items-center gap-2 text-[14px] font-bold tracking-widest mr-8 border-r border-gray-300 pr-8">
            <button 
              onClick={() => setLang('id')} 
              className={`transition-colors ${lang === 'id' ? 'text-[#EBA631]' : 'text-gray-400 hover:text-[#1A1A1A]'}`}
            >
              ID
            </button>
            <span className="text-gray-300">/</span>
            <button 
              onClick={() => setLang('en')} 
              className={`transition-colors ${lang === 'en' ? 'text-[#EBA631]' : 'text-gray-400 hover:text-[#1A1A1A]'}`}
            >
              EN
            </button>
          </div>

          {/* BAGIAN KANAN: TOMBOL PARTNER (SUDAH DINAMIS) */}
          <a 
            href="https://wa.me/6282262485548?text=Halo,%20saya%20tertarik%20menjadi%20mitra%20untuk%20Pameran%20Mozaik%20Indonesia." 
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#EBA631] text-black px-4 py-2 sm:px-6 sm:py-3 lg:px-9 lg:py-3.5 text-[11px] sm:text-[14px] lg:text-[16.5px] tracking-wide whitespace-nowrap flex items-center justify-center hover:bg-orange-50 transition-colors flex-shrink-0 font-light"
          >
            {t.btn.partner}
          </a>
        </header>

        {/* --- MENU DROPDOWN KHUSUS MOBILE (SUDAH DINAMIS) --- */}
        <div 
          className={`lg:hidden absolute left-4 right-4 sm:left-6 sm:right-6 bg-[#FCFAF9] shadow-[0_15px_30px_rgba(0,0,0,0.15)] rounded-b-md overflow-hidden z-40 border-t border-gray-100
            transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isMobileMenuOpen 
              ? 'max-h-[400px] opacity-100 top-[calc(100%-12px)] translate-y-0 visible' 
              : 'max-h-0 opacity-0 top-[calc(100%-12px)] -translate-y-4 invisible pointer-events-none'
            }`}
        >
          <nav className={`flex flex-col items-center py-8 gap-6 transition-transform duration-500 delay-100 ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-2'}`}>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-[#1A1A1A] hover:text-[#EBA631] text-[13px] font-black tracking-[0.2em] uppercase transition-colors duration-300">{t.nav.about}</a>
            <a href="#collection" onClick={() => setIsMobileMenuOpen(false)} className="text-[#1A1A1A] hover:text-[#EBA631] text-[13px] font-black tracking-[0.2em] uppercase transition-colors duration-300">{t.nav.collection}</a>
            <a href="#schedule" onClick={() => setIsMobileMenuOpen(false)} className="text-[#1A1A1A] hover:text-[#EBA631] text-[13px] font-black tracking-[0.2em] uppercase transition-colors duration-300">{t.nav.schedule}</a>
            <a href="#contributors" onClick={() => setIsMobileMenuOpen(false)} className="text-[#1A1A1A] hover:text-[#EBA631] text-[13px] font-black tracking-[0.2em] uppercase transition-colors duration-300">{t.nav.contributors}</a>
            <a href="#partners" onClick={() => setIsMobileMenuOpen(false)} className="text-[#1A1A1A] hover:text-[#EBA631] text-[13px] font-black tracking-[0.2em] uppercase transition-colors duration-300">{t.nav.partners}</a>
            <a href="#kemitraan" onClick={() => setIsMobileMenuOpen(false)} className="text-[#1A1A1A] hover:text-[#EBA631] text-[13px] font-black tracking-[0.2em] uppercase transition-colors duration-300">{t.nav.partnership}</a>
          </nav>
        </div>
      </div>

      {/* --- HERO SECTION (SUDAH DINAMIS & TUNGGAL) --- */}
      <FadeIn delay={100}>
        <section className="max-w-[1440px] mx-auto px-6 sm:px-10 mt-[120px] lg:mt-[180px] flex flex-col lg:flex-row items-center justify-between font-sans">
          
          <div className="w-full lg:w-[50%] pr-0 lg:pr-10">
            <p className="text-[#EBA631] text-[11px] sm:text-[13px] font-bold tracking-[0.15em] uppercase mb-3 lg:mb-4">
              {t.hero.badge}
            </p>
            
            <h1 className="text-[52px] sm:text-[70px] lg:text-[100px] font-black leading-[0.9] tracking-tighter mb-4 text-[#0F0F0F] break-words">
              {t.hero.title1}<br />{t.hero.title2}
            </h1>
            
            <p className="text-gray-500 text-[11px] sm:text-[13px] font-medium tracking-[0.1em] uppercase mb-6 lg:mb-8">
              {t.hero.badge}
            </p>
            
            <p className="text-gray-700 text-[14px] sm:text-[16.5px] leading-[1.7] max-w-md mb-8 lg:mb-10">
              {t.hero.desc}
            </p>

            <div className="flex flex-col gap-3 lg:gap-4 mb-8 lg:mb-10">
              <div className="flex items-center gap-3 border border-[#EBA631] rounded-full px-5 py-2.5 lg:px-6 lg:py-3 w-fit">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EBA631" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span className="text-[#EBA631] font-bold text-[12px] sm:text-[14px] tracking-wide uppercase">
                  {t.hero.date}
                </span>
              </div>
              <div className="flex items-center gap-3 border border-[#EBA631] rounded-full px-5 py-2.5 lg:px-6 lg:py-3 w-fit">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#EBA631" stroke="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <span className="text-[#EBA631] font-bold text-[12px] sm:text-[14px] tracking-wide uppercase">
                  {t.hero.venue}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 lg:gap-8">
              <a href="#collection" className="border border-[#EBA631] bg-[#FCFAF9] px-5 py-3 lg:px-7 lg:py-3.5 text-[12px] sm:text-[14px] font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-orange-50 transition-colors">
                {t.hero.exploreBtn}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              
              <a href="#schedule" className="text-gray-800 text-[14px] sm:text-[16px] flex items-center gap-2 hover:text-[#EBA631] transition-colors font-medium">
                {t.hero.scheduleBtn}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="7" x2="17" y2="17"></line><polyline points="17 7 17 17 7 17"></polyline></svg>
              </a>
            </div>
          </div>

          <div className="w-full lg:w-[50%] mt-12 lg:mt-0 flex justify-center lg:justify-end">
            <Image src="/gambarfix1.png" alt="Koleksi Foto Mozaik Indonesia" width={650} height={750} className="w-full max-w-[650px] h-auto object-contain" priority />
          </div>
          
        </section>
      </FadeIn>

      {/* --- SECTION: TENTANG PAMERAN (FOUNDATION & PURPOSE) --- */}
      <section id="about" className="max-w-[1440px] mx-auto px-10 mt-32 lg:mt-40 font-sans scroll-mt-40">
        <FadeIn>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <p className="text-[#EBA631] text-[13px] font-bold tracking-[0.15em] uppercase mb-4">
                {t.about.badge}
              </p>
              <h2 className="text-[44px] lg:text-[54px] font-black leading-[1.05] tracking-tight text-[#0F0F0F]">
                {t.about.title}
              </h2>
            </div>
            <div className="w-full lg:w-1/2 lg:pl-10">
              <p className="text-gray-700 text-[17px] lg:text-[19px] leading-[1.7]">
                {t.about.desc}
              </p>
            </div>
          </div>
        </FadeIn>

        <hr className="border-gray-200 my-16 lg:my-20" />

        <FadeIn delay={200}>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <div className="w-full lg:w-5/12">
              <h3 className="font-serif text-[40px] lg:text-[46px] leading-[1.1] text-black tracking-tight italic">
                {t.about.quote}
              </h3>
            </div>
            <div className="w-full lg:w-7/12 flex flex-col sm:flex-row gap-10 lg:gap-16">
              <div className="flex-1">
                <h4 className="text-[#EBA631] text-[15px] font-bold mb-4">{t.about.approachTitle}</h4>
                <p className="text-gray-500 text-[15px] leading-[1.7] font-medium">
                  {t.about.approachDesc}
                </p>
              </div>
              <div className="flex-1">
                <h4 className="text-[#EBA631] text-[15px] font-bold mb-4">{t.about.goalTitle}</h4>
                <p className="text-gray-500 text-[15px] leading-[1.7] font-medium">
                  {t.about.goalDesc}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* --- SECTION: VISI & MISI --- */}
      <section className="max-w-[1440px] mx-auto px-10 mt-20 lg:mt-32 font-sans">
        <FadeIn delay={300}>
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {/* Visi */}
            <div className="border-t-[3px] border-[#EBA631] pt-8">
              <h3 className="text-[24px] font-black uppercase tracking-widest text-[#1A1A1A] mb-4">{t.visiMisi.visionTitle}</h3>
              <p className="text-gray-600 text-[16px] leading-[1.8] font-medium">
                {t.visiMisi.visionDesc}
              </p>
            </div>
            {/* Misi */}
            <div className="border-t-[3px] border-[#1A1A1A] pt-8">
              <h3 className="text-[24px] font-black uppercase tracking-widest text-[#1A1A1A] mb-4">{t.visiMisi.missionTitle}</h3>
              <ul className="text-gray-600 text-[16px] leading-[1.8] font-medium list-disc pl-5 space-y-2">
                {/* Looping data Misi agar lebih bersih secara kode */}
                {t.visiMisi.missionItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* --- EXHIBITION COLLECTIONS SECTION --- */}
      <section id="collection" className="max-w-[1440px] mx-auto px-10 mt-32 lg:mt-40 font-sans border-t border-gray-200 pt-20 scroll-mt-40">
        <FadeIn>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-20">
            <div className="w-full lg:w-[55%]">
              <p className="text-[#EBA631] text-[13px] font-bold tracking-[0.15em] uppercase mb-4">
                {t.collection.badge}
              </p>
              <h2 className="text-[48px] lg:text-[64px] font-black leading-[1.05] tracking-tight text-[#0F0F0F]">
                {t.collection.title}
              </h2>
            </div>
            <div className="w-full lg:w-[45%] lg:pt-16">
              <p className="text-gray-600 text-[17px] lg:text-[18px] leading-[1.7] font-medium">
                {t.collection.desc}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Grid 3 Zona */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 mt-16 lg:mt-24">
          
          {/* Zona 1: Alam */}
          <FadeIn delay={100}>
            <Link href="/koleksi/alam" className="block relative w-full aspect-[4/3] bg-gray-100 overflow-hidden group cursor-pointer">
              <Image src="/gambar exhibition.png" alt={t.collection.zones.nature} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-2xl font-bold mb-2">{t.collection.zones.nature}</h3>
                <p className="text-sm text-[#EBA631] font-bold">{t.collection.zones.viewAction} &rarr;</p>
              </div>
            </Link>
          </FadeIn>

          {/* Zona 2: Budaya */}
          <FadeIn delay={300}>
            <Link href="/koleksi/budaya" className="block relative w-full aspect-[4/3] bg-gray-100 overflow-hidden group cursor-pointer">
              <Image src="/budaya.webp" alt={t.collection.zones.culture} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-2xl font-bold mb-2">{t.collection.zones.culture}</h3>
                <p className="text-sm text-[#EBA631] font-bold">{t.collection.zones.viewAction} &rarr;</p>
              </div>
            </Link>
          </FadeIn>

          {/* Zona 3: Bawah Laut & Aerial */}
          <FadeIn delay={500}>
            <Link href="/koleksi/bawah-laut" className="block relative w-full aspect-[4/3] bg-gray-100 overflow-hidden group cursor-pointer">
              <Image src="/bawahlaut.jpg" alt={t.collection.zones.underwater} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-2xl font-bold mb-2">{t.collection.zones.underwater}</h3>
                <p className="text-sm text-[#EBA631] font-bold">{t.collection.zones.viewAction} &rarr;</p>
              </div>
            </Link>
          </FadeIn>

        </div>
      </section>

      {/* --- SCHEDULE / AGENDA SECTION --- */}
      <section
        id="schedule"
        className="max-w-[1440px] mx-auto px-10 mt-32 lg:mt-40 font-sans border-t border-gray-200 pt-20 scroll-mt-40"
      >
        <FadeIn>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-20 mb-16 lg:mb-20">
            <div className="w-full lg:w-[55%]">
              <p className="text-[#EBA631] text-[13px] font-bold tracking-[0.15em] uppercase mb-4">
                {t.schedule.badge}
              </p>

              <h2 className="text-[48px] lg:text-[64px] font-black leading-[1.05] tracking-tight text-[#0F0F0F]">
                {t.schedule.title}
              </h2>
            </div>

            <div className="w-full lg:w-[45%] lg:pt-16">
              <p className="text-gray-600 text-[17px] lg:text-[18px] leading-[1.7] font-medium">
                {t.schedule.desc}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* AGENDA LIST - Mengambil data dinamis dari t.schedule.items */}
        <div className="flex flex-col">
          {t.schedule.items.map((item, index) => (
            <FadeIn key={index} delay={index * 120}>
              <div className="group relative overflow-hidden border-t border-gray-200 cursor-pointer min-h-[220px]">
                
                {/* BACKGROUND IMAGE */}
                <div className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="
                      object-cover
                      opacity-0
                      scale-110
                      group-hover:opacity-100
                      group-hover:scale-100
                      transition-all
                      duration-700
                      ease-out
                    "
                  />

                  {/* SOFT DARK OVERLAY */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-700" />

                  {/* CUSTOM CINEMATIC GRADIENT */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
                    style={{
                      background: `
                        linear-gradient(
                          90deg,
                          rgba(76, 19, 71, 0.85) 0%,
                          rgba(198, 65, 123, 0.65) 45%,
                          rgba(198, 65, 123, 0.20) 75%,
                          rgba(0,0,0,0) 100%
                        )
                      `
                    }}
                  />
                </div>

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center py-12 gap-6 md:gap-10 px-2 transition-all duration-500 group-hover:px-6">
                  
                  {/* DATE */}
                  <div className="flex flex-col w-full md:w-[15%] flex-shrink-0">
                    <span className="text-[#EBA631] text-[14px] font-bold tracking-widest uppercase">
                      {item.day}
                    </span>

                    <span className="text-[58px] font-black leading-none text-[#0F0F0F] group-hover:text-white transition-colors duration-500 my-1">
                      {item.date}
                    </span>

                    <span className="text-gray-400 group-hover:text-gray-200 text-[14px] font-bold tracking-widest uppercase transition-colors duration-500">
                      {item.month}
                    </span>
                  </div>

                  {/* TITLE & DESCRIPTION */}
                  <div className="flex flex-col w-full md:w-[85%] overflow-hidden">
                    <h3 className="text-[24px] lg:text-[30px] font-black leading-[1.2] text-[#0F0F0F] group-hover:text-white transition-all duration-500 group-hover:translate-x-2 max-w-full break-words overflow-hidden">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-500 group-hover:text-gray-200 text-[15px] lg:text-[16px] font-medium mt-3 transition-all duration-500 group-hover:translate-x-2 max-w-3xl">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* GOLD ACCENT LINE */}
                <div className="absolute left-0 top-0 h-full w-[3px] bg-[#EBA631] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* --- CONTRIBUTORS SECTION --- */}
      <section id="contributors" className="max-w-[1440px] mx-auto px-10 mt-32 lg:mt-40 font-sans border-t border-gray-200 pt-20 scroll-mt-40">
        <FadeIn>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-20 mb-16 lg:mb-20">
            <div className="w-full lg:w-[55%]">
              <p className="text-[#EBA631] text-[13px] font-bold tracking-[0.15em] uppercase mb-4">
                {t.contributors.badge}
              </p>
              <h2 className="text-[48px] lg:text-[64px] font-black leading-[1.05] tracking-tight text-[#0F0F0F]">
                {t.contributors.title}
              </h2>
            </div>
            <div className="w-full lg:w-[45%] lg:pt-16">
              <p className="text-gray-600 text-[17px] lg:text-[18px] leading-[1.8] font-medium">
                {t.contributors.desc}
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.contributors.list.map((person, index) => (
            <FadeIn key={index} delay={index * 150}>
              <div className="group relative overflow-hidden rounded-[28px] bg-[#F5F5F5] border border-gray-200 hover:border-[#C6417B]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(76,19,71,0.15)]">
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <Image src={person.image} alt={person.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{ background: `linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(76,19,71,0.72) 70%, rgba(198,65,123,0.88) 100%)` }}
                  />
                </div>
                <div className="p-7">
                  <div className="mb-4">
                    <p className="text-[#EBA631] text-[12px] font-bold tracking-[0.18em] uppercase mb-2">{person.role}</p>
                    <h3 className="text-[28px] leading-[1.15] font-black text-[#111111]">{person.name}</h3>
                  </div>
                  <p className="text-gray-600 text-[15px] leading-[1.8]">{person.desc}</p>
                </div>
                <div className="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-[#EBA631] to-[#C6417B] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>


        {/* --- VENUE SECTION & FLOOR PLAN --- */}
      <section id="venue" className="max-w-[1440px] mx-auto px-10 mt-32 lg:mt-40 font-sans border-t border-gray-200 pt-20 scroll-mt-40">
        <FadeIn>
          <div className="text-center max-w-[900px] mx-auto">
            <p className="text-[#7A2462] text-[48px] lg:text-[62px] font-black leading-none tracking-tight mb-8">
              {t.venue.badge}
            </p>
            <p className="text-gray-700 text-[18px] leading-[1.8] max-w-[950px] mx-auto">
              {t.venue.descPrefix} <span className="font-bold">{t.venue.boldText}</span>{t.venue.descSuffix}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mt-14 overflow-hidden rounded-sm">
            <Image src="/gedungaamaramis.jpg" alt="Gedung A.A. Maramis" width={1400} height={600} className="w-full object-cover hover:scale-[1.02] transition-transform duration-700" />
          </div>
        </FadeIn>

        <FadeIn delay={400}>
          <div className="mt-10 flex flex-col lg:flex-row gap-10 items-end">
            <div className="border border-gray-200 p-3 bg-white shadow-sm w-fit">
              {/* --- TAMBAHAN TAG <a> DIMULAI DI SINI --- */}
              <a 
                href="https://maps.app.goo.gl/71Q7YV2bcyg3dwXw6" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block hover:opacity-80 transition-opacity cursor-pointer"
              >
                <Image src="/mapgedung.png" alt="Map Gedung A.A Maramis" width={380} height={280} className="object-cover" />
              </a>
              {/* --- TAMBAHAN TAG <a> BERAKHIR DI SINI --- */}
            </div>
            <div className="pb-4">
              <h3 className="text-[32px] font-medium text-[#222] mb-4">{t.venue.mapTitle}</h3>
              <p className="text-gray-700 text-[22px] leading-[1.8]">{t.venue.mapAddress}</p>
            </div>
          </div>
        </FadeIn>

        {/* FLOOR PLAN */}
        <FadeIn delay={600}>
          <div className="mt-24 pt-16 border-t border-gray-100">
            <div className="text-center mb-16">
              <h3 className="text-[#7A2462] text-[48px] lg:text-[62px] font-black leading-none tracking-tight mb-6">
                {t.venue.floorPlanTitle}
              </h3>
              <p className="text-gray-600 text-[18px] max-w-2xl mx-auto leading-[1.8]">
                {t.venue.floorPlanDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
              
              {/* LANTAI 1 */}
              <div className="flex flex-col group">
                <div 
                  className="relative w-full aspect-[4/3] bg-[#FDFCFB] border border-gray-200 p-4 overflow-hidden mb-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedImage('/floorplan1.png')}
                >
                  <Image src="/floorplan1.png" alt={t.venue.f2Title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain transition-transform duration-700 group-hover:scale-[1.03] p-4" />
                </div>
                <div className="text-center">
                  <h4 className="text-[20px] font-bold text-[#222] uppercase tracking-wide">
                    {t.venue.f2Title}
                  </h4>
                </div>
              </div>

              {/* LANTAI 2 */}
              <div className="flex flex-col group">
                <div 
                  className="relative w-full aspect-[4/3] bg-[#FDFCFB] border border-gray-200 p-4 overflow-hidden mb-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedImage('/floorplan2.png')}
                >
                  <Image src="/floorplan2.png" alt={t.venue.f2Title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain transition-transform duration-700 group-hover:scale-[1.03] p-4" />
                </div>
                <div className="text-center">
                  <h4 className="text-[20px] font-bold text-[#222] uppercase tracking-wide">
                    {t.venue.f2Title}
                  </h4>
                </div>
              </div>

            </div>
          </div>
        </FadeIn>
      </section>


      {/* --- PARTNERS SECTION --- */}
      <section id="partners" className="max-w-[1440px] mx-auto px-10 mt-32 lg:mt-40 font-sans border-t border-gray-200 pt-20 pb-20 scroll-mt-40">
        <FadeIn>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-20 mb-16">
            <div className="w-full lg:w-[55%]">
              <p className="text-[#EBA631] text-[13px] font-bold tracking-[0.15em] uppercase mb-4">
                {t.partners.badge}
              </p>
              <h2 className="text-[48px] lg:text-[64px] font-black leading-[1.05] tracking-tight text-[#0F0F0F]">
                {t.partners.title}
              </h2>
            </div>
            <div className="w-full lg:w-[45%] lg:pt-16">
              <p className="text-gray-600 text-[17px] lg:text-[18px] leading-[1.8] font-medium">
                {t.partners.desc}
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-[2px] bg-[#EBA631]" />
              <p className="text-[#EBA631] text-[13px] font-bold tracking-[0.18em] uppercase">
                {t.partners.supportTitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.partners.list.map((partner, index) => (
                <div key={index} className="group relative overflow-hidden rounded-[24px] border border-gray-200 bg-[#FAFAFA] px-8 py-10 hover:border-[#C6417B]/30 hover:shadow-[0_20px_50px_rgba(76,19,71,0.08)] transition-all duration-500 min-h-[260px] flex flex-col justify-center">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: `linear-gradient(135deg, rgba(76,19,71,0.04) 0%, rgba(198,65,123,0.08) 100%)` }} />
                  <div className="relative z-10">
                    <div className="h-[110px] flex items-center justify-center mb-7">
                      <Image src={partner.image} alt={partner.name} width={190} height={90} className="max-h-[90px] w-auto object-contain transition-all duration-500 group-hover:scale-105" />
                    </div>
                    <p className="text-center text-[#0F0F0F] text-[16px] leading-[1.6] font-black transition-all duration-500 group-hover:translate-y-[-2px]">
                      {partner.name}
                    </p>
                  </div>
                  <div className="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-[#EBA631] to-[#C6417B] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={400}>
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-[2px] bg-[#EBA631]" />
              <p className="text-[#EBA631] text-[13px] font-bold tracking-[0.18em] uppercase">
                {t.partners.collabTitle}
              </p>
            </div>
            <div className="relative overflow-hidden rounded-[32px] border border-gray-200 bg-[#FAFAFA] py-10">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10" />
              <div className="flex items-center w-max animate-marquee">
                {[
                  "Indonesia Creative Cities Network (ICCN)", "National Geographic Indonesia", "APKASI (ASOSIASI PEMERINTAH KABUPATEN SELURUH INDONESIA)",
                  "Indonesia Creative Cities Network (ICCN)", "National Geographic Indonesia", "APKASI (ASOSIASI PEMERINTAH KABUPATEN SELURUH INDONESIA)",
                  "Indonesia Creative Cities Network (ICCN)", "National Geographic Indonesia", "APKASI (ASOSIASI PEMERINTAH KABUPATEN SELURUH INDONESIA)"
                ].map((partner, index) => (
                  <div key={index} className="mx-10 text-[#444] font-bold tracking-[0.12em] text-[16px] uppercase whitespace-nowrap transition-all duration-300 hover:text-[#C6417B] cursor-pointer">
                    {partner}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 max-w-4xl">
              <p className="text-gray-600 text-[16px] leading-[1.9]">
                {t.partners.collabDesc}
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

    {/* --- SPONSORSHIP / KEMITRAAN SECTION --- */}
        <section id="kemitraan" className="max-w-[1200px] mx-auto px-6 sm:px-10 mt-32 lg:mt-40 mb-32 lg:mb-40 font-sans scroll-mt-32">
          <div className="text-center mb-16">
            <p className="text-[#EBA631] text-[13px] font-bold tracking-[0.15em] uppercase mb-4">
              {t.sponsorship.badge}
            </p>
            <h2 className="text-[32px] md:text-[40px] font-black uppercase mb-4 tracking-tight text-[#C6417B]">
              {t.rsvp.title}
            </h2>
            <p className="text-gray-600 text-[16px] leading-[1.8] max-w-2xl mx-auto">
              {t.sponsorship.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* ERROR TYPESCRIPT (any) SUDAH DIPERBAIKI DI BARIS BAWAH INI */}
            {t.sponsorship.packages.map((pkg: { name: string; price: string; benefits: string[] }, index: number) => (
              <div 
                key={index} 
                className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${
                  index === 0 
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xl" // Highlight dominan hitam untuk Title Sponsor
                    : "bg-white text-[#1A1A1A] border-gray-200 hover:shadow-lg hover:border-[#EBA631]"
                }`}
              >
                {/* Garis Emas khusus untuk Title Sponsor di bagian atas kartu */}
                {index === 0 && (
                  <div className="absolute top-0 left-0 right-0 h-2 bg-[#EBA631] rounded-t-3xl"></div>
                )}
                
                <h3 className={`text-[22px] font-black uppercase tracking-wide mb-2 ${index === 0 ? "text-white" : "text-[#1A1A1A]"}`}>
                  {pkg.name}
                </h3>
                <p className={`text-[20px] font-bold mb-8 ${index === 0 ? "text-[#EBA631]" : "text-[#C6417B]"}`}>
                  {pkg.price}
                </p>
                
                <ul className="flex-1 space-y-4 mb-8">
                  {pkg.benefits.map((benefit: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      {/* Icon Checklist */}
                      <span className="mt-1 text-[#EBA631] flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </span>
                      <span className={`text-[14px] leading-relaxed ${index === 0 ? "text-gray-300" : "text-gray-600"}`}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                <a 
                  href="https://wa.me/6282262485548?text=Halo,%20saya%20tertarik%20menjadi%20mitra%20untuk%20Pameran%20Mozaik%20Indonesia."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center w-full py-4 rounded-xl font-bold uppercase tracking-widest text-[13px] transition-colors cursor-pointer ${
                    index === 0 
                      ? "bg-[#EBA631] text-[#1A1A1A] hover:bg-white" 
                      : "bg-[#FDFCFB] border border-gray-200 text-[#1A1A1A] hover:border-[#EBA631] hover:text-[#EBA631]"
                  }`}
                >
                  {t.btn.partner}
                </a>
              </div>
            ))}
          </div>
        </section>

<RSVPForm />

    {/* --- MODAL IMAGE VIEWER UNTUK FLOOR PLAN --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-10 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative w-full max-w-6xl h-full max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} 
          >
            <Image 
              src={selectedImage} 
              alt="Floor Plan Full View" 
              fill 
              className="object-contain" 
            />
            
            {/* Tombol Close Silang */}
            <button 
              className="absolute -top-12 right-0 md:-right-12 md:top-0 text-gray-400 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
      )}

    </main>
  );
}