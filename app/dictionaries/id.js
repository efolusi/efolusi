const id = {
  htmlLang: 'id',
  ogLocale: 'id_ID',

  common: {
    nav: { portfolio: 'Portofolio', token: 'Token', company: 'Perusahaan', careers: 'Karier' },
    getInTouch: 'Hubungi kami',
  signIn: 'Masuk',
    account: 'Akun',
    contact: 'Kontak',
    toggleMenu: 'Buka menu',
    switchLanguage: 'Switch to English',
    langLabel: 'EN',
    footer: {
      tagline: 'PT. Efolusi Dunia Teknologi. Kami membangun software dan menjalankannya sendiri. Dibuat di Indonesia.',
      companyHead: 'Perusahaan',
      ecosystemHead: 'Token',
      legalHead: 'Legal',
      about: 'Tentang',
      careers: 'Karier',
      brand: 'Brand',
      efoToken: 'Token $EFO',
      bscscan: 'BscScan',
      privacy: 'Kebijakan privasi',
      terms: 'Ketentuan penggunaan',
      rights: '© 2026 PT. Efolusi Dunia Teknologi. Hak cipta dilindungi.',
      madeIn: 'Dibuat di Indonesia'
    }
  },

  home: {
    meta: {
      title: 'Efolusi · Kami membangun software dan menjalankannya sendiri',
      description:
        'Efolusi (PT. Efolusi Dunia Teknologi) adalah perusahaan software di Indonesia. Kami membangun produk kami sendiri, di bidang cloud, infrastruktur, AI, dan tools yang dipakai bisnis sehari-hari, dan kami sendiri yang menjaganya tetap jalan.'
    },
    hero: {
      lead: 'Alat yang',
      build: 'diam-diam',
      trail: 'membuat pekerjaan Anda lebih',
      products: 'ringan.',
      sub: 'Kami Efolusi, tim kecil di Indonesia. Kami membangun software kami sendiri, yang mengubah hal-hal yang lambat atau merepotkan jadi terasa gampang. Semua yang ada di sini adalah produk yang kami butuhkan untuk diri kami sendiri lebih dulu.',
      viewPortfolio: 'Lihat yang kami bangun',
      getInTouch: 'Hubungi kami',
      proof: 'Produk aktif, eksperimen, open source, dan infrastruktur internal—statusnya kami tampilkan apa adanya.'
    },
    marquee: ['Kami bangun, kami jalankan', 'Membosankan kalau memang lebih baik', 'Dibuat untuk tetap hidup', 'Bukan sulap, cuma software yang jalan', 'Kami pakai yang kami rilis'],
    glance: {
      headA: 'Satu studio,',
      headEm: 'tiga',
      headB: 'hal yang perlu Anda tahu.',
      cards: {
        products: {
          titleA: 'Produk',
          titleEm: 'kami',
          titleB: 'sendiri',
          body: 'Software untuk bagian pekerjaan yang lambat dan berulang. Ada yang aktif, sedang divalidasi, open source, atau hanya dipakai internal.',
          cta: 'Lihat portofolio'
        },
        token: {
          titleA: 'Token',
          titleEm: '$EFO',
          titleB: '',
          body: 'Token milik kami sendiri, live di BNB Smart Chain dan diperdagangkan di Uniswap. Semua yang resmi ada di satu tempat.',
          cta: 'Tentang token'
        },
        standard: {
          titleA: 'Satu',
          titleEm: 'aturan',
          titleB: '',
          body: 'Kalau tidak membuat pekerjaan seseorang jadi lebih ringan, ya tidak kami rilis.',
          cta: 'Cara kami bekerja'
        }
      }
    },
    portfolio: {
      headA: 'Produk kami,',
      headEm: 'satu portofolio',
      headB: '.',
      lede: 'Portofolio kami mencakup produk aktif, validasi revenue, shared platform internal, open source, dan aset yang sementara dikeluarkan. Status produk tidak kami samakan dengan sekadar halaman yang bisa dibuka.'
    },
    products: {
      zoyya: {
        section: 'Kecerdasan Buatan',
        desc: 'Workspace tempat manusia dan agent dengan tujuan spesifik bekerja bersama. ZOYYA Desktop sedang disatukan sebagai experience kolaborasi dalam platform yang sama.',
        specs: ['Beta aktif', 'Human + agent', 'Desktop disiapkan'],
        buttonLabel: 'Kunjungi ZOYYA',
        tag: 'AI',
        summary: 'Workspace kolaborasi manusia dan agent; Desktop sedang dikonsolidasikan.'
      },
      komando: {
        section: 'Infrastruktur Cloud',
        desc: 'Shared infrastructure layer internal yang sedang dibangun untuk inventory, deployment, health, backup, restore, dan operasi seluruh produk Efolusi.',
        specs: ['Shared platform', 'Internal', 'Sedang dibangun'],
        buttonLabel: 'Lihat status Komando',
        tag: 'Infrastruktur',
        summary: 'Infrastructure layer internal yang sedang dibangun untuk seluruh produk.'
      },
      toolips: {
        section: 'Produktivitas',
        desc: 'Kumpulan capability dan integrasi yang sedang distandarkan agar dapat dipanggil ZOYYA secara typed, permissioned, dan auditable.',
        specs: ['Capability layer', 'Integrasi ZOYYA', 'Sedang dibangun'],
        buttonLabel: 'Kunjungi Toolips',
        tag: 'Produktivitas',
        summary: 'Tool dan integration layer yang sedang disiapkan untuk ZOYYA.'
      },
      trady: {
        section: 'Daur Ulang Video',
        desc: 'Workflow repurposing video yang sedang divalidasi bersama agency dan tim konten. Fokusnya paket klip berbahasa Indonesia dengan review manusia.',
        specs: ['Validasi berbayar', 'Agency', 'Review manusia'],
        buttonLabel: 'Kunjungi Trady',
        tag: 'Video',
        summary: 'Workflow repurposing video dalam validasi pelanggan berbayar.'
      },
      kongkow: {
        section: 'Media Sosial',
        desc: 'Social product yang sedang direposisi dan diuji untuk menemukan satu pekerjaan pelanggan yang benar-benar dibayar.',
        specs: ['Validasi revenue', 'Repositioning', 'Belum PMF'],
        buttonLabel: 'Lihat status Kongkow',
        tag: 'Sosial',
        summary: 'Social product dalam repositioning dan validasi revenue.'
      },
      cuwan: {
        section: 'Grid Trading',
        desc: 'Otomasi trading dalam validasi revenue dengan gerbang legal, keamanan kredensial, risk disclosure, dan performa yang dapat diaudit.',
        specs: ['Validasi revenue', 'Risiko tinggi', 'Safety-gated'],
        buttonLabel: 'Lihat status Cuwan',
        tag: 'Trading',
        summary: 'Otomasi trading dalam validasi revenue yang dibatasi gerbang keselamatan.'
      },
      meridian: {
        section: 'Sistem Desain',
        desc: 'Design system open source yang dipakai untuk menjaga konsistensi antarmuka Efolusi. Kode, dokumentasi, dan lisensinya dapat diperiksa publik.',
        specs: ['Open source', 'Design system', 'Lisensi MIT'],
        buttonLabel: 'Kunjungi Meridian',
        tag: 'Desain',
        summary: 'Design system open source berlisensi MIT untuk antarmuka yang konsisten.'
      }
    },
    team: {
      statementA: 'Dibangun di Indonesia,',
      engineered: 'dipakai',
      statementB: 'di mana-mana, dan',
      led: 'dijaga',
      statementC: 'oleh orang-orang yang menulisnya.'
    },
    ecosystem: {
      titleA: 'Satu token di balik semua yang kami bangun:',
      titleEm: '$EFO',
      titleB: '.',
      lede: 'EFO adalah token milik kami sendiri, live di BNB Smart Chain dan diperdagangkan di Uniswap. Alamat kontrak, fakta on-chain, tiap pengumuman, semuanya ada di halaman token dan tidak di tempat lain.',
      about: 'Tentang $EFO',
      bscscan: 'BscScan',
      tradable: 'Bisa ditradingkan di Uniswap v4',
      bep20: 'BEP-20',
      contractLabel: 'Alamat kontrak resmi',
      facts: [
        ['Jaringan', 'BNB Smart Chain'],
        ['Simbol', 'EFO'],
        ['Total pasokan', '100.000.000.000'],
        ['Pool', 'EFO/USDT di Uniswap v4']
      ],
      note: 'Periksa alamat ini sebelum menyentuh apa pun yang mengaku EFO. Hanya inilah yang kami publikasikan.'
    },
    careers: {
      titleA: 'Peduli pada cara software dibangun?',
      titleEm: 'Mari bicara.',
      body: 'Kami suka orang yang membangun hal berguna. Sapa kami, walau belum ada posisi di bawah yang pas buat Anda.',
      reachOut: 'Tanya soal posisi',
      roles: [
        ['Senior JavaScript Engineer', 'Remote · Penuh waktu'],
        ['AI Research Engineer', 'Remote · Penuh waktu'],
        ['Product Designer (UI/UX)', 'Remote · Penuh waktu']
      ]
    },
    faq: {
      headA: 'Jawaban untuk yang',
      headEm: 'paling sering ditanya',
      headB: '.',
      lede: 'Belum kejawab? Tulis lewat formulir di bawah, sampainya langsung ke kami.',
      items: [
        [
          'Apa itu Efolusi?',
          'Perusahaan software kecil dari Indonesia. Kami membangun dan memvalidasi produk software, merawat proyek open source, dan mengoperasikan infrastruktur internal. Nama resminya PT. Efolusi Dunia Teknologi, kalau Anda perlu untuk dokumen kerja sama.'
        ],
        [
          'Kalian berbasis di mana?',
          'Di Indonesia. Tim kami tersebar dan kerjanya online, dan produknya memang dibuat supaya bisa dibuka dari mana saja.'
        ],
        [
          'Sedang buka lowongan?',
          'Tentu. Kami sedang mencari Senior JavaScript Engineer, AI Research Engineer, dan Product Designer; detailnya di halaman karier. Tidak ada yang pas? Kirim saja karya terbaik Anda, akan kami baca.'
        ],
        [
          'Bagaimana kalau butuh bantuan soal produk?',
          'Langsung saja ke halaman webnya, tiap produk memiliki dokumentasi dan tim support. Formulir di halaman ini untuk urusan lainnya: kerja sama, pertanyaan umum, atau sekadar menyapa.'
        ],
        [
          'Bisakah kita bekerja sama?',
          'Bisa. Ceritakan idenya lewat formulir, masih kasar juga tidak apa-apa. Yang baca manusia, bukan bot, dan kalau cocok pasti kami balas.'
        ]
      ]
    },
    contact: {
      titleA: 'Ceritakan apa yang',
      titleEm: 'sedang Anda bangun',
      titleB: '.',
      lede: 'Pertanyaan, kerja sama, pers, atau sekadar menyapa. Apa pun yang Anda kirim sampai ke orang sungguhan, dan kami baca semuanya.',
      legalEntity: 'Badan hukum',
      headquarters: 'Kantor pusat',
      headquartersValue: 'Indonesia · Tim terdistribusi',
      email: 'Email',
      nameLabel: 'Nama',
      namePlaceholder: 'Nama Anda',
      emailLabel: 'Email',
      emailPlaceholder: 'anda@perusahaan.com',
      messageLabel: 'Pesan',
      messagePlaceholder: 'Apa yang ada di pikiran Anda?',
      send: 'Kirim pesan',
      errFields: 'Mohon isi semua kolom.',
      errEmail: 'Alamat emailnya sepertinya kurang tepat.',
      success: 'Terima kasih. Kami segera menghubungi Anda.',
      errSend: 'Pesannya belum bisa terkirim. Coba lagi sebentar lagi.'
    },
    newsletter: {
      titleA: 'Tetap',
      titleEm: 'terhubung',
      titleB: '.',
      sub: 'Peluncuran produk dan kabar perusahaan, beberapa kali setahun. Tanpa spam, dan Anda bisa berhenti kapan saja.',
      placeholder: 'anda@email.com',
      subscribe: 'Langganan',
      errEmail: 'Masukkan alamat email yang valid.',
      success: 'Terima kasih, Anda sudah terdaftar.',
      errSend: 'Belum bisa mendaftarkan Anda. Coba lagi sebentar lagi.'
    },
    closer: {
      titleA: 'Temukan produk yang dibuat untuk',
      titleEm: 'pekerjaan Anda',
      titleB: '.',
      body: 'Semua yang ada di sini bermula karena kami membutuhkannya dan tidak menemukan yang cukup bagus. Mungkin Anda sedang di posisi yang sama. Silakan lihat.',
      cta: 'Lihat portofolio'
    }
  },

  about: {
    meta: {
      title: 'Tentang · Efolusi',
      description:
        'Efolusi (PT. Efolusi Dunia Teknologi) adalah perusahaan software kecil dari Indonesia, dibiayai sendiri. Kami membangun produk kami sendiri dan menjaganya tetap jalan.'
    },
    heroA: 'Kami membangun software,',
    heroEm: 'lalu menjalankannya sendiri',
    heroB: '.',
    lede: 'Efolusi itu perusahaan software kecil dari Indonesia, dibiayai sendiri. Kami memulainya untuk membuat alat-alat yang terus kami harap ada, dan sejak itu kami jalan terus dengan cara yang sama: cari masalah yang bikin kesal, bikin produknya, jaga tetap jalan. Nama resminya PT. Efolusi Dunia Teknologi, kalau Anda perlu untuk dokumen kerjasama.',
    splitTitleA: 'Kami menggarap banyak hal,',
    splitTitleEm: 'memang sengaja.',
    splitBig: 'Kami bukan perusahaan satu produk. Kalau ada masalah yang terus mengganggu, kami bikin produk untuk itu dan menggunakannya sendiri.',
    splitBody: 'Aturannya sederhana: semuanya harus cukup bagus sampai kami sendiri mau memakainya. Kalau belum, ya tidak kami keluarkan.',
    values: ['Kami pemakai pertamanya', 'Rilis kalau sudah layak', 'Dirawat, bukan ditinggal', 'Masalah nyata, bukan tren'],
    bandA: 'Dibangun di Indonesia,',
    bandEm: 'dipakai',
    bandB: 'di mana-mana. Buka produk kami di mana pun, hasilnya sama.',
    foundersTitleA: 'Dipimpin founder yang',
    foundersTitleEm: 'turun tangan langsung',
    foundersTitleB: '.',
    foundersLede: 'Keputusan tetap dekat dengan produk. Keduanya turun tangan langsung memastikan semua produk berjalan semestinya.',
    caseTitleA: 'Bukti mengalahkan',
    caseTitleEm: 'janji',
    caseTitleB: '.',
    caseLede: 'Satu prinsip berlaku untuk semua yang ada di sini: kami hanya membangun produk yang bermanfaat untuk kami sendiri dan besar kemungkinan berguna untuk orang lain. Tiap produk diceritakan dengan cara yang sama: masalahnya apa, apa yang kami bangun, dan apa yang bisa Anda cek sekarang.',
    caseLabels: { problem: 'Masalahnya', solution: 'Yang kami bangun', result: 'Posisinya sekarang' },
    cases: [
      {
        name: 'ZOYYA',
        href: 'https://zoyya.xyz',
        problem: 'Kebanyakan asisten AI menunggu disuruh langkah demi langkah, sehingga jadi pekerjaan kedua, bukan bantuan.',
        solution: 'Asisten otonom yang menerima tujuan, menyusun langkahnya sendiri, dan mempelajari konteks Anda sambil berjalan.',
        result: 'Beta aktif di zoyya.xyz. Fokus komersialnya sedang dipersempit ke satu pekerjaan bisnis berulang yang dapat diukur.'
      },
      {
        name: 'Meridian',
        href: 'https://meridian.efolusi.com',
        problem: 'Tiap produk yang kami mulai butuh tombol, form, dan warna yang sama, dan tim kecil tidak sanggup mendesain ulang delapan kali.',
        solution: 'Design system open source untuk komponen, token, dan pola antarmuka yang dapat dipakai ulang.',
        result: 'Kode dan lisensi MIT tersedia publik; kontribusinya pada konsistensi produk dapat diperiksa langsung.'
      },
      {
        name: 'Komando',
        href: 'https://komando.efolusi.com',
        problem: 'Infrastruktur kami tersebar di banyak server dan dashboard, dan tiap insiden dimulai dengan mencari-cari.',
        solution: 'Eksperimen satu layar untuk server, deployment, pipeline, dan alert.',
        result: 'Sedang dibangun menjadi shared infrastructure layer internal; adopsi lintas produk belum diklaim sebelum ada bukti.'
      },
      {
        name: 'Toolips',
        href: 'https://toolips.xyz',
        problem: 'Kerjaan file kecil seperti konversi dan kompres selalu berakhir di situs asing yang penuh iklan dan pelacak.',
        solution: 'Kumpulan utilitas file yang langsung digunakan di browser tanpa akun.',
        result: 'Sedang distandarkan sebagai tool dan integration layer untuk ZOYYA; registry dan permission contract belum selesai.'
      },
      {
        name: 'Trady',
        href: 'https://trady.efolusi.com',
        problem: 'Satu video panjang sebenarnya berisi konten untuk seminggu, tapi memotongnya secara manual menghabiskan semalaman.',
        solution: 'Workflow video panjang menjadi paket klip bercaption dengan review manusia.',
        result: 'Sedang divalidasi sebagai layanan berbayar untuk agency dan tim konten; belum dinyatakan sebagai produk matang.'
      },
      {
        name: 'Kongkow',
        href: 'https://kongkow.xyz',
        problem: 'Konten yang sama harus ditempel ulang ke banyak platform satu per satu, setiap hari, dan selalu ada yang terlewat.',
        solution: 'Eksperimen social product dan workflow penyusunan konten.',
        result: 'Sedang direposisi dan diuji untuk revenue; product-market fit belum terbukti.'
      },
      {
        name: 'Cuwan',
        href: 'https://cuwan.xyz',
        problem: 'Menjalankan grid secara manual berarti sering telat pasang order: saat harga naik atau turun dalam, kesempatan profitnya hilang.',
        solution: 'Eksperimen otomasi grid trading dengan konfigurasi manual atau berbantuan model.',
        result: 'Masuk validasi revenue dengan gerbang legal, keamanan kredensial, dan performa yang dapat diaudit.'
      }
    ],
    paperTitleA: 'Perusahaan',
    paperTitleEm: 'di atas kertas',
    paperTitleB: '.',
    facts: [
      ['Badan hukum', 'PT. Efolusi Dunia Teknologi'],
      ['Kantor pusat', 'Indonesia · Tim terdistribusi'],
      ['Email', 'hi@efolusi.com'],
      ['Open source', 'github.com/efolusi']
    ],
    closerA: 'Lihat apa yang',
    closerEm: 'kami bangun',
    closerB: '.',
    closerBody: 'Perhatian yang sama masuk ke semua yang kami rilis. Temukan yang pas buat pekerjaan Anda.',
    closerCta: 'Lihat portofolio'
  },

  careers: {
    meta: {
      title: 'Karier · Efolusi',
      description:
        'Bekerja bersama perusahaan software kecil dari Indonesia yang dibiayai sendiri. Tim kecil, kepemilikan nyata, dan produk yang benar-benar dipakai orang.'
    },
    heroA: 'Peduli pada cara software dibangun?',
    heroEm: 'Mari bicara.',
    lede: 'Kami suka orang yang membangun hal berguna. Lihat posisi yang terbuka, atau sekadar menyapa. Orang-orang terbaik yang pernah bekerja dengan kami hampir tidak pernah pas persis dengan sebuah lowongan.',
    whatTitleA: 'Rasanya',
    whatTitleEm: 'kerja di sini',
    whatTitleB: '.',
    perks: [
      [
        'key',
        'Kepemilikan nyata',
        'Semua produk dikembangkan oleh tim kecil yang memegang seluruh stack. Anda akan merilis hal yang dipakai orang di bulan yang sama.'
      ],
      [
        'globe',
        'Terdistribusi secara default',
        'Kami di Indonesia dan bekerja async lintas zona waktu. Kami peduli apa yang Anda rilis, bukan jam berapa Anda online.'
      ],
      [
        'sparkles',
        'Sedikit proses, lebih banyak membangun',
        'Code review sungguhan. Design review sungguhan. "Cukup baik" memang harus baik, bukan sekadar centang.'
      ],
      ['trending-up', 'Portofolio yang tumbuh', 'Produk baru berarti masalah baru yang perlu digali, bukan diabaikan tanpa solusi.']
    ],
    hiringTitleA: 'Posisi yang',
    hiringTitleEm: 'kami buka sekarang',
    hiringBody: 'Ceritakan apa yang sudah Anda bangun dan apa yang ingin Anda bangun berikutnya. Portofolio atau repo selalu lebih berarti daripada CV panjang.',
    reachOut: 'Tanya soal posisi',
    roles: [
      ['Senior JavaScript Engineer', 'Remote · Penuh waktu'],
      ['AI Research Engineer', 'Remote · Penuh waktu'],
      ['Product Designer (UI/UX)', 'Remote · Penuh waktu']
    ],
    closerA: 'Tidak menemukan',
    closerEm: 'posisi Anda',
    closerB: '?',
    closerBody: 'Tetap tulis ke kami. Kalau Anda peduli pada software yang berguna dan bisa menunjukkan sesuatu yang Anda buat, kami ingin mendengarnya.',
    closerCta: 'Sapa kami'
  },

  token: {
    meta: {
      title: 'Token $EFO · Efolusi',
      description:
        '$EFO adalah token milik Efolusi sendiri di BNB Smart Chain, bisa ditradingkan di Uniswap. Alamat kontrak resmi, fakta on-chain, tautan trading, dan catatan keamanan ada di halaman ini.'
    },
    heroA: 'token milik',
    heroEm: 'Efolusi',
    heroB: '.',
    lede: 'EFO adalah token milik Efolusi sendiri, live di BNB Smart Chain. Halaman ini rumah resminya: alamat kontrak, fakta on-chain, dan tiap pengumuman yang kami buat soal token.',
    tradable: 'Bisa ditradingkan di Uniswap v4',
    bep20: 'BEP-20',
    addrTitleA: 'Satu alamat.',
    addrTitleEm: 'Jangan sampai salah',
    addrTitleB: '.',
    addrLede: 'Ini satu-satunya alamat kontrak $EFO yang resmi. Apa pun selain ini yang mengaku EFO, bukan milik kami. Periksa di sini dulu.',
    facts: [
      ['Alamat kontrak', '0xb61a09e93b4f14585e9afbac3adaea626f25fb07'],
      ['Nama token', 'EFOLUSI'],
      ['Simbol', 'EFO'],
      ['Jaringan', 'BNB Smart Chain (BEP-20)'],
      ['Desimal', '18'],
      ['Total pasokan', '100.000.000.000 EFO'],
      ['Pool', 'EFO/USDT di Uniswap v4']
    ],
    readNote: 'Dibaca dari kontrak pada 22 Juli 2026.',
    viewBscscan: 'Lihat di BscScan',
    poolTitleA: 'Satu pool,',
    poolTitleEm: 'ditautkan dari sini',
    poolTitleB: '.',
    poolLede: 'Harga dan likuiditas bergerak sepanjang hari, jadi kami arahkan Anda ke sumber yang real-time, bukan chart bohongan.',
    trade: {
      swapTitle: 'Swap di Uniswap',
      swapDesc: 'Lakukan swap EFO dengan Uniswap di jaringan BNB Chain',
      chartTitle: 'Chart live di GeckoTerminal',
      chartDesc: 'Harga, likuiditas, dan transaksi pool EFO/USDT',
      contractTitle: 'Kontrak di BscScan',
      contractDesc: 'Holder, transfer, dan source terverifikasi'
    },
    nomicsTitleA: 'Ke mana pasokan',
    nomicsTitleEm: 'dialokasikan',
    nomicsTitleB: '.',
    nomicsLede: 'Begini alokasi 100 miliar EFO. Sengaja kami buat sederhana, dan bisa diverifikasi on-chain.',
    allocations: [
      ['Liquidity pool', 50, 'Dipasangkan dengan USDT di pool Uniswap v4'],
      ['Migrasi TRADY ke EFO', 30, 'Dicadangkan untuk holder yang migrasi dari TRADY ke EFO'],
      ['Tim, terkunci', 15, 'Alokasi tim dalam status lock'],
      ['Dibakar', 5, 'Dikirim ke alamat burn, keluar dari peredaran secara permanen']
    ],
    bbTitleA: 'Buyback dan burn,',
    bbTitleEm: 'live',
    bbTitleB: '.',
    bbLede: 'Pendapatan dipakai untuk buyback lewat dev wallet, dan EFO hasil buyback dibakar. Bar di bawah dibaca langsung dari chain setiap kali halaman ini dibuka, bukan diketik oleh kami.',
    bbBurned: 'Sudah dibakar',
    bbBuyback: 'Wallet buyback',
    bbRevenue: 'Wallet pendapatan (USDT)',
    bbOfSupply: 'dari total pasokan',
    bbLoading: 'Membaca dari chain…',
    bbError: 'Chain sedang tidak bisa dihubungi. Tautan di bawah selalu berfungsi.',
    bbUpdated: 'Dibaca live dari BNB Smart Chain',
    bbWallets: [
      ['Dev wallet (buyback & burn)', '0x23bb2435a859ec52736bab3180806b8c7ae85fc6'],
      ['Wallet pendapatan', '0x0297e732858a4d99f5e6aa5ec72fb9f715396f4e'],
      ['Alamat burn', '0x000000000000000000000000000000000000dEaD']
    ],
    utilTitleA: 'Utilitas, didokumentasikan',
    utilTitleEm: 'sebelum dirilis',
    utilTitleB: '.',
    utilLede: 'Kami menyambungkan EFO ke produk-produk kami sepotong demi sepotong. Tiap utilitas, tokenomik, dan dokumentasi muncul di sini saat sudah live. Kami lebih suka menunjukkan yang sudah jalan daripada menjanjikan yang belum.',
    flywheel: [
      ['Produk mengenakan harga dalam uang biasa', 'Setiap subscription produk didenominasikan dalam uang biasa. Tidak ada yang diwajibkan membayar pakai EFO.'],
      ['Buyback tercatat on-chain', 'Saat dana perusahaan digunakan untuk buyback EFO, transaksinya harus berasal dari wallet yang diungkapkan dan dapat diverifikasi secara independen on-chain.'],
      ['Hasil buyback dibakar', 'EFO hasil buyback dikirim ke alamat burn, keluar dari peredaran secara permanen. Bar di atas mencatatnya secara live.']
    ],
    faqTitleA: 'Jawaban',
    faqTitleEm: 'lugas',
    faqTitleB: '.',
    faq: [
      [
        'Apakah EFO bisa ditradingkan sekarang?',
        'Ya, di pool EFO/USDT di Uniswap v4. Mulai dari tautan di atas daripada mencarinya sendiri, supaya Anda yakin berada di pool yang benar.'
      ],
      [
        'Di mana informasi resmi token berada?',
        'Di sini, dan hanya di sini. Halaman ini satu-satunya sumber kebenaran untuk alamat kontrak $EFO dan pengumuman apa pun soal token. Anggap yang lain tidak resmi sampai Anda melihatnya di sini.'
      ],
      [
        'Bagaimana cara menghindari penipuan?',
        'Periksa alamat kontrak di sini, karakter demi karakter, sebelum berinteraksi dengan apa pun. Dan ingat: kami tidak pernah menghubungi Anda duluan, tidak akan pernah meminta seed phrase Anda, dan kami tidak menjalankan airdrop atau presale dadakan di mana pun selain situs ini.'
      ]
    ],
    closerA: 'Ada pertanyaan soal',
    closerEm: '$EFO',
    closerB: '?',
    closerBody: 'Kerja sama, integrasi, atau apa pun soal token. Tulis ke kami dan akan dibaca oleh orang sungguhan.',
    closerCta: 'Hubungi kami'
  },

  brand: {
    meta: {
      title: 'Brand · Efolusi',
      description:
        'Aset brand resmi Efolusi dan aturan penggunaannya: maskot owl, wordmark, dan hal yang tidak boleh dilakukan padanya.'
    },
    heroA: 'Owl, wordmark,',
    heroEm: 'dan aturannya',
    heroB: '.',
    lede: 'Owl dan wordmark ini milik kami, dan kami sedikit protektif soal keduanya. Semua di sini bebas dipakai untuk pers, mitra, atau siapa pun yang menulis tentang kami, selama mengikuti beberapa aturan di bawah. Kode sumber situs ini berlisensi MIT; nama Efolusi, maskot owl, dan nama kami tidak.',
    owlTitleA: 'Satu owl,',
    owlTitleEm: 'diperlakukan baik',
    owlTitleB: '.',
    owlMark: 'Maskot owl',
    owlMeta: 'PNG · transparan · 668×668',
    download: 'Unduh',
    wordmark: 'Wordmark',
    wordmarkMeta: 'Bricolage Grotesque · 650 sampai 700 · tracking -0.02em',
    wordmarkNote: 'Render dalam bentuk teks; tidak ada file logotype terpisah.',
    rulesTitleA: 'Aturannya,',
    rulesTitleEm: 'singkat saja',
    rulesTitleB: '.',
    dos: [
      'Tampilkan owl apa adanya, di atas latar hangat atau putih',
      'Tulis "Efolusi" dengan Bricolage Grotesque, semibold ke atas',
      'Beri owl ukuran minimal 24px supaya wajahnya tetap jelas',
      'Sertakan tautan ke efolusi.com setiap menyebut kami atau $EFO'
    ],
    donts: [
      'Mengubah warna, menggambar ulang, menarik bentuk, atau menambah efek pada owl',
      'Memakai nama atau owl kami untuk brand produk atau token Anda',
      'Memberi kesan kami mendukung atau bermitra dengan Anda padahal tidak',
      'Menyebut alamat kontrak mana pun sebagai milik kami selain yang ada di halaman token'
    ],
    closerA: 'Butuh sesuatu yang',
    closerEm: 'lain',
    closerB: '?',
    closerBody: 'Butuh file lebih besar, logo produk, atau kutipan untuk sebuah liputan? Email kami, kami cepat kok.',
    closerCta: 'Email kami'
  },

  privacy: {
    meta: {
      title: 'Kebijakan privasi · Efolusi',
      description: 'Bagaimana PT. Efolusi Dunia Teknologi menangani data yang dikumpulkan melalui efolusi.com.'
    },
    back: '← Kembali ke efolusi.com',
    title: 'Kebijakan privasi',
    metaLine: 'PT. Efolusi Dunia Teknologi · Berlaku 22 Juli 2026',
    intro:
      'Kebijakan ini menjelaskan data apa yang dikumpulkan efolusi.com dan untuk apa kami memakainya. Singkatnya: sedikit sekali, dan tidak pernah dijual. Berlaku untuk situs ini saja; tiap produk Efolusi punya kebijakan privasinya sendiri di situsnya masing-masing.',
    collectHead: 'Yang kami kumpulkan',
    collect: [
      ['Formulir kontak:', ' nama, alamat email, dan pesan Anda. Kami memakainya semata untuk membaca dan membalas pesan Anda. Pengiriman berjalan lewat Brevo, prosesor email kami.'],
      ['Newsletter:', ' alamat email Anda, disimpan di Brevo supaya kami bisa mengirim peluncuran produk dan kabar perusahaan. Tiap email menyertakan tautan berhenti berlangganan.'],
      ['Preferensi tema:', ' pilihan terang atau gelap Anda disimpan hanya di browser (localStorage). Tidak pernah keluar dari perangkat Anda.'],
      ['Log server:', ' situs ini dilayani oleh Cloudflare, yang memproses log permintaan standar (alamat IP, user agent) untuk mengoperasikan dan melindungi layanan.']
    ],
    notHead: 'Yang tidak kami lakukan',
    not: [
      'Kami tidak menjalankan iklan atau pelacak analitik pihak ketiga di situs ini.',
      'Kami tidak menjual atau membagikan data Anda ke siapa pun di luar prosesor yang disebut di atas.',
      'Kami tidak memakai cookie untuk pelacakan.'
    ],
    retentionHead: 'Penyimpanan dan hak Anda',
    retention:
      'Pesan kontak disimpan hanya selama diperlukan untuk menangani permintaan Anda. Anda bisa berhenti berlangganan newsletter kapan saja, dan Anda bisa meminta kami menghapus data apa pun yang kami simpan tentang Anda dengan menulis ke ',
    changesHead: 'Perubahan',
    changes: 'Kalau kebijakan ini berubah, versi barunya diterbitkan di halaman ini dengan tanggal berlaku yang diperbarui.'
  },

  terms: {
    meta: {
      title: 'Ketentuan penggunaan · Efolusi',
      description: 'Ketentuan penggunaan efolusi.com, situs milik PT. Efolusi Dunia Teknologi.'
    },
    back: '← Kembali ke efolusi.com',
    title: 'Ketentuan penggunaan',
    metaLine: 'PT. Efolusi Dunia Teknologi · Berlaku 22 Juli 2026',
    intro:
      'Dengan menggunakan efolusi.com Anda setuju pada ketentuan ini. Situs ini memperkenalkan PT. Efolusi Dunia Teknologi (Efolusi) dan portofolio produknya; disediakan untuk tujuan informasi, apa adanya, tanpa jaminan dalam bentuk apa pun.',
    productsHead: 'Produk',
    products:
      'Produk Efolusi (ZOYYA, Komando, Toolips, Trady, Kongkow, Cuwan, dan Meridian) dioperasikan di situsnya masing-masing dengan ketentuannya sendiri. Menggunakan sebuah produk berarti menyetujui ketentuan produk itu, bukan ketentuan ini.',
    trademarksHead: 'Konten dan merek dagang',
    trademarksA:
      'Nama Efolusi, maskot owl, dan nama-nama produk adalah milik PT. Efolusi Dunia Teknologi. Kode sumber situs ini open source di bawah lisensi MIT di ',
    trademarksB: '; lisensi MIT tidak mencakup nama-nama atau maskot.',
    tokenHead: 'Token $EFO',
    tokenP1:
      '$EFO adalah token milik Efolusi sendiri di BNB Smart Chain. Ia bukan saham, sekuritas, atau produk investasi, dan tidak ada yang di situs ini merupakan penawaran untuk menjual atau ajakan untuk membeli instrumen keuangan apa pun. Tidak ada yang di sini merupakan nasihat keuangan.',
    tokenP2:
      'Aset digital bersifat volatil dan membawa risiko kerugian total: Anda bisa kehilangan semua yang Anda tanamkan. Lakukan riset sendiri dan patuhi hukum di tempat tinggal Anda sebelum berinteraksi dengan aset digital apa pun.',
    tokenP3a: 'Satu-satunya alamat kontrak resmi adalah yang diterbitkan di ',
    tokenP3link: 'halaman token',
    tokenP3b:
      '. Alamat apa pun yang diterbitkan di tempat lain bukan milik kami. Kami tidak pernah mengirim pesan duluan, tidak pernah meminta seed phrase Anda, dan tidak pernah mengumumkan airdrop atau presale di luar situs ini.',
    liabilityHead: 'Tanggung jawab',
    liability:
      'Kami berupaya menjaga informasi di situs ini tetap akurat tapi tidak menjaminnya. Efolusi tidak bertanggung jawab atas kerugian yang timbul dari penggunaan situs ini. Tidak ada yang di situs ini merupakan nasihat keuangan, hukum, atau profesional.',
    contactHead: 'Kontak',
    contactA: 'Pertanyaan soal ketentuan ini: '
  }
};

export default id;
