// Ini adalah simulasi Database. Nantinya bisa diganti dengan fetch() ke API atau query ke Prisma/SQL.

export const koleksiDB = {
  "alam": {
    title: "Zona Alam",
    description: "Menampilkan keindahan daratan Indonesia dari gunung berkabut, hutan hujan tropis, hingga sabana luas melalui pengalaman visual imersif.",
    artworks: [
      { id: 1, title: "Kabut Bromo", photographer: "Aditya Permana", image: "/gambar exhibition.png" },
      { id: 2, title: "Sabana Sumba", photographer: "Nining Perintis", image: "/gambar exhibition.png" },
      { id: 3, title: "Hutan Tropis Papua", photographer: "Afandi David Suharjo", image: "/gambar exhibition.png" },
    ]
  },
  "budaya": {
    title: "Zona Budaya",
    description: "Merekam denyut budaya Indonesia, menggambarkan hubungan erat antara manusia, nilai, dan ruang melalui visual yang hidup.",
    artworks: [
      { id: 4, title: "Tari Kecak", photographer: "Komang Arnawa", image: "/budaya.webp" },
      { id: 5, title: "Tenun Ikat", photographer: "Nining Perintis", image: "/budaya.webp" },
      { id: 6, title: "Ritual Adat", photographer: "Aditya Permana", image: "/budaya.webp" },
    ]
  },
  "bawah-laut": {
    title: "Zona Bawah Laut & Aerial",
    description: "Menampilkan keindahan bawah laut Indonesia sebagai salah satu yang terbaik di dunia melalui visual yang merepresentasikan kekayaan biodiversitas.",
    artworks: [
      { id: 7, title: "Terumbu Karang Raja Ampat", photographer: "Sofi Aida Sugiharto", image: "/bawahlaut.jpg" },
      { id: 8, title: "Manta Ray", photographer: "Sofi Aida Sugiharto", image: "/bawahlaut.jpg" },
      { id: 9, title: "Aerial Wayag", photographer: "Nining Perintis", image: "/bawahlaut.jpg" },
    ]
  }
};