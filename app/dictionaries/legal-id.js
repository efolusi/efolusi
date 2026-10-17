/*
 * Ketentuan Platform Efolusi dan Pemberitahuan Privasi Platform, Bahasa
 * Indonesia. Isinya harus sama dengan legal-en.js: id bagian yang sama,
 * fakta yang sama. Lihat komentar di legal-en.js.
 */

import { LEGAL_VERSION } from './legal-en.js';

const ENTITY = 'PT Efolusi Dunia Teknologi';
const ADDRESS = 'Bumi Cikande Indah, Blok D12 No 15, Cikande, Kab. Serang, Banten 42186, Indonesia';
const EMAIL = '[hi@efolusi.com](mailto:hi@efolusi.com)';
const META_LINE = `${ENTITY} · Versi ${LEGAL_VERSION} · Terakhir diperbarui 16 Oktober 2026`;

export const terms = {
  meta: {
    title: 'Ketentuan Platform · Efolusi',
    description:
      'Ketentuan untuk akun Efolusi Anda di my.efolusi.com, untuk efolusi.com, dan untuk produk Efolusi yang tidak punya ketentuan sendiri.'
  },
  back: '← Kembali ke efolusi.com',
  title: 'Ketentuan Platform Efolusi',
  metaLine: META_LINE,
  contentsHead: 'Daftar isi',
  intro: [
    `Ketentuan ini adalah perjanjian antara Anda dan ${ENTITY} ("Efolusi", "kami"), ${ADDRESS}. Dengan membuat akun Efolusi, atau dengan menggunakan efolusi.com atau produk mana pun yang dicakup ketentuan ini, Anda menerimanya.`,
    'Cara kami menangani data pribadi dijelaskan dalam [Pemberitahuan Privasi Platform](/{lang}/privacy), yang merupakan bagian dari ketentuan ini.'
  ],
  sections: [
    {
      id: 'scope',
      head: 'Cakupan ketentuan ini',
      blocks: [
        'Ketentuan ini mencakup:',
        {
          ul: [
            '**Akun Efolusi Anda** di my.efolusi.com, satu akun yang Anda pakai untuk masuk ke produk-produk Efolusi.',
            '**efolusi.com**, situs ini.',
            '**Relay, Loop, Runa, Komando, dan Sanctum.** Produk-produk ini tidak punya ketentuan sendiri. Fungsi tiap produk dan aturan yang hanya berlaku untuknya ada di [lampiran produk](#schedule) di akhir halaman ini.'
          ]
        },
        'Trady, Cuwan, ZOYYA, Toolips, dan Kongkow punya ketentuan dan kebijakan privasinya sendiri. Saat Anda memakai salah satunya, ketentuan produk itu yang berlaku, dan bila berbeda dengan ketentuan ini, ketentuan produk itulah yang diutamakan untuk produk tersebut. Ketentuan ini tetap berlaku untuk akun Efolusi yang Anda pakai untuk masuk.',
        {
          ul: [
            'Trady: [ketentuan](https://trady.efolusi.com/{lang}/terms) dan [kebijakan privasi](https://trady.efolusi.com/{lang}/privacy)',
            'Cuwan: [ketentuan](https://cuwan.xyz/terms), [kebijakan privasi](https://cuwan.xyz/privacy), dan [pengungkapan risiko](https://cuwan.xyz/risk)',
            'ZOYYA: [ketentuan](https://zoyya.xyz/terms), [kebijakan privasi](https://zoyya.xyz/privacy), dan [kebijakan pengembalian dana](https://zoyya.xyz/refund)',
            'Toolips: [ketentuan](https://toolips.xyz/{lang}/terms) dan [kebijakan privasi](https://toolips.xyz/{lang}/privacy)',
            'Kongkow: [ketentuan](https://kongkow.xyz/terms) dan [kebijakan privasi](https://kongkow.xyz/privacy), dalam bahasa Inggris'
          ]
        },
        'Meridian, design system kami, bersifat open source di bawah lisensi MIT, dan lisensi itulah yang mengatur penggunaannya. Efolusi Pay adalah layanan pembayaran yang dipakai produk kami untuk menerima pembayaran; layanan ini tidak ditawarkan ke publik sebagai produk tersendiri.'
      ]
    },
    {
      id: 'account',
      head: 'Akun Efolusi Anda',
      blocks: [
        'Anda harus berusia minimal 18 tahun untuk membuat akun Efolusi dan memakai produk kami. Isi data yang benar saat mendaftar dan jaga agar alamat email Anda tetap aktif, karena lewat email itulah kami menghubungi Anda.',
        'Relay, Loop, Runa, Komando, Sanctum, dan Kongkow mengarahkan Anda ke my.efolusi.com untuk masuk dan tidak pernah meminta kata sandi Efolusi Anda sendiri. Saat Anda masuk ke sebuah produk, my.efolusi.com memberi tahu produk itu siapa Anda: id akun, alamat email, nama, dan foto profil Anda. Halaman akun Anda menampilkan produk yang terhubung ke akun Anda dan memungkinkan Anda mencabut aksesnya.',
        `Jaga kerahasiaan kata sandi Anda, dan aktifkan verifikasi dua langkah dengan aplikasi autentikator di halaman akun Anda. Anda bertanggung jawab atas semua yang terjadi lewat akun Anda. Kalau Anda menduga ada orang lain yang bisa mengakses akun Anda, ganti kata sandi dan kabari kami di ${EMAIL}.`,
        'Beberapa produk memungkinkan Anda bekerja di ruang bersama: workspace Relay, company di Runa, atau tim Sanctum. Pemilik ruang itu yang menentukan siapa anggotanya dan apa yang terjadi pada datanya. Kalau Anda keluar atau dikeluarkan, datanya tetap tinggal di ruang tersebut.'
      ]
    },
    {
      id: 'use',
      head: 'Memakai produk secara wajar',
      blocks: [
        'Anda dilarang, dan dilarang membiarkan siapa pun yang memakai akun Anda:',
        {
          ul: [
            'melanggar hukum, atau memakai produk untuk membantu orang lain melanggarnya;',
            'mengunggah, membuat, atau membagikan konten yang melanggar hukum, melanggar hak orang lain, mengandung eksploitasi seksual anak, atau mengancam, melecehkan, maupun menghasut kebencian terhadap siapa pun;',
            'menyamar sebagai orang lain, atau menipu dan mencurangi orang;',
            'mengirim spam atau pesan massal yang tidak diminta lewat produk mana pun;',
            'mengakali batas paket, batas laju, kuota, atau kontrol keamanan, atau mencoba menjangkau data yang bukan milik Anda;',
            'menguji, memindai, atau menyerang sistem kami maupun sistem orang lain lewat sebuah produk;',
            'menyimpan atau menyebarkan malware, atau memakai produk untuk menambang kripto;',
            'menjual kembali produk atau menawarkannya kepada orang lain sebagai layanan Anda sendiri tanpa persetujuan tertulis dari kami;',
            'melakukan scraping atau menyalin produk, kecuali sejauh diizinkan hukum.'
          ]
        },
        'Beberapa produk mengirim lalu lintas ke alamat yang Anda pilih: monitor Komando, agen Runa, serta webhook dan integrasi yang Anda tambahkan di Relay, Runa, atau Kongkow. Arahkan hanya ke host dan layanan milik Anda atau yang boleh Anda gunakan dengan cara itu. Lalu lintas tersebut berasal dari server kami, jadi bila pemilik target mengajukan keluhan, kami bisa meneruskannya kepada Anda dan menghentikan lalu lintas itu.',
        'Bila Anda melanggar aturan ini, kami bisa menghapus konten, membatasi fitur, atau menangguhkan maupun menutup akun Anda. Bila memungkinkan, kami akan menjelaskan alasannya lebih dulu dan memberi Anda kesempatan menanggapi. Kami bisa melaporkan kegiatan yang melanggar hukum kepada pihak berwenang.'
      ]
    },
    {
      id: 'ai',
      head: 'Fitur AI',
      blocks: [
        'Beberapa produk memakai model AI yang dijalankan perusahaan lain. Loop, Sanctum, dan Kongkow mengakses model tersebut lewat Relay, gateway AI kami. Di Runa, tiap agen memakai penyedia AI yang Anda atur untuknya, dengan kunci atau akun Anda sendiri. [Lampiran produk](#schedule) menjelaskan apa yang dikirim tiap produk.',
        'Hasil AI bisa salah, tidak lengkap, atau usang, meskipun terdengar meyakinkan. Periksa dulu sebelum Anda mengandalkan, menerbitkan, atau menindaklanjutinya, dan jangan menjadikannya satu-satunya dasar keputusan hukum, medis, keuangan, atau keselamatan. Apa pun yang dihasilkan fitur AI bukan nasihat dari kami.',
        'Tiap penyedia AI menangani permintaan yang diterimanya berdasarkan ketentuannya sendiri, dan Anda wajib mematuhi kebijakan penggunaannya saat memakai modelnya lewat produk kami. Kami tidak memakai konten Anda untuk melatih model AI.',
        'Agen Runa bertindak atas nama Anda. Agen bisa menjalankan perintah, memanggil tool, dan menghubungi situs serta API yang Anda atur, dan agen bisa keliru. Anda bertanggung jawab atas tindakan agen Anda dan atas pemakaian AI yang mereka habiskan dengan kunci Anda.'
      ]
    },
    {
      id: 'content',
      head: 'Konten Anda',
      blocks: [
        'Apa yang Anda masukkan ke sebuah produk tetap milik Anda, begitu juga apa yang dihasilkan produk untuk Anda, sejauh diizinkan hukum. Anda mengizinkan kami menyimpan, memproses, menyalin, dan menampilkan konten Anda hanya sejauh diperlukan untuk menjalankan produk bagi Anda, menjaga keamanannya, dan memenuhi kewajiban hukum kami. Izin ini berakhir saat konten dihapus, kecuali salinan di cadangan sampai cadangan itu kedaluwarsa.',
        'Anda menyatakan berhak memberikan konten Anda kepada kami, dan konten itu tidak memuat data pribadi orang lain kecuali Anda memang boleh membagikannya.',
        'Postingan dan profil publik di Kongkow bisa dilihat pengguna lain dan siapa pun yang membuka halaman publik, dan pengguna lain bisa membagikannya di dalam Kongkow.',
        'Kalau Anda mengirim ide atau masukan, kami boleh memakainya tanpa kewajiban apa pun kepada Anda.'
      ]
    },
    {
      id: 'refunds',
      head: 'Pembayaran dan pengembalian dana',
      blocks: [
        'Komando, Runa, dan Kongkow gratis. Loop, Sanctum, dan Relay bisa dipakai gratis dan juga menawarkan paket berbayar, dengan harga yang ditampilkan di tiap produk. Pembayaran diselesaikan lewat Efolusi Pay dan mitra pembayaran yang ditampilkan saat checkout.',
        {
          ul: [
            '**Loop Pro** seharga Rp149.000, dibayar sekali lewat QRIS. Ini bukan langganan dan tidak diperpanjang otomatis.',
            '**Sanctum Pro** seharga Rp49.000 untuk 30 hari atau Rp490.000 untuk 365 hari, dan **Sanctum Team** seharga Rp199.000 untuk 30 hari atau Rp1.990.000 untuk 365 hari. Tiap pembelian berlaku untuk periode yang Anda pilih dan tidak diperpanjang otomatis.',
            '**Relay** menampilkan paketnya di dasbor. Untuk paket berbayar, harga, mata uang, dan periode tagihan ditampilkan saat checkout sebelum Anda membayar.'
          ]
        },
        `Untuk meminta pengembalian dana, tulis ke ${EMAIL} dari alamat email akun Anda, sebutkan produk dan tanggal pembayarannya. Kalau Anda tertagih dua kali, tertagih dengan jumlah yang salah, atau sudah membayar paket yang tidak pernah aktif di akun Anda dan kami tidak bisa memperbaikinya, kami mengembalikan pembayaran itu sepenuhnya. Permintaan lain kami tinjau satu per satu. Pengembalian dana yang disetujui diproses lewat Efolusi Pay. Bila pembayaran Sanctum dikembalikan, paket yang dibeli dengan pembayaran itu berakhir.`,
        'Bagian ini tidak membatasi hak pengembalian dana yang diberikan hukum perlindungan konsumen kepada Anda, termasuk Undang-Undang Nomor 8 Tahun 1999 tentang Perlindungan Konsumen.',
        'Pembelian di Trady, Cuwan, ZOYYA, dan Toolips mengikuti ketentuan tagihan dan pengembalian dana produk masing-masing.'
      ]
    },
    {
      id: 'availability',
      head: 'Ketersediaan dan perubahan produk',
      blocks: [
        'Produk kami dijalankan oleh tim kecil di server yang kami kelola. Kami berusaha menjaga produk tetap tersedia, tetapi kami tidak menjanjikan produk selalu berjalan tanpa gangguan atau tanpa galat, dan sesekali kami menghentikannya sementara untuk pemeliharaan. Simpan sendiri salinan apa pun yang penting.',
        'Kami bisa mengubah, membatasi, atau menghentikan sebuah produk atau fitur. Bila kami menghentikan fitur berbayar di tengah periode yang sudah Anda bayar, kami mengembalikan bagian yang belum terpakai.'
      ]
    },
    {
      id: 'ending',
      head: 'Menutup akun Anda',
      blocks: [
        'Anda bisa berhenti memakai produk kapan saja. Untuk menutup akun Efolusi, masuk di [my.efolusi.com](https://my.efolusi.com), buka halaman akun, lalu pakai **Hapus akun** di bagian paling bawah. Anda mengonfirmasi dengan kata sandi, dan akun langsung terhapus. Langkah ini tidak bisa dibatalkan. Kalau akun Anda tidak punya kata sandi, tulis ke kami dan kami akan menghapusnya untuk Anda.',
        `Setelah akun terhapus, Anda tidak bisa lagi memakainya untuk masuk ke produk mana pun. Menghapus akun belum menghapus data yang disimpan tiap produk untuk Anda. Untuk menghapus data itu juga, tulis ke ${EMAIL} dari alamat email yang sama dan sebutkan produk yang pernah Anda pakai. [Pemberitahuan Privasi](/{lang}/privacy#deletion) menjelaskan apa yang dihapus dan apa yang disimpan.`,
        'Kami bisa menangguhkan atau menutup akun yang melanggar ketentuan ini, yang wajib kami tutup menurut hukum, atau yang membahayakan produk maupun orang lain. Kecuali dalam keadaan mendesak atau bila dilarang hukum, kami akan memberi tahu Anda lebih dulu.'
      ]
    },
    {
      id: 'liability',
      head: 'Penafian dan tanggung jawab',
      blocks: [
        'Produk dan situs ini disediakan "sebagaimana adanya" dan "sebagaimana tersedia". Sejauh diizinkan hukum, kami tidak memberikan jaminan selain yang tertulis dalam ketentuan ini. Kami berupaya menjaga informasi di situs ini tetap akurat tetapi tidak menjaminnya, dan tidak ada isi situs ini yang merupakan nasihat keuangan, hukum, atau profesional.',
        'Sejauh diizinkan hukum, kami tidak bertanggung jawab atas kerugian tidak langsung atau kerugian lanjutan, atas hilangnya laba, pendapatan, atau data, atas kerugian akibat hasil AI atau tindakan agen, maupun atas kerugian akibat layanan pihak ketiga yang dihubungi produk untuk Anda. Total tanggung jawab kami atas semua klaim dalam periode 12 bulan mana pun dibatasi sebesar jumlah yang Anda bayarkan kepada kami untuk produk terkait dalam 12 bulan sebelum klaim.',
        'Tidak ada isi ketentuan ini yang membatasi tanggung jawab yang menurut hukum tidak boleh dibatasi, seperti tanggung jawab atas penipuan, kesengajaan, atau kelalaian berat, ataupun menghilangkan hak Anda sebagai konsumen menurut hukum Indonesia.'
      ]
    },
    {
      id: 'token',
      head: 'Token $EFO',
      blocks: [
        '$EFO adalah token milik Efolusi sendiri di BNB Smart Chain. Ia bukan saham, sekuritas, atau produk investasi, dan tidak ada yang di situs ini merupakan penawaran untuk menjual atau ajakan untuk membeli instrumen keuangan apa pun. Tidak ada yang di sini merupakan nasihat keuangan.',
        'Aset digital bersifat volatil dan membawa risiko kerugian total: Anda bisa kehilangan semua yang Anda tanamkan. Lakukan riset sendiri dan patuhi hukum di tempat tinggal Anda sebelum berinteraksi dengan aset digital apa pun.',
        'Satu-satunya alamat kontrak resmi adalah yang diterbitkan di [halaman token](/{lang}/token). Alamat apa pun yang diterbitkan di tempat lain bukan milik kami. Kami tidak pernah mengirim pesan duluan, tidak pernah meminta seed phrase Anda, dan tidak pernah mengumumkan airdrop atau presale di luar situs ini.'
      ]
    },
    {
      id: 'trademarks',
      head: 'Konten dan merek dagang',
      blocks: [
        `Nama Efolusi, maskot owl, dan nama-nama produk adalah milik ${ENTITY}. Kode sumber situs ini open source di bawah lisensi MIT di [github.com/efolusi/efolusi](https://github.com/efolusi/efolusi); lisensi MIT tidak mencakup nama-nama atau maskot. Di luar proyek open source, produk kami beserta perangkat lunak dan desainnya tetap milik kami.`
      ]
    },
    {
      id: 'law',
      head: 'Hukum yang berlaku dan sengketa',
      blocks: [
        'Ketentuan ini tunduk pada hukum Negara Republik Indonesia.',
        `Bila Anda punya keluhan atau sengketa, tulis dulu ke ${EMAIL}. Kami akan berusaha menyelesaikannya bersama Anda dalam 30 hari.`,
        'Tidak ada isi ketentuan ini yang menghilangkan hak Anda sebagai konsumen untuk memakai jalur penyelesaian sengketa yang diberikan hukum Indonesia, seperti Badan Penyelesaian Sengketa Konsumen (BPSK).'
      ]
    },
    {
      id: 'changes',
      head: 'Perubahan ketentuan ini',
      blocks: [
        'Kami memperbarui ketentuan ini seiring perubahan produk. Tiap versi memuat nomor versi dan tanggal yang tertera di bagian atas halaman ini. Bila sebuah perubahan penting bagi Anda, misalnya ada kewajiban baru, aturan pembayaran baru, atau perubahan cara kami menangani data, halaman akun Anda di my.efolusi.com akan menampilkan pemberitahuan agar Anda membaca dan menyetujui versi baru.',
        'Ketentuan ini diterbitkan dalam Bahasa Indonesia dan Bahasa Inggris. Bila keduanya berbeda, versi Bahasa Indonesia yang berlaku bagi pengguna di Indonesia dan versi Bahasa Inggris bagi pengguna lainnya.'
      ]
    },
    {
      id: 'contact',
      head: 'Kontak',
      blocks: [`${ENTITY}, ${ADDRESS}.`, `Pertanyaan soal ketentuan ini, pengembalian dana, laporan keamanan, dan keluhan: ${EMAIL}.`]
    },
    {
      id: 'schedule',
      head: 'Lampiran produk',
      blocks: [
        'Tiap entri menjelaskan fungsi produk, data yang diprosesnya, dan penyedia AI yang terlibat. Aturan dalam sebuah entri hanya berlaku untuk produk itu. Rincian lengkap soal data dan lama penyimpanannya ada di [Pemberitahuan Privasi](/{lang}/privacy#products).',
        { h3: 'Akun Efolusi (my.efolusi.com)', id: 'my' },
        {
          ul: [
            '**Fungsinya:** pendaftaran, masuk, atur ulang kata sandi, verifikasi dua langkah, aplikasi terhubung, ekspor data, dan penghapusan akun untuk produk-produk Efolusi.',
            '**Data yang diproses:** alamat email, nama, dan foto profil Anda, kata sandi dalam bentuk hash, rahasia verifikasi dua langkah, sesi beserta alamat IP dan browser, peristiwa keamanan, versi ketentuan dan pemberitahuan privasi yang Anda setujui, serta alamat dompet bila Anda menautkannya.',
            '**Penyedia AI:** tidak ada.',
            '**Harga:** gratis.'
          ]
        },
        { h3: 'Relay (relay.efolusi.com)', id: 'relay' },
        {
          ul: [
            '**Fungsinya:** satu kunci API dan satu endpoint di depan banyak penyedia AI, dengan perutean, cadangan otomatis, anggaran, pencatatan pemakaian, dan penyimpanan terenkripsi untuk kunci penyedia yang Anda tambahkan.',
            '**Data yang diproses:** data workspace dan anggota, kunci API, kunci penyedia yang Anda tambahkan (terenkripsi), dan catatan pemakaian untuk tiap permintaan berisi model, penyedia, token, biaya, status, dan waktu. Log permintaan tidak menyimpan teks prompt maupun respons. Untuk permintaan video, respons job dari penyedia disimpan.',
            '**Penyedia AI:** penyedia yang Anda tuju. Relay bisa terhubung ke Anthropic, OpenAI, Google Gemini, OpenRouter, xAI, DeepSeek, Mistral, Groq, dan penyedia lain yang tercantum di dasbor, memakai kunci platform Efolusi atau kunci yang Anda tambahkan.',
            '**Aturan:** patuhi kebijakan penggunaan setiap penyedia yang dijangkau permintaan Anda. Tambahkan hanya kunci atau akun penyedia yang boleh Anda pakai lewat gateway pihak ketiga. Jangan memakai Relay untuk mengakali larangan atau batas laju dari penyedia, dan jangan menjual kembali akses Relay tanpa persetujuan tertulis dari kami.',
            '**Harga:** pemakaian awal gratis, dan paket berbayar sesuai yang ditampilkan di dasbor.'
          ]
        },
        { h3: 'Loop (loop.efolusi.com)', id: 'loop' },
        {
          ul: [
            '**Fungsinya:** mengubah ide atau brief produk menjadi spesifikasi terstruktur dengan bagian, versi, dan pemeriksaan kesiapan, lalu mengekspornya sebagai bundel LOOP.md. Anda bisa memberi Runa atau ZOYYA akses berbatas waktu ke sebuah proyek.',
            '**Data yang diproses:** ide atau brief Anda, spesifikasi beserta semua versinya termasuk instruksi yang Anda berikan saat membuat ulang, usulan revisi, baseline, permintaan perubahan dan laporan, akses yang Anda berikan, serta catatan paket dan pembayaran.',
            '**Penyedia AI:** ide atau brief Anda, dan saat membuat ulang, spesifikasi terkini beserta instruksi Anda, dikirim lewat Relay ke sebuah model bahasa. Konfigurasi bawaannya memakai model OpenAI.',
            '**Aturan:** bagian yang dihasilkan masih berupa draf, jadi periksa dulu sebelum Anda serahkan ke orang lain atau jadikan dasar pengerjaan. Ada batas harian: 10 kali pembuatan dan 30 kali pembuatan ulang sehari di Free, 100 dan 300 di Pro.',
            '**Harga:** Free, atau Pro seharga Rp149.000 yang dibayar sekali.'
          ]
        },
        { h3: 'Runa (runa.efolusi.com)', id: 'runa' },
        {
          ul: [
            '**Fungsinya:** control plane untuk tim agen AI. Anda membuat company, menyiapkan agen dengan tujuan, proyek, rutinitas, dan persetujuan, lalu Runa menjalankannya sesuai jadwal atau saat diminta.',
            '**Data yang diproses:** data company dan anggota, pengaturan agen, issue, tujuan, dokumen dan lampiran, catatan dan log run (yang bisa memuat konten Anda dan hasil kerja agen), persetujuan, perkiraan biaya, dan rahasia yang Anda simpan (terenkripsi).',
            '**Penyedia AI:** tiap agen memakai penyedia atau tool AI yang Anda atur untuknya, misalnya Anthropic Claude, OpenAI Codex, atau Google Gemini, dengan kunci API atau akun Anda sendiri. Instruksi agen, konteks tugas, dan berkas yang dikerjakannya dikirim ke penyedia itu.',
            '**Aturan:** agen berjalan di server kami dan bisa menjalankan perintah, memanggil tool, serta menghubungi situs dan API yang Anda atur. Arahkan agen hanya ke sistem milik Anda atau yang boleh Anda gunakan dengan cara itu, dan jangan memakainya untuk spam, penipuan, serangan, atau menambang kripto. Di layanan hosted, hubungkan penyedia dengan kunci API; masuk memakai langganan pribadi Claude atau ChatGPT tidak didukung.',
            '**Harga:** gratis. Biaya pemakaian AI oleh agen Anda dibayar langsung ke penyedia AI Anda.'
          ]
        },
        { h3: 'Komando (komando.efolusi.com)', id: 'komando' },
        {
          ul: [
            '**Fungsinya:** monitor uptime, sertifikat TLS, dan DNS untuk situs dan host Anda, ditambah inventaris server dan sumber daya cloud Anda. Hasilnya ditampilkan di dasbor. Komando tidak mengirim peringatan.',
            '**Data yang diproses:** monitor yang Anda tambahkan beserta targetnya, hasil pemeriksaan 30 hari terakhir (status, waktu respons, kode status, dan pesan yang bisa memuat alamat IP hasil resolusi target), serta catatan inventaris. Inventaris tidak menyimpan kata sandi atau kunci, hanya referensi yang Anda pilih.',
            '**Penyedia AI:** tidak ada.',
            '**Aturan:** pantau hanya host, domain, dan endpoint milik Anda atau yang Anda diberi izin untuk memantaunya. Pemeriksaan dikirim dari server kami dengan user agent komando-monitor/1.0. Tiap akun bisa punya hingga 50 monitor, dan sebuah monitor paling sering dijadwalkan sekali per menit. Jangan memakai Komando untuk memindai port atau membanjiri target dengan lalu lintas.',
            '**Harga:** gratis.'
          ]
        },
        { h3: 'Sanctum (sanctum.efolusi.com)', id: 'sanctum' },
        {
          ul: [
            '**Fungsinya:** brankas terenkripsi untuk kata sandi, item aman, catatan, dan berkas, ditambah memori AI yang bisa dibaca agen lewat MCP dalam batas yang Anda tentukan.',
            '**Data yang diproses:** item brankas, catatan, dan lampiran di tingkat rahasia dienkripsi di browser Anda, dan kami hanya menyimpan bentuk terenkripsinya. Memori di tingkat sensitif dienkripsi di server kami dengan kunci yang kami pegang. Memori di tingkat publik disimpan sebagai teks biasa. Kami juga menyimpan folder, perangkat, kunci MCP (dalam bentuk hash), penghitung pemakaian, log audit, dan catatan paket.',
            '**Penyedia AI:** hanya memori yang Anda izinkan untuk AI, di tingkat publik atau sensitif, yang dikirim lewat Relay ke sebuah model bahasa (bawaannya Anthropic Claude Haiku), setelah Sanctum membuang rahasia, token, dan alamat email. Ringkasan yang dihasilkannya disimpan di tingkat publik. Tingkat rahasia tidak pernah dikirim.',
            '**Aturan:** kami tidak bisa membaca tingkat rahasia Anda, jadi kami juga tidak bisa memulihkannya. Kalau Anda kehilangan frasa sandi sekaligus kode pemulihan, data itu hilang. Memori dihapus otomatis 90 hari setelah dibuat, kecuali ringkasan.',
            '**Harga:** Free (hingga 50 item brankas), atau Pro dan Team seperti tercantum di [Pembayaran dan pengembalian dana](#refunds).'
          ]
        },
        { h3: 'Kongkow (kongkow.xyz)', id: 'kongkow' },
        {
          ul: [
            '**Ketentuan sendiri:** Kongkow punya [ketentuan layanan](https://kongkow.xyz/terms) dan [kebijakan privasi](https://kongkow.xyz/privacy) sendiri. Bila berbeda dengan ketentuan ini untuk urusan Kongkow, ketentuan Kongkow yang diutamakan. Entri ini hanya ringkasan.',
            '**Fungsinya:** jejaring sosial dengan feed, postingan, komentar, story, pesan langsung, grup, dan API bot. Kongkow juga tempat menerbitkan: Anda bisa mengirim postingan ke kanal media sosial yang Anda hubungkan, langsung atau pada waktu yang Anda jadwalkan. Postingan terjadwal dikirim saat waktunya tiba, dan postingan yang terlambat lebih dari 24 jam, misalnya setelah gangguan layanan, tidak diterbitkan tetapi ditandai terlewat agar Anda bisa memutuskan apakah akan memostingnya lagi.',
            '**Penyedia AI:** Enhance dan Explain mengirim teks yang Anda berikan lewat Relay ke sebuah model bahasa (bawaannya Anthropic Claude Haiku), hanya saat Anda memakainya.',
            '**Aturan:** dilarang melecehkan, menyebar kebencian, mengancam, konten seksual yang melibatkan anak, gambar intim yang dibagikan tanpa persetujuan, spam, menyamar sebagai orang lain, atau menyebarkan data pribadi orang lain tanpa izinnya. Hubungkan hanya kanal yang Anda kendalikan atau boleh Anda isi, dan ikuti aturan tiap platform untuk apa yang Anda terbitkan di sana.',
            '**Harga:** gratis. Fitur dompet Solana, tip, dan postingan berbayar Kongkow yang lama sudah dihentikan.'
          ]
        }
      ]
    }
  ]
};

