-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2022 at 06:28 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bsccl_billing`
--

-- --------------------------------------------------------

--
-- Table structure for table `circuit_categories`
--

CREATE TABLE `circuit_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `circuit_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_id` int(11) NOT NULL,
  `circuit_status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `circuit_categories`
--

INSERT INTO `circuit_categories` (`id`, `circuit_name`, `service_id`, `circuit_status`, `created_at`, `updated_at`) VALUES
(1, 'E1', 1, 1, NULL, NULL),
(2, 'DS3 (21 x E1/ 45 Mbps)', 1, 1, NULL, NULL),
(3, 'STM-1', 1, 1, NULL, NULL),
(4, 'STM-4', 1, 1, NULL, NULL),
(5, 'STM-16', 1, 1, NULL, NULL),
(6, '10G', 1, 1, NULL, NULL),
(7, '100 G', 1, 1, NULL, NULL),
(8, '1GB port', 2, 1, NULL, NULL),
(9, '10GB port', 2, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `com_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bin_vat_etc` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` tinyint(4) NOT NULL COMMENT '1=IIG, 2=ISP, 3=IGW, 4=Corporate/Others',
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `com_name`, `name`, `email`, `phone`, `bin_vat_etc`, `type`, `address`, `created_at`, `updated_at`) VALUES
(1, 'Test 333333', 'Muajjam hossain', 'admin2@gmail.com', '123450000', '40', 1, 'Dhanmondi', '2022-04-17 23:21:45', '2022-04-18 02:44:58'),
(2, 'Demo', 'Jaman', 'j@gmail.com', '1234567890', '30', 2, 'Dhaka', '2022-04-17 23:27:19', '2022-04-17 23:27:19'),
(3, 'Test 2', 'Test Khan', 't@gmail.com', '0987654321', '1232323', 3, 'Khulna', '2022-04-17 23:29:37', '2022-04-17 23:29:37'),
(4, 'Ratliff and Pate Associates', 'Patricia Henry', 'zexykym@mailinator.com', '31', 'Itaque occaecat eius', 3, 'Do aperiam dolor nes', '2022-04-18 00:27:49', '2022-04-18 04:00:35'),
(5, 'Hooper Baker LLC', 'Hedda Summers', 'kybudyg@mailinator.com', '967', '2990394940349', 1, 'Atque omnis sunt et', '2022-04-18 04:00:47', '2022-04-18 04:00:47'),
(6, 'Mahmud Khan', 'Nita Stephens', 'nybuvovuc@mailinator.com', '385', 'Eu dolores sint vel', 3, 'Commodo pariatur Si', '2022-04-24 00:38:26', '2022-04-24 00:38:26'),
(7, 'Summit', 'Fahim', 'gcshg@gmail.com', '01563225533', '24552314', 1, 'Dhaka', '2022-05-11 01:42:33', '2022-05-11 01:42:33');

-- --------------------------------------------------------

--
-- Table structure for table `customer_types`
--

CREATE TABLE `customer_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cus_type_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer_types`
--

