-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 04, 2025 at 03:19 AM
-- Server version: 5.7.39
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ananta_course`
--

-- --------------------------------------------------------

--
-- Table structure for table `abouts`
--

CREATE TABLE `abouts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `abouts`
--

INSERT INTO `abouts` (`id`, `title`, `description`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Video Interaktif', 'Video tutorial praktik yang mudah difahami', 'image-upload-server/01JHAXJ92K249HJA9CKNRSCBX6.svg', '2025-01-10 22:17:56', '2025-01-11 14:51:21'),
(2, 'Bahasa Indonesia', 'Seluruh materi disampaikan dengan Bahasa Indonesia', 'image-upload-server/01JHAXKN0QHR71H35FQE2XECQD.svg', '2025-01-10 22:18:21', '2025-01-11 14:52:06'),
(3, 'E-Sertifikat', 'Kelulusan dengan elektronik sertifikat', 'image-upload-server/01JHAXMB68ASJG6FQZPKYM8XKD.svg', '2025-01-10 22:18:37', '2025-01-11 14:52:29'),
(4, 'Support', 'Fitur tanya jawab jika ada kesulitan memahami materi', 'image-upload-server/01JHAXQTXCCXWY3F46PAMC34A0.svg', '2025-01-10 22:19:00', '2025-01-11 14:54:23'),
(5, 'Akses Seumur Hidup', 'Kelas bisa diakses selamanya', 'image-upload-server/01JHAXR8HSZDD9V7VTAX11N0FF.svg', '2025-01-10 22:19:19', '2025-01-11 14:54:37'),
(6, 'Trainer Berpengalaman', 'Belajar langsung dari ahlinya', 'image-upload-server/01JHAXRRMP991AYX4B52N51PQ3.svg', '2025-01-10 22:19:40', '2025-01-11 14:54:54');

-- --------------------------------------------------------

--
-- Table structure for table `balas_diskusis`
--

CREATE TABLE `balas_diskusis` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `diskusi_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `balas_diskusis`
--

INSERT INTO `balas_diskusis` (`id`, `diskusi_id`, `user_id`, `body`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum numquam rem, maxime nulla sapiente eum ipsum totam cupiditate minus, magni iusto est magnam aperiam aspernatur omnis adipisci, libero cum tenetur minima necessitatibus delectus eos qui similique soluta. Animi velit hic dolore corporis! Vitae molestiae consectetur voluptate fugit cumque illo est?', '2025-01-18 07:06:03', '2025-01-18 07:06:03'),
(2, 1, 3, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum numquam rem, maxime nulla sapiente eum ipsum totam cupiditate minus, magni iusto est magnam aperiam aspernatur omnis adipisci, libero cum tenetur minima necessitatibus delectus eos qui similique soluta. Animi velit hic dolore corporis! Vitae molestiae consectetur voluptate fugit cumque illo est?', '2025-01-18 07:18:41', '2025-01-18 07:18:41'),
(3, 1, 3, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum numquam rem, maxime nulla sapiente eum ipsum totam cupiditate minus, magni iusto est magnam aperiam aspernatur omnis adipisci, libero cum tenetur minima necessitatibus delectus eos qui similique soluta. Animi velit hic dolore corporis! Vitae molestiae consectetur voluptate fugit cumque illo est?', '2025-01-18 07:18:52', '2025-01-18 07:18:52'),
(4, 2, 3, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum numquam rem, maxime nulla sapiente eum ipsum totam cupiditate minus, magni iusto est magnam aperiam aspernatur omnis adipisci, libero cum tenetur minima necessitatibus delectus eos qui similique soluta. Animi velit hic dolore corporis! Vitae molestiae consectetur voluptate fugit cumque illo est?', '2025-01-18 07:23:40', '2025-01-18 07:23:40');

-- --------------------------------------------------------

--
-- Table structure for table `benefits`
--

CREATE TABLE `benefits` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `benefits`
--

INSERT INTO `benefits` (`id`, `name`, `created_at`, `updated_at`) VALUES
(2, 'Akses selamanya', '2025-01-06 03:00:31', '2025-01-06 03:00:31'),
(3, 'Fleksibilitas Waktu', '2025-01-06 03:12:37', '2025-01-06 03:12:37'),
(4, 'Pelatihan Berkelanjutan', '2025-01-06 03:12:45', '2025-01-06 03:12:45');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Laravel', 'laravel', 'image-upload-server/01JGWSGD679DJMAXMDVX6Q4XGP.svg', '2025-01-06 03:11:03', '2025-01-06 03:11:03'),
(2, 'Flutter', 'flutter', 'image-upload-server/01JGWSGWEJ5E3S6FNER9SX269N.svg', '2025-01-06 03:11:19', '2025-01-06 03:11:19'),
(3, 'React', 'react', 'image-upload-server/01JGWSHB1E5AZCNQ2CWH5YP9SX.svg', '2025-01-06 03:11:34', '2025-01-06 03:11:34');

-- --------------------------------------------------------

--
-- Table structure for table `diskusis`
--

CREATE TABLE `diskusis` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `kelas_id` bigint(20) UNSIGNED NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `diskusis`
--

INSERT INTO `diskusis` (`id`, `user_id`, `kelas_id`, `subject`, `title`, `body`, `image`, `created_at`, `updated_at`) VALUES
(1, 3, 3, 'PNATlap', 'PNATlap', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum numquam rem, maxime nulla sapiente eum ipsum totam cupiditate minus, magni iusto est magnam aperiam aspernatur omnis adipisci, libero cum tenetur minima necessitatibus delectus eos qui similique soluta. Animi velit hic dolore corporis! Vitae molestiae consectetur voluptate fugit cumque illo est?', NULL, '2025-01-18 05:12:55', '2025-01-18 05:12:55'),
(2, 3, 3, 'tidak bisa instal pnet lab', 'tidak bisa instal pnet lab', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum numquam rem, maxime nulla sapiente eum ipsum totam cupiditate minus, magni iusto est magnam aperiam aspernatur omnis adipisci, libero cum tenetur minima necessitatibus delectus eos qui similique soluta. Animi velit hic dolore corporis! Vitae molestiae consectetur voluptate fugit cumque illo est?', 'images/tw5ttsgR1SszHFodbagMcVwGwutlWFA1YB0jB4yk.jpg', '2025-01-18 05:22:51', '2025-01-18 05:22:51'),
(3, 3, 3, 'Form Store the new Virtual Machine kosong', 'Form Store the new Virtual Machine kosong', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum numquam rem, maxime nulla sapiente eum ipsum totam cupiditate minus, magni iusto est magnam aperiam aspernatur omnis adipisci, libero cum tenetur minima necessitatibus delectus eos qui similique soluta. Animi velit hic dolore corporis! Vitae molestiae consectetur voluptate fugit cumque illo est?', 'images/Q9CCuQz4oTqzolKYBucvhs3ApldwtbmPFsVC4nxp.jpg', '2025-01-18 05:23:16', '2025-01-18 05:23:16'),
(4, 3, 3, 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet consectetur adipisicing.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati culpa temporibus, hic libero mollitia eius voluptates quaerat cupiditate ad deleniti.', 'images/0gxRbKugMIewUNXzqfOrSnpWYmJvUvxxXIOljnLi.jpg', '2025-01-18 06:12:24', '2025-01-18 06:12:24');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `question` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `question`, `answer`, `created_at`, `updated_at`) VALUES
(1, 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, doloribus.', '2025-01-03 21:20:03', '2025-01-03 21:20:03'),
(2, 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, doloribus.', '2025-01-03 21:20:08', '2025-01-03 21:20:08'),
(3, 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, doloribus.', '2025-01-03 21:20:13', '2025-01-03 21:20:13');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `level_id` bigint(20) UNSIGNED NOT NULL,
  `type_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) NOT NULL DEFAULT '0',
  `description` text COLLATE utf8mb4_unicode_ci,
  `body` text COLLATE utf8mb4_unicode_ci,
  `benefit` text COLLATE utf8mb4_unicode_ci,
  `link_overview` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `views` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`id`, `level_id`, `type_id`, `category_id`, `user_id`, `title`, `slug`, `price`, `discount`, `description`, `body`, `benefit`, `link_overview`, `image`, `status`, `views`, `created_at`, `updated_at`) VALUES
