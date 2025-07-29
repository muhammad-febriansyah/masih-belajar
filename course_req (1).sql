-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 29 Jul 2025 pada 04.31
-- Versi server: 9.2.0
-- Versi PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `course_req`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `abouts`
--

CREATE TABLE `abouts` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `abouts`
--

INSERT INTO `abouts` (`id`, `title`, `description`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Video Interaktif', 'Video tutorial praktik yang mudah difahami', 'image-upload-server/01JVFKSNY6TZAXCD6T79X9FWZ1.svg', '2025-01-10 22:17:56', '2025-05-17 17:13:48'),
(2, 'Bahasa Indonesia', 'Semua materi berbahasa Indonesia', 'image-upload-server/01JVFKWDHGW2XSJPYNTJFG3ZP4.svg', '2025-01-10 22:18:21', '2025-05-20 18:24:19'),
(3, 'E-Sertifikat', 'Kelulusan dengan elektronik sertifikat', 'image-upload-server/01JVFKY2EJZKTK5VD2DCT1J7T2.svg', '2025-01-10 22:18:37', '2025-05-17 17:16:12'),
(4, 'Support', 'Fitur diskusi saat kesulitan belajar', 'image-upload-server/01JVFKZXHJH6R5KT8J66S4HVQZ.svg', '2025-01-10 22:19:00', '2025-05-20 18:23:52'),
(5, 'Akses Seumur Hidup', 'Kelas bisa diakses selamanya', 'image-upload-server/01JVFM22535S7KD2ZYK2QRKXTH.svg', '2025-01-10 22:19:19', '2025-05-17 17:18:23'),
(6, 'Trainer Berpengalaman', 'Belajar langsung dari ahlinya', 'image-upload-server/01JVFM3YMKVZH4J6JFYXQJBF4Y.svg', '2025-01-10 22:19:40', '2025-05-17 17:19:25');

-- --------------------------------------------------------

--
-- Struktur dari tabel `balas_diskusis`
--

CREATE TABLE `balas_diskusis` (
  `id` bigint UNSIGNED NOT NULL,
  `diskusi_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `balas_diskusis`
--

INSERT INTO `balas_diskusis` (`id`, `diskusi_id`, `user_id`, `body`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum numquam rem, maxime nulla sapiente eum ipsum totam cupiditate minus, magni iusto est magnam aperiam aspernatur omnis adipisci, libero cum tenetur minima necessitatibus delectus eos qui similique soluta. Animi velit hic dolore corporis! Vitae molestiae consectetur voluptate fugit cumque illo est?', '2025-01-18 07:06:03', '2025-01-18 07:06:03'),
(2, 1, 3, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum numquam rem, maxime nulla sapiente eum ipsum totam cupiditate minus, magni iusto est magnam aperiam aspernatur omnis adipisci, libero cum tenetur minima necessitatibus delectus eos qui similique soluta. Animi velit hic dolore corporis! Vitae molestiae consectetur voluptate fugit cumque illo est?', '2025-01-18 07:18:41', '2025-01-18 07:18:41'),
(3, 1, 3, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum numquam rem, maxime nulla sapiente eum ipsum totam cupiditate minus, magni iusto est magnam aperiam aspernatur omnis adipisci, libero cum tenetur minima necessitatibus delectus eos qui similique soluta. Animi velit hic dolore corporis! Vitae molestiae consectetur voluptate fugit cumque illo est?', '2025-01-18 07:18:52', '2025-01-18 07:18:52'),
(4, 2, 3, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum numquam rem, maxime nulla sapiente eum ipsum totam cupiditate minus, magni iusto est magnam aperiam aspernatur omnis adipisci, libero cum tenetur minima necessitatibus delectus eos qui similique soluta. Animi velit hic dolore corporis! Vitae molestiae consectetur voluptate fugit cumque illo est?', '2025-01-18 07:23:40', '2025-01-18 07:23:40'),
(5, 2, 2, 'hello', '2025-03-07 07:40:39', '2025-03-07 07:40:39'),
(6, 8, 3, 'ggwp', '2025-07-22 12:38:34', '2025-07-22 12:38:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `benefits`
--

CREATE TABLE `benefits` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `benefits`
--

INSERT INTO `benefits` (`id`, `name`, `created_at`, `updated_at`) VALUES
(2, 'Akses selamanya', '2025-01-06 03:00:31', '2025-01-06 03:00:31'),
(3, 'Fleksibilitas Waktu', '2025-01-06 03:12:37', '2025-01-06 03:12:37'),
(4, 'Pelatihan Berkelanjutan', '2025-01-06 03:12:45', '2025-01-06 03:12:45');

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Laravel', 'laravel', 'image-upload-server/01JGWSGD679DJMAXMDVX6Q4XGP.svg', '2025-01-06 03:11:03', '2025-01-06 03:11:03'),
(2, 'Flutter', 'flutter', 'image-upload-server/01JGWSGWEJ5E3S6FNER9SX269N.svg', '2025-01-06 03:11:19', '2025-01-06 03:11:19'),
(3, 'React', 'react', 'image-upload-server/01JGWSHB1E5AZCNQ2CWH5YP9SX.svg', '2025-01-06 03:11:34', '2025-01-06 03:11:34'),
(4, 'UI/UX', 'uiux', 'image-upload-server/01JVQGNEC8R2EQ2DYRT403GWYG.svg', '2025-05-20 18:52:59', '2025-05-20 18:52:59');

-- --------------------------------------------------------

--
-- Struktur dari tabel `diskusis`
--

CREATE TABLE `diskusis` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `kelas_id` bigint UNSIGNED NOT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `diskusis`
--

INSERT INTO `diskusis` (`id`, `user_id`, `kelas_id`, `subject`, `title`, `body`, `image`, `created_at`, `updated_at`) VALUES
(1, 3, 3, 'PNATlap', 'PNATlap', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum numquam rem, maxime nulla sapiente eum ipsum totam cupiditate minus, magni iusto est magnam aperiam aspernatur omnis adipisci, libero cum tenetur minima necessitatibus delectus eos qui similique soluta. Animi velit hic dolore corporis! Vitae molestiae consectetur voluptate fugit cumque illo est?', NULL, '2025-01-18 05:12:55', '2025-01-18 05:12:55'),
(2, 3, 3, 'tidak bisa instal pnet lab', 'tidak bisa instal pnet lab', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum numquam rem, maxime nulla sapiente eum ipsum totam cupiditate minus, magni iusto est magnam aperiam aspernatur omnis adipisci, libero cum tenetur minima necessitatibus delectus eos qui similique soluta. Animi velit hic dolore corporis! Vitae molestiae consectetur voluptate fugit cumque illo est?', 'images/tw5ttsgR1SszHFodbagMcVwGwutlWFA1YB0jB4yk.jpg', '2025-01-18 05:22:51', '2025-01-18 05:22:51'),
(3, 3, 3, 'Form Store the new Virtual Machine kosong', 'Form Store the new Virtual Machine kosong', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum numquam rem, maxime nulla sapiente eum ipsum totam cupiditate minus, magni iusto est magnam aperiam aspernatur omnis adipisci, libero cum tenetur minima necessitatibus delectus eos qui similique soluta. Animi velit hic dolore corporis! Vitae molestiae consectetur voluptate fugit cumque illo est?', 'images/Q9CCuQz4oTqzolKYBucvhs3ApldwtbmPFsVC4nxp.jpg', '2025-01-18 05:23:16', '2025-01-18 05:23:16'),
(4, 3, 3, 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet consectetur adipisicing.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati culpa temporibus, hic libero mollitia eius voluptates quaerat cupiditate ad deleniti.', 'images/0gxRbKugMIewUNXzqfOrSnpWYmJvUvxxXIOljnLi.jpg', '2025-01-18 06:12:24', '2025-01-18 06:12:24'),
(5, 3, 3, 'Tester', 'Bug App', 'hello everyone', NULL, '2025-07-22 12:33:27', '2025-07-22 12:33:27'),
(6, 3, 3, 'Bug bro', 'bugggggv', 'nice one', NULL, '2025-07-22 12:36:02', '2025-07-22 12:36:02'),
(7, 3, 3, 'Bug bro', 'bugggggv', 'nice one', NULL, '2025-07-22 12:36:51', '2025-07-22 12:36:51'),
(8, 3, 3, 'test lagi', 't st', 'tester', 'images/diskusi/hR0es4XSYZcyk3WqOrH2yLhQKmXeEF60DTwsRjeI.jpg', '2025-07-22 12:37:29', '2025-07-22 12:37:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `events`
--

CREATE TABLE `events` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl` date NOT NULL,
  `desc` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `views` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `events`
--

INSERT INTO `events` (`id`, `user_id`, `title`, `slug`, `tgl`, `desc`, `image`, `views`, `created_at`, `updated_at`) VALUES
(1, 1, 'Workshop Laravel untuk Pemula', 'workshop-laravel-untuk-pemula', '2025-08-12', '<p>Workshop komprehensif tentang dasar-dasar Laravel framework. Peserta akan belajar tentang routing, controller, model, view, dan fitur-fitur dasar Laravel lainnya. Cocok untuk developer yang baru memulai dengan Laravel.</p><ul><li>Pengenalan Laravel dan instalasi</li><li>Routing dan Controller</li><li>Eloquent ORM</li><li>Blade Templates</li><li>Authentication</li></ul>', 'events/01K17ZSJ82MXSJR94WC5ZXDTD3.jpg', 245, '2025-07-18 07:40:27', '2025-07-28 07:43:43'),
(2, 1, 'Seminar Teknologi AI dan Machine Learning', 'seminar-teknologi-ai-dan-machine-learning', '2025-08-27', '<p>Seminar nasional tentang perkembangan terkini dalam bidang Artificial Intelligence dan Machine Learning. Pembicara expert dari berbagai universitas dan perusahaan teknologi terkemuka.</p><p><strong>Topik yang akan dibahas:</strong></p><ul><li>Deep Learning dan Neural Networks</li><li>Natural Language Processing</li><li>Computer Vision</li><li>AI Ethics dan Responsible AI</li></ul>', 'events/01K17ZV8A6H2APRJGQ1CA2K3VM.jpg', 892, '2025-07-08 07:40:27', '2025-07-28 07:45:32'),
(3, 1, 'Bootcamp Full Stack Web Development', 'bootcamp-full-stack-web-development', '2025-09-11', '<p>Bootcamp intensif 3 bulan untuk mempelajari full stack web development dari nol hingga mahir. Program ini mencakup frontend, backend, dan database management.</p><p><strong>Tech Stack yang dipelajari:</strong></p><ul><li>HTML, CSS, JavaScript</li><li>React.js atau Vue.js</li><li>Node.js dan Express</li><li>PHP dan Laravel</li><li>MySQL dan MongoDB</li><li>Git dan Deployment</li></ul>', 'events/01K17ZVP8TGR49E1SVVP5TXJSC.jpg', 1203, '2025-07-03 07:40:27', '2025-07-28 07:44:53'),
(4, 1, 'Conference Cybersecurity Indonesia 2025', 'conference-cybersecurity-indonesia-2025', '2025-07-23', '<p>Konferensi tahunan cybersecurity terbesar di Indonesia. Menghadirkan expert keamanan siber dari dalam dan luar negeri untuk membahas tren terkini dalam cybersecurity.</p><p><strong>Agenda Utama:</strong></p><ul><li>Threat Intelligence dan Incident Response</li><li>Cloud Security Best Practices</li><li>IoT Security Challenges</li><li>Penetration Testing Workshop</li><li>Digital Forensics</li></ul>', 'events/01K17ZWCJ9E9TJ53PS12VQ3KMW.jpg', 567, '2025-06-13 07:40:27', '2025-07-28 07:45:53'),
(5, 1, 'Hackathon Mobile App Development', 'hackathon-mobile-app-development', '2025-08-04', '<p>Kompetisi pengembangan aplikasi mobile dalam waktu 48 jam. Peserta akan berkompetisi untuk menciptakan aplikasi mobile yang inovatif dan bermanfaat untuk masyarakat.</p><p><strong>Kategori Lomba:</strong></p><ul><li>Best Innovation</li><li>Best UI/UX Design</li><li>Best Technical Implementation</li><li>People\'s Choice Award</li></ul><p><strong>Hadiah Total:</strong> Rp 50.000.000</p>', 'events/01K17ZW15H1ZS469V4DSRT9BJ8.jpg', 1456, '2025-06-28 07:40:27', '2025-07-28 07:45:40');

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `faqs`
--

CREATE TABLE `faqs` (
  `id` bigint UNSIGNED NOT NULL,
  `question` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `faqs`
--

INSERT INTO `faqs` (`id`, `question`, `answer`, `created_at`, `updated_at`) VALUES
(1, 'Apa itu CerdasNow?', '<p><strong>CerdasNow</strong> adalah platform kursus online yang menyediakan pelatihan di berbagai bidang seperti teknologi, bisnis, desain, dan pengembangan diri. Kursus kami dirancang oleh para profesional untuk membantu Anda meningkatkan keterampilan sesuai kebutuhan industri.</p>', '2025-01-03 21:20:03', '2025-05-20 18:20:26'),
(2, 'Apakah saya bisa belajar tanpa latar belakang teknis?', '<p>Tentu! Banyak kursus di CerdasNow dirancang untuk pemula, tanpa perlu pengalaman sebelumnya. Kami menyediakan panduan bertahap agar Anda bisa belajar dengan nyaman dan efektif.</p>', '2025-01-03 21:20:08', '2025-05-20 18:21:09'),
(3, 'Apakah kursus di CerdasNow bersertifikat?', '<p>Ya. Setelah menyelesaikan kursus dan memenuhi syarat penilaian, Anda akan mendapatkan <strong>sertifikat digital resmi</strong> dari CerdasNow yang bisa digunakan untuk keperluan profesional atau portofolio.</p>', '2025-01-03 21:20:13', '2025-05-20 18:21:25'),
(4, 'Bagaimana cara mengikuti kursus?', '<ol><li>Daftar akun di situs CerdasNow.</li><li>Pilih kursus yang Anda minati (gratis atau berbayar).</li><li>Lakukan pembayaran jika diperlukan.</li><li>Akses materi kursus melalui dashboard Anda kapan saja.</li></ol><p><br></p>', '2025-05-20 18:21:42', '2025-05-20 18:21:42'),
(5, 'Apakah saya bisa belajar lewat HP?', '<p>Ya. Semua kursus di CerdasNow bisa diakses melalui perangkat <strong>mobile, tablet, maupun desktop</strong>, sehingga Anda bisa belajar kapan saja dan di mana saja.</p>', '2025-05-20 18:21:54', '2025-05-20 18:21:54');

-- --------------------------------------------------------

--
-- Struktur dari tabel `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `jobs`
--

INSERT INTO `jobs` (`id`, `queue`, `payload`, `attempts`, `reserved_at`, `available_at`, `created_at`) VALUES
(8, 'default', '{\"uuid\":\"91591ae2-0ba4-4328-ab29-a4af86360dc7\",\"displayName\":\"Filament\\\\Notifications\\\\DatabaseNotification\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\",\"command\":\"O:48:\\\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\\\":3:{s:11:\\\"notifiables\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";a:1:{i:0;i:1;}s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"notification\\\";O:43:\\\"Filament\\\\Notifications\\\\DatabaseNotification\\\":2:{s:4:\\\"data\\\";a:11:{s:7:\\\"actions\\\";a:0:{}s:4:\\\"body\\\";N;s:5:\\\"color\\\";N;s:8:\\\"duration\\\";s:10:\\\"persistent\\\";s:4:\\\"icon\\\";s:23:\\\"heroicon-o-check-circle\\\";s:9:\\\"iconColor\\\";s:7:\\\"success\\\";s:6:\\\"status\\\";s:7:\\\"success\\\";s:5:\\\"title\\\";s:47:\\\"Student Muhammad Febriansyah berhasil mendaftar\\\";s:4:\\\"view\\\";s:36:\\\"filament-notifications::notification\\\";s:8:\\\"viewData\\\";a:0:{}s:6:\\\"format\\\";s:8:\\\"filament\\\";}s:2:\\\"id\\\";s:36:\\\"b69e5bc4-e87e-4172-886a-ea5952aab718\\\";}s:8:\\\"channels\\\";a:1:{i:0;s:8:\\\"database\\\";}}\"}}', 0, NULL, 1747799544, 1747799544);

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelas`
--

CREATE TABLE `kelas` (
  `id` bigint UNSIGNED NOT NULL,
  `level_id` bigint UNSIGNED NOT NULL,
  `type_id` bigint UNSIGNED NOT NULL,
  `category_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `discount` int NOT NULL DEFAULT '0',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `benefit` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `link_overview` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `views` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `kelas`
--

INSERT INTO `kelas` (`id`, `level_id`, `type_id`, `category_id`, `user_id`, `title`, `slug`, `price`, `discount`, `description`, `body`, `benefit`, `link_overview`, `image`, `status`, `views`, `created_at`, `updated_at`) VALUES
(3, 1, 1, 1, 2, 'Belajar HTML dan CSS Dasar  Membangun Fondasi Web Development', 'belajar-html-css-dasar-membangun-fondasi-web-development', 150000, 50000, 'Kursus ini mengajarkan dasar-dasar HTML dan CSS untuk membuat halaman web yang menarik dan responsif. Materi dilengkapi dengan contoh praktis dan proyek sederhana untuk pemahaman yang lebih baik.', '<p>Kursus ini merupakan gerbang utama bagi siapa pun yang ingin memulai karier sebagai web developer. Anda akan diajak memahami struktur dasar halaman web menggunakan HTML, kemudian menghias dan mengatur layout menggunakan CSS modern seperti Flexbox dan Grid.</p><p>Tidak hanya teori, kursus ini juga dipenuhi proyek praktis yang akan membuat Anda langsung menerapkan apa yang dipelajari. Cocok untuk pelajar, mahasiswa, maupun profesional non-IT yang ingin beralih ke dunia teknologi.</p><p><strong>Materi yang akan dipelajari:</strong></p><ul><li>Struktur semantik HTML: header, footer, section, dll.</li><li>Styling dan positioning dengan CSS</li><li>Pengenalan Flexbox &amp; Grid Layout</li><li>Responsive design dengan media queries</li><li>Studi kasus: Membangun landing page dari nol</li></ul><p>Setelah menyelesaikan kursus, Anda akan mampu membuat halaman web statis yang profesional dan siap melanjutkan ke tahapan JavaScript.</p>', '[\"Akses selamanya\",\"Fleksibilitas Waktu\",\"Pelatihan Berkelanjutan\"]', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=UB1O30fR-EE\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/UB1O30fR-EE?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', 'image-upload-server/01JVQG9X3W2N98CCKWSZZ31HSK.jpg', 'disetujui', 250, '2025-01-06 18:00:08', '2025-07-29 04:21:57'),
(4, 3, 1, 2, 2, 'Pelajari JavaScript dari dasar untuk membuat web interaktif. Kursus ini mengajarkan logika pemrograman, manipulasi DOM, dan pembuatan proyek mini yang aplikatif.', 'pelajari-javascript-dari-dasar-untuk-membuat-web-interaktif-kursus-ini-mengajarkan-logika-pemrograman-manipulasi-dom-dan-pembuatan-proyek-mini-yang-aplikatif', 100000, 20000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam obcaecati nisi quo, quam reprehenderit mollitia!\n', '<p>JavaScript adalah tulang punggung dari interaktivitas web. Dalam kursus ini, Anda akan memahami logika pemrograman dasar, pengolahan data, dan manipulasi elemen halaman (DOM) untuk menciptakan pengalaman pengguna yang dinamis.</p><p>Dibuat untuk pemula mutlak, seluruh materi disampaikan dalam Bahasa Indonesia, dilengkapi dengan latihan langsung dan kuis di setiap modul.</p><p><strong>Topik utama:</strong></p><ul><li>Variabel, tipe data, dan operator</li><li>Function, loop, dan conditional</li><li>DOM manipulation &amp; event listener</li><li>Debugging dengan console</li><li>Mini project: To-do list interaktif</li></ul><p>Di akhir kursus, Anda akan memiliki dasar kuat untuk mempelajari JavaScript lanjutan, seperti React.js atau penggunaan API.</p>', '[\"Akses selamanya\",\"Fleksibilitas Waktu\",\"Pelatihan Berkelanjutan\"]', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=PkZNo7MFNFg\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/PkZNo7MFNFg?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', 'image-upload-server/01JVQGBYGANK736EH2H8G3079S.jpg', 'disetujui', 85, '2025-01-09 10:47:29', '2025-07-29 04:09:05'),
(5, 2, 2, 4, 2, 'Desain UI/UX untuk Pemula – Menciptakan Pengalaman Digital yang Efektif', 'desain-uiux-untuk-pemula-menciptakan-pengalaman-digital-yang-efektif', 100000, 0, 'Kuasai prinsip desain UI/UX untuk membuat antarmuka yang mudah digunakan dan menyenangkan. Kursus ini lengkap dengan praktik prototyping menggunakan Figma.\n\n', '<blockquote>Dalam dunia digital, tampilan menarik saja tidak cukup. Pengguna membutuhkan pengalaman yang intuitif dan nyaman. Kursus ini mengajak Anda mengenal prinsip desain antarmuka (UI) dan pengalaman pengguna (UX) dari dasar hingga mampu merancang solusi digital yang berpusat pada kebutuhan pengguna.Anda tidak butuh latar belakang desain — kursus ini akan membimbing Anda dari nol, menggunakan tools populer seperti Figma untuk membuat prototipe.<strong>Yang akan Anda pelajari:</strong><ul><li>Perbedaan UI dan UX dalam proses desain</li><li>Prinsip desain seperti kontras, hirarki, dan konsistensi</li><li>Pembuatan user persona dan user journey</li><li>Wireframing &amp; prototyping dengan Figma</li><li>User testing &amp; iterasi desain</li></ul>Dengan kombinasi teori, studi kasus, dan tugas praktik, Anda akan siap mengambil peran sebagai UI/UX Designer pemula atau meningkatkan skill untuk mengembangkan produk digital sendiri.</blockquote><p><br></p>', '[\"Akses selamanya\",\"Pelatihan Berkelanjutan\",\"Fleksibilitas Waktu\"]', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=G5w7XCE0NZg\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/G5w7XCE0NZg?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', 'image-upload-server/01JVQGJRNWP4PDFNMNPCK57476.jpg', 'disetujui', 100, '2025-01-09 11:01:32', '2025-07-29 04:22:42');

-- --------------------------------------------------------

--
-- Struktur dari tabel `levels`
--

CREATE TABLE `levels` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `levels`
--

INSERT INTO `levels` (`id`, `name`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Pemula', 'image-upload-server/01JHBP0RYS2SGBCAYG3P8MMFGD.svg', '2025-01-03 23:02:08', '2025-01-11 21:58:42'),
(2, 'Menengah', 'image-upload-server/01JHBP183FZ8FEM7B9HRH55QYC.svg', '2025-01-06 03:10:13', '2025-01-11 21:58:57'),
(3, 'Expert', 'image-upload-server/01JHBP1MCVEZW31FES0G7HND7A.svg', '2025-01-06 03:10:27', '2025-01-11 21:59:10');

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2025_01_03_162235_create_settings_table', 1),
(6, '2025_01_03_164214_create_faqs_table', 1),
(7, '2025_01_04_043740_create_sessions_table', 2),
(8, '2025_01_04_044211_create_categories_table', 3),
(9, '2025_01_04_044239_create_levels_table', 3),
(10, '2025_01_04_044318_create_types_table', 3),
(11, '2025_01_04_044357_create_benefits_table', 3),
(12, '2025_01_04_044414_create_kelas_table', 3),
(13, '2025_01_04_044621_create_sections_table', 3),
(14, '2025_01_04_044628_create_videos_table', 3),
(15, '2025_01_04_044636_create_testimonis_table', 3),
(16, '2025_01_06_102909_adding_video_id_in_kelas', 4),
(17, '2025_01_06_103530_remove_column_video_id', 5),
(18, '2025_01_06_103651_remove_video_id', 6),
(19, '2025_01_06_103720_add_kelas_id', 7),
(20, '2025_01_06_104328_remove_kelas_id', 8),
(21, '2025_01_07_000132_create_quizzes_table', 9),
(22, '2025_01_07_002047_create_quiz_answers_table', 9),
(23, '2025_01_07_002141_create_user_answers_table', 9),
(24, '2025_01_07_002343_create_transactions_table', 9),
(25, '2025_01_07_023001_create_notifications_table', 10),
(26, '2025_01_11_051144_create_abouts_table', 11),
(27, '2025_01_12_045706_add_image_in_level', 12),
(28, '2025_01_16_075227_create_promo_codes_table', 13),
(29, '2025_01_16_130403_add_payment_url', 14),
(30, '2025_01_17_090207_create_video_readers_table', 15),
(31, '2025_01_18_021638_add_colomn_section_id', 16),
(32, '2025_01_18_023430_add_status_video', 17),
(33, '2025_01_18_100241_create_diskusis_table', 18),
(34, '2025_01_18_132658_create_balas_diskusis_table', 19),
(35, '2025_01_24_093757_add_column_in_user_answer', 20),
(36, '2025_02_04_085116_create_jobs_table', 21),
(37, '2025_02_17_202451_add_user_answer', 22),
(38, '2025_02_27_204139_add_image_in_promo_code', 23),
(39, '2025_02_27_223840_create_template_sertifikats_table', 24),
(40, '2025_03_01_121536_create_potongan_kelas_table', 25),
(41, '2025_05_21_011058_create_term_conditions_table', 26),
(42, '2025_07_15_224823_add_type_video', 27),
(43, '2025_07_15_225838_add_file_videos', 28),
(44, '2025_07_15_232039_add_url_drive', 29),
(45, '2025_07_17_213028_add_background_website', 30),
(46, '2025_07_20_234956_create_user_progress_table', 31),
(47, '2025_07_24_025108_add_o_t_p', 32),
(48, '2025_07_25_053342_add_expired_o_t_p', 33),
(49, '2025_07_26_051854_add_fee', 34),
(50, '2025_07_26_052414_add_fee_trx', 35),
(51, '2025_07_28_142703_create_events_table', 36);

-- --------------------------------------------------------

--
-- Struktur dari tabel `notifications`
--

CREATE TABLE `notifications` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_id` bigint UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `notifications`
--

INSERT INTO `notifications` (`id`, `type`, `notifiable_type`, `notifiable_id`, `data`, `read_at`, `created_at`, `updated_at`) VALUES
('168494a1-70f5-401b-8cdd-dea9b9c63292', 'Filament\\Notifications\\DatabaseNotification', 'App\\Models\\User', 1, '{\"actions\":[],\"body\":null,\"color\":null,\"duration\":\"persistent\",\"icon\":\"heroicon-o-check-circle\",\"iconColor\":\"success\",\"status\":\"success\",\"title\":\"Student Muhammad Febriansyah berhasil mendaftar\",\"view\":\"filament-notifications::notification\",\"viewData\":[],\"format\":\"filament\"}', NULL, '2025-02-27 17:16:40', '2025-02-27 17:16:40');

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 16, 'auth_token', 'b766e061fdbf01b5a3842f782bb056f7801c62916b5c065c83e52e7d5c56aa5f', '[\"*\"]', NULL, NULL, '2025-07-17 15:57:39', '2025-07-17 15:57:39'),
(2, 'App\\Models\\User', 16, 'auth_token', '0e62b927f4a2402be979e9c87f9bdb0492d41a1f66be8c67ef719d136d5ef819', '[\"*\"]', '2025-07-18 18:30:56', NULL, '2025-07-17 20:00:42', '2025-07-18 18:30:56'),
(3, 'App\\Models\\User', 16, 'auth_token', '03f54580acb393a30e48a221f12004c4e6962be92f1094477fe1556b4b0d2088', '[\"*\"]', '2025-07-19 22:31:53', NULL, '2025-07-18 17:27:26', '2025-07-19 22:31:53'),
(4, 'App\\Models\\User', 16, 'auth_token', '01d34419ff65e0111c388e418bd63fd9b943fd3d5216285afb4e5745a993df80', '[\"*\"]', NULL, NULL, '2025-07-18 18:17:04', '2025-07-18 18:17:04'),
(5, 'App\\Models\\User', 16, 'auth_token', '465480d4a3bed530537b4973bcf3121ba61871adf5d61fdecf3c4344d5032240', '[\"*\"]', '2025-07-19 22:24:14', NULL, '2025-07-18 18:32:25', '2025-07-19 22:24:14'),
(6, 'App\\Models\\User', 16, 'auth_token', 'a4dcc670837a33dd32b08376b8d84e8158e358545fbf45c8860d9e4af8f0604c', '[\"*\"]', NULL, NULL, '2025-07-19 11:54:52', '2025-07-19 11:54:52'),
(7, 'App\\Models\\User', 16, 'auth_token', 'c19043a57454d1b8702199e617cb53a7138230da60d517f4cf8328a3475747e7', '[\"*\"]', NULL, NULL, '2025-07-19 22:25:44', '2025-07-19 22:25:44'),
(8, 'App\\Models\\User', 16, 'auth_token', '0fd7279c0ada58ce849fb147e129ff757592a0db4994153d6b4780c85b3d369d', '[\"*\"]', '2025-07-19 22:30:38', NULL, '2025-07-19 22:30:35', '2025-07-19 22:30:38'),
(9, 'App\\Models\\User', 3, 'auth_token', '0ec95a25b686848c78d0cd5d0ffbdfbeb0816f6bb55036a2a5105a7470480ab9', '[\"*\"]', '2025-07-23 19:41:10', NULL, '2025-07-19 22:31:18', '2025-07-23 19:41:10'),
(10, 'App\\Models\\User', 3, 'auth_token', 'a7a9300ff8571c9ce119d65a45d6b35d9ec2d4393c185514902ea8c67ec3ae21', '[\"*\"]', '2025-07-19 22:51:54', NULL, '2025-07-19 22:31:49', '2025-07-19 22:51:54'),
(11, 'App\\Models\\User', 3, 'auth_token', '7682a4210b83071128a616cadac38291c34071a7dbefd12e32f4742f4b7c243b', '[\"*\"]', '2025-07-19 22:59:00', NULL, '2025-07-19 22:52:07', '2025-07-19 22:59:00'),
(12, 'App\\Models\\User', 3, 'auth_token', '57772a143ddf38a27235bfa53233017fefb0c9490238338b87658ca0268326d2', '[\"*\"]', NULL, NULL, '2025-07-19 22:54:18', '2025-07-19 22:54:18'),
(13, 'App\\Models\\User', 3, 'auth_token', '7bf198fa2750d4253584a2b970e64767f773ec8fb7d9bc49456eaa7e12c72d67', '[\"*\"]', NULL, NULL, '2025-07-19 22:58:18', '2025-07-19 22:58:18'),
(14, 'App\\Models\\User', 3, 'auth_token', '3e5c53bb16888561d7cb2cd06cdf3ad77e1adf85f32a5070d06c7cf3bc8cef18', '[\"*\"]', '2025-07-20 13:10:26', NULL, '2025-07-19 22:58:21', '2025-07-20 13:10:26'),
(15, 'App\\Models\\User', 3, 'auth_token', 'd167366097a35ed826cb4b2e166d75b55acbf3509a73f601790e9b7d6d92a7d8', '[\"*\"]', NULL, NULL, '2025-07-20 07:47:50', '2025-07-20 07:47:50'),
(16, 'App\\Models\\User', 3, 'auth_token', '70d8b47f3ab3e341fd84a9b311293a3730f785be0d5b49745c68ad1efde19ab6', '[\"*\"]', '2025-07-22 18:26:39', NULL, '2025-07-20 13:10:17', '2025-07-22 18:26:39'),
(17, 'App\\Models\\User', 3, 'auth_token', '1ba6a2873fb6f202f5fc5e008fd610cc0fab648f8649cee835020792a9d6fc68', '[\"*\"]', NULL, NULL, '2025-07-20 16:26:06', '2025-07-20 16:26:06'),
(18, 'App\\Models\\User', 3, 'auth_token', 'a0a04b7a20fb3d9aac382ee563a49a34436bfd875bdd9ebf389c4e201de5ab1b', '[\"*\"]', NULL, NULL, '2025-07-20 19:20:03', '2025-07-20 19:20:03'),
(19, 'App\\Models\\User', 3, 'auth_token', '86f05ec14a396c8b65c47655a9e3e508af5ceb155556bdc00a9612c17545fd29', '[\"*\"]', NULL, NULL, '2025-07-21 12:21:24', '2025-07-21 12:21:24'),
(20, 'App\\Models\\User', 3, 'auth_token', '14933ebbf0c5f8462b06c3da1885732956e99a3ed4ef2dff238ca96385e8e17f', '[\"*\"]', NULL, NULL, '2025-07-21 16:08:12', '2025-07-21 16:08:12'),
(21, 'App\\Models\\User', 3, 'auth_token', '82a5160fd0c84db054c76405377d8dac303bf472c47a4097225d6099e09752e0', '[\"*\"]', NULL, NULL, '2025-07-22 17:12:40', '2025-07-22 17:12:40'),
(22, 'App\\Models\\User', 3, 'auth_token', '235f64f4201fd931952f7a91c028cd34f2e8a5ddc8796c0cb610d5304a198cea', '[\"*\"]', '2025-07-28 21:31:42', NULL, '2025-07-22 17:55:37', '2025-07-28 21:31:42'),
(23, 'App\\Models\\User', 3, 'auth_token', '4a0cbe69e7e626cc470bb4e433ef51e669239449caa339b7d09804b6540b3672', '[\"*\"]', NULL, NULL, '2025-07-22 17:56:32', '2025-07-22 17:56:32'),
(24, 'App\\Models\\User', 3, 'auth_token', '853dbcd09e3c046a87878796060c52165f02bd277b02305dfd423305a90cb348', '[\"*\"]', NULL, NULL, '2025-07-22 18:25:51', '2025-07-22 18:25:51'),
(25, 'App\\Models\\User', 3, 'auth_token', 'e07d43a4b1bf36d23fc942c76d68a932f3ffb2cf30d39e9c7ebc9830166192e2', '[\"*\"]', '2025-07-22 18:44:51', NULL, '2025-07-22 18:27:17', '2025-07-22 18:44:51'),
(26, 'App\\Models\\User', 3, 'auth_token', '55e8c9c5c11442281466b3388a0a91898f6fc125bdbd881c2c86d24d354bee32', '[\"*\"]', NULL, NULL, '2025-07-22 18:39:49', '2025-07-22 18:39:49'),
(27, 'App\\Models\\User', 3, 'auth_token', 'f6e28818eb0005728722fe4e823309a5b21e14b73677c92eb8c4caeacd7b1acc', '[\"*\"]', NULL, NULL, '2025-07-22 18:40:55', '2025-07-22 18:40:55'),
(28, 'App\\Models\\User', 3, 'auth_token', '427d134ba47a3a1b46c1f2320076846d99846fff71089fa0f9bab210dc15cc93', '[\"*\"]', '2025-07-22 18:53:15', NULL, '2025-07-22 18:45:13', '2025-07-22 18:53:15'),
(29, 'App\\Models\\User', 3, 'auth_token', '2614d89f933e8e157986dce197b33ffedaf77d540f846b33387a4e9b92d6a4c2', '[\"*\"]', NULL, NULL, '2025-07-22 21:33:45', '2025-07-22 21:33:45'),
(30, 'App\\Models\\User', 16, 'auth_token', '0fe4260f573acd7d431bffecdf6a593bf2280c43015e2b6f98bf401b7659878f', '[\"*\"]', '2025-07-23 19:49:42', NULL, '2025-07-23 19:42:13', '2025-07-23 19:49:42'),
(31, 'App\\Models\\User', 3, 'auth_token', '4598e0f7a1f045c60a93c4ffa2311ef8fa97925537296c496e508bfe04225456', '[\"*\"]', '2025-07-23 19:50:47', NULL, '2025-07-23 19:49:51', '2025-07-23 19:50:47'),
(32, 'App\\Models\\User', 17, 'auth_token', 'ced2c7faf8433f50bea1598525ab0dae25a4c9e17d4839819dc740270c3b7e10', '[\"*\"]', NULL, NULL, '2025-07-23 19:54:01', '2025-07-23 19:54:01'),
(33, 'App\\Models\\User', 18, 'auth_token', '65d090862bbd83d644ca755b9da595c349f583fcca6114982a957851d6581c05', '[\"*\"]', NULL, NULL, '2025-07-24 22:43:36', '2025-07-24 22:43:36'),
(34, 'App\\Models\\User', 19, 'auth_token', 'a6aecc83a1da7600a8275ebe75ad7fd8b9d703fc8925eda1906b5db332bd3b8a', '[\"*\"]', NULL, NULL, '2025-07-24 22:47:25', '2025-07-24 22:47:25'),
(35, 'App\\Models\\User', 20, 'auth_token', 'e1f5d562ffeba341b08328369cfaa0933e1fc42d8c06b89a9d0784edc2aa19ca', '[\"*\"]', NULL, NULL, '2025-07-24 23:00:59', '2025-07-24 23:00:59'),
(36, 'App\\Models\\User', 21, 'auth_token', 'e3c483989cadd90f11ac4ca39a86d85012ecca66402e4f91eee0ee234792a39e', '[\"*\"]', NULL, NULL, '2025-07-24 23:08:06', '2025-07-24 23:08:06'),
(37, 'App\\Models\\User', 31, 'auth_token', '048522a2e79b5ddd5f706d437b7a5221bf5f96636366b726cb24d7b912d92f95', '[\"*\"]', NULL, NULL, '2025-07-24 23:53:00', '2025-07-24 23:53:00'),
(38, 'App\\Models\\User', 32, 'auth_token', '345251cb78bd4209ddfdf431b9878cbe8aef646727eb5fadca9bb9bc4cc40b67', '[\"*\"]', NULL, NULL, '2025-07-24 23:56:34', '2025-07-24 23:56:34'),
(39, 'App\\Models\\User', 33, 'auth_token', 'f73a811bab36332d3f10831f63d4cdea09edb03dfd7eb5ed7ad26a5fe9f815e0', '[\"*\"]', NULL, NULL, '2025-07-24 23:59:38', '2025-07-24 23:59:38'),
(40, 'App\\Models\\User', 34, 'auth_token', '5cb2143fd9d6e5a18ee8a2f438d19326e6fe7968ae46de0ea000b7eb389224f5', '[\"*\"]', NULL, NULL, '2025-07-25 00:02:54', '2025-07-25 00:02:54'),
(41, 'App\\Models\\User', 35, 'auth_token', '9d6208afe20f09b3c0dcbc21163132cf1e5395236d34d62c0e2638f79b4e7627', '[\"*\"]', NULL, NULL, '2025-07-25 00:07:16', '2025-07-25 00:07:16'),
(42, 'App\\Models\\User', 36, 'auth_token', '2ed2c1ab44eee5d82b87fb130328b516f755dae0d3bf73797d6b086970735443', '[\"*\"]', NULL, NULL, '2025-07-25 00:18:12', '2025-07-25 00:18:12'),
(43, 'App\\Models\\User', 37, 'auth_token', '841168228413aa7c464f6a4c312a0548c16aa59c675de0296bc281f02e71fb89', '[\"*\"]', NULL, NULL, '2025-07-25 00:35:25', '2025-07-25 00:35:25'),
(44, 'App\\Models\\User', 37, 'auth_token', '22d4a0e1402e8a5b3ecfbe2babec81c89a7cdde4d4d07dc72049572e8afc7d76', '[\"*\"]', '2025-07-27 04:02:33', NULL, '2025-07-25 00:35:35', '2025-07-27 04:02:33'),
(45, 'App\\Models\\User', 38, 'auth_token', 'b43dde6c25fab8ecf377679bb87b55f4abfbe4debdf78d50db1b4ed0b6b2eb9a', '[\"*\"]', NULL, NULL, '2025-07-27 04:05:12', '2025-07-27 04:05:12'),
(46, 'App\\Models\\User', 38, 'auth_token', '8382b1099e23330bed86d541f0880174184c91972ea335bd70bf841538115ee0', '[\"*\"]', '2025-07-27 04:23:57', NULL, '2025-07-27 04:05:52', '2025-07-27 04:23:57'),
(47, 'App\\Models\\User', 3, 'auth_token', 'd37cee8f23893a76464037b4a2a9e03a510ab3d7eb5bf6109235de70e9ad2648', '[\"*\"]', '2025-07-28 21:45:28', NULL, '2025-07-28 01:49:56', '2025-07-28 21:45:28'),
(48, 'App\\Models\\User', 3, 'auth_token', 'fa0f6e0652fb101295006ed29f526fdde20201fb88714f5ddf474e59d1f64a3d', '[\"*\"]', NULL, NULL, '2025-07-28 07:48:12', '2025-07-28 07:48:12'),
(49, 'App\\Models\\User', 3, 'auth_token', '388ad4434b840b370971870a3d15d7285179e997b3909ed8a6ebe4e8b568ff7f', '[\"*\"]', NULL, NULL, '2025-07-28 21:26:50', '2025-07-28 21:26:50'),
(50, 'App\\Models\\User', 3, 'auth_token', '09352e7d73f916e5075835c5a5d418a1336a0289eab8c98d22d69a41c9dc8c61', '[\"*\"]', '2025-07-28 22:18:41', NULL, '2025-07-28 21:47:06', '2025-07-28 22:18:41');

-- --------------------------------------------------------

--
-- Struktur dari tabel `potongan_kelas`
--

CREATE TABLE `potongan_kelas` (
  `id` bigint UNSIGNED NOT NULL,
  `fee` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `potongan_kelas`
--

INSERT INTO `potongan_kelas` (`id`, `fee`, `created_at`, `updated_at`) VALUES
(1, 30000, '2025-03-01 05:40:15', '2025-03-01 05:41:54');

-- --------------------------------------------------------

--
-- Struktur dari tabel `promo_codes`
--

CREATE TABLE `promo_codes` (
  `id` bigint UNSIGNED NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` int NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `promo_codes`
--

INSERT INTO `promo_codes` (`id`, `code`, `discount`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, '2EZ4', 20000, 'image-upload-server/01JN3V3HWAX2F954J9SJXT7SAX.svg', 'inactive', '2025-01-16 01:02:54', '2025-03-07 08:07:45');

-- --------------------------------------------------------

--
-- Struktur dari tabel `quizzes`
--

CREATE TABLE `quizzes` (
  `id` bigint UNSIGNED NOT NULL,
  `kelas_id` bigint UNSIGNED NOT NULL,
  `question` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `quizzes`
--

INSERT INTO `quizzes` (`id`, `kelas_id`, `question`, `created_at`, `updated_at`) VALUES
(5, 4, 'testert', '2025-01-09 10:47:30', '2025-01-09 10:47:30'),
(6, 5, 'question', '2025-01-09 11:01:32', '2025-01-09 11:01:32'),
(7, 3, 'Apa yang dimaksud dengan perangkat keras komputer?', '2025-01-23 01:44:33', '2025-01-23 01:44:33'),
(8, 3, 'Manakah dari berikut yang termasuk dalam perangkat lunak sistem?', '2025-01-23 01:44:33', '2025-01-23 01:44:33'),
(9, 3, 'Apa fungsi utama dari CPU (Central Processing Unit) dalam komputer?', '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(10, 3, 'Manakah dari berikut yang merupakan contoh sistem operasi?', '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(11, 3, 'Apa yang dimaksud dengan algoritma dalam ilmu komputer?', '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(12, 3, 'Apa yang dimaksud dengan \"IP Address\" dalam jaringan komputer?', '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(13, 3, 'Manakah dari berikut yang bukan merupakan tipe perangkat input pada komputer?', '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(14, 3, 'Dalam bahasa pemrograman, apa itu variabel?', '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(15, 3, 'Apa itu \"cloud computing\"?', '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(16, 3, 'Manakah yang merupakan jenis-jenis perangkat keras input?', '2025-01-23 01:44:34', '2025-01-23 01:44:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `quiz_answers`
--

CREATE TABLE `quiz_answers` (
  `id` bigint UNSIGNED NOT NULL,
  `quiz_id` bigint UNSIGNED NOT NULL,
  `answer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `point` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `quiz_answers`
--

INSERT INTO `quiz_answers` (`id`, `quiz_id`, `answer`, `point`, `created_at`, `updated_at`) VALUES
(21, 7, 'Program yang dijalankan oleh komputer', 0, '2025-01-23 01:44:33', '2025-01-23 01:44:33'),
(22, 7, 'Komponen fisik yang membentuk komputer', 10, '2025-01-23 01:44:33', '2025-01-23 01:44:33'),
(23, 7, 'Sistem operasi komputer', 0, '2025-01-23 01:44:33', '2025-01-23 01:44:33'),
(24, 7, 'Jaringan yang menghubungkan komputer', 0, '2025-01-23 01:44:33', '2025-01-23 01:44:33'),
(25, 8, 'Microsoft Word', 0, '2025-01-23 01:44:33', '2025-01-23 01:44:33'),
(26, 8, 'Google Chrome', 0, '2025-01-23 01:44:33', '2025-01-23 01:44:33'),
(27, 8, 'Windows 10', 10, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(28, 8, 'Adobe Photoshop', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(29, 9, 'Menyimpan data dalam jumlah besar', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(30, 9, 'Mengelola input dan output perangkat keras', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(31, 9, 'Memproses data dan menjalankan perintah', 10, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(32, 9, 'Menyambungkan komputer ke internet', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(33, 10, 'RAM', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(34, 10, 'Linux', 10, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(35, 10, 'Router', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(36, 10, 'Printer', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(37, 11, 'Sekumpulan data yang tidak terorganisir', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(38, 11, 'Langkah-langkah atau prosedur yang digunakan untuk menyelesaikan masalah', 10, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(39, 11, 'Perangkat keras yang digunakan untuk menyimpan data', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(40, 11, 'Bahasa pemrograman yang digunakan untuk membuat perangkat lunak', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(41, 12, 'Identifikasi unik untuk perangkat dalam jaringan', 10, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(42, 12, 'Nama domain yang digunakan untuk mencari situs web', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(43, 12, 'Jaringan fisik yang menghubungkan komputer', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(44, 12, 'Sistem operasi yang mengatur jaringan komputer', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(45, 13, 'Keyboard', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(46, 13, 'Mouse', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(47, 13, 'Monitor', 10, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(48, 13, 'Scanner', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(49, 14, 'Alamat memori yang digunakan untuk menyimpan data', 10, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(50, 14, 'Program yang digunakan untuk menjalankan aplikasi', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(51, 14, 'Alat untuk memproses data', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(52, 14, 'Sistem operasi yang mengontrol komputer', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(53, 15, 'Penyimpanan data dalam perangkat keras fisik', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(54, 15, 'Teknologi untuk menyimpan dan mengakses data melalui internet', 10, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(55, 15, 'Perangkat lunak yang mengatur perangkat keras komputer', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(56, 15, 'Jaringan komputer yang digunakan untuk saling berbagi data secara lokal', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(57, 16, 'Monitor, printer', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(58, 16, 'CPU, hard disk', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(59, 16, 'Keyboard, mouse', 10, '2025-01-23 01:44:34', '2025-01-23 01:44:34'),
(60, 16, 'USB drive, speaker', 0, '2025-01-23 01:44:34', '2025-01-23 01:44:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sections`
--

CREATE TABLE `sections` (
  `id` bigint UNSIGNED NOT NULL,
  `kelas_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_video` int DEFAULT NULL,
  `total_duration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sections`
--

INSERT INTO `sections` (`id`, `kelas_id`, `title`, `total_video`, `total_duration`, `created_at`, `updated_at`) VALUES
(5, 3, 'Section 1', 2, '10 menit', '2025-01-06 18:00:08', '2025-01-06 18:00:08'),
(6, 3, 'Section 2', 2, '10 menit', '2025-01-06 18:00:08', '2025-01-06 18:00:08'),
(7, 4, 'Section 1', 2, '10 menit', '2025-01-09 10:47:30', '2025-01-09 10:47:30'),
(8, 4, 'Section 2', 2, '10 menit', '2025-01-09 10:47:30', '2025-01-09 10:47:30'),
(9, 4, 'Section 3', 2, '10 menit', '2025-01-09 10:47:30', '2025-01-09 10:47:30'),
(10, 5, 'Section 1', 2, '10 menit', '2025-01-09 11:01:32', '2025-01-09 11:01:32'),
(11, 5, 'Section 2', 2, '10 menit', '2025-01-09 11:01:32', '2025-01-09 11:01:32');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('fM7uldRRlWW3onvJA7kvjWSCblPGWv6l57Lgjr9m', 1, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTo2OntzOjY6Il90b2tlbiI7czo0MDoiVndhcjRad2JmTXltMUJaeGhmbUtrenY2elNyeEpESDd2dkQySVhDQSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9zZXR0aW5nLXdlYnNpdGUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO3M6MTc6InBhc3N3b3JkX2hhc2hfd2ViIjtzOjYwOiIkMnkkMTIkQTZ1ekgwTE9KMTE3TG5aNWFLdno3LmNQU25ybkxaZk1wN1VsUjBReG44SWJVYndTOTd6NTIiO3M6ODoiZmlsYW1lbnQiO2E6MDp7fX0=', 1753762849),
('sxM5Yu5WDFLoPFsciAEZjxDTap0w5sV3QnRqW4ZS', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiQ3NodTFWdGhjUXNqaDhGdGdRUHVYTDc2OGVodDd5NzY4UHdiSjZWViI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1753763453),
('zQ82fGd2l2ecxObMyua3sS4fm2GQgzU72jIQwosE', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNnR2WDBtdjVLNXM2YWlHQTlOWFNrRGNJcWVGQ0E0bFpTaVQydENLUyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fX0=', 1753763302);

-- --------------------------------------------------------

--
-- Struktur dari tabel `settings`
--

CREATE TABLE `settings` (
  `id` bigint UNSIGNED NOT NULL,
  `site_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keyword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `yt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ig` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fb` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `background` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `long_logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `heading` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fee` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `settings`
--

INSERT INTO `settings` (`id`, `site_name`, `keyword`, `email`, `address`, `phone`, `description`, `yt`, `ig`, `fb`, `logo`, `background`, `long_logo`, `thumbnail`, `heading`, `fee`, `created_at`, `updated_at`) VALUES
(1, 'Masih Belajar', 'Cerdas Now', 'cerdasnow@gmail.com', 'Jl. Kenanga No 5, Menteng, Jakarta Pusat, DKI Jakarta', '6281295916567', 'Belajar dengan tempo yang kamu tentukan sendiri, dan capai impian karirmu lewat kursus online yang efisien dan terarah.', 'https://github.com/muhammad-febriansyah', 'https://github.com/muhammad-febriansyah', 'https://github.com/muhammad-febriansyah', 'image-upload-server/01K0C3ZRXWE6R3TCQ133YJPTSF.png', 'image-upload-server/01K0CCTT0XQJHCVYJG3RBQ4D7Y.jpg', 'image-upload-server/01K0C3ZRXXFRMN1QQZWYXZYQD4.png', 'image-upload-server/01JVFKGAMMGT0K6BV4XPHEE6G5.png', 'Kuasai Skill Digitalmu, Wujudkan Impianmu!', 5000, '2025-01-03 20:52:51', '2025-07-29 04:20:40');

-- --------------------------------------------------------

--
-- Struktur dari tabel `template_sertifikats`
--

CREATE TABLE `template_sertifikats` (
  `id` bigint UNSIGNED NOT NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `file` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `template_sertifikats`
--

INSERT INTO `template_sertifikats` (`id`, `color`, `file`, `status`, `created_at`, `updated_at`) VALUES
(1, '#9113e8', 'image-upload-server/01K1A0DAMXA5JM7WYBTY1RWJ5J.pdf', '1', '2025-02-27 15:50:39', '2025-07-29 02:32:59');

-- --------------------------------------------------------

--
-- Struktur dari tabel `term_conditions`
--

CREATE TABLE `term_conditions` (
  `id` bigint UNSIGNED NOT NULL,
  `body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `term_conditions`
--

INSERT INTO `term_conditions` (`id`, `body`, `created_at`, `updated_at`) VALUES
(1, '<h2><strong>Syarat dan Ketentuan Penggunaan</strong></h2><h3>Terakhir diperbarui: [20 Mei 2025]</h3><p>Selamat datang di <strong>CerdasNow</strong>!</p><p>Syarat dan ketentuan ini (“Perjanjian”) mengatur penggunaan Anda atas situs web, layanan, dan konten yang disediakan oleh CerdasNow. Dengan mengakses atau menggunakan platform kami, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini.</p><h3>1. <strong>Akun Pengguna</strong></h3><ul><li>Pengguna wajib membuat akun untuk mengakses sebagian besar fitur kursus di CerdasNow.</li><li>Anda bertanggung jawab atas menjaga kerahasiaan informasi akun, termasuk kata sandi Anda.</li><li>Semua informasi yang Anda berikan harus akurat dan terkini.</li></ul><h3>2. <strong>Layanan Kursus</strong></h3><ul><li>CerdasNow menyediakan kursus online dalam berbagai bidang IT, bisnis, desain, dan pengembangan diri.</li><li>Kami berhak mengubah, menghentikan, atau memperbarui konten kursus kapan saja tanpa pemberitahuan sebelumnya.</li><li>Materi kursus tidak dapat dialihkan, disalin, atau didistribusikan tanpa izin tertulis dari CerdasNow.</li></ul><h3>3. <strong>Pembayaran dan Akses</strong></h3><ul><li>Beberapa kursus bersifat gratis, sementara lainnya memerlukan pembayaran.</li><li>Setelah pembayaran berhasil, Anda akan mendapatkan akses ke kursus sesuai dengan durasi yang ditentukan.</li><li>Semua pembayaran bersifat final dan tidak dapat dikembalikan, kecuali ditentukan lain oleh kebijakan pengembalian dana kami.</li></ul><h3>4. <strong>Penggunaan yang Dilarang</strong></h3><p>Anda setuju untuk tidak:</p><ul><li>Menggunakan platform untuk aktivitas ilegal atau melanggar hukum.</li><li>Menyalahgunakan konten kursus untuk tujuan komersial pribadi tanpa izin.</li><li>Mengganggu sistem atau keamanan platform.</li></ul><h3>5. <strong>Hak Kekayaan Intelektual</strong></h3><ul><li>Semua materi di CerdasNow, termasuk video, teks, gambar, dan logo, dilindungi oleh hak cipta dan hak milik intelektual.</li><li>Anda tidak diperkenankan menyalin, memodifikasi, atau menyebarkan materi tanpa izin resmi dari kami.</li></ul><h3>6. <strong>Perubahan Syarat</strong></h3><p>CerdasNow dapat memperbarui syarat dan ketentuan ini sewaktu-waktu. Perubahan akan diberlakukan setelah dipublikasikan di situs ini. Penggunaan layanan secara terus-menerus menunjukkan persetujuan Anda atas perubahan tersebut.</p><h3>7. <strong>Penolakan Tanggung Jawab</strong></h3><ul><li>Kami berusaha memberikan konten yang akurat dan bermanfaat, namun tidak menjamin kelengkapan, keakuratan, atau hasil akhir dari penggunaan materi.</li><li>CerdasNow tidak bertanggung jawab atas kerugian langsung maupun tidak langsung akibat penggunaan platform kami.</li></ul><h3>8. <strong>Kontak Kami</strong></h3><p>Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami di:<br>&nbsp;📧 <strong>support@cerdasnow.com</strong></p><blockquote>Dengan mendaftar atau menggunakan platform CerdasNow, Anda dianggap telah membaca, memahami, dan menyetujui semua syarat dan ketentuan di atas.</blockquote><p><br></p>', NULL, '2025-05-20 18:16:42');

-- --------------------------------------------------------

--
-- Struktur dari tabel `testimonis`
--

CREATE TABLE `testimonis` (
  `id` bigint UNSIGNED NOT NULL,
  `kelas_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `rating` int NOT NULL,
  `body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `testimonis`
--

INSERT INTO `testimonis` (`id`, `kelas_id`, `user_id`, `rating`, `body`, `created_at`, `updated_at`) VALUES
(1, 3, 3, 5, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, delectus?\r\n', '2025-01-18 02:54:37', '2025-01-18 02:54:37'),
(2, 3, 3, 3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, delectus?\r\n', '2025-01-18 03:01:02', '2025-01-18 03:01:02'),
(3, 3, 3, 1, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, delectus?\r\n', '2025-01-18 03:01:34', '2025-01-18 03:01:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `kelas_id` bigint UNSIGNED NOT NULL,
  `invoice_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fee_trx` int NOT NULL DEFAULT '0',
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `kelas_id`, `invoice_number`, `payment_method`, `payment_url`, `amount`, `fee_trx`, `status`, `image`, `created_at`, `updated_at`) VALUES
(31, 3, 3, 'MBI/BELAJARHTM/41565/29/07/2025', 'midtrans', 'https://app.sandbox.midtrans.com/snap/v4/redirection/5d7186a7-de14-4c50-a456-63034c354184', '105000.00', 5000, 'paid', NULL, '2025-07-28 20:36:29', '2025-07-28 20:36:53');

-- --------------------------------------------------------

--
-- Struktur dari tabel `types`
--

CREATE TABLE `types` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `types`
--

INSERT INTO `types` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Premium', 'premium', '2025-01-06 03:11:49', '2025-01-06 03:11:49'),
(2, 'Gratis', 'gratis', '2025-01-06 03:12:07', '2025-01-06 03:12:07');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `otp` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expired_otp` timestamp NULL DEFAULT NULL,
  `tempat_lahir` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `umur` int DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jk` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` int NOT NULL DEFAULT '0',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `otp`, `expired_otp`, `tempat_lahir`, `tanggal_lahir`, `umur`, `phone`, `alamat`, `jk`, `role`, `bio`, `status`, `image`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 'admin@admin.com', '$2y$12$A6uzH0LOJ117LnZ5aKvz7.cPSnrnLZfMp7UlR0Qxn8IbUbwS97z52', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'admin', NULL, 1, 'image-upload-server/01JGWXEJFFEANDN9Y66RWBCSDT.svg', '7rbJS5SPHLv8ThxfNTAO82wI0Homn31oL8s9Pytl6h23OsKFwm9UBNOX5Wm5', '2025-01-03 13:37:38', '2025-01-06 04:19:58'),
(2, 'Carl Jonhson', 'mentor@mentor.com', '$2y$12$9nXTeiRuPetpQgO.MNfs9O7fXky55D5gWHaZHLaoMYv.fdTmEWmUK', NULL, NULL, 'Indonesia', '2002-02-27', 22, '081295916567', 'Jambi', 'Laki-laki', 'mentor', 'Mentor UI/UX, bantu pemula belajar desain antarmuka dengan mudah.\n\n', 1, NULL, 'SVAoaBDASNJjFtBIu6Lrtu1pzXZgNGMs2Tb0Oh26RdkOYo5nuwDDxR5JoSCZ', '2025-01-06 03:16:16', '2025-01-06 04:13:20'),
(3, 'Student Sample', 'student@gmail.com', '$2y$12$tJPnszHJeMz99hgYKg2XN.7VV2KgeURFbE8amUb57w8Z/Jd13AbvC', NULL, NULL, 'Indonesia', '2001-05-20', 24, '081295916567', 'Jl. Pahlawan No. 8, RT 04/RW 06, Kel. Sukasari, Kec. Tangerang, Kota Tangerang, Banten, 15111', 'Laki-laki', 'student', NULL, 1, 'profile/p4JavBkf8xRDuhEWrXLy6n847MLd1AhVfWAEzBx2.png', NULL, '2025-01-08 22:36:55', '2025-07-19 22:31:06'),
(16, 'Kila', 'kila@gmail.com', '$2y$12$kJNvE5zLjGlKUezddKxUkegKUU7f5j2GjfFhpFJ/WukNLpvWXgyG.', NULL, NULL, 'Indonesia', '2004-07-17', 21, '081295916567', 'Indonesia', 'Perempuan', 'student', NULL, 1, 'profile/DavWgC5N4SpaVAUzswnUude2rtsXb6xbbb4kB9jA.jpg', NULL, '2025-07-17 15:57:39', '2025-07-18 19:47:01'),
(37, 'tester', 'tester@gmail.com', '$2y$12$MuAVMS8KC9xHbmSPZWDx5Osogt7kZ5nA/3KqGsffZg8zGS6uBwyqa', NULL, NULL, 'Indonesian', '2010-07-25', 15, '081295916567', 'Indonesian', 'Laki-laki', 'student', NULL, 1, NULL, NULL, '2025-07-25 00:35:24', '2025-07-25 00:35:35'),
(38, 'test', 'test@gmail.vom', '$2y$12$BITQNcbSSZ0mBVTU33x8XeAafe/5wZX46g/cMaWpOjlAZeXyiUJ8y', NULL, NULL, 'jambi', '2025-07-27', 0, '082376585519', 'jambi', 'Laki-laki', 'student', NULL, 1, NULL, NULL, '2025-07-27 04:05:11', '2025-07-27 04:05:52');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_answers`
--

CREATE TABLE `user_answers` (
  `id` bigint UNSIGNED NOT NULL,
  `quiz_id` bigint UNSIGNED NOT NULL,
  `quiz_answer_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `no_sertifikat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `point` int NOT NULL,
  `edit_count` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `kelas_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `user_answers`
--

INSERT INTO `user_answers` (`id`, `quiz_id`, `quiz_answer_id`, `user_id`, `no_sertifikat`, `point`, `edit_count`, `created_at`, `updated_at`, `kelas_id`) VALUES
(171, 11, 38, 3, 'MBI/8994/29/07/2025', 10, '1', '2025-07-28 21:23:49', '2025-07-28 21:23:49', 3),
(172, 10, 34, 3, 'MBI//8282/29/07/2025', 10, '1', '2025-07-28 21:23:49', '2025-07-28 21:23:49', 3),
(173, 15, 54, 3, 'MBI//1793/29/07/2025', 10, '1', '2025-07-28 21:23:49', '2025-07-28 21:23:49', 3),
(174, 16, 59, 3, 'MBI//7272/29/07/2025', 10, '1', '2025-07-28 21:23:49', '2025-07-28 21:23:49', 3),
(175, 9, 29, 3, 'MBI//4408/29/07/2025', 0, '1', '2025-07-28 21:23:49', '2025-07-28 21:23:49', 3),
(176, 7, 22, 3, 'MBI//3504/29/07/2025', 10, '1', '2025-07-28 21:23:49', '2025-07-28 21:23:49', 3),
(177, 13, 47, 3, 'MBI//1378/29/07/2025', 10, '1', '2025-07-28 21:23:49', '2025-07-28 21:23:49', 3),
(178, 12, 41, 3, 'MBI//2318/29/07/2025', 10, '1', '2025-07-28 21:23:49', '2025-07-28 21:23:49', 3),
(179, 14, 49, 3, 'MBI//4718/29/07/2025', 10, '1', '2025-07-28 21:23:49', '2025-07-28 21:23:49', 3),
(180, 8, 27, 3, 'MBI//7561/29/07/2025', 10, '1', '2025-07-28 21:23:49', '2025-07-28 21:23:49', 3);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_progress`
--

CREATE TABLE `user_progress` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `kelas_id` bigint UNSIGNED NOT NULL,
  `watched_videos` json DEFAULT NULL,
  `current_video_index` int NOT NULL DEFAULT '0',
  `overall_progress` decimal(3,2) NOT NULL DEFAULT '0.00',
  `last_accessed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `videos`
--

CREATE TABLE `videos` (
  `id` bigint UNSIGNED NOT NULL,
  `section_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url_drive` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `videos`
--

INSERT INTO `videos` (`id`, `section_id`, `title`, `type`, `description`, `url`, `url_drive`, `file`, `duration`, `status`, `created_at`, `updated_at`) VALUES
(9, 5, 'Selamat datang', 'google_drive', NULL, '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=vn1z5mlzF-U&list=RDvn1z5mlzF-U&start_radio=1&rv=vn1z5mlzF-U\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/vn1z5mlzF-U?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', 'https://drive.google.com/file/d/1EEXO5PF_AodnmHIS0CJhxKZi4MM3W4hE/view?usp=drive_link', NULL, '5 menit', 1, '2025-01-06 18:00:08', '2025-07-15 16:22:57'),
(10, 5, 'Video 2', 'file', 'file pdf', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=vn1z5mlzF-U&list=RDvn1z5mlzF-U&start_radio=1&rv=vn1z5mlzF-U\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/vn1z5mlzF-U?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', NULL, 'course-materials/01K07GM67620Q1AH0TF3H9VHRD.pdf', '5 menit', 1, '2025-01-06 18:00:08', '2025-07-15 17:02:56'),
(11, 6, 'Video 1', 'youtube', NULL, '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=vn1z5mlzF-U&list=RDvn1z5mlzF-U&start_radio=1&rv=vn1z5mlzF-U\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/vn1z5mlzF-U?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', NULL, NULL, '5 menit', 1, '2025-01-06 18:00:08', '2025-02-16 15:42:10'),
(12, 6, 'Video 2', 'youtube', NULL, '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=vn1z5mlzF-U&list=RDvn1z5mlzF-U&start_radio=1&rv=vn1z5mlzF-U\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/vn1z5mlzF-U?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', NULL, NULL, '5 menit', 1, '2025-01-06 18:00:08', '2025-02-16 15:53:29'),
(13, 7, 'Video 1', 'youtube', NULL, '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=pZ31pyTZdh0&list=RD4LZgEZ2zOaY&index=2\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/pZ31pyTZdh0?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', NULL, NULL, '5 menit', 0, '2025-01-09 10:47:30', '2025-01-20 06:44:21'),
(14, 7, 'Video 2', 'youtube', NULL, '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=pZ31pyTZdh0&list=RD4LZgEZ2zOaY&index=2\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/pZ31pyTZdh0?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', NULL, NULL, '5 menit', 0, '2025-01-09 10:47:30', '2025-01-09 10:47:30'),
(15, 8, 'Video 1', 'youtube', NULL, '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=pZ31pyTZdh0&list=RD4LZgEZ2zOaY&index=2\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/pZ31pyTZdh0?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', NULL, NULL, '5 menit', 0, '2025-01-09 10:47:30', '2025-01-09 10:47:30'),
(16, 8, 'Video 2', 'youtube', NULL, '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=pZ31pyTZdh0&list=RD4LZgEZ2zOaY&index=2\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/pZ31pyTZdh0?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', NULL, NULL, '5 menit', 0, '2025-01-09 10:47:30', '2025-01-09 10:47:30'),
(17, 9, 'Video 1', 'youtube', NULL, '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=pZ31pyTZdh0&list=RD4LZgEZ2zOaY&index=2\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/pZ31pyTZdh0?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', NULL, NULL, '5 menit', 0, '2025-01-09 10:47:30', '2025-01-09 10:47:30'),
(18, 9, 'Video 2', 'youtube', NULL, '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=pZ31pyTZdh0&list=RD4LZgEZ2zOaY&index=2\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/pZ31pyTZdh0?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', NULL, NULL, '5 menit', 0, '2025-01-09 10:47:30', '2025-01-09 10:47:30'),
(19, 10, 'Video 1', 'youtube', NULL, '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=sElE_BfQ67s&list=RD4LZgEZ2zOaY&index=3\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/sElE_BfQ67s?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', NULL, NULL, '5 menit', 1, '2025-01-09 11:01:32', '2025-07-15 18:39:15'),
(20, 10, 'Video 2', 'youtube', NULL, '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=sElE_BfQ67s&list=RD4LZgEZ2zOaY&index=3\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/sElE_BfQ67s?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', NULL, NULL, '5 menit', 0, '2025-01-09 11:01:32', '2025-01-09 11:01:32'),
(21, 11, 'Video 1', 'youtube', NULL, '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=sElE_BfQ67s&list=RD4LZgEZ2zOaY&index=3\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/sElE_BfQ67s?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', NULL, NULL, '5 menit', 0, '2025-01-09 11:01:32', '2025-01-20 04:51:39'),
(22, 11, 'Video 2', 'youtube', NULL, '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=sElE_BfQ67s&list=RD4LZgEZ2zOaY&index=3\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/sElE_BfQ67s?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', NULL, NULL, '5 menit', 0, '2025-01-09 11:01:32', '2025-01-09 11:01:32');

-- --------------------------------------------------------

--
-- Struktur dari tabel `video_readers`
--

CREATE TABLE `video_readers` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `video_id` bigint UNSIGNED NOT NULL,
  `section_id` bigint UNSIGNED NOT NULL,
  `status` int NOT NULL,
  `watched_duration` int DEFAULT NULL,
  `total_duration` int DEFAULT NULL,
  `last_watched_at` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `video_readers`
--

INSERT INTO `video_readers` (`id`, `user_id`, `video_id`, `section_id`, `status`, `watched_duration`, `total_duration`, `last_watched_at`, `created_at`, `updated_at`) VALUES
(78, 3, 9, 0, 1, NULL, NULL, NULL, '2025-07-28 21:10:18', '2025-07-28 21:10:18'),
(79, 3, 10, 0, 1, NULL, NULL, NULL, '2025-07-28 21:10:19', '2025-07-28 21:10:19'),
(80, 3, 11, 0, 1, NULL, NULL, NULL, '2025-07-28 21:10:55', '2025-07-28 21:10:55'),
(81, 3, 12, 0, 1, NULL, NULL, NULL, '2025-07-28 21:11:36', '2025-07-28 21:11:36');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `abouts`
--
ALTER TABLE `abouts`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `balas_diskusis`
--
ALTER TABLE `balas_diskusis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `balas_diskusis_diskusi_id_foreign` (`diskusi_id`),
  ADD KEY `balas_diskusis_user_id_foreign` (`user_id`);

--
-- Indeks untuk tabel `benefits`
--
ALTER TABLE `benefits`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`);

--
-- Indeks untuk tabel `diskusis`
--
ALTER TABLE `diskusis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `diskusis_user_id_foreign` (`user_id`),
  ADD KEY `diskusis_kelas_id_foreign` (`kelas_id`);

--
-- Indeks untuk tabel `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `events_slug_unique` (`slug`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indeks untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kelas_slug_unique` (`slug`),
  ADD KEY `kelas_category_id_foreign` (`category_id`),
  ADD KEY `kelas_user_id_foreign` (`user_id`);

--
-- Indeks untuk tabel `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indeks untuk tabel `potongan_kelas`
--
ALTER TABLE `potongan_kelas`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `promo_codes`
--
ALTER TABLE `promo_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quizzes_kelas_id_foreign` (`kelas_id`);

--
-- Indeks untuk tabel `quiz_answers`
--
ALTER TABLE `quiz_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_answers_quiz_id_foreign` (`quiz_id`);

--
-- Indeks untuk tabel `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sections_kelas_id_foreign` (`kelas_id`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeks untuk tabel `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `template_sertifikats`
--
ALTER TABLE `template_sertifikats`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `term_conditions`
--
ALTER TABLE `term_conditions`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `testimonis`
--
ALTER TABLE `testimonis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `testimonis_kelas_id_foreign` (`kelas_id`),
  ADD KEY `testimonis_user_id_foreign` (`user_id`);

--
-- Indeks untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transactions_user_id_foreign` (`user_id`),
  ADD KEY `transactions_kelas_id_foreign` (`kelas_id`);

--
-- Indeks untuk tabel `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `types_slug_unique` (`slug`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indeks untuk tabel `user_answers`
--
ALTER TABLE `user_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_answers_quiz_id_foreign` (`quiz_id`),
  ADD KEY `user_answers_quiz_answer_id_foreign` (`quiz_answer_id`),
  ADD KEY `user_answers_user_id_foreign` (`user_id`),
  ADD KEY `user_answers_kelas_id_foreign` (`kelas_id`);

--
-- Indeks untuk tabel `user_progress`
--
ALTER TABLE `user_progress`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_progress_user_id_kelas_id_unique` (`user_id`,`kelas_id`),
  ADD KEY `user_progress_kelas_id_foreign` (`kelas_id`);

--
-- Indeks untuk tabel `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `videos_section_id_foreign` (`section_id`);

--
-- Indeks untuk tabel `video_readers`
--
ALTER TABLE `video_readers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `video_readers_user_id_foreign` (`user_id`),
  ADD KEY `video_readers_video_id_foreign` (`video_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `abouts`
--
ALTER TABLE `abouts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `balas_diskusis`
--
ALTER TABLE `balas_diskusis`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `benefits`
--
ALTER TABLE `benefits`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `diskusis`
--
ALTER TABLE `diskusis`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `events`
--
ALTER TABLE `events`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `levels`
--
ALTER TABLE `levels`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT untuk tabel `potongan_kelas`
--
ALTER TABLE `potongan_kelas`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `promo_codes`
--
ALTER TABLE `promo_codes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `quiz_answers`
--
ALTER TABLE `quiz_answers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT untuk tabel `sections`
--
ALTER TABLE `sections`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `template_sertifikats`
--
ALTER TABLE `template_sertifikats`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `term_conditions`
--
ALTER TABLE `term_conditions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `testimonis`
--
ALTER TABLE `testimonis`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT untuk tabel `types`
--
ALTER TABLE `types`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT untuk tabel `user_answers`
--
ALTER TABLE `user_answers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT untuk tabel `user_progress`
--
ALTER TABLE `user_progress`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `videos`
--
ALTER TABLE `videos`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT untuk tabel `video_readers`
--
ALTER TABLE `video_readers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `balas_diskusis`
--
ALTER TABLE `balas_diskusis`
  ADD CONSTRAINT `balas_diskusis_diskusi_id_foreign` FOREIGN KEY (`diskusi_id`) REFERENCES `diskusis` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `balas_diskusis_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `diskusis`
--
ALTER TABLE `diskusis`
  ADD CONSTRAINT `diskusis_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`),
  ADD CONSTRAINT `diskusis_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `kelas`
--
ALTER TABLE `kelas`
  ADD CONSTRAINT `kelas_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `kelas_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `quizzes_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `quiz_answers`
--
ALTER TABLE `quiz_answers`
  ADD CONSTRAINT `quiz_answers_quiz_id_foreign` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `sections`
--
ALTER TABLE `sections`
  ADD CONSTRAINT `sections_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `testimonis`
--
ALTER TABLE `testimonis`
  ADD CONSTRAINT `testimonis_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `testimonis_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transactions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `user_answers`
--
ALTER TABLE `user_answers`
  ADD CONSTRAINT `user_answers_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_answers_quiz_answer_id_foreign` FOREIGN KEY (`quiz_answer_id`) REFERENCES `quiz_answers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_answers_quiz_id_foreign` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_answers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `user_progress`
--
ALTER TABLE `user_progress`
  ADD CONSTRAINT `user_progress_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_progress_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_section_id_foreign` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `video_readers`
--
ALTER TABLE `video_readers`
  ADD CONSTRAINT `video_readers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `video_readers_video_id_foreign` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
