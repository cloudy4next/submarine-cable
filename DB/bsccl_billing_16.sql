-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 20, 2022 at 09:30 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

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
(8, 'IIG', 7, 1, NULL, NULL),
(9, 'ISP', 7, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `colocation_demand_notes`
--

CREATE TABLE `colocation_demand_notes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `sub_service_id` int(11) NOT NULL,
  `capacity_id` int(11) NOT NULL,
  `circuit_id` int(11) NOT NULL,
  `grp_or_zone` int(11) NOT NULL,
  `count_demand_note` int(11) NOT NULL,
  `qty` int(11) NOT NULL DEFAULT 1,
  `max` int(11) NOT NULL,
  `rack` int(11) NOT NULL,
  `rackQty` int(11) NOT NULL DEFAULT 1,
  `Power` int(11) NOT NULL,
  `PowerQty` int(11) NOT NULL DEFAULT 1,
  `approval_status` int(11) NOT NULL DEFAULT 1,
  `circuit_designation` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remarks` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `backhole_port` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mrc` double NOT NULL,
  `mrc2` double NOT NULL,
  `charge` double NOT NULL,
  `add_sub` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `specialDiscount` int(11) DEFAULT NULL,
  `deposit` int(11) NOT NULL,
  `approved_date` date DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `colocation_demand_notes`
--

INSERT INTO `colocation_demand_notes` (`id`, `customer_id`, `service_id`, `sub_service_id`, `capacity_id`, `circuit_id`, `grp_or_zone`, `count_demand_note`, `qty`, `max`, `rack`, `rackQty`, `Power`, `PowerQty`, `approval_status`, `circuit_designation`, `remarks`, `backhole_port`, `mrc`, `mrc2`, `charge`, `add_sub`, `discount`, `specialDiscount`, `deposit`, `approved_date`, `status`, `created_at`, `updated_at`) VALUES
(1, 48, 13, 109, 965, 4, 1762, 1, 1, 0, 6000, 2, 18000, 2, 2, 'Apple', 'test', '2', 25000, 73000, 25000, 2, 5, 100, 73000, '2022-07-06', 1, '2022-06-09 01:16:18', '2022-07-18 11:15:49'),
(2, 47, 13, 109, 967, 6, 1764, 1, 1, 1, 6000, 2, 18000, 3, 2, 'jdbsfkjwn', 'jebdwlekjfdl', 'hbhdblkwejlf', 180000, 246000, 180000, 2, 8, 1990, 246000, '2022-07-10', 1, '2022-06-09 01:24:57', '2022-07-17 10:09:41'),
(3, 43, 13, 109, 965, 4, 1762, 1, 1, 0, 40000, 2, 18000, 2, 2, 'aaa', 'test', '2', 25000, 141000, 25000, 1, 11, 222, 141000, '2022-07-13', 1, '2022-06-09 06:04:44', '2022-07-17 07:51:42');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `com_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_type_id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bin_vat_etc` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `com_name`, `name`, `customer_type_id`, `email`, `phone`, `bin_vat_etc`, `address`, `created_at`, `updated_at`) VALUES
(1, 'Mahmud Khan', 'Jaman', 2, 'jaman@gmail.com', '1234589', '3884', 'Dhaka', '2022-05-24 04:27:31', '2022-05-24 04:27:31'),
(2, 'Murad Khan', 'Kamal', 1, 'kamal@gmail.com', '0987654321', '23456', 'Nowakhali, Dhaka,', '2022-05-24 04:28:42', '2022-05-24 04:28:42'),
(3, 'BDHub Ltd.', 'BDHub Ltd.', 9, 'bdhubltd@gmail.com', '01356678990', '567', 'Dhaka, Bangladesh', '2022-05-29 08:29:22', '2022-07-18 08:38:44'),
(4, 'Equitel Communications Ltd', 'Equitel Communications Ltd', 4, 'equitelCommunicationsLtd@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 08:41:06', '2022-05-29 08:41:06'),
(5, 'Skytel Communications Ltd.', 'Skytel Communications Ltd.', 4, 'SkytelCommunicationsLtd@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 08:44:08', '2022-05-29 08:44:08'),
(6, 'Earth Telecommunication Ltd.', 'Earth Telecommunication Ltd.', 4, 'EarthTelecommunicationLtd@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 08:44:47', '2022-05-29 08:44:47'),
(7, 'Peerex Networks Ltd.', 'Peerex Networks Ltd.', 4, 'PeerexNetworksLtd@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 08:45:34', '2022-05-29 08:45:34'),
(8, 'Novocom Ltd', 'Novocom Ltd', 4, 'NovocomLtd@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 08:46:02', '2022-05-29 08:46:02'),
(9, 'Apple Communication Ltd', 'Apple Communication Ltd', 4, 'AppleCommunicationLtd@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 08:46:30', '2022-05-29 08:46:30'),
(10, 'Optimax Communication Ltd', 'Optimax Communication Ltd', 4, 'OptimaxCommunicationLtd@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 08:47:07', '2022-05-29 08:47:07'),
(11, 'Virgo Communications', 'Virgo Communications', 4, 'VirgoCommunications@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 08:47:34', '2022-05-29 08:47:34'),
(12, 'BSNL', 'BSNL', 4, 'BSNL@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 08:49:30', '2022-05-29 08:49:30'),
(13, 'Velocity Networks Ltd', 'Velocity Networks Ltd', 4, 'VelocityNetworksLtd@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 08:49:53', '2022-05-29 08:49:53'),
(14, 'Summit Communication Ltd', 'Summit Communication Ltd', 4, 'SummitCommunicationLtd@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 08:50:25', '2022-05-29 08:50:25'),
(19, 'Wind Stream Limited', 'Wind Stream Limited', 4, 'WindStreamLimited@gmail.com', '123', '0', '0', '2022-05-29 08:55:23', '2022-05-29 08:55:23'),
(21, 'Fiber@Home Ltd.', 'Fiber@Home Ltd.', 4, 'FiberHomeLtd@gmail.com', '123', '0', '0', '2022-05-29 08:56:52', '2022-05-29 08:56:52'),
(22, 'itel Limited', 'itel Limited', 4, 'itelLimited@gmail.com', '123', '0', '0', '2022-05-29 08:57:57', '2022-05-29 08:57:57'),
(26, 'ADN-Telecom Ltd.', 'ADN-Telecom Ltd.', 3, 'ADN-TelecomLtd@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:23:45', '2022-05-29 09:23:45'),
(27, 'Always On Networks', 'Always On Networks', 3, 'AlwaysOnNetworks@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:24:50', '2022-05-29 09:24:50'),
(28, 'Teletalk Bangladesh Ltd.', 'Teletalk Bangladesh Ltd.', 3, 'TeletalkBangladeshLtd@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:25:27', '2022-05-29 09:25:27'),
(29, 'Infocom Limited', 'Infocom Limited', 3, 'InfocomLimited@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:26:00', '2022-05-29 09:26:00'),
(30, 'Pioneer', 'Pioneer', 3, 'Pioneer@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:26:17', '2022-05-29 09:26:17'),
(31, 'Premium Connectivity Limited', 'Premium Connectivity Limited', 3, 'PremiumConnectivityLimited@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:26:53', '2022-05-29 09:26:53'),
(32, 'SS Online', 'SS Online', 3, 'SSOnline@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:27:14', '2022-05-29 09:27:14'),
(33, 'Kloud Technologies Limited.', 'Kloud Technologies Limited.', 3, 'KloudTechnologiesLimited.@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:27:40', '2022-05-29 09:27:40'),
(34, 'COX Link IT', 'COX Link IT', 3, 'COXLinkIT@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:28:02', '2022-05-29 09:28:02'),
(35, 'Chittagong Online Ltd.', 'Chittagong Online Ltd.', 3, 'ChittagongOnlineLtd.@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:28:36', '2022-05-29 09:28:36'),
(36, 'Fiber @ Home Global Ltd.', 'Fiber @ Home Global Ltd.', 1, 'FiberHomeGlobalLtd.@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:32:26', '2022-05-29 09:32:26'),
(37, 'Roots', 'Roots', 2, 'Roots@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:33:00', '2022-05-29 09:33:00'),
(38, 'HRC Technologies Limited', 'HRC Technologies Limited', 2, 'HRCTechnologiesLimited@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:33:34', '2022-05-29 09:33:34'),
(39, 'Aamra Technologies Limited', 'Aamra Technologies Limited', 1, 'AamraTechnologiesLimited@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:34:18', '2022-05-29 09:34:18'),
(40, 'BD Link Communication Ltd.', 'BD Link Communication Ltd.', 1, 'BDLinkCommunicationLtd.@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:35:01', '2022-05-29 09:35:01'),
(41, 'ADN International Gateway Ltd.', 'ADN International Gateway Ltd.', 1, 'ADNInternationalGatewayLtd.@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:35:32', '2022-05-29 09:35:32'),
(42, 'Summit', 'Summit', 1, 'Summit@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:36:02', '2022-05-29 09:36:02'),
(43, 'Level 3 Carrier Limited', 'Level 3 Carrier Limited', 1, 'Level3CarrierLimited@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:36:37', '2022-05-29 09:36:37'),
(44, 'Earth Telecommunications', 'Earth Telecommunications', 1, 'EarthTelecommunications@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:37:09', '2022-05-29 09:37:09'),
(45, 'BTCL', 'BTCL', 2, 'BTCL@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:50:01', '2022-05-29 09:50:01'),
(46, 'Peerex Networks Ltd.', 'Peerex Networks Ltd.', 1, 'PeerexNetworksLtd.@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:53:27', '2022-05-29 09:53:27'),
(47, 'Windstream Communication Ltd.', 'Windstream Communication Ltd.', 1, 'WindstreamCommunicationLtd.@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:55:20', '2022-05-29 09:55:20'),
(48, 'Apple Communication Ltd.', 'Apple Communication Ltd.', 1, 'AppleCommunicationLtd.@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:55:43', '2022-05-29 09:55:43'),
(49, 'Novocom Ltd.', 'Novocom Ltd.', 9, 'NovocomLtd.@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:56:58', '2022-06-08 03:47:33'),
(50, 'Virgo Communication Ltd.', 'Virgo Communication Ltd.', 8, 'VirgoCommunicationLtd.@gmail.com', '123', '0', 'Dhaka, Bangladesh', '2022-05-29 09:57:41', '2022-06-08 03:46:59'),
(51, 'Asif Hossain', 'Asif Hossain', 8, 'asif@gmail.com', '01726353421', '222', 'Dhaka, Bangladesh', '2022-07-17 08:55:17', '2022-07-18 08:34:18'),
(52, 'BSNL', 'BSNL', 9, 'bsnl@bsnl.com', '123', '123', 'Dhaka,Bangladesh', '2022-07-18 08:42:37', '2022-07-18 08:42:37');

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
(1, 'IIG (IPLC)', 1, 1, '2022-06-01 23:13:39', '2022-06-01 23:13:39'),
(2, 'IGW', 1, 1, '2022-06-01 23:13:48', '2022-06-01 23:15:05'),
(3, 'ITC', 1, 1, '2022-06-01 23:14:05', '2022-06-06 08:40:31'),
(4, 'Corporate', 1, 1, '2022-06-01 23:14:16', '2022-06-01 23:14:16'),
(8, 'ISP', 7, 1, '2022-06-01 23:15:41', '2022-06-01 23:15:41'),
(9, 'IIG (IPT)', 7, 1, '2022-06-01 23:15:50', '2022-06-01 23:15:50');

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
  `group_id` int(11) NOT NULL,
  `circuit_id` int(11) NOT NULL,
  `country` int(11) DEFAULT NULL,
  `qty` int(11) NOT NULL DEFAULT 1,
  `max` int(11) NOT NULL,
  `port` int(11) DEFAULT 0,
  `portqty` int(11) DEFAULT 1,
  `approval_status` int(11) NOT NULL DEFAULT 1,
  `circuit_designation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `backhole_port` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mrc` double NOT NULL,
  `add_sub` int(11) DEFAULT NULL,
  `remarks` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `charge` double NOT NULL,
  `count_demand_note` int(11) DEFAULT NULL,
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

INSERT INTO `demand_notes` (`id`, `report_id`, `customer_id`, `service_id`, `sub_service_id`, `capacity_id`, `grp_or_zone`, `group_id`, `circuit_id`, `country`, `qty`, `max`, `port`, `portqty`, `approval_status`, `circuit_designation`, `backhole_port`, `mrc`, `add_sub`, `remarks`, `charge`, `count_demand_note`, `discount`, `specialDiscount`, `deposit`, `reference`, `approved_date`, `status`, `created_at`, `updated_at`) VALUES
(20, NULL, 48, 1, 106, 1051, 1946, 3, 1, 1, 1, 0, NULL, NULL, 2, NULL, NULL, 5000, 2, 'test', 5000, 1, 12, 200, 5000, NULL, NULL, 1, '2022-06-14 06:01:20', '2022-06-14 06:01:20'),
(21, NULL, 48, 1, 106, 1051, 1947, 4, 1, 4, 1, 0, NULL, NULL, 2, 'dd', '1', 5500, 2, 'dd', 5500, 2, 15, 122, 5500, NULL, '2022-07-17', 1, '2022-06-14 06:02:00', '2022-07-16 23:15:48'),
(22, NULL, 49, 7, 107, 1041, 1907, 6, 9, NULL, 1000, 1000, 3, 10, 2, 'test', '10', 415000, 1, 'test', 415, 1, 5, 1000, 415000, NULL, '2022-06-15', 1, '2022-06-15 00:23:03', '2022-06-15 00:23:22'),
(23, NULL, 49, 7, 107, 1045, 1923, 6, 9, 0, 35353, 35353, 3, 5, 2, 'ta', 'ta', 11489725, 2, 'dd', 325, 2, 10, 100, 11489725, NULL, '2022-06-29', 1, '2022-07-16 23:58:46', '2022-07-16 23:59:04'),
(24, NULL, 36, 1, 105, 1006, 1811, 2, 4, 0, 1, 0, NULL, NULL, 2, NULL, NULL, 450000, 2, 'test2', 450000, 1, 10, 100, 450000, NULL, NULL, 1, '2022-07-17 09:48:42', '2022-07-17 09:48:42'),
(25, NULL, 43, 1, 105, 1026, 1850, 1, 6, 0, 1, 1, NULL, NULL, 2, NULL, NULL, 2700000, 2, 'Test', 2700000, 1, 5, 5000, 2700000, NULL, NULL, 1, '2022-07-17 10:02:53', '2022-07-17 10:02:53'),
(26, NULL, 40, 1, 105, 1005, 1808, 1, 3, 0, 1, 0, NULL, NULL, 2, NULL, NULL, 150000, 2, 'test4', 150000, 1, 0, 0, 150000, NULL, NULL, 1, '2022-07-17 10:31:40', '2022-07-17 10:31:40'),
(27, NULL, 40, 1, 105, 1005, 1808, 1, 3, 0, 1, 0, NULL, NULL, 2, NULL, NULL, 150000, 1, 'test1', 150000, 2, 0, 0, 150000, NULL, NULL, 1, '2022-07-17 10:32:14', '2022-07-17 10:32:14'),
(28, NULL, 49, 7, 107, 1045, 1923, 6, 9, 0, 3000, 3000, 6, 1, 1, NULL, NULL, 975000, 1, 'Registration', 325, 3, 0, 5000, 975000, NULL, NULL, 1, '2022-07-17 11:04:50', '2022-07-17 11:04:50');

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
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `group_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_id` int(11) NOT NULL,
  `sub_service_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `group_name`, `service_id`, `sub_service_id`, `created_at`, `updated_at`) VALUES
