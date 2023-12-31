# DBS Forum API V1 Project 1
Backend Expert Dicoding DBS Forum API V1 Project 1

## Link Project 
Project Link : [https://red-colts-find-safely.a276.dcdg.xyz](https://red-colts-find-safely.a276.dcdg.xyz)


## Studi Kasus Forum API Project 1

Garuda Game (perusahaan fiktif) merupakan sebuah perusahaan paling sukses dalam menjalankan bisnis di bidang online game. Perusahaan tersebut memiliki ratusan game yang dimainkan oleh jutaan pengguna di seluruh dunia. Salah satu kunci keberhasilan Garuda Game adalah dekat dengan para pemainnya. Mereka berhasil membangun komunitas yang aktif.

Untuk menjaga kualitas layanan terhadap komunitas, Garuda Game berinisiatif untuk membangun aplikasi diskusi atau forum untuk para pemain. Dengan hadirnya platform diskusi yang resmi, para pemain akan sangat terbantu dan merasa nyaman untuk berdiskusi perihal game yang mereka mainkan. Aplikasi forum akan tersedia di platform web ataupun mobile native.

Garuda Game ingin aplikasi forum didesain secara matang. Seperti menerapkan automation testing, menerapkan clean architecture. Dengan begitu, aplikasi ini bisa terhindar dari bug, mudah beradaptasi pada perubahan teknologi, dan mudah untuk dikembangkan.

Untuk mencapai itu, Garuda Game menghadirkan talenta terbaik dalam membangun aplikasi forum. Salah satunya adalah Anda yang ditugaskan untuk membangun Back-End API guna mendukung fungsionalitas dari aplikasi Front-End.

Aplikasi forum dikembangkan secara bertahap dan saat ini diharapkan sudah memiliki fitur:

- Registrasi Pengguna;
- Login dan Logout;
- Menambahkan Thread;
- Melihat Thread;
- Menambahkan dan Menghapus Komentar pada Thread; serta
- Menambahkan dan Menghapus Balasan Komentar Thread (opsional).

## Studi Kasus Forum API Project 2

### Menerapkan Continuous Integration
Berikut ketentuannya:
- Menjalankan proses pengujian aplikasi secara otomatis, mulai dari Unit Test, Integration Test, hingga Functional Test.
- Diterapkan pada event pull request ke branch utama (master/main).
- Menggunakan GitHub Actions.
- Pastikan Repository Anda memiliki minimal dua proses CI yang sudah berjalan. Satu skenario gagal, dan satu skenario berhasil. 

Catatan:
- Untuk men-trigger CI, Anda harus melakukan pull request terhadap repository.
- Silakan buat fitur baru beserta pengujiannya dan lakukan pull request.
- Pastikan ada skenario pengujian gagal dan berhasil.
- Fitur baru bebas Anda tentukan sendiri. Bahkan, menampilkan pesan Hello World pun boleh. Namun, bila Anda ingin mendapatkan nilai lebih, cobalah kerjakan fitur opsional yang akan dijelaskan nanti.
- Integration Test membutuhkan database test yang dapat diakses secara publik. Anda bisa menyediakan database server seperti Amazon RDS namun tidak menutup kemungkinan bila Anda ingin menggunakan service lain.
- Atau Jika Anda familiar dengan sistem containerize, Anda bisa manfaatkan PostgreSQL service containers yang tersedia pada GitHub Action, menggunakan container akan lebih cepat karena PostgreSQL dijalankan secara lokal.

### Menerapkan Continuous Deployment
Berikut ketentuannya:
- Melakukan deploying secara otomatis ke server Anda.
- Diterapkan pada event push ke branch utama (master/main).
- Pastikan repository Anda memiliki minimal satu proses CD yang sudah berhasil.

Catatan:
- Proses deployment dilakukan ke server EC2 instance, namun tidak menutup kemungkinan bila Anda mendeploy pada layanan lain.
- Proses deployment dapat dilakukan menggunakan SSH untuk GitHub Actions atau mekanisme lain sesuai layanan yang Anda gunakan. Anda juga boleh menggunakan services CodeDeploy bila memanfaatkan EC2 instances.

### Menerapkan Limit Access

Forum API harus menerapkan Limit Access agar terhindar dari serangan DDoS Attack, berikut ketentuannya:
- Resource yang dibatasi adalah resource /threads dan path yang di dalamnya.
- Batasi permintaan yang masuk sebanyak 90 request per menit.
- (Baru) Melampirkan file konfigurasi NGINX pada root proyek submission.

### Menggunakan Protokol HTTPS

Forum API harus diakses melalui protokol HTTPS agar terhindar dari MITM.
- Anda bisa menggunakan subdomain dcdg.xyz atau menggunakan domain Anda sendiri.
- Wajib melampirkan URL Forum API Anda pada student notes.
- Forum API yang diakses melalui URL HTTPS wajib lulus pengujian Postman.
