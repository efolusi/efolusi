# Landing Page Improvement Plan (efolusi.com)

Status: draft, 2026-08-01. Anchored to the EFO tokenomics recommendation: products first, token second, nothing unshipped on the site.

## Prinsip

1. Landing page menjual produk dan kredibilitas studio, bukan token. Token cukup satu badge dan satu halaman.
2. Halaman /token tetap satu-satunya sumber resmi soal EFO, hanya memuat yang sudah live dan terverifikasi on-chain.
3. Setiap klaim di situs harus punya bukti (link BscScan, produk yang bisa dipakai, bar live). Tidak ada "coming soon" tanpa tanggal.
4. Semua perubahan dua bahasa (en/id) sejak commit pertama, ikut pola dictionary yang ada.

## Fase 1, Kredibilitas produk (minggu 1-2)

Tujuan: pengunjung paham dalam 10 detik apa yang Efolusi buat dan bisa langsung mencoba.

- [x] Portfolio section: tiap produk (ZOYYA, CUWAN, Meridian, SSO, dst) dapat kartu dengan status jujur: `Live`, `Beta`, atau `Building`. Link hanya untuk yang bisa dibuka. (commit 849aa67, status dari probe URL 2026-08-01: zoyya/meridian/earthos live, sisanya building)
- [x] Satu "proof strip": angka yang bisa diverifikasi (jumlah produk live, komponen Meridian yang open source, uptime). Jangan pakai angka yang tidak bisa dibuktikan. (jumlah produk dihitung dari productMeta agar tidak basi; uptime dibuang karena belum ada bukti publik)
- [x] CTA utama homepage: "See what we've built" ke portfolio; CTA sekunder ke kontak. Token TIDAK masuk hero homepage. (sudah terpenuhi di kode; $EFO hanya edge tile dekoratif, bukan CTA)
- [ ] Case study singkat per produk live (masalah, solusi, hasil), format konsisten, 3 paragraf maksimal.

## Fase 2, Kepercayaan dan konversi (minggu 3-4)

- [ ] Header sadar-sesi: setelah SSO siap, tombol "Sign in" berubah jadi avatar/menu akun (baca cookie sesi `.efolusi.com`, tanpa fetch berat; degradasi anggun kalau accounts.efolusi.com down).
- [ ] Halaman /about diperkuat: siapa di balik Efolusi, prinsip "documented before it ships", link ke repo open source.
- [x] SEO teknis: metadata per halaman sudah ada; tambah structured data (Organization, Product) dan OG image per halaman. (Organization JSON-LD + OG sudah ada sebelumnya; dilengkapi brand Meridian & EarthOS. OG per halaman masih pakai satu image, cukup untuk sekarang)
- [ ] Performa: audit ukuran font/ilustrasi, pastikan halaman utama tetap statis penuh (constraint OpenNext: tanpa ISR, cache read-only). Target LCP < 1.5s.

## Fase 3, Integrasi membership EFO (hanya setelah fitur shipped di SSO)

Gate: fase ini tidak boleh mulai sebelum wallet-linking dan tier flag live di SSO (lihat sso/docs/EFO-MEMBERSHIP-PLAN.md).

- [ ] Halaman /token: tambah section "Membership" yang menjelaskan tier, threshold, dan benefit yang SUDAH aktif, dengan tautan "link your wallet" ke accounts.efolusi.com.
- [ ] Halaman /token: section transparansi kuartalan: riwayat buyback (daftar tx hash, jumlah, tanggal) di bawah bar live yang sudah ada. Data dari on-chain, bukan dari CMS.
- [ ] Halaman produk/pricing di tiap produk menampilkan harga diskon tier user yang login (dibaca dari flag SSO, bukan logika baru per produk).
- [ ] Homepage: satu baris di footer atau section ekosistem yang menyebut membership, tetap tanpa janji harga.

## Fase 4, Skala konten (berkelanjutan)

- [ ] Changelog publik per produk (feed sederhana, markdown di repo, dirender statis).
- [ ] Halaman /ecosystem: peta produk + bagaimana SSO dan EFO mengikatnya, diagram satu layar.
- [x] llms.txt diperluas: deskripsi tiap produk dan endpoint dokumentasi, supaya AI agent bisa mengutip situs dengan benar. (status live/building per produk, alokasi + flywheel EFO, pointer ke accounts.efolusi.com/llms.txt untuk integrasi SSO)

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