INSERT INTO `customer_types` (`id`, `cus_type_name`, `service_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'IIG', 1, 1, '2022-05-22 03:57:39', '2022-05-22 03:57:39'),
(2, 'IGW', 1, 1, '2022-05-22 03:57:49', '2022-05-22 03:57:49'),
(3, 'ISP', 1, 1, '2022-05-22 03:57:57', '2022-05-22 03:57:57'),
(4, 'IIG-IP Transit', 7, 1, '2022-05-23 03:17:25', '2022-05-23 03:17:25');

-- --------------------------------------------------------

--
-- Table structure for table `demand_notes`
--

CREATE TABLE `demand_notes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `report_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `sub_service_id` int(11) NOT NULL,
  `capacity_id` int(11) NOT NULL,
  `grp_or_zone` int(11) NOT NULL,
  `circuit_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `max` int(11) NOT NULL,
  `approval_status` int(11) NOT NULL DEFAULT 1,
  `mrc` double NOT NULL,
  `add_sub` int(11) DEFAULT NULL,
  `remarks` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `charge` double NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `specialDiscount` int(11) DEFAULT NULL,
  `deposit` int(11) NOT NULL,
  `reference` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approved_date` date DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `demand_notes`
--

INSERT INTO `demand_notes` (`id`, `report_id`, `customer_id`, `service_id`, `sub_service_id`, `capacity_id`, `grp_or_zone`, `circuit_id`, `qty`, `max`, `approval_status`, `mrc`, `add_sub`, `remarks`, `charge`, `discount`, `specialDiscount`, `deposit`, `reference`, `approved_date`, `status`, `created_at`, `updated_at`) VALUES
(1, NULL, 2, 1, 105, 428, 696, 4, 1, 0, 1, 450000, 2, 'test', 450000, 5, 100, 450000, NULL, NULL, 1, '2022-05-23 00:27:04', '2022-05-23 00:27:04');

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
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `group_or_zones`
--

CREATE TABLE `group_or_zones` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sub_service_id` bigint(20) UNSIGNED NOT NULL,
  `capacity_id` bigint(20) UNSIGNED NOT NULL,
  `grp_or_zone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `charge` decimal(15,2) NOT NULL DEFAULT 0.00,
  `vat` int(11) NOT NULL DEFAULT 0,
  `circuit_id` int(11) NOT NULL DEFAULT 0,
  `max` int(11) NOT NULL DEFAULT 0,
  `instl_charge` float NOT NULL DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `group_or_zones`
--

INSERT INTO `group_or_zones` (`id`, `sub_service_id`, `capacity_id`, `grp_or_zone`, `charge`, `vat`, `circuit_id`, `max`, `instl_charge`, `status`, `created_at`, `updated_at`) VALUES
(569, 106, 365, '1', '0.00', 0, 1, 0, 0, 1, '2022-05-19 04:45:33', '2022-05-19 04:45:33'),
(570, 106, 365, '2', '0.00', 0, 1, 0, 0, 1, '2022-05-19 04:45:33', '2022-05-19 04:45:33'),
(571, 106, 365, '3', '0.00', 0, 1, 0, 0, 1, '2022-05-19 04:45:33', '2022-05-19 04:45:33'),
(690, 105, 425, 'Equinix', '15000.00', 2, 1, 0, 10000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(691, 105, 425, 'Marseilles', '15000.00', 5, 1, 0, 10000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(692, 105, 426, 'Equinix', '75000.00', 5, 2, 0, 30000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(693, 105, 426, 'Marseilles', '75000.00', 5, 2, 0, 30000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(694, 105, 427, 'Equinix', '150000.00', 5, 3, 0, 50000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(695, 105, 427, 'Marseilles', '150000.00', 5, 3, 0, 50000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(696, 105, 428, 'Equinix', '450000.00', 5, 4, 0, 100000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(697, 105, 428, 'Marseilles', '450000.00', 5, 4, 0, 100000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(698, 105, 429, 'Equinix', '800000.00', 5, 5, 3, 250000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(699, 105, 429, 'Marseilles', '800000.00', 5, 5, 3, 250000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(700, 105, 430, 'Equinix', '700000.00', 5, 5, 5, 90000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(701, 105, 430, 'Marseilles', '700000.00', 5, 5, 5, 90000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(702, 105, 431, 'Equinix', '650000.00', 5, 5, 10, 80000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(703, 105, 431, 'Marseilles', '650000.00', 5, 5, 10, 80000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(704, 105, 432, 'Equinix', '575000.00', 5, 5, 15, 60000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(705, 105, 432, 'Marseilles', '575000.00', 5, 5, 15, 60000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(706, 105, 433, 'Equinix', '550000.00', 5, 5, 20, 50000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(707, 105, 433, 'Marseilles', '550000.00', 5, 5, 20, 50000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(708, 105, 434, 'Equinix', '2700000.00', 5, 6, 5, 10000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(709, 105, 434, 'Marseilles', '2700000.00', 5, 6, 5, 10000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(710, 105, 435, 'Equinix', '2300000.00', 5, 6, 10, 300000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(711, 105, 435, 'Marseilles', '2300000.00', 5, 6, 10, 300000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(712, 105, 436, 'Equinix', '250000.00', 5, 6, 15, 250000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(713, 105, 436, 'Marseilles', '250000.00', 5, 6, 15, 250000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(714, 105, 437, 'Equinix', '2200000.00', 5, 6, 20, 225000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(715, 105, 437, 'Marseilles', '2200000.00', 5, 6, 20, 225000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(716, 105, 438, 'Equinix', '2150000.00', 5, 6, 25, 20000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(717, 105, 438, 'Marseilles', '2150000.00', 5, 6, 25, 20000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(718, 105, 439, 'Equinix', '2100000.00', 5, 6, 30, 30000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(719, 105, 439, 'Marseilles', '2100000.00', 5, 6, 30, 30000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(720, 105, 440, 'Equinix', '2050000.00', 5, 6, 35, 40000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(721, 105, 440, 'Marseilles', '2050000.00', 5, 6, 35, 40000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(722, 105, 441, 'Equinix', '2000000.00', 5, 6, 40, 50000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(723, 105, 441, 'Marseilles', '2000000.00', 5, 6, 40, 50000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(724, 105, 442, 'Equinix', '23000000.00', 5, 7, 100, 2500000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(725, 105, 442, 'Marseilles', '23000000.00', 5, 7, 100, 2500000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(726, 105, 443, 'Equinix', '20000000.00', 5, 7, 200, 2100000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(727, 105, 443, 'Marseilles', '20000000.00', 5, 7, 200, 2100000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(728, 105, 444, 'Equinix', '19000000.00', 5, 7, 300, 1800000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(729, 105, 444, 'Marseilles', '19000000.00', 5, 7, 300, 1800000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(730, 105, 445, 'Equinix', '18000000.00', 5, 7, 400, 1500000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(731, 105, 445, 'Marseilles', '18000000.00', 5, 7, 400, 1500000, 1, '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(740, 107, 448, 'Dhaka', '415.00', 5, 8, 0, 0, 1, '2022-05-23 01:01:26', '2022-05-23 01:01:26'),
(741, 107, 448, 'Chittagong', '395.00', 5, 8, 0, 0, 1, '2022-05-23 01:01:26', '2022-05-23 01:01:26'),
(742, 107, 448, 'Cox\'s Bazar', '362.00', 5, 8, 0, 0, 1, '2022-05-23 01:01:26', '2022-05-23 01:01:26'),
(743, 107, 448, 'Kuakata', '367.00', 5, 8, 0, 0, 1, '2022-05-23 01:01:26', '2022-05-23 01:01:26'),
(760, 108, 453, 'Dhaka', '425.00', 5, 8, 0, 0, 1, '2022-05-23 01:07:20', '2022-05-23 01:07:20'),
(761, 108, 453, 'Chittagong', '405.00', 5, 8, 0, 0, 1, '2022-05-23 01:07:20', '2022-05-23 01:07:20'),
(762, 108, 453, 'Cox\'s Bazar', '372.00', 5, 8, 0, 0, 1, '2022-05-23 01:07:20', '2022-05-23 01:07:20'),
(763, 108, 453, 'Kuakata', '392.00', 5, 8, 0, 0, 1, '2022-05-23 01:07:20', '2022-05-23 01:07:20'),
(764, 108, 454, 'Dhaka', '387.00', 5, 8, 0, 0, 1, '2022-05-23 01:07:20', '2022-05-23 01:07:20'),
(765, 108, 454, 'Chittagong', '420.00', 5, 8, 0, 0, 1, '2022-05-23 01:07:20', '2022-05-23 01:07:20'),
(766, 108, 454, 'Cox\'s Bazar', '400.00', 5, 8, 0, 0, 1, '2022-05-23 01:07:20', '2022-05-23 01:07:20'),
(767, 108, 454, 'Kuakata', '367.00', 5, 8, 0, 0, 1, '2022-05-23 01:07:20', '2022-05-23 01:07:20');

-- --------------------------------------------------------

--
-- Table structure for table `landing_stations`
--

CREATE TABLE `landing_stations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `country_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group` enum('group_A','group_B','group_C') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `landing_stations`
--

INSERT INTO `landing_stations` (`id`, `country_name`, `group`, `created_at`, `updated_at`) VALUES
(1, 'Singapore', 'group_A', '2022-05-18 04:01:08', '2022-05-18 04:01:08'),
(2, 'Singapore', 'group_A', '2022-05-18 04:01:29', '2022-05-18 04:04:56'),
(3, 'Malaysia', 'group_A', '2022-05-18 04:02:44', '2022-05-18 04:02:44'),
(4, 'Thailand', 'group_A', '2022-05-18 04:03:06', '2022-05-18 04:03:06'),
(5, 'Srilanka', 'group_A', '2022-05-18 04:03:28', '2022-05-18 04:03:28'),
(6, 'India', 'group_A', '2022-05-18 04:03:42', '2022-05-18 04:03:42'),
(7, 'Pakistan', 'group_B', '2022-05-18 04:32:06', '2022-05-18 04:32:06');

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED DEFAULT NULL,
  `menu_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `m_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `role_id`, `menu_name`, `m_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Users', '1', 1, '2022-03-27 03:48:53', '2022-03-27 03:48:53'),
(2, 1, 'Services', '1', 1, '2022-03-27 03:48:53', '2022-03-27 03:48:53'),
(3, 2, 'Users', '1', 1, '2022-03-27 03:58:54', '2022-03-27 03:58:54'),
(4, 2, 'Services', '1', 1, '2022-03-27 03:58:54', '2022-03-27 03:58:54');

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
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_03_22_105113_create_roles_table', 2),
(6, '2022_03_22_111611_create_menus_table', 2),
(7, '2022_03_22_111700_create_permissions_table', 2),
(8, '2022_03_28_072730_create_services_table', 3),
(9, '2022_03_28_072924_create_sub_services_table', 3),
(13, '2022_03_29_093229_create_tariff_capacities_table', 4),
(15, '2022_04_13_053619_create_group_or_zones_table', 5),
(16, '2022_04_18_033918_create_customers_table', 6),
(22, '2022_04_28_065146_create_landing_stations_table', 8),
(23, '2022_05_12_062159_create_circuit_categories_table', 8),
(26, '2022_05_16_104816_create_customer_types_table', 10),
(30, '2022_04_20_043144_create_demand_notes_table', 11);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED DEFAULT NULL,
  `menu_id` bigint(20) UNSIGNED NOT NULL,
  `create` int(11) DEFAULT NULL,
  `edit` int(11) DEFAULT NULL,
  `delete` int(11) DEFAULT NULL,
  `update` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `role_id`, `menu_id`, `create`, `edit`, `delete`, `update`, `status`, `created_at`, `updated_at`) VALUES
(1, NULL, 1, 1, 1, NULL, NULL, 1, '2022-03-27 03:48:53', '2022-03-27 03:48:53'),
(2, NULL, 2, 1, NULL, 1, NULL, 1, '2022-03-27 03:48:53', '2022-03-27 03:48:53'),
(3, NULL, 3, 1, 1, 1, 1, 1, '2022-03-27 03:58:54', '2022-03-27 03:58:54'),
(4, NULL, 4, 1, 1, 1, 1, 1, '2022-03-27 03:58:54', '2022-03-27 03:58:54');

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
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 1, '2022-03-27 03:48:53', '2022-03-27 03:48:53'),
(2, 'Super Admin', 1, '2022-03-27 03:58:54', '2022-03-27 03:58:54');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `service` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service`, `status`, `created_at`, `updated_at`) VALUES
(1, 'IPLC', '1', '2022-03-28 02:13:52', '2022-05-23 00:20:30'),
(7, 'IP Transit', '1', '2022-03-30 04:57:46', '2022-05-23 01:07:20'),
(13, 'COLOCATION SERVICE', '1', '2022-04-09 21:33:42', '2022-04-26 03:51:04');