(3, 1, 1, 1, 2, 'Kursus Komputer Dasar Anak SMP ', 'kursus-komputer-dasar-anak-smp', 150000, 50000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam obcaecati nisi quo, quam reprehenderit mollitia!', '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora iusto quidem inventore eveniet earum fuga, neque voluptate consectetur excepturi animi. Nobis ducimus quibusdam at reprehenderit ab nesciunt laudantium aliquid fugiat, architecto autem temporibus, possimus asperiores incidunt amet sint. Impedit, aspernatur? Architecto aut nobis recusandae totam, et iste quaerat sunt odit sit cum? Quo doloribus recusandae non dicta sapiente eos perspiciatis perferendis explicabo et veritatis? Perferendis quasi quia consequuntur quaerat ipsum doloribus accusamus, quis ab voluptatum quod officiis soluta sed placeat, dolor numquam sunt sequi sint reprehenderit blanditiis, dicta deleniti facere neque at? Harum provident dicta, illo odio minima omnis atque?</p>', '[\"Akses selamanya\",\"Fleksibilitas Waktu\",\"Pelatihan Berkelanjutan\"]', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=5soixb2U6xM&list=RDs1QCL9AGbO0&index=5\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/5soixb2U6xM?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', 'image-upload-server/01JHERAYSR2VNYJ1RQKD48N1K2.jpg', 'disetujui', 100, '2025-01-06 18:00:08', '2025-02-01 02:23:59'),
(4, 3, 1, 2, 2, 'Kursus Video Editing dan Photography Pemula', 'kursus-video-editing-dan-photography-pemula', 100000, 20000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam obcaecati nisi quo, quam reprehenderit mollitia!\n', '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora iusto quidem inventore eveniet earum fuga, neque voluptate consectetur excepturi animi. Nobis ducimus quibusdam at reprehenderit ab nesciunt laudantium aliquid fugiat, architecto autem temporibus, possimus asperiores incidunt amet sint. Impedit, aspernatur? Architecto aut nobis recusandae totam, et iste quaerat sunt odit sit cum? Quo doloribus recusandae non dicta sapiente eos perspiciatis perferendis explicabo et veritatis? Perferendis quasi quia consequuntur quaerat ipsum doloribus accusamus, quis ab voluptatum quod officiis soluta sed placeat, dolor numquam sunt sequi sint reprehenderit blanditiis, dicta deleniti facere neque at? Harum provident dicta, illo odio minima omnis atque?</p>', '[\"Akses selamanya\",\"Fleksibilitas Waktu\",\"Pelatihan Berkelanjutan\"]', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=pZ31pyTZdh0&list=RD4LZgEZ2zOaY&index=2\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/pZ31pyTZdh0?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', 'image-upload-server/01JHBV30D1BJT6Q44XYG2D386Z.jpg', 'disetujui', 25, '2025-01-09 10:47:29', '2025-01-20 22:49:41'),
(5, 2, 2, 3, 2, 'Kursus Komputer Dasar Anak SD', 'kursus-komputer-dasar-anak-sd', 100000, 0, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam obcaecati nisi quo, quam reprehenderit mollitia!', '<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt, nam cum? Totam aliquam fugit nihil reiciendis. Nam obcaecati, repellat harum perferendis ipsum voluptates architecto provident accusantium aliquid quisquam officiis beatae debitis autem minima, repudiandae quas inventore labore veritatis fugit maxime reiciendis quos. Blanditiis quos provident quasi aperiam natus neque eius, nesciunt quae obcaecati quia animi eligendi tenetur earum iste sunt consectetur iusto quaerat fuga praesentium repellat. Voluptatem commodi nam ex eveniet aperiam explicabo unde autem accusamus sed nemo quasi debitis nesciunt corrupti, qui eum quas cum soluta voluptatum? Dolorem iure architecto earum eaque eveniet neque modi quas qui voluptatem itaque.</p>', '[\"Akses selamanya\",\"Pelatihan Berkelanjutan\",\"Fleksibilitas Waktu\"]', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=sElE_BfQ67s&list=RD4LZgEZ2zOaY&index=3\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/sElE_BfQ67s?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', 'image-upload-server/01JHBV3JXX9BQRNVYVHT5FYNQR.jpg', 'disetujui', 47, '2025-01-09 11:01:32', '2025-02-03 05:05:05');

-- --------------------------------------------------------

--
-- Table structure for table `levels`
--

CREATE TABLE `levels` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `levels`
--

INSERT INTO `levels` (`id`, `name`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Pemula', 'image-upload-server/01JHBP0RYS2SGBCAYG3P8MMFGD.svg', '2025-01-03 23:02:08', '2025-01-11 21:58:42'),
(2, 'Menengah', 'image-upload-server/01JHBP183FZ8FEM7B9HRH55QYC.svg', '2025-01-06 03:10:13', '2025-01-11 21:58:57'),
(3, 'Expert', 'image-upload-server/01JHBP1MCVEZW31FES0G7HND7A.svg', '2025-01-06 03:10:27', '2025-01-11 21:59:10');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
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
(36, '2025_02_04_085116_create_jobs_table', 21);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_id` bigint(20) UNSIGNED NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `promo_codes`
--

CREATE TABLE `promo_codes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` int(11) NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `promo_codes`
--

INSERT INTO `promo_codes` (`id`, `code`, `discount`, `status`, `created_at`, `updated_at`) VALUES
(1, '2EZ4', 20000, 'active', '2025-01-16 01:02:54', '2025-01-16 01:02:54');

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kelas_id` bigint(20) UNSIGNED NOT NULL,
  `question` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `quizzes`
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
-- Table structure for table `quiz_answers`
--

CREATE TABLE `quiz_answers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quiz_id` bigint(20) UNSIGNED NOT NULL,
  `answer` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `point` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `quiz_answers`
--

INSERT INTO `quiz_answers` (`id`, `quiz_id`, `answer`, `point`, `created_at`, `updated_at`) VALUES
(17, 5, 'tester', 10, '2025-01-09 10:47:30', '2025-01-09 10:47:30'),
(18, 5, 'tester', 0, '2025-01-09 10:47:30', '2025-01-09 10:47:30'),
(19, 6, 'test', 10, '2025-01-09 11:01:32', '2025-01-09 11:01:32'),
(20, 6, 'test', 0, '2025-01-09 11:01:32', '2025-01-09 11:01:32'),
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
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kelas_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_video` int(11) DEFAULT NULL,
  `total_duration` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sections`
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
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0cM2UlMBIBpD25RV8LH57lF4iKLZM7JXGzhYYpwX', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQnpUVUNpWHU4YU94NGxxOXpWSGxIdVhrTGFxQmt6S25tRVdxZHdXaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zZW5kRW1haWwiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1738633202),
('3BdmfLfaYON5P0RjC9NhP7oIbygL7wMdKZoXEDbm', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiQzh3VUlXM05ib1g5SGo3UzltNHpRM2JOcXl0RXlmYUlkdXRoN1Q4SSI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czozODoiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FkbWluL3RyYW5zYWtzaXMiO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozODoiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FkbWluL3RyYW5zYWtzaXMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1738577992),
('arUk3BdjgMSO1fcuZlCXn7HTa1dbx4cDniP98f9h', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiVVBDVGRjR2hzWjhrTENYeDNkc2RLRFgyQ3B4QU0xVlRaSmN0S0RBMSI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czozODoiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FkbWluL3RyYW5zYWtzaXMiO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozMzoiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FkbWluL2xvZ2luIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1738584820),
('fYyCqTHywpu8jweljc1YFCEM6gTBVsOKuyPeklfA', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiSVVwN21zUHBwVUpCWFdBYnhpdjI5V20yMUZrb0E5NEVSSHBQc1hpZyI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czozNjoiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2Rhc2hib2FyZC9ob21lIjt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9tYXN1ayI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1738584820),
('GdOrYQ67IcZauoITdIox6zRm4fWxOJ2kbYl43NuV', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ0ZQME1OdXFwTkRJMjJvQjl2RmZnS3NJdXB0SGxXUTR2QXBlSHc5aiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fX0=', 1738638171),
('JEBHkRS0dSye8KZZ1fu5Hkc3nHvZzKIJwhe32xN0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoieWk5YmVzakx2ZmMwZng5UjlFQ0VsUUNVOU1nM2pQN3E2aTVaTW1kciI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czozNjoiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2Rhc2hib2FyZC9ob21lIjt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYXNoYm9hcmQvaG9tZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1738577992),
('MTKxPeYEfPccfpJuPy7Y6CpFGJl9viMW5jGxZN8M', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36', 'YTo2OntzOjY6Il90b2tlbiI7czo0MDoiajQxWWM4YmJ4enZKbW05OHNLaTUzbHNFMXpSYkRtR0tIek5OWk1vYiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7czoxNzoicGFzc3dvcmRfaGFzaF93ZWIiO3M6NjA6IiQyeSQxMiRBNnV6SDBMT0oxMTdMblo1YUt2ejcuY1BTbnJuTFpmTXA3VWxSMFF4bjhJYlVid1M5N3o1MiI7czoxNzoiRGFzaGJvYXJkX2ZpbHRlcnMiO2E6Mjp7czo5OiJzdGFydERhdGUiO047czo3OiJlbmREYXRlIjtOO319', 1738638291);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `site_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keyword` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `yt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ig` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fb` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `long_logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `heading` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `site_name`, `keyword`, `email`, `address`, `phone`, `description`, `yt`, `ig`, `fb`, `logo`, `long_logo`, `thumbnail`, `heading`, `created_at`, `updated_at`) VALUES
(1, 'Ananta Course', 'Ananta Course', 'ananta@gmail.com', 'Jl. Kusanegara No 16A, Gunaksa, Klungkung Bali, Indonesia', '6285175367788', 'Belajar dengan kecepatanmu sendiri dan capai tujuan karirmu melalui kursus online yang efisien.', 'https://github.com/muhammad-febriansyah', 'https://github.com/muhammad-febriansyah', 'https://github.com/muhammad-febriansyah', 'image-upload-server/01JGVHH0MGP1VCPNRNWYND3KCA.png', 'image-upload-server/01JJZNFQZEFRRMB8HW1RYKF2HR.svg', 'image-upload-server/01JH95PZ43K1YT2ZFZCJNTAXM2.jpg', 'Jadi Expert IT cuma 100rb-an! ', '2025-01-03 20:52:51', '2025-02-01 02:29:55');

-- --------------------------------------------------------

--
-- Table structure for table `testimonis`
--

CREATE TABLE `testimonis` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kelas_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `rating` int(11) NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `testimonis`
--

INSERT INTO `testimonis` (`id`, `kelas_id`, `user_id`, `rating`, `body`, `created_at`, `updated_at`) VALUES
(1, 3, 3, 5, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, delectus?\r\n', '2025-01-18 02:54:37', '2025-01-18 02:54:37'),
(2, 3, 3, 3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, delectus?\r\n', '2025-01-18 03:01:02', '2025-01-18 03:01:02'),
(3, 3, 3, 1, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, delectus?\r\n', '2025-01-18 03:01:34', '2025-01-18 03:01:34');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `kelas_id` bigint(20) UNSIGNED NOT NULL,
  `invoice_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_method` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `kelas_id`, `invoice_number`, `payment_method`, `payment_url`, `amount`, `status`, `image`, `created_at`, `updated_at`) VALUES
(3, 3, 3, 'COURSE1737059003', 'midtrans', 'https://app.sandbox.midtrans.com/snap/v4/redirection/2afcc50a-aedd-4808-901f-8c7447a92a17', '130000', 'paid', NULL, '2025-01-16 20:23:23', '2025-01-16 20:25:40');

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Premium', 'premium', '2025-01-06 03:11:49', '2025-01-06 03:11:49'),
(2, 'Gratis', 'gratis', '2025-01-06 03:12:07', '2025-01-06 03:12:07');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tempat_lahir` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `umur` int(11) DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jk` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci,
  `status` int(11) NOT NULL DEFAULT '0',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `tempat_lahir`, `tanggal_lahir`, `umur`, `phone`, `alamat`, `jk`, `role`, `bio`, `status`, `image`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 'admin@admin.com', '$2y$12$A6uzH0LOJ117LnZ5aKvz7.cPSnrnLZfMp7UlR0Qxn8IbUbwS97z52', NULL, NULL, NULL, NULL, NULL, NULL, 'admin', NULL, 1, 'image-upload-server/01JGWXEJFFEANDN9Y66RWBCSDT.svg', NULL, '2025-01-03 13:37:38', '2025-01-06 04:19:58'),
(2, 'Carl Jonhson', 'mentor@mentor.com', '$2y$12$9nXTeiRuPetpQgO.MNfs9O7fXky55D5gWHaZHLaoMYv.fdTmEWmUK', 'Indonesia', '2002-02-27', 22, '081295916567', 'Jambi', 'Laki-laki', 'mentor', '<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque, repellat! Culpa officiis eum aspernatur repellat quos itaque ipsum voluptatem libero.</p>', 1, NULL, 'nPmFzUWCdxp09APtoRBpBeZZqxwnO8NArdKb8Lsw4IwIFi3XhZ2Nh6TY6d8U', '2025-01-06 03:16:16', '2025-01-06 04:13:20'),
(3, 'Muhammad Febriansyah', 'muhammadfebrian121@gmail.com', '$2y$12$VlKRDo97isp/vxN5JP8VgOxkUT052nT3suv7NN2dvCMgqBWhRhXS6', 'Indonesia', NULL, 0, '081295916567', 'Jambi\r\nBogor', 'Laki-laki', 'student', NULL, 1, 'profile/Su64JUdXWqpe5LYaOpSMVeBdU3JFEU5nOdimcSD2.svg', NULL, '2025-01-08 22:36:55', '2025-01-16 00:21:35'),
(4, 'Azril', 'azril@gmail.com', '$2y$12$RZ9AmljtLuu3.TkFIL.gDeGtpX4kuV0yUDSW/tonvi9IUr50WrjGu', 'Indonesia', NULL, 23, '081295916567', NULL, 'Laki-Laki', 'student', NULL, 1, NULL, NULL, '2025-01-16 20:33:28', '2025-01-16 20:33:28');

-- --------------------------------------------------------

--
-- Table structure for table `user_answers`
--

CREATE TABLE `user_answers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quiz_id` bigint(20) UNSIGNED NOT NULL,
  `quiz_answer_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `point` int(11) NOT NULL,
  `edit_count` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `section_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `section_id`, `title`, `url`, `duration`, `status`, `created_at`, `updated_at`) VALUES
(9, 5, 'Selamat datang', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=vn1z5mlzF-U&list=RDvn1z5mlzF-U&start_radio=1&rv=vn1z5mlzF-U\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/vn1z5mlzF-U?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', '5 menit', 1, '2025-01-06 18:00:08', '2025-01-24 03:06:55'),
(10, 5, 'Video 2', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=vn1z5mlzF-U&list=RDvn1z5mlzF-U&start_radio=1&rv=vn1z5mlzF-U\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/vn1z5mlzF-U?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', '5 menit', 0, '2025-01-06 18:00:08', '2025-01-21 01:32:13'),
(11, 6, 'Video 1', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=vn1z5mlzF-U&list=RDvn1z5mlzF-U&start_radio=1&rv=vn1z5mlzF-U\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/vn1z5mlzF-U?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', '5 menit', 0, '2025-01-06 18:00:08', '2025-01-21 01:32:16'),
(12, 6, 'Video 2', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=vn1z5mlzF-U&list=RDvn1z5mlzF-U&start_radio=1&rv=vn1z5mlzF-U\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/vn1z5mlzF-U?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', '5 menit', 0, '2025-01-06 18:00:08', '2025-01-21 01:32:17'),
(13, 7, 'Video 1', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=pZ31pyTZdh0&list=RD4LZgEZ2zOaY&index=2\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/pZ31pyTZdh0?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', '5 menit', 0, '2025-01-09 10:47:30', '2025-01-20 06:44:21'),
(14, 7, 'Video 2', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=pZ31pyTZdh0&list=RD4LZgEZ2zOaY&index=2\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/pZ31pyTZdh0?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', '5 menit', 0, '2025-01-09 10:47:30', '2025-01-09 10:47:30'),
(15, 8, 'Video 1', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=pZ31pyTZdh0&list=RD4LZgEZ2zOaY&index=2\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/pZ31pyTZdh0?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', '5 menit', 0, '2025-01-09 10:47:30', '2025-01-09 10:47:30'),
(16, 8, 'Video 2', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=pZ31pyTZdh0&list=RD4LZgEZ2zOaY&index=2\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/pZ31pyTZdh0?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', '5 menit', 0, '2025-01-09 10:47:30', '2025-01-09 10:47:30'),
(17, 9, 'Video 1', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=pZ31pyTZdh0&list=RD4LZgEZ2zOaY&index=2\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/pZ31pyTZdh0?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', '5 menit', 0, '2025-01-09 10:47:30', '2025-01-09 10:47:30'),
(18, 9, 'Video 2', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=pZ31pyTZdh0&list=RD4LZgEZ2zOaY&index=2\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/pZ31pyTZdh0?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', '5 menit', 0, '2025-01-09 10:47:30', '2025-01-09 10:47:30'),
(19, 10, 'Video 1', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=sElE_BfQ67s&list=RD4LZgEZ2zOaY&index=3\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/sElE_BfQ67s?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', '5 menit', 0, '2025-01-09 11:01:32', '2025-01-20 04:47:56'),
(20, 10, 'Video 2', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=sElE_BfQ67s&list=RD4LZgEZ2zOaY&index=3\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/sElE_BfQ67s?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', '5 menit', 0, '2025-01-09 11:01:32', '2025-01-09 11:01:32'),
(21, 11, 'Video 1', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=sElE_BfQ67s&list=RD4LZgEZ2zOaY&index=3\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/sElE_BfQ67s?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', '5 menit', 0, '2025-01-09 11:01:32', '2025-01-20 04:51:39'),
(22, 11, 'Video 2', '{\"url\":\"https:\\/\\/www.youtube.com\\/watch?v=sElE_BfQ67s&list=RD4LZgEZ2zOaY&index=3\",\"embed_url\":\"https:\\/\\/www.youtube.com\\/embed\\/sElE_BfQ67s?controls=1&start=0\",\"width\":\"16\",\"height\":\"9\",\"responsive\":true,\"options\":{\"controls\":\"1\",\"nocookie\":\"0\",\"start\":\"00:00:00\"}}', '5 menit', 0, '2025-01-09 11:01:32', '2025-01-09 11:01:32');

-- --------------------------------------------------------

--
-- Table structure for table `video_readers`
--

CREATE TABLE `video_readers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `video_id` bigint(20) UNSIGNED NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `section_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `video_readers`
--

INSERT INTO `video_readers` (`id`, `user_id`, `video_id`, `status`, `created_at`, `updated_at`, `section_id`) VALUES
(1, 3, 9, 1, '2025-01-24 03:06:55', '2025-01-24 03:06:55', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `abouts`
--
ALTER TABLE `abouts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `balas_diskusis`
--
ALTER TABLE `balas_diskusis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `balas_diskusis_diskusi_id_foreign` (`diskusi_id`),
  ADD KEY `balas_diskusis_user_id_foreign` (`user_id`);

--
-- Indexes for table `benefits`
--
ALTER TABLE `benefits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`);

--
-- Indexes for table `diskusis`
--
ALTER TABLE `diskusis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `diskusis_user_id_foreign` (`user_id`),
  ADD KEY `diskusis_kelas_id_foreign` (`kelas_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kelas_slug_unique` (`slug`),
  ADD KEY `kelas_category_id_foreign` (`category_id`),
  ADD KEY `kelas_user_id_foreign` (`user_id`);

--
-- Indexes for table `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `promo_codes`
--
ALTER TABLE `promo_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quizzes_kelas_id_foreign` (`kelas_id`);

--
-- Indexes for table `quiz_answers`
--
ALTER TABLE `quiz_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_answers_quiz_id_foreign` (`quiz_id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sections_kelas_id_foreign` (`kelas_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonis`
--
ALTER TABLE `testimonis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `testimonis_kelas_id_foreign` (`kelas_id`),
  ADD KEY `testimonis_user_id_foreign` (`user_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transactions_user_id_foreign` (`user_id`),
  ADD KEY `transactions_kelas_id_foreign` (`kelas_id`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `types_slug_unique` (`slug`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_answers`
--
ALTER TABLE `user_answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_answers_quiz_id_foreign` (`quiz_id`),
  ADD KEY `user_answers_quiz_answer_id_foreign` (`quiz_answer_id`),
  ADD KEY `user_answers_user_id_foreign` (`user_id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `videos_section_id_foreign` (`section_id`);

--
-- Indexes for table `video_readers`
--
ALTER TABLE `video_readers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `video_readers_user_id_foreign` (`user_id`),
  ADD KEY `video_readers_video_id_foreign` (`video_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `abouts`
--
ALTER TABLE `abouts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `balas_diskusis`
--
ALTER TABLE `balas_diskusis`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `benefits`
--
ALTER TABLE `benefits`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `diskusis`
--
ALTER TABLE `diskusis`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `levels`
--
ALTER TABLE `levels`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promo_codes`
--
ALTER TABLE `promo_codes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `quiz_answers`
--
ALTER TABLE `quiz_answers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `testimonis`
--
ALTER TABLE `testimonis`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_answers`
--
ALTER TABLE `user_answers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `video_readers`
--
ALTER TABLE `video_readers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `balas_diskusis`
--
ALTER TABLE `balas_diskusis`
  ADD CONSTRAINT `balas_diskusis_diskusi_id_foreign` FOREIGN KEY (`diskusi_id`) REFERENCES `diskusis` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `balas_diskusis_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `diskusis`
--
ALTER TABLE `diskusis`
  ADD CONSTRAINT `diskusis_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`),
  ADD CONSTRAINT `diskusis_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `kelas`
--
ALTER TABLE `kelas`
  ADD CONSTRAINT `kelas_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `kelas_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `quizzes_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `quiz_answers`
--
ALTER TABLE `quiz_answers`
  ADD CONSTRAINT `quiz_answers_quiz_id_foreign` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sections`
--
ALTER TABLE `sections`
  ADD CONSTRAINT `sections_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `testimonis`
--
ALTER TABLE `testimonis`
  ADD CONSTRAINT `testimonis_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `testimonis_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transactions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_answers`
--
ALTER TABLE `user_answers`
  ADD CONSTRAINT `user_answers_quiz_answer_id_foreign` FOREIGN KEY (`quiz_answer_id`) REFERENCES `quiz_answers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_answers_quiz_id_foreign` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_answers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_section_id_foreign` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `video_readers`
--
ALTER TABLE `video_readers`
  ADD CONSTRAINT `video_readers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `video_readers_video_id_foreign` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
