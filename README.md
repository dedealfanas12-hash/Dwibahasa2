# Dwibahasa

Web app belajar bahasa Mandarin dan Inggris dari tingkat Dasar, Menengah, sampai Mahir. Hanya satu file (`index.html`), tanpa build dan tanpa server.

## Isi aplikasi

- Dua bahasa: Mandarin (hanzi dan pinyin) dan Inggris
- Tiga tingkat: Dasar (76 kosakata, 10 level), Menengah (42 kosakata, 6 level), Mahir (35 kosakata, 5 level)
- Latihan membaca, mengucapkan, menulis, dan pilihan ganda
- Ujian naik level: 8 soal di level 1, lalu bertambah 2 soal tiap level (maksimal 30), lulus minimal 80%
- Ujian akhir 40 soal untuk tiap tingkat sebelum tingkat berikutnya terbuka
- Dashboard bersih: pilih Mandarin atau Inggris, lalu tingkat, lalu level
- Progres belajar per bahasa (persen level yang sudah lulus) dan streak 🔥 yang bertambah tiap hari ada soal yang dijawab
- Masuk tanpa akun: cukup isi nama, dan tiap pengguna punya progres serta streak sendiri. Tanpa pengaturan tambahan, data tersimpan di browser (localStorage) dan terpisah per perangkat; dengan Firebase (bagian "Akun online"), akun tersimpan online dan semua pengguna bisa saling melihat progres
- Mode gelap dan terang lewat tombol di pojok kanan atas (pilihan tersimpan)
- Efek suara: nada lonceng yang makin tinggi untuk jawaban benar beruntun, nada rendah lembut untuk jawaban salah, fanfare saat lulus, dan nada turun saat gagal (bisa dimatikan dengan tombol 🔊 di pojok kanan atas)

## Online lewat GitHub Pages

1. Buat repo baru di GitHub (Public), misalnya `dwibahasa`.
2. Upload semua file di folder ini ke repo: `index.html`, `manifest.json`, `sw.js`, tiga file ikon `.png`, dan `README.md` (Add file, Upload files, Commit changes).
3. Buka Settings, Pages. Pada Source pilih **Deploy from a branch**, Branch `main`, folder `/ (root)`, lalu Save.
4. Tunggu sekitar 1 menit. Alamatnya: `https://USERNAME.github.io/dwibahasa/`

Netlify juga bisa: hubungkan repo ini, kosongkan build command, dan isi publish directory dengan `/`.

## Akun online (semua orang bisa saling melihat progres)

Secara bawaan data hanya tersimpan di browser masing-masing. Agar akun bisa dibuka dari perangkat mana pun dan progres bisa dilihat semua orang, aplikasi memakai Firebase Realtime Database (gratis untuk pemakaian kecil, tanpa server sendiri).

1. Buka Firebase Console, pilih proyek (proyek yang sudah ada boleh dipakai lagi) atau buat proyek baru.
2. Build, Realtime Database, Create Database. Salin URL database, misalnya `https://nama-proyek-default-rtdb.asia-southeast1.firebasedatabase.app`.
3. Di tab Rules, tambahkan blok `dwibahasa` (jika sudah ada rules lain, cukup tambahkan blok ini di dalam `rules`), lalu Publish:

        {
          "rules": {
            "dwibahasa": { ".read": true, ".write": true }
          }
        }

4. Di `index.html`, cari baris `const DB="";` (baris pertama di dalam script), isi dengan URL tadi (tanpa garis miring di akhir), lalu commit.

Setelah itu layar login menampilkan daftar "Semua pengguna", dan dashboard punya tombol "Lihat progres pengguna lain". Data disimpan di jalur `/dwibahasa`, jadi tidak bercampur dengan data lain di database yang sama.

Catatan: akun bersifat publik dan tanpa kata sandi. Siapa pun bisa membuka dan mengubah progres akun mana pun, dan siapa pun yang tahu URL database bisa menulis di jalur `dwibahasa`. Cocok untuk belajar bersama dalam kelompok kecil. Jika perlu pembatasan, tambahkan kata sandi atau PIN per akun.

## Pasang di HP

Setelah online lewat GitHub Pages, buka alamatnya (https) di HP:

- Android (Chrome): tekan tombol "Instal aplikasi di perangkat ini" di dashboard, atau menu ⋮ lalu "Instal aplikasi" / "Tambahkan ke layar utama".
- iPhone (Safari): tombol Bagikan, lalu "Tambah ke Layar Utama". Di iPhone, data aplikasi yang sudah diinstal terpisah dari data di Safari.

File `index.html` yang dibuka langsung dari HP, atau link pratinjau di Claude, tidak bisa diinstal. Syaratnya: file `manifest.json`, `sw.js`, dan ikon harus berada di folder yang sama dengan `index.html`.

## Mengubah kosakata

Semua kosakata ada di `index.html`, di bagian `const D=`. Tiap level ditulis seperti ini:

    ["Nama level","kata|bacaan|arti;kata|bacaan|arti"]

- Mandarin: `你好|nǐ hǎo|halo`
- Inggris (tanpa bacaan): `Hello||halo`
- Pisahkan kosakata dengan `;`. Jangan memakai `;` atau `|` di dalam teks.
- Level baru cukup ditambahkan di daftar tingkatnya. Nomor level dan jumlah soal dihitung otomatis.
- Kalau menyisipkan level di tengah, nomor level sesudahnya bergeser dan progres lama di browser bisa tidak cocok lagi.

Pengaturan lain ada tepat di bawah data: `PASS` (nilai lulus level), `EXP` (nilai lulus ujian tingkat), dan `n:Math.min(6+2*id,30)` di fungsi `lv()` (jumlah soal per level).

## Catatan

Latihan mengucapkan memakai pengenalan suara browser. Paling lancar di Chrome dan harus lewat https, yang sudah dipenuhi GitHub Pages. Kalau browser tidak mendukung, tombol konfirmasi manual muncul sebagai gantinya.
