# Landing Page Improvement Plan (efolusi.com)

Status: draft, 2026-08-01. Anak dari docs/STRATEGY.md (strategi operasi 10 tahun); anchored to the EFO tokenomics recommendation: products first, token second, nothing unshipped on the site.

## Prinsip

1. Landing page menjual produk dan kredibilitas studio, bukan token. Token cukup satu badge dan satu halaman.
2. Halaman /token tetap satu-satunya sumber resmi soal EFO, hanya memuat yang sudah live dan terverifikasi on-chain.
3. Setiap klaim di situs harus punya bukti (link BscScan, produk yang bisa dipakai, bar live). Tidak ada "coming soon" tanpa tanggal.
4. Semua perubahan dua bahasa (en/id) sejak commit pertama, ikut pola dictionary yang ada.
5. llms.txt wajib 100% sinkron dengan informasi yang dipublikasikan situs: setiap perubahan fakta di halaman mana pun (terutama /token) harus tercermin di llms.txt dalam commit yang sama, dan llms.txt tidak boleh memuat klaim yang tidak ada di situs.

## Fase 1, Kredibilitas produk (minggu 1-2)

Tujuan: pengunjung paham dalam 10 detik apa yang Efolusi buat dan bisa langsung mencoba.

- Portfolio badge status Live/Building + non-klik produk mati: DIBATALKAN oleh pemilik 2026-08-01 (dibangun lalu di-revert). Jangan diusulkan ulang tanpa arahan pemilik.
- Proof strip: DIBATALKAN oleh pemilik 2026-08-01 (sudah dibangun lalu dihapus; secara desain tidak disukai). Jangan diusulkan ulang.
- [x] CTA utama homepage: "See what we've built" ke portfolio; CTA sekunder ke kontak. Token TIDAK masuk hero homepage. (sudah terpenuhi di kode; $EFO hanya edge tile dekoratif, bukan CTA)
- [x] Case study singkat per produk live (masalah, solusi, hasil), format konsisten, 3 paragraf maksimal. (Draft versi Claude di /about section "Proof beats promises", 2026-08-01; hanya klaim yang sudah dipublikasikan, tanpa angka baru. MENUNGGU REVISI PEMILIK.)

## Fase 2, Kepercayaan dan konversi (minggu 3-4)

- [ ] Header sadar-sesi: setelah SSO siap, tombol "Sign in" berubah jadi avatar/menu akun (baca cookie sesi `.efolusi.com`, tanpa fetch berat; degradasi anggun kalau accounts.efolusi.com down).
- [x] Halaman /about diperkuat: siapa di balik Efolusi, prinsip "documented before it ships", link ke repo open source. (Founder + link GitHub sudah ada sebelumnya; prinsip "nothing announced before it ships" masuk lewat lede section case study. MENUNGGU REVISI PEMILIK.)
- [x] SEO teknis: metadata per halaman sudah ada; tambah structured data (Organization, Product) dan OG image per halaman. (Organization JSON-LD + OG sudah ada sebelumnya; dilengkapi brand Meridian & EarthOS. OG per halaman masih pakai satu image, cukup untuk sekarang)
- [x] Performa: audit ukuran font/ilustrasi, pastikan halaman utama tetap statis penuh (constraint OpenNext: tanpa ISR, cache read-only). Target LCP < 1.5s. (Audit 2026-08-01: logo-owl.png 535KB dipakai untuk render 30px di tiap halaman → dibuat varian 240px/58KB untuk header/footer/favicon/JSON-LD, file asli tetap jadi download di /brand. Font sudah optimal: variable woff2 self-host via Meridian, cache immutable. Halaman tetap statis penuh, cache s-maxage=600 sudah terpasang. Pengukuran LCP production menyusul setelah deploy.)

## Fase 3, Integrasi membership EFO (hanya setelah fitur shipped di SSO)

Gate: fase ini tidak boleh mulai sebelum wallet-linking dan tier flag live di SSO (lihat sso/docs/EFO-MEMBERSHIP-PLAN.md).

- [ ] Halaman /token: tambah section "Membership" yang menjelaskan tier, threshold, dan benefit yang SUDAH aktif, dengan tautan "link your wallet" ke accounts.efolusi.com.
- [ ] Halaman /token: section transparansi kuartalan: riwayat buyback (daftar tx hash, jumlah, tanggal) di bawah bar live yang sudah ada. Data dari on-chain, bukan dari CMS.
- [ ] Halaman produk/pricing di tiap produk menampilkan harga diskon tier user yang login (dibaca dari flag SSO, bukan logika baru per produk).
- [ ] Homepage: satu baris di footer atau section ekosistem yang menyebut membership, tetap tanpa janji harga.

## Fase 4, Skala konten (berkelanjutan)

- [ ] Changelog publik per produk (feed sederhana, markdown di repo, dirender statis).
- Halaman /ecosystem: DIBATALKAN oleh pemilik 2026-08-01 (dibangun lalu di-revert).
- Perluasan llms.txt (status per produk, alokasi, pointer SSO): DIBATALKAN oleh pemilik 2026-08-01 (di-revert ke versi origin).

## Non-goals

- Tidak ada harga token, market cap, atau chart di situs (link keluar ke GeckoTerminal saja).
- Tidak ada halaman roadmap spekulatif.
- Tidak ada CMS; konten tetap di repo, review lewat PR.

## Urutan eksekusi dan dependensi

```
Fase 1 ──> Fase 2 ──> Fase 4 (terus-menerus)
                └──> Fase 3 (menunggu SSO membership live)
```

## Definition of done per fase

Setiap fase selesai bila: dua bahasa lengkap, test hijau, diverifikasi di preview browser (bukan cuma compile), deploy ke production terverifikasi via curl, dan tidak ada klaim tanpa bukti.
