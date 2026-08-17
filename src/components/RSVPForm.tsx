"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function RSVPForm() {
  // 1. Tambahkan 'email' ke dalam state awal
  const [formData, setFormData] = useState({ nama: '', telepon: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 2. Masukkan data 'email' ke dalam pengiriman Supabase
    const { error } = await supabase
      .from('rsvp_undangan')
      .insert([{ 
        nama: formData.nama, 
        telepon: formData.telepon, 
        email: formData.email 
      }]);

    if (error) {
      console.error(error);
      setSubmitStatus('error');
    } else {
      setSubmitStatus('success');
      // 3. Reset form termasuk email setelah berhasil
      setFormData({ nama: '', telepon: '', email: '' }); 
    }
    setIsSubmitting(false);
  };

  return (
    <section className="py-24 bg-[#1A1A1A] text-white px-6 md:px-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#EBA631] opacity-10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Warna judul tetap ungu/magenta sesuai request Anda sebelumnya */}
        <h2 className="text-[32px] md:text-[40px] font-black uppercase mb-4 tracking-tight text-[#C6417B]">
          Belum Mendapat Undangan?
        </h2>
        <p className="text-gray-400 mb-12 text-lg">
          Daftarkan diri Anda sekarang untuk mendapatkan e-invitation dan akses eksklusif ke pameran Mozaik Indonesia.
        </p>

        <form onSubmit={handleRSVP} className="bg-white/5 p-8 md:p-10 backdrop-blur-md border border-white/10 shadow-2xl">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wider">Terima Kasih!</h3>
              <p className="text-gray-300">Data Anda telah kami terima. Silakan tunjukkan nama Anda pada staf resepsionis saat hadir di pameran.</p>
            </div>
          ) : (
            <div className="space-y-6 text-left">
              {submitStatus === 'error' && (
                <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 text-sm text-center">
                  Terjadi kesalahan jaringan. Silakan coba lagi.
                </div>
              )}
              
              <div>
                <label className="block text-[12px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  className="w-full bg-black/50 border border-gray-700 text-white px-5 py-4 focus:outline-none focus:border-[#EBA631] transition-colors"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>
              
              <div>
                <label className="block text-[12px] font-bold text-gray-400 mb-2 uppercase tracking-widest">No. WhatsApp / Telepon</label>
                <input
                  type="tel"
                  required
                  value={formData.telepon}
                  onChange={(e) => setFormData({...formData, telepon: e.target.value})}
                  className="w-full bg-black/50 border border-gray-700 text-white px-5 py-4 focus:outline-none focus:border-[#EBA631] transition-colors"
                  placeholder="Contoh: 08123456789"
                />
              </div>

              {/* --- TAMBAHAN KOLOM EMAIL --- */}
              <div>
                <label className="block text-[12px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Alamat Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/50 border border-gray-700 text-white px-5 py-4 focus:outline-none focus:border-[#EBA631] transition-colors"
                  placeholder="contoh@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#EBA631] hover:bg-orange-500 text-black font-black uppercase tracking-widest py-4 transition-colors mt-4 disabled:opacity-50"
              >
                {isSubmitting ? 'Memproses Data...' : 'Klaim Undangan Saya'}
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}