-- --------------------------------------------------------

--
-- Table structure for table `sub_services`
--

CREATE TABLE `sub_services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `sub_service_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sub_services`
--

INSERT INTO `sub_services` (`id`, `service_id`, `sub_service_name`, `status`, `created_at`, `updated_at`) VALUES
(105, 1, 'SMW - 5 ( IIG )', NULL, '2022-05-18 01:03:26', '2022-05-23 00:20:30'),
(106, 1, 'SMW-4 ( IIG )', NULL, '2022-05-19 00:54:39', '2022-05-19 04:45:33'),
(107, 7, 'IP Transit Rates for IIG', NULL, '2022-05-23 00:58:55', '2022-05-23 01:01:26'),
(108, 7, 'IP Transit Rates for ISP', NULL, '2022-05-23 01:05:18', '2022-05-23 01:07:20');

-- --------------------------------------------------------

--
-- Table structure for table `tariff_capacities`
--

CREATE TABLE `tariff_capacities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sub_service_id` bigint(20) UNSIGNED NOT NULL,
  `capacity_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `instl_charge` float NOT NULL DEFAULT 0,
  `max` int(11) NOT NULL DEFAULT 0,
  `circuit_id` int(11) NOT NULL DEFAULT 0,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tariff_capacities`
--

INSERT INTO `tariff_capacities` (`id`, `sub_service_id`, `capacity_name`, `instl_charge`, `max`, `circuit_id`, `status`, `created_at`, `updated_at`) VALUES
(365, 106, 'E1', 0, 0, 1, '1', '2022-05-19 04:45:33', '2022-05-19 04:45:33'),
(425, 105, 'E1', 10000, 0, 1, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(426, 105, 'DS3(21 x E1 / 45 Mbps)', 30000, 0, 2, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(427, 105, 'STM-1', 50000, 0, 3, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(428, 105, 'STM-4', 100000, 0, 4, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(429, 105, 'Each STM-16 upto 30G', 250000, 3, 5, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(430, 105, 'Each STM-16 above 30G (upto 50G)', 90000, 5, 5, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(431, 105, 'Each STM-16 above 50G (upto 100G)', 80000, 10, 5, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(432, 105, 'Each STM-16 above 150G (upto 200G)', 60000, 15, 5, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(433, 105, 'Each STM-16 above 200G', 50000, 20, 5, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(434, 105, 'Each 10G upto 50G', 10000, 5, 6, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(435, 105, 'Each 10G above 50G (upto 100G)', 300000, 10, 6, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(436, 105, 'Each 10G above 100G (upto 150G)', 250000, 15, 6, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(437, 105, 'Each 10G above 150G (upto 200G)', 225000, 20, 6, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(438, 105, 'Each 10G above 200G(Upto 250G)', 20000, 25, 6, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(439, 105, 'Each 10G above 250G(Upto 300G)', 30000, 30, 6, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(440, 105, 'Each 10G above 300G(Upto 350G)', 40000, 35, 6, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(441, 105, 'Each 10G above 350G', 50000, 40, 6, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(442, 105, 'Each 100g (100)', 2500000, 100, 7, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(443, 105, 'Each 100g (200)', 2100000, 200, 7, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(444, 105, 'Each 100g (300)', 1800000, 300, 7, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(445, 105, 'Each 100g (400)', 1500000, 400, 7, '1', '2022-05-23 00:20:30', '2022-05-23 00:20:30'),
(448, 107, '100 Mbps – 4999 Mbps', 0, 0, 8, '1', '2022-05-23 01:01:26', '2022-05-23 01:01:26'),
(453, 108, '100 Mbps – 4999 Mbps', 0, 0, 8, '1', '2022-05-23 01:07:20', '2022-05-23 01:07:20'),
(454, 108, '5000 Mbps - 9999 Mbps', 0, 0, 8, '1', '2022-05-23 01:07:20', '2022-05-23 01:07:20');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` tinyint(4) DEFAULT 1 COMMENT '1= Super Admin 2= Admin 3= User',
  `type` tinyint(4) DEFAULT NULL COMMENT '1=IPLC 2=IIG',
  `designation` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `address`, `role`, `type`, `designation`, `created_at`, `updated_at`) VALUES
