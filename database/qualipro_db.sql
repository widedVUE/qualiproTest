-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2025 at 04:24 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `qualipro_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `collaborateurs`
--

CREATE TABLE `collaborateurs` (
  `id` int(10) UNSIGNED NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `poste` varchar(100) NOT NULL,
  `date_entree` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collaborateurs`
--

INSERT INTO `collaborateurs` (`id`, `nom`, `prenom`, `email`, `poste`, `date_entree`, `createdAt`, `updatedAt`) VALUES
(6, 'Ben Ali', 'Ahmed', 'ahmed.benali@example.com', 'Développeur Full Stack', '2022-01-13', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'Gharbi', 'Youssef', 'youssef.gharbi@example.com', 'Chef de projet', '2020-06-20', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'Saidio', 'Rami', 'rami.saidi@example.com', 'QA Engineer', '2023-02-01', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 'Haddadi', 'Marwen', 'marwen.haddad@example.com', 'Scrum Master', '2022-08-30', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 'ben ounis', 'wided', 'benouniswided@gmail.com', 'développeuse full-sack', '2025-11-06', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `created_at`, `updated_at`) VALUES
(6, 'benwided@gmail.com', '$2b$10$3iYouggTwRqvn4.IxrpwQO4xTHjWSWippdttSvjbdJaszzZL55u3q', '2025-11-05 00:19:50', '2025-11-05 00:19:50'),
(10, 'benouniswided@gmail.com', '$2b$10$me3joMbdhNiCL1gusDUQu./6cLA98Eo1gIDSURAK/3XROIUf/2lXO', '2025-11-05 16:20:17', '2025-11-05 16:20:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `collaborateurs`
--
ALTER TABLE `collaborateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `collaborateurs`
--
ALTER TABLE `collaborateurs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
