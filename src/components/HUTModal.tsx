"use client";

import React, { useState, useEffect } from 'react';

export default function HUTModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Memberikan jeda (delay) 800 milidetik sebelum modal muncul.
    // Ini menghilangkan error ESLint dan memberikan efek transisi yang lebih elegan.
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 800);

    // Membersihkan timer jika komponen ditutup/dilepas
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="bg-white p-8 md:p-12 rounded-[30px] max-w-lg w-full text-center shadow-2xl relative">
        <div className="text-[#C6417B] text-[40px] mb-4">🇮🇩</div>
        
        <h2 className="text-[32px] font-black text-[#1A1A1A] mb-4 uppercase tracking-tight">
          Dirgahayu Republik Indonesia Ke-81
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Selamat datang di Mozaik Indonesia. Mari rayakan memori visual kebudayaan dan kekayaan alam Nusantara di momen kemerdekaan yang bersejarah ini.
        </p>

        <button 
          onClick={() => setIsOpen(false)}
          className="w-full bg-[#1A1A1A] hover:bg-[#EBA631] text-white font-bold py-4 rounded-xl transition-all duration-300 uppercase tracking-widest text-[14px]"
        >
          Jelajahi Pameran
        </button>
      </div>
    </div>
  );
}