(1, 'BSCCL', 'admin@admin.com', '012345680', '$2y$10$JQBxXX2RXvevhDus4bPTDe2skEg0so4zGrt2Bd6TU0UBOpoJAc3Hm', 'dhaka', 1, 2, 'COO', '2022-03-16 05:56:07', '2022-04-19 00:19:31'),
(2, 'Test', 'test@gmail.com', '0', '$2y$10$9Z4KDK3qwig2YC4wIspBw.myBe3baVQ7deI2vyt8qa/D85i44UK6e', 'dhaka', 1, 1, NULL, '2022-03-20 00:32:47', '2022-03-20 00:32:47'),
(3, 'User', 'user@user.com', '11111111', '$2y$10$.dMf7VTaCvTWQ4hBkabIzudbfulun4.k8ZVc/DzBQ8W0z6ZyXWDgu', 'dhaka', 1, 1, 'Admin', '2022-03-21 02:08:47', '2022-03-31 05:44:01'),
(8, 'Faisal', 'test@test.com', '9876543212', '$2y$10$4SueRh7iJfPWWbbdXYTLTeyVtaDps9gaeCyufZW/gKcwtQORCZ0.6', 'dhaka', 1, 2, NULL, '2022-03-21 05:11:13', '2022-03-21 05:11:13'),
(9, 'Jack', 'jack@jack.com', '9876543212', '$2y$10$/crTVO3zCPa/gYExKjAaMOHZ1gBhfNwxVq/tj9ywZvZkdt.OSeI.6', 'dhaka', 3, 2, NULL, '2022-03-21 05:11:13', '2022-03-21 05:11:13'),
(10, 'User IIG', 'admin@gmail.con', '12345678901', '$2y$10$ni/aoDD/UUn21Q5HNq2f/O77QmsgyM9UPjnQFma0K9JjhynL7v7La', 'dhaka', 2, 2, 'Admin', '2022-03-31 04:12:48', '2022-04-02 23:26:47'),
(11, 'demo', 'd@d.com', '12345680', '$2y$10$MrCVLkU.w4DTa4lKOf1ime0MzGNT7.5G/MJxG44gZf2q7x6Lub25C', 'Dhanmondi, Dhaka', 1, NULL, 'admin khan', '2022-04-18 03:59:22', '2022-04-19 00:12:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `circuit_categories`
--
ALTER TABLE `circuit_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_email_unique` (`email`);

--
-- Indexes for table `customer_types`
--
ALTER TABLE `customer_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_types_service_id_foreign` (`service_id`);

--
-- Indexes for table `demand_notes`
--
ALTER TABLE `demand_notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `group_or_zones`
--
ALTER TABLE `group_or_zones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_or_zones_sub_service_id_foreign` (`sub_service_id`),
  ADD KEY `group_or_zones_capacity_id_foreign` (`capacity_id`);

--
-- Indexes for table `landing_stations`
--
ALTER TABLE `landing_stations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menus_role_id_foreign` (`role_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `permissions_role_id_foreign` (`role_id`),
  ADD KEY `permissions_menu_id_foreign` (`menu_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_services`
--
ALTER TABLE `sub_services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sub_services_service_id_foreign` (`service_id`);

--
-- Indexes for table `tariff_capacities`
--
ALTER TABLE `tariff_capacities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tariff_capacities_sub_service_id_foreign` (`sub_service_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `circuit_categories`
--
ALTER TABLE `circuit_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `customer_types`
--
ALTER TABLE `customer_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `demand_notes`
--
ALTER TABLE `demand_notes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `group_or_zones`
--
ALTER TABLE `group_or_zones`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=768;

--
-- AUTO_INCREMENT for table `landing_stations`
--
ALTER TABLE `landing_stations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `sub_services`
--
ALTER TABLE `sub_services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `tariff_capacities`
--
ALTER TABLE `tariff_capacities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=455;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer_types`
--
ALTER TABLE `customer_types`
  ADD CONSTRAINT `customer_types_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`);

--
-- Constraints for table `group_or_zones`
--
ALTER TABLE `group_or_zones`
  ADD CONSTRAINT `group_or_zones_capacity_id_foreign` FOREIGN KEY (`capacity_id`) REFERENCES `tariff_capacities` (`id`),
  ADD CONSTRAINT `group_or_zones_sub_service_id_foreign` FOREIGN KEY (`sub_service_id`) REFERENCES `sub_services` (`id`);

--
-- Constraints for table `menus`
--
ALTER TABLE `menus`
  ADD CONSTRAINT `menus_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Constraints for table `permissions`
--
ALTER TABLE `permissions`
  ADD CONSTRAINT `permissions_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`),
  ADD CONSTRAINT `permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Constraints for table `sub_services`
--
ALTER TABLE `sub_services`
  ADD CONSTRAINT `sub_services_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`);

--
-- Constraints for table `tariff_capacities`
--
ALTER TABLE `tariff_capacities`
  ADD CONSTRAINT `tariff_capacities_sub_service_id_foreign` FOREIGN KEY (`sub_service_id`) REFERENCES `sub_services` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
