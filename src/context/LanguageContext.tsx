"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

const dictionaries = {
  id: {
    nav: { about: "Tentang", collection: "Koleksi", schedule: "Jadwal", contributors: "Kontributor", partners: "Mitra Pendukung", partnership: "Kemitraan" },
    btn: { partner: "JADI MITRA KAMI" },
    
    hero: { 
      badge: "Pameran Fotografi", 
      title1: "MOZAIK",
      title2: "INDONESIA",
      desc: "Sebuah galeri digital premium yang menempatkan fotografi sebagai pusat pengalaman, menghadirkan skala alam, tubuh budaya dan garis cakrawala Indonesia dengan pendekatan editorial yang tajam dan tenang.",
      date: "23 – 25 Oktober 2026",
      venue: "Gedung A.A. Maramis, Jakarta",
      exploreBtn: "JELAJAHI PAMERAN",
      scheduleBtn: "Lihat Jadwal"
    },
    about: {
      badge: "Tentang Pameran",
      title: "Sebuah bingkai pameran yang dibangun untuk memori budaya berbasis visual",
      desc: "Mozaik Indonesia dirancang sebagai ruang presentasi visual yang rapi, global, dan terkurasi. Kami menempatkan pameran ini sebagai platform jangka panjang untuk pendidikan visual, jejaring kreatif, serta diplomasi budaya yang menghubungkan kekayaan nusantara dengan audiens modern.",
      quote: "“Where visions meets identity and every image becomes a story of a nation.”",
      approachTitle: "Pendekatan Kuratorial",
      approachDesc: "Pameran ini merepresentasikan keberagaman Indonesia melalui sudut pandang personal fotografer. Fokus utama kami adalah pada estetika visual yang kuat, komunikatif, serta merekam hubungan erat antara manusia, nilai, dan ruang.",
      goalTitle: "Tujuan Pameran",
      goalDesc: "Menyajikan narasi visual modern Nusantara yang presisi dan kontemporer. Pameran ini bertujuan untuk menumbuhkan rasa bangga dan apresiasi generasi muda terhadap kekayaan alam serta warisan budaya yang dinamis dan terus berkembang."
    },
    visiMisi: {
      visionTitle: "Visi",
      visionDesc: "Menjadi ruang apresiasi fotografi terdepan yang mengangkat kekayaan alam, keberagaman budaya, dan pesona Nusantara ke kancah global melalui narasi visual yang kuat serta pendekatan kreatif yang inovatif.",
      missionTitle: "Misi",
      missionItems: [
        "Mendokumentasikan dan menyajikan pesona keindahan alam dan budaya Indonesia secara presisi.",
        "Memberikan ruang pameran eksklusif sebagai wadah apresiasi bagi fotografer dan kreator visual berbakat.",
        "Memberikan nilai tambah bagi destinasi dan wilayah yang dipamerkan melalui promosi visual yang memperkuat daya tarik wisata, budaya, dan identitas lokal.",
        "Meningkatkan kesadaran masyarakat modern akan pentingnya pelestarian warisan Nusantara sebagai identitas budaya yang bernilai global serta semakin dikenal dan diapresiasi oleh masyarakat internasional."
      ]
    },
    
    collection: {
      badge: "Exhibition Collections",
      title: "Tiga Zona Tematik Pameran",
      desc: "Pameran Foto Mozaik Indonesia dirancang dengan pendekatan kuratorial yang terbagi ke dalam tiga zona tematik, merepresentasikan kekayaan alam, budaya, serta keindahan bawah laut dan aerial Indonesia.",
      zones: { nature: "Zona Alam", culture: "Zona Budaya", underwater: "Bawah Laut & Aerial", viewAction: "Lihat Koleksi" }
    },

    // --- SCHEDULE SECTION DIUPDATE SESUAI GAMBAR ---
    schedule: {
      badge: "Exhibition Agenda",
      title: "Program Highlights",
      desc: "Rangkaian kegiatan pameran dirancang secara eksklusif selama 3 hari, menjangkau audiens luas mencakup edukasi fotografi, apresiasi seni, peragaan busana, hingga diskusi lintas komunitas.",
      items: [
        { day: "JUM", date: "23", month: "OKT", title: "Opening Ceremony & Exhibition Tour", desc: "Rangkaian acara pembukaan meliputi Opening Ceremony, Music Corner, dan penjelajahan area pameran (Exhibition Tour).", image: "/talkshow.webp" },
        { day: "SAB", date: "24", month: "OKT", title: "Workshop, Talkshow & Peragaan Busana", desc: "Sesi Workshop Fotografi, Talk Show interaktif, Music Corner, dan penampilan spesial Peragaan Busana \"Mozaik Wastra Nusantara\".", image: "/diskusi.jpeg" },
        { day: "MIN", date: "25", month: "OKT", title: "Diskusi Komunitas & Closing Ceremony", desc: "Diskusi Lintas Komunitas, sajian Indonesian Performing Art, yang diakhiri dengan upacara penutupan pameran (Closing Ceremony).", image: "/closingceremony.jpg" }
      ]
    },

    // --- TAMBAHAN BARU (ID) ---
    // --- CONTRIBUTORS (ID) - DIBUAT RANGKUMAN SINGKAT ---
    contributors: {
      badge: "Photographer & Contributors",
      title: "Sosok di balik narasi visual “Mozaik Indonesia”",
      desc: "Kolaborasi antara fotografer utama, kurator, dan para fotografer in-collaboration menghadirkan pengalaman visual yang reflektif, imersif, dan penuh makna untuk memperkenalkan kekayaan alam, budaya, serta identitas Indonesia kepada generasi muda.",
      list: [
        { name: "Nining Perintis, PPSA, EFIAP, AFPSI**", role: "Fotografer Utama", image: "/Nining Perintis.png", desc: "Fotografer utama dengan pengalaman sejak 2012, berfokus pada pendekatan visual naratif untuk menangkap makna dan emosi di balik luasnya keindahan alam dan budaya Nusantara." },
        { name: "Vera Damayanti, S.E., Ak., M.M.", role: "Program Advisor", image: "/uni vera.png", desc: "Profesional berpengalaman sejak 1998 di bidang event berskala nasional dan internasional, yang memberikan arahan strategis dan konseptual pada perancangan program pameran ini." },
        { name: "Sambodo", role: "Kurator Pameran", image: "/Sambodo.png", desc: "Fotografer berlatar belakang arsitektur yang mengkurasi narasi visual pameran ini melalui pendekatan karakter desain dan estetika ruang yang saling terhubung." },
        { name: "Rini Widyantini", role: "In-Collaborate", image: "/Rini Widyantini.png", desc: "Menteri Pendayagunaan Aparatur Negara dan Reformasi Birokrasi (PANRB) yang turut berkolaborasi sebagai bentuk dukungan terhadap pengembangan kreativitas dan budaya Indonesia." },
        
        // --- GAMBAR SOFI AIDA, ADITYA PERMANA, AFANDI DAVID DIUPDATE DI SINI ---
        { name: "Sofi Aida Sugiharto, GMPSA, EFIAP/p, AFPSI***", role: "In-Collaborate", image: "/sofi aida.png", desc: "Fotografer peraih berbagai penghargaan nasional dan internasional yang dikenal dengan gaya storytelling kuat dalam karya fotografi bawah laut dan travel." },
        { name: "Aditya Permana", role: "In-Collaborate", image: "/aditya.png", desc: "Fotografer profesional yang berfokus pada genre landscape, arsitektur, dan makro, dengan keahlian mengekspresikan emosi melalui setiap karyanya." },
        { name: "Afandi David Suharjo", role: "In-Collaborate", image: "/afandi.png", desc: "Fotografer landscape yang piawai mengabadikan keindahan alam untuk menyampaikan pesan ketenangan dan emosi sebagai media bercerita visual." },
        
<<<<<<< HEAD
        { name: "Komang Arnawa", role: "In-Collaborate", image: "/Komang-Arnawa.png", desc: "Fotografer berprestasi asal Bali yang aktif mengabadikan kehidupan tradisi dan menonjolkan keindahan detail artistik dari seni budaya Indonesia." }
=======
        { name: "Komang Arnawa", role: "In-Collaborate", image: "/komang-arnawa.png", desc: "Fotografer berprestasi asal Bali yang aktif mengabadikan kehidupan tradisi dan menonjolkan keindahan detail artistik dari seni budaya Indonesia." }
>>>>>>> aeebd0e (Fix Komang Arnawa image)
      ]
    },
    venue: {
      badge: "Venue Pameran",
      descPrefix: "Diselenggarakan di ",
      boldText: "Gedung A.A. Maramis",
      descSuffix: ", pameran ini memanfaatkan nilai historis lokasi untuk merayakan 81 tahun kemerdekaan Indonesia. Melalui perpaduan warisan masa lalu dan karya kreatif masa kini, pameran ini mengajak pengunjung mendalami keindahan alam serta identitas bangsa dalam ruang yang sarat makna.",
      mapTitle: "Gedung A.A. Maramis",
      mapAddress: "Jl. Lap. Banteng Timur, Ps. Baru, Kecamatan Sawah Besar, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10710",
      floorPlanTitle: "Floor Plan",
      floorPlanDesc: "Gunakan panduan denah di bawah ini untuk memudahkan perjalanan visual Anda menelusuri setiap zona pameran.",
      f1Title: "Lantai 1",
      f1Desc: "Akses Registrasi, Zona Alam & Zona Budaya",
      f2Title: "Lantai 2",
      f2Desc: "Zona Bawah Laut, Aerial & Ruang Diskusi"
    },
    partners: {
      badge: "Supporting Partners & Collaborators",
      title: "Kolaborasi lintas sektor untuk memperkuat wajah Indonesia.",
      desc: "Pameran Foto Mozaik Indonesia menghadirkan sinergi antara institusi pemerintah, komunitas kreatif, media, dan organisasi budaya dalam upaya memperkenalkan potensi Indonesia melalui pariwisata, kebudayaan, serta ekonomi kreatif yang berkelanjutan.",
      supportTitle: "Mitra Pendukung",
      collabTitle: "Collaborators",
      collabDesc: "Melalui kolaborasi bersama media, komunitas kreatif, dan mitra strategis lainnya, Pameran Foto Mozaik Indonesia menjadi ruang pertemuan gagasan dan karya yang mendorong pertumbuhan industri kreatif, memperkuat identitas budaya, serta membuka ruang ekspresi dan inovasi bagi generasi masa kini.",
      list: [
        { name: "Kementrian Keuangan Republik Indonesia", image: "/keuangan.png" },
        { name: "Wonderful Indonesia", image: "/wonderfulindonesia.jpg" },
        { name: "Kementerian Kebudayaan Republik Indonesia", image: "/kebudayaan logo.png" },
        { name: "Kementerian Ekonomi Kreatif/Badan Ekonomi Kreatif Republik Indonesia", image: "/ekraf.png" }
      ]
    },
    // DATA SPONSORSHIP (Sesuai Proposal)
    sponsorship: {
      badge: "Peluang Kemitraan",
      title: "Paket Sponsorship",
      desc: "Mari menjadi bagian dari gerakan yang mengangkat kekayaan alam, budaya, dan karya fotografi Indonesia kepada publik. Kami menawarkan berbagai paket kemitraan strategis.",
      packages: [
        { name: "Title Sponsor (Ekslusif)", price: "Rp 3.200.000.000", benefits: ["Nama brand menjadi bagian dari nama event", "Logo utama di seluruh media publikasi", "Kesempatan sambutan di Opening Ceremony", "Booth premium di area utama", "Integrasi brand dalam program acara", "Exposure media & press release utama"] },
        { name: "Platinum Sponsor", price: "Rp 2.500.000.000", benefits: ["Logo besar di seluruh media promosi", "Booth Ekslusif", "Branding di area strategis venue", "Penyebutan dalam event utama (opening & closing)", "Aktivasi brand (games, sampling, dll)", "10 undangan VIP"] },
        { name: "Gold Sponsor", price: "Rp 1.000.000.000", benefits: ["Logo ukuran sedang di media promosi", "Booth standar", "Branding di area tertentu", "Penyebutan dalam beberapa program acara", "6 undangan VIP"] },
        { name: "Silver Sponsor", price: "Rp 500.000.000", benefits: ["Logo di media publikasi", "Branding terbatas di venue", "4 undangan VIP"] }
      ]
    },
    // DATA RSVP DIKEMBALIKAN (Wajib untuk form RSVP)
    rsvp: { badge: "Kehadiran", title: "PARTNERSHIP OPPORTUNITIES", desc: "Konfirmasi kehadiran Anda untuk memastikan kenyamanan dan pengalaman terbaik selama menjelajahi pameran Mozaik Indonesia.", nameLabel: "Nama Lengkap", namePlaceholder: "Masukkan nama lengkap Anda", emailLabel: "Alamat Email", emailPlaceholder: "Masukkan alamat email Anda", instansiLabel: "Instansi / Organisasi (Opsional)", instansiPlaceholder: "Masukkan nama instansi", dateLabel: "Tanggal Kehadiran", datePlaceholder: "Pilih tanggal", submitBtn: "Konfirmasi Kehadiran", successMsg: "Terima kasih! RSVP Anda telah berhasil dikonfirmasi.", dateOptions: [ { value: "2026-10-23", label: "23 Oktober 2026" }, { value: "2026-10-24", label: "24 Oktober 2026" }, { value: "2026-10-25", label: "25 Oktober 2026" } ] }
  },
  
  en: {
    nav: { about: "About", collection: "Collection", schedule: "Schedule", contributors: "Contributors", partners: "Partners", partnership: "Partnership" },
    btn: { partner: "PARTNER WITH US" },
    
    hero: { 
      badge: "Photography Exhibition", 
      title1: "MOZAIK",
      title2: "INDONESIA",
      desc: "A Refined digital gallery that places photography at the center of the experience, presenting the scale of nature, through a nuanced and understated editorial approach.",
      date: "October 23 – 25, 2026",
      venue: "A.A. Maramis Building, Jakarta",
      exploreBtn: "EXPLORE THE EXHIBITION",
      scheduleBtn: "View Schedule"
    },
    about: {
      badge: "About Exhibition",
      title: "An exhibition frame built for visual-based cultural memory",
      desc: "Mozaik Indonesia is conceived as a structured visual platform that presents Indonesia’s cultural landscape through a contemporary lens with global relevance. The exhibition is envisioned as a long-term platform for visual education, creative exchange, and cultural diplomacy, connecting the richness of the archipelago with modern audiences.",
      quote: "“Where visions meet identity and every image becomes a story of a nation.”",
      approachTitle: "Curatorial Approach",
      approachDesc: "This exhibition presents Indonesia’s diversity through the individual perspectives of photographers, using compelling visual narratives to explore the relationships between people, cultural values, and place.",
      goalTitle: "Exhibition Goals",
      goalDesc: "Presenting a clear and contemporary visual narrative of the Indonesian archipelago. The exhibition aims to foster pride and appreciation among younger generations for the country’s natural landscapes and its living, continuously evolving cultural heritage."
    },
    visiMisi: {
      visionTitle: "Visions",
      visionDesc: "To become a leading platform for photography that brings the landscapes, cultural diversity, and spirit of the Indonesian archipelago to global audiences through compelling visual narratives.",
      missionTitle: "Missions",
      missionItems: [
        "To capture and document Indonesia’s landscapes and cultural heritage through photography.",
        "To provide a dedicated exhibition platform that recognizes and supports photographers and visual storytellers.",
        "To reveal the distinct character of local destinations through the lens of photography, enhancing their cultural identity and tourism appeal.",
        "To keep Indonesia’s cultural heritage visible, relevant, and accessible to future generations."
      ]
    },
    collection: {
      badge: "Exhibition Collections",
      title: "Three Thematic Zones of the Exhibition",
      desc: "Pameran Foto Mozaik Indonesia unfolds across three thematic zones: Landscape, Culture, and Underwater & Aerial, each offering a distinct photographic perspective on Indonesia.",
      zones: { nature: "Nature Zone", culture: "Culture Zone", underwater: "Underwater & Aerial", viewAction: "View Collection" }
    },
    // --- SCHEDULE SECTION DIUPDATE SESUAI GAMBAR ---
    schedule: {
      badge: "Exhibition Agenda",
      title: "Program Highlights",
      desc: "The exhibition series is exclusively designed for 3 days, reaching a wide audience covering photography education, art appreciation, fashion shows, and cross-community discussions.",
      items: [
        { day: "FRI", date: "23", month: "OCT", title: "Opening Ceremony & Exhibition Tour", desc: "The opening series includes the Opening Ceremony, Music Corner, and exploring the exhibition area (Exhibition Tour).", image: "/talkshow.webp" },
        { day: "SAT", date: "24", month: "OCT", title: "Workshop, Talkshow & Fashion Show", desc: "Photography Workshop sessions, interactive Talk Shows, Music Corner, and a special appearance of the \"Mozaik Wastra Nusantara\" Fashion Show.", image: "/diskusi.jpeg" },
        { day: "SUN", date: "25", month: "OCT", title: "Community Discussion & Closing Ceremony", desc: "Cross-Community Discussion, Indonesian Performing Art presentations, concluding with the exhibition's closing ceremony.", image: "/closingceremony.jpg" }
      ]
    },

    // --- TAMBAHAN BARU (EN) ---
    // --- CONTRIBUTORS (EN) - DIBUAT RANGKUMAN SINGKAT ---
    contributors: {
      badge: "Photographer & Contributors",
      title: "The figures behind the visual narrative of “Mosaic Indonesia”.",
      desc: "The collaboration between the main photographer, curator, and in-collaboration photographers presents a reflective, immersive, and meaningful visual experience to introduce Indonesia's natural wealth, culture, and identity to the younger generation.",
      list: [
        { name: "Nining Perintis, PPSA, EFIAP, AFPSI**", role: "Main Photographer", image: "/Nining Perintis.png", desc: "Main photographer with experience since 2012, focusing on a narrative visual approach to capture the meaning and emotion behind the vast natural and cultural beauty of the Archipelago." },
        { name: "Vera Damayanti, S.E., Ak., M.M.", role: "Program Advisor", image: "/uni vera.png", desc: "An experienced professional since 1998 in national and international scale events, providing strategic and conceptual direction for the exhibition program's design." },
        { name: "Sambodo", role: "Exhibition Curator", image: "/Sambodo.png", desc: "An architecture-background photographer who curates the exhibition's visual narrative through an interconnected approach of design character and spatial aesthetics." },
        { name: "Rini Widyantini", role: "In-Collaborate", image: "/Rini Widyantini.png", desc: "The Minister of Administrative and Bureaucratic Reform (PANRB) who collaborates as a form of support for the development of Indonesian creativity and culture." },
        
        // --- GAMBAR SOFI AIDA, ADITYA PERMANA, AFANDI DAVID DIUPDATE DI SINI ---
        { name: "Sofi Aida Sugiharto, GMPSA, EFIAP/p, AFPSI***", role: "In-Collaborate", image: "/sofi aida.png", desc: "An award-winning photographer recognized for her strong storytelling style in underwater and travel photography works." },
        { name: "Aditya Permana", role: "In-Collaborate", image: "/aditya.png", desc: "A professional photographer focusing on landscape, architecture, and macro genres, with expertise in expressing emotion through each of his works." },
        { name: "Afandi David Suharjo", role: "In-Collaborate", image: "/afandi.png", desc: "A landscape photographer skilled in capturing natural beauty to convey messages of tranquility and emotion as a visual storytelling medium." },
        
<<<<<<< HEAD
        { name: "Komang Arnawa", role: "In-Collaborate", image: "/Komang-Arnawa.png", desc: "An accomplished Balinese photographer actively capturing traditional life and highlighting the artistic details of Indonesian culture and arts." }
=======
        { name: "Komang Arnawa", role: "In-Collaborate", image: "/komang-arnawa.png", desc: "An accomplished Balinese photographer actively capturing traditional life and highlighting the artistic details of Indonesian culture and arts." }
>>>>>>> aeebd0e (Fix Komang Arnawa image)
      ]
    },
    venue: {
      badge: "Exhibition Venue",
      descPrefix: "Set within the historic",
      boldText: "A.A. Maramis Building",
      descSuffix: ", the exhibition draws on the venue’s historical resonance to frame a contemporary reflection on the spirit of unity embodied in Indonesia’s Youth Pledge. The venue forms an integral part of the exhibition narrative, creating a dialogue between heritage and the present.",
      mapTitle: "A.A. Maramis Building",
      mapAddress: "Jl. Lap. Banteng Timur, Ps. Baru, Sawah Besar, Central Jakarta, Special Capital Region of Jakarta 10710",
      floorPlanTitle: "Floor Plan",
      floorPlanDesc: "Use the floor plan guide below to facilitate your visual journey through each exhibition zone.",
      f1Title: "1st Floor",
      f1Desc: "Registration Access, Nature Zone & Culture Zone",
      f2Title: "2nd Floor",
      f2Desc: "Underwater Zone, Aerial & Discussion Room"
    },
    partners: {
      badge: "Supporting Partners & Collaborators",
      title: "Cross-sector collaboration to strengthen the face of Indonesia.",
      desc: "Pameran Foto Mozaik Indonesia presents synergy between government institutions, creative communities, media, and cultural organizations in an effort to introduce Indonesia's potential through sustainable tourism, culture, and the creative economy.",
      supportTitle: "Supporting Partners",
      collabTitle: "Collaborators",
      collabDesc: "Through collaboration with media, creative communities, and other strategic partners, Pameran Foto Mozaik Indonesia becomes a meeting space for ideas and works that drive the growth of the creative industry, strengthen cultural identity, and open up spaces for expression and innovation for today's generation.",
      list: [
        { name: "Ministry of Finance", image: "/keuangan.png" },
        { name: "Wonderful Indonesia", image: "/wonderfulindonesia.jpg" },
        { name: "Ministry of Culture", image: "/kebudayaan.jpg" },
        { name: "Ministry of Creative Economy", image: "/ekraf.png" }
      ]
    },
    // DATA SPONSORSHIP (Sesuai Proposal)
    sponsorship: {
      badge: "Partnership Opportunities",
      title: "Sponsorship Packages",
      desc: "Be a part of the movement that elevates Indonesia's natural wealth, culture, and photography to the public. We offer various strategic partnership packages.",
      packages: [
        { name: "Title Sponsor (Exclusive)", price: "Rp 3.200.000.000", benefits: ["Brand name becomes part of the event name", "Main logo on all publication media", "Speech opportunity at Opening Ceremony", "Premium booth in main area", "Brand integration in event programs", "Main media exposure & press release"] },
        { name: "Platinum Sponsor", price: "Rp 2.500.000.000", benefits: ["Large logo on all promotional media", "Exclusive booth", "Branding in strategic venue areas", "Mention in main events (opening & closing)", "Brand activation (games, sampling, etc.)", "10 VIP invitations"] },
        { name: "Gold Sponsor", price: "Rp 1.000.000.000", benefits: ["Medium logo on promotional media", "Standard booth", "Branding in specific areas", "Mention in several programs", "6 VIP invitations"] },
        { name: "Silver Sponsor", price: "Rp 500.000.000", benefits: ["Logo on publication media", "Limited branding at venue", "4 VIP invitations"] }
      ]
    },
    // DATA RSVP DIKEMBALIKAN (Wajib untuk form RSVP)
    rsvp: { badge: "Attendance", title: "PARTNERSHIP OPPORTUNITIES", desc: "Confirm your attendance to ensure the best comfort and experience while exploring the Mosaic Indonesia exhibition.", nameLabel: "Full Name", namePlaceholder: "Enter your full name", emailLabel: "Email Address", emailPlaceholder: "Enter your email address", instansiLabel: "Institution / Organization (Optional)", instansiPlaceholder: "Enter your institution", dateLabel: "Attendance Date", datePlaceholder: "Select date", submitBtn: "Confirm Attendance", successMsg: "Thank you! Your RSVP has been successfully confirmed.", dateOptions: [ { value: "2026-10-23", label: "October 23, 2026" }, { value: "2026-10-24", label: "October 24, 2026" }, { value: "2026-10-25", label: "October 25, 2026" } ] }
  }
};

type Language = 'id' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof dictionaries.id; 
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('id'); 

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage harus digunakan di dalam LanguageProvider');
  return context;
};
