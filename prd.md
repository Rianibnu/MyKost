Product Requirements Document (PRD): Sistem Marketplace Kost
Versi: 1.0
Status: Konsep Awal
Model Bisnis: Platform perantara (Pihak Ketiga) yang memfasilitasi pencari kost (Penyewa) dan pemilik kost (Pemilik).

1. Ringkasan Eksekutif
Sistem ini bertujuan untuk mendigitalisasi proses pencarian, verifikasi, dan pemesanan kost secara real-time. Platform ini memberikan nilai tambah bagi pemilik kost dalam manajemen okupansi dan bagi pencari kost dalam kemudahan akses informasi serta keamanan transaksi.

2. Target Pengguna (User Persona)
Penyewa (User): Mahasiswa/pekerja yang mencari hunian dengan kriteria spesifik (lokasi, harga, fasilitas).

Pemilik Kost (Partner): Individu atau pengelola kost yang ingin memasarkan properti dan menerima pembayaran secara sistematis.

Admin (Internal): Tim pengelola sistem untuk verifikasi data, moderasi, dan dukungan pelanggan.

3. Fitur Utama
A. Fitur untuk Penyewa (User)
Pencarian & Filter: Pencarian berdasarkan lokasi (maps), harga, jenis kelamin, fasilitas, dan durasi sewa (harian/bulanan).

Detail Kost: Galeri foto, deskripsi, fasilitas, aturan kost, dan ulasan pengguna lain.

Booking Langsung: Sistem kalender ketersediaan kamar.

Pembayaran Aman: Integrasi Payment Gateway (VA, E-Wallet, Transfer Bank).

Histori & Status: Pantauan status booking (Pending, Dikonfirmasi, Ditolak).

B. Fitur untuk Pemilik Kost (Partner)
Dashboard Properti: Unggah foto, pengaturan harga, dan ketersediaan kamar.

Manajemen Pesanan: Menerima atau menolak permintaan booking masuk.

Dompet Digital (Wallet): Penarikan dana hasil sewa ke rekening bank.

Statistik: Melihat performa kost (jumlah dilihat, jumlah booking).

C. Fitur untuk Admin (Back-office)
Verifikasi: Validasi dokumen pemilik kost untuk memastikan keamanan (mencegah penipuan).

Moderasi: Pengaturan konten (review dan foto).

Settlement: Pengaturan pencairan dana ke pemilik kost (setelah dipotong biaya admin).

4. User Flow (Alur Pengguna)
Registrasi/Login: Pengguna mendaftar melalui email atau nomor telepon.

Pencarian: Pengguna mencari kost berdasarkan area.

Booking: Pengguna memilih kamar, durasi, dan melakukan pembayaran ke Escrow Account (rekening penampung sistem).

Verifikasi Pemilik: Sistem mengirim notifikasi ke pemilik untuk dikonfirmasi.

Konfirmasi: Jika pemilik menyetujui, status berubah menjadi "Booking Berhasil". Jika tidak, uang akan di-refund otomatis ke saldo/rekening pengguna.

Check-in: Pengguna datang ke lokasi dengan menunjukkan kode booking (QR Code).

5. Kebutuhan Teknis & Tech Stack
Tech Stack Utama:
- Backend: Laravel 13 (PHP 8.3+)
- Frontend: React 19 (TypeScript), Inertia.js v3, dan Tailwind CSS v4
- UI Components: Shadcn UI (Radix UI Primitives)
- Otentikasi: Laravel Fortify dengan fitur keamanan modern (Passkeys)
- Database: SQLite (untuk Development) & MySQL/PostgreSQL (untuk Production)
- Build Tool: Vite 8

Platform: Web Application (Responsive / Mobile-First).

Keamanan: Enkripsi data pengguna dan integrasi sistem pembayaran yang tersertifikasi PCI DSS.

Skalabilitas: Arsitektur Monolith modern berbasis Inertia.js yang stabil dan efisien untuk menangani ribuan listing dan pengguna bersamaan.

Geolokasi: Integrasi API Maps (misal: Google Maps/Mapbox) untuk akurasi lokasi.

6. Strategi Monetisasi (Pendapatan Anda)
Biaya Layanan (Service Fee): Persentase kecil dari setiap transaksi sukses.

Iklan Prioritas: Biaya bagi pemilik kost yang ingin propertinya muncul di posisi teratas hasil pencarian.

Biaya Admin (Withdrawal Fee): Biaya administrasi saat pemilik kost melakukan penarikan dana.

7. Roadmap Pengembangan
Fase 1 (MVP): Registrasi, listing kost, pencarian dasar, dan pembayaran manual/otomatis.

Fase 2: Fitur Chat langsung antara penyewa dan pemilik, sistem review/rating, dan notifikasi real-time.

Fase 3: Integrasi kontrak digital (E-sign) dan sistem pengingat tagihan bulanan.