(1, 'Equinix', 1, 105, '2022-06-13 03:52:08', '2022-06-13 03:52:08'),
(2, 'Marseilles', 1, 105, '2022-06-13 03:52:20', '2022-06-13 03:52:20'),
(3, 'Group A', 1, 106, '2022-06-13 03:53:51', '2022-06-13 03:53:51'),
(4, 'Group B', 1, 106, '2022-06-13 03:53:57', '2022-06-13 03:53:57'),
(5, 'Group C', 1, 106, '2022-06-13 03:54:02', '2022-06-13 03:54:02'),
(6, 'Dhaka', 7, 107, '2022-06-13 06:26:32', '2022-06-13 06:26:32'),
(7, 'Chittagong', 7, 107, '2022-06-13 06:26:48', '2022-06-13 06:26:48'),
(8, 'Cox\'s Bazar', 7, 107, '2022-06-13 06:27:03', '2022-06-13 06:27:03'),
(9, 'Kuakata', 7, 107, '2022-06-13 06:27:18', '2022-06-13 06:27:18');

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
(1761, 109, 964, 'CO-LOCATION SERVICE', '8500.00', 5, 3, 0, 10000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1762, 109, 965, 'CO-LOCATION SERVICE', '25000.00', 5, 4, 0, 30000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1763, 109, 966, 'CO-LOCATION SERVICE', '75000.00', 5, 5, 1, 60000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1764, 109, 967, 'CO-LOCATION SERVICE', '180000.00', 5, 6, 1, 175000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1765, 109, 968, 'CO-LOCATION SERVICE', '280000.00', 5, 6, 2, 250000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1766, 109, 969, 'CO-LOCATION SERVICE', '390000.00', 5, 6, 3, 325000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1767, 109, 970, 'CO-LOCATION SERVICE', '500000.00', 5, 6, 4, 425000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1768, 109, 971, 'CO-LOCATION SERVICE', '600000.00', 5, 6, 5, 500000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1769, 109, 972, 'CO-LOCATION SERVICE', '700000.00', 5, 6, 6, 60000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1770, 109, 973, 'CO-LOCATION SERVICE', '790000.00', 5, 6, 7, 60000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1771, 109, 974, 'CO-LOCATION SERVICE', '875000.00', 5, 6, 8, 60000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1772, 109, 975, 'CO-LOCATION SERVICE', '955000.00', 5, 6, 9, 60000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1773, 109, 976, 'CO-LOCATION SERVICE', '1030000.00', 5, 6, 10, 60000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1774, 109, 977, 'CO-LOCATION SERVICE', '75000.00', 5, 6, 11, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1775, 109, 978, 'CO-LOCATION SERVICE', '75000.00', 5, 6, 12, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1776, 109, 979, 'CO-LOCATION SERVICE', '75000.00', 5, 6, 13, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1777, 109, 980, 'CO-LOCATION SERVICE', '75000.00', 5, 6, 14, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1778, 109, 981, 'CO-LOCATION SERVICE', '75000.00', 5, 6, 50000, 75000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1779, 109, 982, 'CO-LOCATION SERVICE', '75000.00', 5, 6, 16, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1780, 109, 983, 'CO-LOCATION SERVICE', '75000.00', 5, 6, 17, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1781, 109, 984, 'CO-LOCATION SERVICE', '75000.00', 5, 6, 18, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1782, 109, 985, 'CO-LOCATION SERVICE', '75000.00', 5, 6, 19, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1783, 109, 986, 'CO-LOCATION SERVICE', '75000.00', 5, 6, 20, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1784, 109, 987, 'CO-LOCATION SERVICE', '60000.00', 5, 6, 21, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1785, 109, 988, 'CO-LOCATION SERVICE', '60000.00', 5, 6, 21, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1786, 109, 989, 'CO-LOCATION SERVICE', '60000.00', 5, 6, 22, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1787, 109, 990, 'CO-LOCATION SERVICE', '60000.00', 5, 6, 23, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1788, 109, 991, 'CO-LOCATION SERVICE', '60000.00', 5, 6, 24, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1789, 109, 992, 'CO-LOCATION SERVICE', '60000.00', 5, 6, 25, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1790, 109, 993, 'CO-LOCATION SERVICE', '60000.00', 5, 6, 26, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1791, 109, 994, 'CO-LOCATION SERVICE', '60000.00', 5, 6, 27, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1792, 109, 995, 'CO-LOCATION SERVICE', '60000.00', 5, 6, 28, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1793, 109, 996, 'CO-LOCATION SERVICE', '60000.00', 5, 6, 29, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1794, 109, 997, 'CO-LOCATION SERVICE', '60000.00', 5, 6, 30, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1795, 109, 998, 'CO-LOCATION SERVICE', '50000.00', 5, 6, 31, 50000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1796, 109, 999, 'CO-LOCATION SERVICE', '500000.00', 5, 7, 32, 300000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1797, 109, 1000, 'CO-LOCATION SERVICE', '400000.00', 5, 7, 33, 200000, 1, '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1804, 105, 1003, '1', '15000.00', 5, 1, 0, 10000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1805, 105, 1003, '2', '15000.00', 5, 1, 0, 10000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1806, 105, 1004, '1', '75000.00', 5, 2, 0, 30000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1807, 105, 1004, '2', '75000.00', 5, 2, 0, 30000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1808, 105, 1005, '1', '150000.00', 5, 3, 0, 50000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1809, 105, 1005, '2', '150000.00', 5, 3, 0, 50000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1810, 105, 1006, '1', '450000.00', 5, 4, 0, 100000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1811, 105, 1006, '2', '450000.00', 5, 4, 0, 100000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1812, 105, 1007, '1', '800000.00', 5, 5, 3, 1500000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1813, 105, 1007, '2', '800000.00', 5, 5, 3, 1500000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1814, 105, 1008, '1', '700000.00', 5, 5, 5, 90000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1815, 105, 1008, '2', '700000.00', 5, 5, 5, 90000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1816, 105, 1009, '1', '650000.00', 5, 5, 10, 80000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1817, 105, 1009, '2', '650000.00', 5, 5, 10, 80000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1818, 105, 1010, '1', '575000.00', 5, 5, 15, 60000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1819, 105, 1010, '2', '575000.00', 5, 5, 15, 60000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1820, 105, 1011, '1', '550000.00', 5, 5, 20, 50000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1821, 105, 1011, '2', '550000.00', 5, 5, 20, 50000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1822, 105, 1012, '1', '2700000.00', 5, 6, 5, 350000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1823, 105, 1012, '2', '2700000.00', 5, 6, 5, 350000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1824, 105, 1013, '1', '2300000.00', 5, 6, 10, 300000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1825, 105, 1013, '2', '2300000.00', 5, 6, 10, 300000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1826, 105, 1014, '1', '2250000.00', 5, 6, 15, 250000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1827, 105, 1014, '2', '2250000.00', 5, 6, 15, 250000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1828, 105, 1015, '1', '2200000.00', 5, 6, 20, 225000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1829, 105, 1015, '2', '2200000.00', 5, 6, 20, 225000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1830, 105, 1016, '1', '2150000.00', 5, 6, 25, 200000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1831, 105, 1016, '2', '2150000.00', 5, 6, 25, 200000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1832, 105, 1017, '1', '2100000.00', 5, 6, 30, 200000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1833, 105, 1017, '2', '2100000.00', 5, 6, 30, 200000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1834, 105, 1018, '1', '2050000.00', 5, 6, 35, 200000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1835, 105, 1018, '2', '2050000.00', 5, 6, 35, 200000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1836, 105, 1019, '1', '2000000.00', 5, 6, 40, 200000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1837, 105, 1019, '2', '2000000.00', 5, 6, 40, 200000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1838, 105, 1020, '1', '23000000.00', 5, 7, 100, 2500000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1839, 105, 1020, '2', '23000000.00', 5, 7, 100, 2500000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1840, 105, 1021, '1', '20000000.00', 5, 7, 200, 2100000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1841, 105, 1021, '2', '20000000.00', 5, 7, 200, 2100000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1842, 105, 1022, '1', '19000000.00', 5, 7, 300, 1800000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1843, 105, 1022, '2', '19000000.00', 5, 7, 300, 1800000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1844, 105, 1023, '1', '18000000.00', 5, 7, 400, 1500000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1845, 105, 1023, '2', '18000000.00', 5, 7, 400, 1500000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1846, 105, 1024, '1', '2700000.00', 5, 6, 2, 1100000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1847, 105, 1024, '2', '2700000.00', 5, 6, 2, 1100000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1848, 105, 1025, '1', '2700000.00', 5, 6, 3, 1500000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1849, 105, 1025, '2', '2700000.00', 5, 6, 3, 1500000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1850, 105, 1026, '1', '2700000.00', 5, 6, 1, 600000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1851, 105, 1026, '2', '2700000.00', 5, 6, 1, 600000, 1, '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1946, 106, 1051, '3', '5000.00', 5, 1, 0, 990, 1, '2022-06-14 04:47:03', '2022-06-14 04:47:03'),
(1947, 106, 1051, '4', '5500.00', 5, 1, 0, 990, 1, '2022-06-14 04:47:03', '2022-06-14 04:47:03'),
(1948, 106, 1051, '5', '6000.00', 5, 1, 0, 990, 1, '2022-06-14 04:47:03', '2022-06-14 04:47:03'),
(2084, 107, 1087, '6', '415.00', 5, 9, 5000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2085, 107, 1087, '7', '395.00', 5, 9, 5000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2086, 107, 1087, '8', '362.00', 5, 9, 5000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2087, 107, 1087, '9', '367.00', 5, 9, 5000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2088, 107, 1088, '6', '395.00', 5, 9, 10000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2089, 107, 1088, '7', '375.00', 5, 9, 10000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2090, 107, 1088, '8', '342.00', 5, 9, 10000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2091, 107, 1088, '9', '347.00', 5, 9, 10000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2092, 107, 1089, '6', '350.00', 5, 9, 20000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2093, 107, 1089, '7', '330.00', 5, 9, 20000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2094, 107, 1089, '8', '297.00', 5, 9, 20000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2095, 107, 1089, '9', '302.00', 5, 9, 20000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2096, 107, 1090, '6', '330.00', 5, 9, 30000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2097, 107, 1090, '7', '310.00', 5, 9, 30000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2098, 107, 1090, '8', '277.00', 5, 9, 30000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2099, 107, 1090, '9', '282.00', 5, 9, 30000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2100, 107, 1091, '6', '325.00', 5, 9, 40000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2101, 107, 1091, '7', '305.00', 5, 9, 40000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2102, 107, 1091, '8', '272.00', 5, 9, 40000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2103, 107, 1091, '9', '277.00', 5, 9, 40000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2104, 107, 1092, '6', '320.00', 5, 9, 50000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2105, 107, 1092, '7', '300.00', 5, 9, 50000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2106, 107, 1092, '8', '267.00', 5, 9, 50000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2107, 107, 1092, '9', '272.00', 5, 9, 50000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2108, 107, 1093, '6', '315.00', 5, 9, 65000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2109, 107, 1093, '7', '295.00', 5, 9, 65000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2110, 107, 1093, '8', '262.00', 5, 9, 65000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2111, 107, 1093, '9', '267.00', 5, 9, 65000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2112, 107, 1094, '6', '310.00', 5, 9, 80000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2113, 107, 1094, '7', '290.00', 5, 9, 80000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2114, 107, 1094, '8', '257.00', 5, 9, 80000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2115, 107, 1094, '9', '262.00', 5, 9, 80000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2116, 107, 1095, '6', '305.00', 5, 9, 100000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2117, 107, 1095, '7', '285.00', 5, 9, 100000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2118, 107, 1095, '8', '252.00', 5, 9, 100000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2119, 107, 1095, '9', '257.00', 5, 9, 100000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2120, 107, 1096, '6', '300.00', 5, 9, 110000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2121, 107, 1096, '7', '280.00', 5, 9, 110000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2122, 107, 1096, '8', '247.00', 5, 9, 110000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2123, 107, 1096, '9', '252.00', 5, 9, 110000, 0, 1, '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(2124, 108, 1097, '6', '425.00', 5, 8, 5000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2125, 108, 1097, '7', '405.00', 5, 8, 5000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2126, 108, 1097, '8', '372.00', 5, 8, 5000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2127, 108, 1097, '9', '392.00', 5, 8, 5000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2128, 108, 1098, '6', '420.00', 5, 8, 10000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2129, 108, 1098, '7', '400.00', 5, 8, 10000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2130, 108, 1098, '8', '367.00', 5, 8, 10000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2131, 108, 1098, '9', '387.00', 5, 8, 10000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2132, 108, 1099, '6', '410.00', 5, 8, 20000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2133, 108, 1099, '7', '390.00', 5, 8, 20000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2134, 108, 1099, '8', '357.00', 5, 8, 20000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2135, 108, 1099, '9', '377.00', 5, 8, 20000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2136, 108, 1100, '6', '400.00', 5, 8, 30000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2137, 108, 1100, '7', '380.00', 5, 8, 30000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2138, 108, 1100, '8', '347.00', 5, 8, 30000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2139, 108, 1100, '9', '367.00', 5, 8, 30000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2140, 108, 1101, '6', '390.00', 5, 8, 40000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2141, 108, 1101, '7', '370.00', 5, 8, 40000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2142, 108, 1101, '8', '337.00', 5, 8, 40000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2143, 108, 1101, '9', '357.00', 5, 8, 40000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2144, 108, 1102, '6', '380.00', 5, 8, 50000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2145, 108, 1102, '7', '360.00', 5, 8, 50000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2146, 108, 1102, '8', '327.00', 5, 8, 50000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2147, 108, 1102, '9', '347.00', 5, 8, 50000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2148, 108, 1103, '6', '370.00', 5, 8, 65000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2149, 108, 1103, '7', '350.00', 5, 8, 65000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2150, 108, 1103, '8', '317.00', 5, 8, 65000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2151, 108, 1103, '9', '337.00', 5, 8, 65000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2152, 108, 1104, '6', '360.00', 5, 8, 80000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2153, 108, 1104, '7', '340.00', 5, 8, 80000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2154, 108, 1104, '8', '307.00', 5, 8, 80000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2155, 108, 1104, '9', '327.00', 5, 8, 80000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2156, 108, 1105, '6', '350.00', 5, 8, 100000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2157, 108, 1105, '7', '330.00', 5, 8, 100000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2158, 108, 1105, '8', '297.00', 5, 8, 100000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2159, 108, 1105, '9', '317.00', 5, 8, 100000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2160, 108, 1106, '6', '340.00', 5, 8, 110000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2161, 108, 1106, '7', '320.00', 5, 8, 110000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2162, 108, 1106, '8', '287.00', 5, 8, 110000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(2163, 108, 1106, '9', '307.00', 5, 8, 110000, 0, 1, '2022-07-18 11:59:08', '2022-07-18 11:59:08');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `service_id` int(11) NOT NULL,
  `mrc` int(11) DEFAULT NULL,
  `mrc_after_discount` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `demand_note_id` int(11) NOT NULL,
  `circuit_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `group_id` int(11) DEFAULT NULL,
  `grp_or_zone` int(11) DEFAULT NULL,
  `remarks` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inv_date` date NOT NULL,
  `istally_active` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `iplc_bills`
--

CREATE TABLE `iplc_bills` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `service_id` int(11) NOT NULL,
  `sub_service_id` int(11) NOT NULL,
  `cus_type_id` int(11) NOT NULL,
  `grp_zone_id` int(11) NOT NULL,
  `billing_month` date NOT NULL,
  `bill_process_date` date NOT NULL,
  `total_custonmer` int(11) DEFAULT NULL,
  `total_mrc` int(11) DEFAULT NULL,
  `total_mbc` int(11) DEFAULT NULL,
  `total_vat` int(11) DEFAULT NULL,
  `total_adjust` int(11) DEFAULT NULL,
  `total_mrc_after_discount` int(11) DEFAULT NULL,
  `net_total` int(11) DEFAULT NULL,
  `bill_creator` int(11) DEFAULT NULL,
  `invoice_status` tinyint(4) NOT NULL DEFAULT 0,
  `bill_status` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `iplc_bills`
--

INSERT INTO `iplc_bills` (`id`, `service_id`, `sub_service_id`, `cus_type_id`, `grp_zone_id`, `billing_month`, `bill_process_date`, `total_custonmer`, `total_mrc`, `total_mbc`, `total_vat`, `total_adjust`, `total_mrc_after_discount`, `net_total`, `bill_creator`, `invoice_status`, `bill_status`, `created_at`, `updated_at`) VALUES
(1, 1, 106, 1, 3, '2022-07-18', '2022-07-18', 1, 5000, 222, 248, 333, 4400, 5203, 2, 1, 0, '2022-07-18 08:44:35', '2022-07-18 10:33:26'),
(2, 1, 105, 1, 1, '2022-07-18', '2022-07-18', 2, 3000000, 200, 143270, 200, 2865000, 3008670, 2, 1, 0, '2022-07-18 08:46:42', '2022-07-18 10:30:45'),
(3, 1, 105, 1, 2, '2022-07-18', '2022-07-18', 1, 450000, 100, 20260, 100, 405000, 425460, 2, 1, 0, '2022-07-18 10:35:32', '2022-07-18 10:35:44'),
(4, 1, 105, 1, 2, '2022-07-18', '2022-07-18', 1, 450000, 100, 20260, 100, 405000, 425460, 6, 1, 0, '2022-07-18 12:27:41', '2022-07-18 12:27:54');

-- --------------------------------------------------------

--
-- Table structure for table `iplc_bill_details`
--

CREATE TABLE `iplc_bill_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `bill_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `circuit_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `demand_approved_date` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `billing_month` date NOT NULL,
  `bill_process_date` date NOT NULL,
  `mrc` int(11) DEFAULT NULL,
  `old_mrc` int(11) DEFAULT NULL,
  `mbc` int(11) DEFAULT NULL,
  `vat` int(11) DEFAULT NULL,
  `adjust` int(11) DEFAULT NULL,
  `add_sub` int(11) NOT NULL DEFAULT 1,
  `old_mrc_after_discount` int(11) DEFAULT NULL,
  `net_total` int(11) DEFAULT NULL,
  `bill_creator` int(11) DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approved_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `invoice_status` tinyint(4) NOT NULL DEFAULT 0,
  `invoice_ganarete` tinyint(4) NOT NULL DEFAULT 0,
  `bill_status` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `iplc_bill_details`
--

INSERT INTO `iplc_bill_details` (`id`, `bill_id`, `customer_id`, `circuit_id`, `demand_approved_date`, `billing_month`, `bill_process_date`, `mrc`, `old_mrc`, `mbc`, `vat`, `adjust`, `add_sub`, `old_mrc_after_discount`, `net_total`, `bill_creator`, `remarks`, `approved_date`, `invoice_status`, `invoice_ganarete`, `bill_status`, `created_at`, `updated_at`) VALUES
(1, 1, 48, '[1,1]', '[null,\"2022-07-17\"]', '2022-07-18', '2022-07-18', 4955, 5000, 222, 248, 333, 1, 4400, 5203, 2, 'test', '2022-07-18', 1, 0, 0, '2022-07-18 08:44:35', '2022-07-18 10:33:26'),
(2, 2, 40, '[3,3]', '[null,null]', '2022-07-18', '2022-07-18', 300200, 300000, 100, 15010, 100, 1, 300000, 315210, 2, 'test', '2022-07-18', 1, 0, 0, '2022-07-18 08:46:42', '2022-07-18 10:30:45'),
(3, 2, 43, '[6]', '[null]', '2022-07-18', '2022-07-18', 2565200, 2700000, 100, 128260, 100, 1, 2565000, 2693460, 2, 'test2', '2022-07-18', 1, 0, 0, '2022-07-18 08:46:42', '2022-07-18 10:30:45'),
(4, 3, 36, '[4]', '[null]', '2022-07-18', '2022-07-18', 405200, 450000, 100, 20260, 100, 1, 405000, 425460, 2, 'test', '2022-07-18', 1, 0, 0, '2022-07-18 10:35:32', '2022-07-18 10:35:44'),
(5, 4, 36, '[4]', '[null]', '2022-07-18', '2022-07-18', 405200, 450000, 100, 20260, 100, 1, 405000, 425460, 6, 'test', '2022-07-18', 1, 0, 0, '2022-07-18 12:27:41', '2022-07-18 12:27:54');

-- --------------------------------------------------------

--
-- Table structure for table `landing_stations`
--

CREATE TABLE `landing_stations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `country_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `landing_stations`
--

INSERT INTO `landing_stations` (`id`, `country_name`, `group_id`, `created_at`, `updated_at`) VALUES
(1, 'Singapore', 3, '2022-06-14 04:03:51', '2022-06-14 04:03:51'),
(2, 'Malaysia', 3, '2022-06-14 04:04:06', '2022-06-14 04:04:06'),
(3, 'Thailand', 3, '2022-06-14 04:04:16', '2022-06-14 04:04:16'),
(4, 'Pakistan', 4, '2022-06-14 04:04:31', '2022-06-14 04:04:31'),
(5, 'UAE', 4, '2022-06-14 04:04:42', '2022-06-14 04:04:42'),
(6, 'KSA', 4, '2022-06-14 04:04:53', '2022-06-14 04:04:53'),
(7, 'Tunisia', 5, '2022-06-14 04:05:06', '2022-06-14 04:05:06'),
(8, 'Algeria', 5, '2022-06-14 04:05:15', '2022-06-14 04:05:15'),
(9, 'Italy', 5, '2022-06-14 04:05:27', '2022-06-14 04:05:27');

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
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(8, '2022_03_28_072730_create_services_table', 3),
(9, '2022_03_28_072924_create_sub_services_table', 3),
(13, '2022_03_29_093229_create_tariff_capacities_table', 4),
(15, '2022_04_13_053619_create_group_or_zones_table', 5),
(16, '2022_04_18_033918_create_customers_table', 6),
(23, '2022_05_12_062159_create_circuit_categories_table', 8),
(26, '2022_05_16_104816_create_customer_types_table', 10),
(30, '2022_04_20_043144_create_demand_notes_table', 11),
(31, '2022_05_25_122412_create_ports_table', 12),
(35, '2022_06_05_065641_create_colocation_demand_notes_table', 15),
(37, '2022_06_13_053922_create_groups_table', 17),
(38, '2022_04_28_065146_create_landing_stations_table', 18),
(50, '2014_10_12_000000_create_users_table', 19),
(51, '2022_05_31_045545_create_invoices_table', 19),
(53, '2022_06_20_122512_create_permission_tables', 20),
(54, '2022_07_03_044722_create_iplc_bills_table', 21),
(55, '2022_07_03_050143_create_iplc_bill_details_table', 21);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 2),
(1, 'App\\Models\\User', 5),
(2, 'App\\Models\\User', 3),
(5, 'App\\Models\\User', 4),
(5, 'App\\Models\\User', 6);

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
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'user-add', 'web', '2022-07-07 01:17:48', '2022-07-07 01:17:48'),
(2, 'user-view', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(3, 'user-edit', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(4, 'user-delete', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(5, 'customer-add', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(6, 'customer-view', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(7, 'customer-edit', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(8, 'customer-delete', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(9, 'service-add', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(10, 'service-view', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(11, 'service-edit', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(12, 'role-add', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(13, 'role-view', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(14, 'role-edit', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(15, 'role-delete', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(16, 'tariff-add', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(17, 'tariff-view', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(18, 'tariff-edit', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(19, 'Iptransit-demandNote-Add', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(20, 'Iptransit-demandNote-View', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(21, 'colocation-demandnote-add', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(22, 'colocation-demandnote-view', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(23, 'coloc-iplc-demand-note-Add', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(24, 'coloc-iplc-demand-note-View', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(25, 'Iplc-demandNote-Add', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(26, 'Iplc-demandNote-View', 'web', '2022-07-07 01:17:49', '2022-07-07 01:17:49'),
(27, 'Iplc-billing-view', 'web', '2022-07-17 05:35:53', NULL),
(28, 'Iplc-billing-process', 'web', '2022-07-17 05:37:36', NULL),
(29, 'Iplc-billing-invoice', 'web', '2022-07-19 09:38:05', NULL),
(30, 'Iplc-billing-invoice-list', 'web', '2022-07-19 09:38:05', NULL),
(31, 'Iplc-billing-invoice-generate', 'web', '2022-07-19 09:39:25', NULL),
(32, 'Iptransit-billing-view', 'web', '2022-07-19 09:46:01', NULL),
(33, 'Iptransit-billing-process', 'web', '2022-07-19 09:46:01', NULL),
(34, 'Iptransit-billing-invoice', 'web', '2022-07-19 09:46:01', NULL),
(35, 'Iptransit-billing-invoice-list', 'web', '2022-07-19 09:46:01', NULL),
(36, 'Iptransit-billing-invoice-generate', 'web', '2022-07-19 09:48:56', NULL),
(37, 'Coloc-billing-view', 'web', '2022-07-19 09:50:09', NULL),
(38, 'Coloc-billing-process', 'web', '2022-07-19 09:52:53', NULL),
(39, 'Coloc-billing-invoice', 'web', '2022-07-19 09:52:53', NULL),
(40, 'Coloc-billing-invoice-list', 'web', '2022-07-19 09:53:34', NULL),
(41, 'Coloc-billing-invoice-generate', 'web', '2022-07-19 09:53:58', NULL),
(42, 'Coloc-Iplc-billing-view', 'web', '2022-07-19 09:55:08', NULL),
(43, 'Coloc-Iplc-billing-process', 'web', '2022-07-19 09:55:08', NULL),
(44, 'Coloc-Iplc-billing-invoice', 'web', '2022-07-19 09:56:20', NULL),
(45, 'Coloc-Iplc-billing-invoice-list', 'web', '2022-07-19 09:56:20', NULL),
(46, 'Coloc-Iplc-billing-invoice-generate', 'web', '2022-07-19 09:56:20', NULL);

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
-- Table structure for table `ports`
--

CREATE TABLE `ports` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `port_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `port_rate` int(11) NOT NULL DEFAULT 0,
  `licence_id` int(11) NOT NULL,
  `port_status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ports`
--

INSERT INTO `ports` (`id`, `port_name`, `port_rate`, `licence_id`, `port_status`, `created_at`, `updated_at`) VALUES
(1, '1 GB Port', 20000, 8, 1, NULL, NULL),
(2, '10 GB Port', 100000, 8, 1, NULL, NULL),
(3, '50 Mbps', 2000, 9, 1, NULL, NULL),
(4, '500 Mbps', 20000, 9, 1, NULL, NULL),
(5, '1GB Port*', 20000, 9, 1, NULL, NULL),
(6, '10 GB Port*', 100000, 9, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'web', '2022-07-07 03:55:59', '2022-07-07 03:55:59'),
(2, 'user', 'web', '2022-07-12 23:22:15', '2022-07-12 23:22:15'),
(3, 'User-IPLC', 'web', '2022-07-17 09:58:08', '2022-07-17 09:58:08'),
(4, 'usernew', 'web', '2022-07-18 06:23:27', '2022-07-18 06:23:27'),
(5, 'user3', 'web', '2022-07-18 10:46:05', '2022-07-18 10:46:05');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 1),
(4, 1),
(5, 1),
(5, 3),
(5, 4),
(6, 1),
(6, 2),
(6, 3),
(6, 4),
(7, 1),
(7, 3),
(7, 4),
(8, 1),
(8, 4),
(9, 1),
(10, 1),
(10, 2),
(11, 1),
(12, 1),
(12, 5),
(13, 1),
(13, 5),
(14, 1),
(14, 5),
(15, 1),
(15, 5),
(16, 1),
(17, 1),
(17, 2),
(17, 4),
(18, 1),
(19, 1),
(19, 3),
(20, 1),
(20, 2),
(20, 3),
(21, 1),
(22, 1),
(23, 1),
(23, 3),
(24, 1),
(25, 1),
(25, 3),
(26, 1),
(27, 3),
(28, 3),
(28, 4);

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
(1, 'IPLC', '1', '2022-03-28 02:13:52', '2022-07-04 05:54:00'),
(7, 'IP Transit', '1', '2022-03-30 04:57:46', '2022-07-18 11:59:08'),
(13, 'COLOCATIONSERVICE', '1', '2022-04-09 21:33:42', '2022-06-06 23:50:37');

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
(105, 1, 'SMW - 5 ( IIG )', NULL, '2022-05-18 01:03:26', '2022-06-12 23:58:02'),
(106, 1, 'SMW-4 ( IIG )', NULL, '2022-05-19 00:54:39', '2022-06-14 04:47:03'),
(107, 7, 'IP Transit Rates for IIG', NULL, '2022-05-23 00:58:55', '2022-07-18 09:51:27'),
(108, 7, 'IP Transit Rates for ISP', NULL, '2022-05-23 01:05:18', '2022-07-18 11:59:08'),
(109, 13, 'CO-LOCATION SERVICE', NULL, '2022-05-30 09:08:27', '2022-06-06 23:50:37');

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
(964, 109, 'STM-1', 10000, 0, 3, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(965, 109, 'STM4/ 4xSTM1', 30000, 0, 4, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(966, 109, 'STM16/ 16xSTM1', 60000, 1, 5, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(967, 109, 'STM64/10G', 175000, 1, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(968, 109, '2 x 10G', 250000, 2, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(969, 109, '3 x 10G', 325000, 3, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(970, 109, '4 x 10G', 425000, 4, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(971, 109, '5 x 10G', 500000, 5, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(972, 109, '6 x 10G', 60000, 6, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(973, 109, '7 x 10G', 60000, 7, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(974, 109, '8 x 10G', 60000, 8, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(975, 109, '9 x 10G', 60000, 9, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(976, 109, '10 x 10G', 60000, 10, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(977, 109, '11 x 10G', 50000, 11, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(978, 109, '12 x 10G', 50000, 12, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(979, 109, '13 x 10G', 50000, 13, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(980, 109, '14 x 10G', 50000, 14, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(981, 109, '15 x 10G', 75000, 50000, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(982, 109, '16 x 10G', 50000, 16, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(983, 109, '17 x 10G', 50000, 17, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(984, 109, '18 x 10G', 50000, 18, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(985, 109, '19 x 10G', 50000, 19, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(986, 109, '20 x 10G', 50000, 20, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(987, 109, '21 x 10G', 50000, 21, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(988, 109, '21 x 10G', 50000, 21, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(989, 109, '22 x 10G', 50000, 22, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(990, 109, '23 x 10G', 50000, 23, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(991, 109, '24 x 10G', 50000, 24, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(992, 109, '25 x 10G', 50000, 25, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(993, 109, '26 x 10G', 50000, 26, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(994, 109, '27 x 10G', 50000, 27, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(995, 109, '28 x 10G', 50000, 28, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(996, 109, '29 x 10G', 50000, 29, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(997, 109, '30 x 10G', 50000, 30, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(998, 109, 'Each 10G above 300G', 50000, 31, 6, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(999, 109, 'Each 100G (upto 300G)', 300000, 32, 7, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1000, 109, 'Each 100G above 300G', 200000, 33, 7, '1', '2022-06-06 23:50:37', '2022-06-06 23:50:37'),
(1003, 105, 'E1', 10000, 0, 1, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1004, 105, 'DS3(21 x E1 / 45 Mbps)', 30000, 0, 2, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1005, 105, 'STM-1', 50000, 0, 3, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1006, 105, 'STM-4', 100000, 0, 4, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1007, 105, 'Each STM-16 upto 30G', 1500000, 3, 5, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1008, 105, 'Each STM-16 above 30G (upto 50G)', 90000, 5, 5, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1009, 105, 'Each STM-16 above 50G (upto 100G)', 80000, 10, 5, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1010, 105, 'Each STM-16 above 150G (upto 200G)', 60000, 15, 5, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1011, 105, 'Each STM-16 above 200G', 50000, 20, 5, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1012, 105, 'Each 10G upto 50G', 350000, 5, 6, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1013, 105, 'Each 10G above 50G (upto 100G)', 300000, 10, 6, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1014, 105, 'Each 10G above 100G (upto 150G)', 250000, 15, 6, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1015, 105, 'Each 10G above 150G (upto 200G)', 225000, 20, 6, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1016, 105, 'Each 10G above 200G(Upto 250G)', 200000, 25, 6, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1017, 105, 'Each 10G above 250G(Upto 300G)', 200000, 30, 6, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1018, 105, 'Each 10G above 300G(Upto 350G)', 200000, 35, 6, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1019, 105, 'Each 10G above 350G', 200000, 40, 6, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1020, 105, 'Each 100g (100)', 2500000, 100, 7, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1021, 105, 'Each 100g (200)', 2100000, 200, 7, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1022, 105, 'Each 100g (300)', 1800000, 300, 7, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1023, 105, 'Each 100g (400)', 1500000, 400, 7, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1024, 105, 'Each 10G upto 50G', 1100000, 2, 6, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1025, 105, 'Each 10G upto 50G', 1500000, 3, 6, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1026, 105, 'Each 10G upto 50G', 600000, 1, 6, '1', '2022-06-12 23:58:02', '2022-06-12 23:58:02'),
(1051, 106, 'E1', 990, 0, 1, '1', '2022-06-14 04:47:03', '2022-06-14 04:47:03'),
(1087, 107, '100 Mbps – 4999 Mbps', 0, 5000, 9, '1', '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(1088, 107, '5000 Mbps - 9999 Mbps', 0, 10000, 9, '1', '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(1089, 107, '10000 Mbps – 19999 Mbps', 0, 20000, 9, '1', '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(1090, 107, '20000 Mbps – 29999 Mbps', 0, 30000, 9, '1', '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(1091, 107, '30000 Mbps – 39999 Mbps', 0, 40000, 9, '1', '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(1092, 107, '40000 Mbps – 49999 Mbps', 0, 50000, 9, '1', '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(1093, 107, '50000 Mbps and 64999 Mbps', 0, 65000, 9, '1', '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(1094, 107, '65000 Mbps and 79999 Mbps', 0, 80000, 9, '1', '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(1095, 107, '80000 Mbps and 99999 Mbps', 0, 100000, 9, '1', '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(1096, 107, '100 Gbps and above', 0, 110000, 9, '1', '2022-07-18 09:51:27', '2022-07-18 09:51:27'),
(1097, 108, '100 Mbps – 4999 Mbps', 0, 5000, 8, '1', '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(1098, 108, '5000 Mbps - 9999 Mbps', 0, 10000, 8, '1', '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(1099, 108, '10000 Mbps – 19999 Mbps', 0, 20000, 8, '1', '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(1100, 108, '20000 Mbps – 29999 Mbps', 0, 30000, 8, '1', '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(1101, 108, '30000 Mbps – 39999 Mbps', 0, 40000, 8, '1', '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(1102, 108, '40000 Mbps – 49999 Mbps', 0, 50000, 8, '1', '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(1103, 108, '50000 Mbps and 64999 Mbps', 0, 65000, 8, '1', '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(1104, 108, '65000 Mbps and 79999 Mbps', 0, 80000, 8, '1', '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(1105, 108, '80000 Mbps and 99999 Mbps', 0, 100000, 8, '1', '2022-07-18 11:59:08', '2022-07-18 11:59:08'),
(1106, 108, '100 Gbps and above', 0, 110000, 8, '1', '2022-07-18 11:59:08', '2022-07-18 11:59:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` tinyint(4) DEFAULT NULL COMMENT '1=IPLC, 2=IP Transit, 3=Colocation Service',
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `designation` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `type`, `address`, `designation`, `created_at`, `updated_at`) VALUES
(1, 'Amirul Islam', 'admin@gmail.com', '01832846626', '$2y$10$JlxLUsAt1nzZrwFPedervOZc7zAaP2Qk5kLH7KZzbDTXHUKlN6Gpi', NULL, 'Dhaka', 'Admin', '2022-07-07 04:27:21', '2022-07-07 04:27:21'),
(2, 'Admin', 'admin@admin.com', '01832846626', '$2y$10$JlxLUsAt1nzZrwFPedervOZc7zAaP2Qk5kLH7KZzbDTXHUKlN6Gpi', NULL, 'Dhaka', 'Admin', '2022-07-07 06:34:36', '2022-07-13 23:45:42'),
(3, 'User', 'user@user.com', '01832846626', '$2y$10$JlxLUsAt1nzZrwFPedervOZc7zAaP2Qk5kLH7KZzbDTXHUKlN6Gpi', NULL, 'Opposite of Jamuna future Park', 'User', '2022-07-12 23:23:13', '2022-07-14 03:02:45'),
(4, 'Afzal Hossain', 'afzal@bsccl.com', '01635748951', '$2y$10$ehFkFgrTOqQmcYyyck9Lye32b53SksgjXf/cy9SXX0.Um7N8y5b26', NULL, 'Dhanmondi', 'Manager', '2022-07-17 06:57:45', '2022-07-17 06:57:45'),
(5, 'Fahim', 'fahim@bsccl.com', '01711111112', '$2y$10$JzbqgX62RVI2xH2Btk4bb.FEBxxMWkiy77yi.JLwX8bhUvtyh.vgi', NULL, 'Dhaka', 'Assistant Manager', '2022-07-17 09:59:26', '2022-07-18 05:22:50'),
(6, 'Asif Hossain', 'asif@gmail.com', '01722222222', '$2y$10$DwCBmXi4OgkR0IEGxYD2A.qPeIztrNcY7FnVph6FRpo0VuUyrVb.O', NULL, 'Dhaka, Bangladesh', 'Manager', '2022-07-18 12:04:16', '2022-07-18 12:04:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `circuit_categories`
--
ALTER TABLE `circuit_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colocation_demand_notes`
--
ALTER TABLE `colocation_demand_notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_email_unique` (`email`),
  ADD KEY `customers_customer_type_id_foreign` (`customer_type_id`);

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
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_or_zones`
--
ALTER TABLE `group_or_zones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_or_zones_sub_service_id_foreign` (`sub_service_id`),
  ADD KEY `group_or_zones_capacity_id_foreign` (`capacity_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `iplc_bills`
--
ALTER TABLE `iplc_bills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `iplc_bill_details`
--
ALTER TABLE `iplc_bill_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `landing_stations`
--
ALTER TABLE `landing_stations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

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
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `ports`
--
ALTER TABLE `ports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

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
-- AUTO_INCREMENT for table `colocation_demand_notes`
--
ALTER TABLE `colocation_demand_notes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `customer_types`
--
ALTER TABLE `customer_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `demand_notes`
--
ALTER TABLE `demand_notes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `group_or_zones`
--
ALTER TABLE `group_or_zones`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2164;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `iplc_bills`
--
ALTER TABLE `iplc_bills`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `iplc_bill_details`
--
ALTER TABLE `iplc_bill_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `landing_stations`
--
ALTER TABLE `landing_stations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ports`
--
ALTER TABLE `ports`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `sub_services`
--
ALTER TABLE `sub_services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `tariff_capacities`
--
ALTER TABLE `tariff_capacities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1107;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

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