export const privacy = {
  meta: {
    title: 'Pemberitahuan Privasi Platform · Efolusi',
    description:
      'Cara PT Efolusi Dunia Teknologi menangani data pribadi di akun Efolusi Anda, di efolusi.com, dan di produk Efolusi yang tidak punya kebijakan privasi sendiri.'
  },
  back: '← Kembali ke efolusi.com',
  title: 'Pemberitahuan Privasi Platform Efolusi',
  metaLine: META_LINE,
  contentsHead: 'Daftar isi',
  intro: [
    `Pemberitahuan ini menjelaskan data pribadi apa yang dikumpulkan ${ENTITY} ("Efolusi", "kami"), untuk apa, dengan siapa kami membagikannya, berapa lama kami menyimpannya, dan bagaimana Anda bisa mengendalikannya. Kami bertanggung jawab atas data itu sebagai pengendalinya. Kami tidak menjual data pribadi.`
  ],
  sections: [
    {
      id: 'scope',
      head: 'Cakupan pemberitahuan ini',
      blocks: [
        'Pemberitahuan ini mencakup akun Efolusi Anda di my.efolusi.com, situs ini (efolusi.com), serta Relay, Loop, Runa, Komando, dan Sanctum.',
        'Trady, Cuwan, ZOYYA, Toolips, dan Kongkow punya kebijakan privasinya sendiri, yang diutamakan untuk produk tersebut: [Trady](https://trady.efolusi.com/{lang}/privacy), [Cuwan](https://cuwan.xyz/privacy), [ZOYYA](https://zoyya.xyz/privacy), [Toolips](https://toolips.xyz/{lang}/privacy), dan [Kongkow](https://kongkow.xyz/privacy). Pemberitahuan ini tetap mencakup akun Efolusi yang Anda pakai untuk masuk ke produk-produk itu.',
        'Saat Anda bekerja di ruang bersama milik orang lain, seperti workspace Relay, company di Runa, atau tim Sanctum, pemiliknya yang menentukan apa yang masuk ke ruang itu, dan kami memproses konten tersebut untuk menyediakan produk kepada mereka.',
        'Kami memproses data pribadi sesuai Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi.'
      ]
    },
    {
      id: 'account-data',
      head: 'Akun Efolusi Anda',
      blocks: [
        {
          ul: [
            '**Profil:** alamat email, nama, dan foto profil. Foto yang Anda unggah disimpan di penyimpanan objek kami.',
            '**Masuk:** kata sandi dalam bentuk hash, rahasia verifikasi dua langkah dan kode cadangan, serta sesi beserta alamat IP dan browser asalnya. Satu sesi berlaku 30 hari.',
            '**Peristiwa keamanan:** proses masuk, perubahan kata sandi dan email, perubahan verifikasi dua langkah, serta tindakan administratif. Catatan ini bisa memuat alamat email dan disimpan selama dua tahun.',
            '**Aplikasi terhubung:** produk yang pernah Anda masuki dan akses yang Anda berikan kepadanya.',
            '**Persetujuan:** versi Ketentuan Platform dan pemberitahuan ini yang Anda setujui, serta kapan.',
            '**Dompet, bila Anda menautkannya:** alamat dompet BNB Smart Chain Anda, dan catatan harian saldo EFO publiknya, yang menentukan tingkat keanggotaan EFO Anda.'
          ]
        },
        'Saat Anda masuk ke sebuah produk, my.efolusi.com membagikan id akun, alamat email, nama, dan foto profil Anda kepada produk itu.',
        'Saat Anda membuat atau mengganti kata sandi, kami mencocokkannya dengan daftar kata sandi bocor milik Have I Been Pwned. Hanya lima karakter pertama dari hash kata sandi yang keluar dari server kami, tidak pernah kata sandinya sendiri.',
        'Email akun, seperti verifikasi email, atur ulang kata sandi, dan perubahan email, dikirim lewat Resend.'
      ]
    },
    {
      id: 'website',
      head: 'efolusi.com',
      blocks: [
        {
          ul: [
            '**Formulir kontak:** nama, alamat email, dan pesan Anda, dikirim kepada kami lewat email melalui Brevo supaya kami bisa membaca dan membalasnya.',
            '**Formulir newsletter:** saat ini belum menerima pendaftaran. Apa yang Anda ketik di sana tidak disimpan dan tidak dikirim ke mana pun.',
            '**Bahasa:** cookie bernama lang mengingat apakah Anda membaca situs dalam Bahasa Indonesia atau Inggris, selama satu tahun.',
            '**Tema:** pilihan terang atau gelap Anda hanya disimpan di browser.',
            '**Status masuk:** situs ini bertanya ke my.efolusi.com apakah Anda sedang masuk, supaya header bisa menampilkan akun Anda. Cookie akun Anda ikut terkirim dalam permintaan itu, dan efolusi.com tidak menyimpan apa pun darinya.',
            '**Log server:** situs ini dilayani lewat Cloudflare, yang memproses data permintaan standar seperti alamat IP dan browser Anda untuk mengirimkan dan melindungi situs.'
          ]
        }
      ]
    },
    {
      id: 'products',
      head: 'Data di tiap produk',
      blocks: [
        'Selain akun Anda, tiap produk memproses data di bawah ini. Bila kami menyebut Anda bisa menghapus sesuatu sendiri, itulah yang tersedia di produk saat ini.',
        { h3: 'Relay', id: 'relay-data' },
        {
          ul: [
            'Nama workspace, alamat email dan peran anggota, kunci API, pengaturan perutean, anggaran, alamat webhook, serta kunci atau koneksi penyedia yang Anda tambahkan, yang disimpan terenkripsi.',
            'Catatan pemakaian untuk setiap permintaan: waktu, kunci API, model, penyedia, jumlah token, biaya, status, dan durasi. Log permintaan tidak menyimpan teks prompt maupun respons. Untuk permintaan video, respons job dari penyedia disimpan.',
            'Prompt dan respons dikirim ke penyedia AI tujuan permintaan Anda.',
            'Catatan pemakaian, peristiwa audit, dan job video yang sudah selesai dihapus setelah melewati pengaturan retensi workspace Anda, yaitu 7, 30, 90, atau 365 hari (bawaannya 90). Catatan tagihan dan catatan pengiriman webhook tidak ikut dihapus oleh pengaturan itu.',
            'Pemilik dan admin workspace bisa mengunduh konfigurasi workspace, dan pemilik bisa menghapus seluruh workspace dari dasbor.'
          ]
        },
        { h3: 'Loop', id: 'loop-data' },
        {
          ul: [
            'Ide dan brief Anda, spesifikasi beserta semua versinya termasuk instruksi pembuatan ulang, usulan revisi, baseline, permintaan perubahan dan laporan, akses proyek yang Anda berikan ke Runa atau ZOYYA, serta catatan paket dan pembayaran Anda.',
            'Ide atau brief Anda, dan saat membuat ulang, spesifikasi terkini beserta instruksi Anda, dikirim lewat Relay ke sebuah model bahasa.',
            'Loop menyimpan proyek sampai proyek itu dihapus. Anda bisa mengarsipkan proyek dan mengekspor spesifikasinya, tetapi Loop belum punya tombol hapus, jadi tulis ke kami untuk menghapus sebuah proyek atau seluruh data Loop Anda.'
          ]
        },
        { h3: 'Runa', id: 'runa-data' },
        {
          ul: [
            'Data company dan anggota, agen beserta pengaturannya, issue, komentar, tujuan, proyek, rutinitas, dokumen dan lampiran, persetujuan, perkiraan biaya, serta rahasia yang Anda simpan, yang disimpan terenkripsi.',
            'Catatan dan log run. Isinya bisa memuat konten Anda, instruksi yang diterima agen, dan hasil kerja agen.',
            'Agen mengirim instruksi, konteks tugas, dan berkas kerjanya ke penyedia AI yang Anda atur, serta menghubungi tool, situs, dan API yang Anda siapkan.',
            'Catatan run disimpan sampai agen atau company-nya dihapus. Database Runa dicadangkan setiap jam, dan cadangannya disimpan bergilir: tujuh salinan harian, empat mingguan, dan satu bulanan.',
            'Board sebuah company bisa mengekspor company dan menghapusnya di Runa. Untuk menghapus data pribadi di profil Runa Anda, tulis ke kami.'
          ]
        },
        { h3: 'Komando', id: 'komando-data' },
        {
          ul: [
            'Monitor Anda beserta targetnya, hasil pemeriksaan (status, waktu respons, kode status, dan pesan yang bisa memuat alamat IP hasil resolusi target), serta catatan inventaris. Inventaris tidak menyimpan kata sandi atau kunci.',
            'Riwayat pemeriksaan yang lebih lama dari 30 hari dihapus setiap jam. Anda bisa menghapus monitor dan item inventaris sendiri, dan menghapus monitor ikut menghapus riwayatnya.',
            'Komando tidak memakai AI dan tidak mengirim peringatan. Pemeriksaannya hanya menghubungi target yang Anda tambahkan.',
            'Komando belum punya ekspor data maupun penghapusan akun sendiri. Tulis ke kami untuk keduanya.'
          ]
        },
        { h3: 'Sanctum', id: 'sanctum-data' },
        {
          ul: [
            '**Tingkat rahasia:** item brankas, catatan, dan lampiran dienkripsi di browser Anda sebelum sampai ke kami. Kami hanya menyimpan bentuk terenkripsinya dan tidak bisa membacanya.',
            '**Tingkat sensitif:** memori yang Anda tandai sensitif dienkripsi di server kami dengan kunci yang kami pegang, sehingga server kami bisa membacanya untuk menjalankan fitur yang Anda pakai.',
            '**Tingkat publik:** memori yang Anda tandai publik, dan ringkasan yang ditulis Sanctum, disimpan sebagai teks biasa.',
            'Sanctum juga menyimpan folder, perangkat, kunci MCP (dalam bentuk hash), penghitung pemakaian, log audit yang bisa memuat alamat IP, serta catatan paket dan pembayaran. Berkas disimpan di penyimpanan objek kami, dan email Sanctum dikirim lewat Resend.',
            'Hanya memori yang Anda izinkan untuk AI yang dikirim lewat Relay ke sebuah model bahasa, setelah rahasia, token, dan alamat email dibuang. Data tingkat rahasia tidak pernah dikirim.',
            'Memori dihapus otomatis 90 hari setelah dibuat, kecuali ringkasan. Anda bisa menghapus item brankas dan catatan sendiri, dan bisa mengekspor catatan serta lampiran dalam bentuk yang bisa dibaca dari browser Chromium di desktop.',
            'Sanctum belum punya tombol hapus akun. Tulis ke kami dan kami akan menghapus data Sanctum Anda, termasuk brankas Anda.'
          ]
        },
        { h3: 'Kongkow', id: 'kongkow-data' },
        {
          ul: [
            'Kongkow punya [kebijakan privasi](https://kongkow.xyz/privacy) sendiri, yang diutamakan untuk Kongkow. Di sana dijelaskan apa yang disimpan Kongkow, apa yang dilakukannya dengan kanal media sosial yang Anda hubungkan, berapa lama data disimpan, serta cara mendapatkan salinan data atau menghapus akun Kongkow Anda.',
            'Singkatnya: Kongkow menyimpan profil Anda, apa yang Anda posting dan kirim, serta catatan postingan yang Anda kirim ke kanal yang terhubung. Token akses kanal disimpan terenkripsi. Postingan dan profil publik bisa dilihat siapa saja, dan pesan langsung tidak dienkripsi end-to-end.'
          ]
        }
      ]
    },
    {
      id: 'ai',
      head: 'Penyedia AI',
      blocks: [
        'Relay adalah gateway AI kami. Saat Loop, Sanctum, atau Kongkow memakai AI, konten yang dijelaskan di atas dikirim lewat Relay ke penyedia AI, yang memprosesnya untuk menghasilkan respons. Konfigurasi bawaan Loop memakai model OpenAI, sedangkan Sanctum dan Kongkow secara bawaan memakai Claude Haiku dari Anthropic. Saat Anda memakai Relay langsung, permintaan Anda dikirim ke penyedia yang Anda tuju. Di Runa, agen memakai penyedia yang Anda atur.',
        'Sebagian besar penyedia ini berbasis di Amerika Serikat, dan masing-masing menangani permintaan berdasarkan ketentuan dan kebijakan privasinya sendiri. Kami tidak memakai konten Anda untuk melatih model AI.'
      ]
    },
    {
      id: 'sharing',
      head: 'Dengan siapa kami berbagi data',
      blocks: [
        'Kami membagikan data pribadi hanya sejauh diperlukan untuk menjalankan produk:',
        {
          ul: [
            '**Penyedia layanan:** Cloudflare (pengiriman dan perlindungan jaringan), Resend (email akun dan produk), Brevo (email formulir kontak), Sentry (laporan galat, yang kami bersihkan dari data pribadi sebelum dikirim), Have I Been Pwned (pemeriksaan kata sandi bocor), dan layanan pembayaran kami Efolusi Pay beserta mitra pembayarannya saat Anda membeli paket.',
            '**Penyedia AI:** seperti dijelaskan di bagian Penyedia AI.',
            '**Pihak ketiga yang Anda tuju lewat produk:** situs, API, host, webhook, dan kanal yang Anda atur.',
            '**Produk Efolusi lain:** saat Anda masuk ke sebuah produk, atau memberi satu produk akses ke produk lain, misalnya proyek Loop ke Runa.',
            '**Node publik BNB Smart Chain:** bila Anda menautkan dompet, alamatnya dicek di sana.',
            '**Pihak berwenang:** bila diwajibkan hukum.'
          ]
        },
        'Sebagian penyedia ini berada di luar Indonesia, termasuk di Amerika Serikat. Kami tidak menjual data pribadi dan tidak memakainya untuk iklan.'
      ]
    },
    {
      id: 'retention',
      head: 'Berapa lama kami menyimpan data',
      blocks: [
        'Kami menyimpan data selama akun Anda atau data produknya masih ada, dan selama jangka waktu yang disebutkan di atas. Ringkasnya:',
        {
          ul: [
            'Sesi akun: 30 hari. Peristiwa keamanan akun: dua tahun.',
            'Catatan pemakaian dan audit Relay: sesuai pengaturan workspace Anda, bawaannya 90 hari.',
            'Riwayat pemeriksaan Komando: 30 hari.',
            'Memori Sanctum: 90 hari, kecuali ringkasan.',
            'Cadangan akun Efolusi: 14 hari. Data yang sudah dihapus bisa tetap ada di cadangan sampai cadangan itu kedaluwarsa.'
          ]
        }
      ]
    },
    {
      id: 'deletion',
      head: 'Menghapus akun dan data Anda',
      blocks: [
        'Anda bisa menghapus akun Efolusi di [my.efolusi.com](https://my.efolusi.com): buka halaman akun, pakai **Hapus akun** di bagian paling bawah, lalu konfirmasi dengan kata sandi. Kalau akun Anda tidak punya kata sandi, tulis ke kami saja.',
        'Penghapusan langsung berlaku. Profil, kata sandi, verifikasi dua langkah, sesi, aplikasi terhubung, keanggotaan produk, dan dompet tertaut Anda ikut terhapus. Peristiwa keamanan tetap disimpan sampai masa dua tahunnya habis, catatan saldo dompet harian tetap ada karena disimpan per alamat dompet, dan salinan tetap ada di cadangan hingga 14 hari. Foto profil yang Anda unggah belum terhapus otomatis; minta ke kami dan kami akan menghapusnya.',
        `Menghapus akun belum menghapus data yang disimpan tiap produk. Untuk menghapusnya, pakai pilihan hapus di dalam produk bila tersedia (lihat di atas), atau tulis ke ${EMAIL} dari alamat email akun Anda dan sebutkan produk yang pernah Anda pakai. Kami akan mengabari Anda setelah selesai.`,
        'Anda bisa mengunduh salinan data akun Anda sebagai berkas JSON lewat **Unduh data saya** di halaman akun.'
      ]
    },
    {
      id: 'rights',
      head: 'Hak Anda',
      blocks: [
        `Menurut hukum Indonesia, Anda bisa meminta untuk melihat data pribadi yang kami simpan tentang Anda dan mendapatkan salinannya, meminta data itu diperbaiki, dihapus, atau diberikan dalam format yang bisa dipindahkan, menarik persetujuan yang pernah Anda berikan, serta menolak atau membatasi sebagian pemrosesan. Tulis ke ${EMAIL} dari alamat email akun Anda. Kami mungkin meminta Anda membuktikan bahwa itu memang Anda, dan kami membalas dalam jangka waktu yang diwajibkan hukum.`,
        'Kalau menurut Anda kami belum menangani data Anda dengan benar, beri tahu kami lebih dulu supaya bisa kami perbaiki. Anda juga bisa mengadu ke lembaga Indonesia yang berwenang di bidang pelindungan data pribadi.'
      ]
    },
    {
      id: 'security',
      head: 'Keamanan',
      blocks: [
        'Koneksi ke situs kami dienkripsi. Kata sandi akun disimpan dalam bentuk hash, verifikasi dua langkah tersedia untuk setiap akun, kunci penyedia di Relay, rahasia di Runa, dan token kanal di Kongkow disimpan terenkripsi, dan tingkat rahasia Sanctum dienkripsi di perangkat Anda. Tidak ada sistem yang aman sepenuhnya. Bila terjadi kebocoran data pribadi yang menyangkut Anda, kami akan memberi tahu Anda dan pihak berwenang sesuai ketentuan hukum Indonesia.'
      ]
    },
    {
      id: 'cookies',
      head: 'Cookie dan penyimpanan browser',
      blocks: [
        'Kami memakai cookie dan penyimpanan browser hanya untuk menjaga Anda tetap masuk dan mengingat pilihan Anda. Kami tidak memakai cookie iklan atau pelacakan.',
        {
          ul: [
            'my.efolusi.com memasang cookie sesi untuk akun Anda di efolusi.com dan subdomainnya, serta cookie bernama efolusi_lang dan efolusi_theme yang mengingat bahasa dan tema Anda selama satu tahun.',
            'Tiap produk memasang cookie sesinya sendiri saat Anda masuk, ditambah cookie berumur pendek yang melindungi langkah masuk.',
            'efolusi.com memasang cookie lang selama satu tahun dan menyimpan tema Anda di penyimpanan browser.',
            'Cloudflare bisa memasang cookie yang diperlukannya untuk melindungi situs dari bot dan penyalahgunaan.'
          ]
        }
      ]
    },
    {
      id: 'children',
      head: 'Anak-anak',
      blocks: [
        'Produk kami ditujukan untuk orang berusia 18 tahun ke atas. Kami tidak dengan sengaja mengumpulkan data anak-anak. Kalau Anda yakin ada anak yang punya akun, tulis ke kami dan kami akan menghapusnya.'
      ]
    },
    {
      id: 'changes',
      head: 'Perubahan pemberitahuan ini',
      blocks: [
        'Saat kami memperbarui pemberitahuan ini, versi barunya kami terbitkan di sini dengan nomor versi dan tanggal baru. Bila sebuah perubahan penting bagi Anda, halaman akun Anda di my.efolusi.com akan meminta Anda membaca dan menyetujuinya.',
        'Pemberitahuan ini diterbitkan dalam Bahasa Indonesia dan Bahasa Inggris. Bila keduanya berbeda, versi Bahasa Indonesia yang berlaku bagi pengguna di Indonesia dan versi Bahasa Inggris bagi pengguna lainnya.'
      ]
    },
    {
      id: 'contact',
      head: 'Kontak',
      blocks: [`${ENTITY}, ${ADDRESS}.`, `Pertanyaan dan permintaan soal privasi: ${EMAIL}.`]
    }
  ]
};
