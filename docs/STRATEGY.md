# Efolusi 10-Year Operating Strategy

Status: 2026-08-01. Induk dari docs/LANDING-PLAN.md dan sso/docs/EFO-MEMBERSHIP-PLAN.md.
Kalau sebuah keputusan bertentangan dengan dokumen ini, dokumen ini yang menang
atau dokumen ini yang harus direvisi secara eksplisit, tidak ada jalan tengah.

## North star

Perusahaan software yang hidup dari laba subscription, bukan dari harga token.
Token mengikuti bisnis, tidak pernah sebaliknya. Target bertahan minimal 10
tahun berarti satu hal di atas segalanya: revenue berulang yang lebih besar
dari biaya, secepat mungkin, dan tidak pernah bergantung pada pasar crypto.

## Flywheel (satu-satunya model)

1. Produk menghasilkan revenue subscription, dibayar uang biasa.
2. Sebagian LABA BERSIH (bukan revenue) dipakai buyback EFO, diskresioner.
3. Sebagian besar hasil buyback diburn; sisanya treasury ekosistem.
4. Memegang EFO = membership: benefit di semua produk via satu flag di SSO.
5. Membership menaikkan retensi dan permintaan token; kembali ke nomor 1.

Rantai ini putus tanpa nomor 1. Karena itu prioritas modal dan waktu SELALU:
produk yang bisa ditagih > infrastruktur bersama > token.

## Aturan fokus (jawaban atas 5 produk "building")

- Maksimal SATU produk revenue yang dikejar serius dalam satu waktu, sampai
  produk itu mencapai gate revenue-nya. Produk lain boleh hidup, tapi tidak
  mendapat sprint.
- Kandidat pertama ditentukan oleh pemilik (rekomendasi: yang paling dekat
  dengan bisa ditagih, bukan yang paling menarik).
- Produk "building" yang tidak disentuh 2 kuartal berturut-turut wajib
  diputuskan: lanjut dengan jadwal, atau diarsip dan dilepas dari situs.
  Status "building" selamanya adalah utang kejujuran.

## Gate revenue (prasyarat semua benefit berbayar)

Benefit yang memakan margin (diskon) baru boleh aktif ketika SATU produk
memenuhi semuanya selama 3 bulan berturut-turut:
- Pelanggan berbayar aktif >= 100 ATAU MRR >= biaya infrastruktur bulanan 2x.
- Churn bulanan < 10%.
- Penagihan otomatis jalan (bukan invoice manual).
Sebelum itu, benefit yang boleh ada hanya yang biaya marginalnya nol:
early access, beta features, badge.

## Kebijakan buyback & burn (formal, supaya tidak pernah jadi janji)

- Sumber: maksimal 25% laba bersih kuartal sebelumnya. Rugi = nol buyback,
  dan sistem tetap koheren karena tidak ada yang dijanjikan.
- Eksekusi: dev wallet 0x23bb2435a859ec52736bab3180806b8c7ae85fc6, dari pasar
  terbuka. Split hasil: 70% burn, 30% treasury ekosistem.
- Komunikasi: selalu "ini yang sudah kami lakukan" + bukti tx, tidak pernah
  "ini yang akan kami lakukan". Bar live di /token adalah satu-satunya klaim.
- Bahasa terlarang di semua materi resmi: "harga akan", "reward pasif",
  "bagi hasil", "dijamin", APY/APR dalam bentuk apa pun.

## Disiplin biaya (survive = tidak kehabisan kas)

- Infrastruktur self-host OSS sesuai STACK.md; tidak ada vendor lock-in yang
  menagih per MAU.
- Setiap layanan berbayar baru butuh justifikasi tertulis satu paragraf.
- Runway dihitung tiap kuartal; di bawah 12 bulan, buyback otomatis nol dan
  hiring beku, tanpa diskusi.

## Kalender tahunan (ritme yang menjaga 10 tahun)

- Tiap kuartal: laporan transparansi buyback (tx hash) di /token; review
  runway; keputusan produk building yang macet.
- Tiap tahun: review threshold tier (UPDATE tabel efo_tiers + grandfathering
  12 bulan); review benefit vs biaya per user; audit klaim situs vs kenyataan.
- Tidak pernah: mengubah benefit lebih dari sekali setahun, menambah supply,
  atau mengaktifkan utility baru tanpa lewat review margin.

## Kriteria berhenti (ditulis sekarang, saat kepala dingin)

- Kalau setelah 24 bulan tidak ada satu pun produk yang memenuhi gate revenue,
  masalahnya bukan tokenomics dan bukan landing page; berhenti menambah produk
  dan restrukturisasi portofolio.
- Kalau regulasi membuat utility konsumtif pun berisiko di yurisdiksi utama,
  membership bisa dilepas dari token (flag SSO tetap hidup, sumber tier
  diganti) tanpa mematikan produk. Desain ini sengaja: tidak ada komponen
  bisnis yang mati kalau token mati.

## Status hari ini (jujur)

- Live: zoyya.xyz, meridian, earthos. Building: komando, toolips, trady,
  kongkow, cuwan. Revenue wallet on-chain: ~32 USDT. Artinya: flywheel nomor 1
  belum ada. Semua pekerjaan token dan SSO sudah siap MENUNGGU revenue, dan
  itu urutan yang benar, asal fokus berikutnya adalah menagih pelanggan
  pertama, bukan menambah infrastruktur.
