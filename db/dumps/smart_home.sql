-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 26, 2019 at 02:50 PM
-- Server version: 5.7.26-0ubuntu0.16.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.4

CREATE DATABASE IF NOT EXISTS smart_home;

USE smart_home;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smart_home`
--

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL
);

--
-- Table structure for table `Devices`
--

CREATE TABLE IF NOT EXISTS `Devices` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(64) NOT NULL,
  `description` VARCHAR(128) NOT NULL,
  `state` INT NOT NULL,
  `type` INT NOT NULL,
  `user_id` INT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Devices`
--

-- Insertar un usuario de ejemplo
INSERT INTO `Users` (`id`, `email`, `password`) VALUES
(1, 'admin@admin.com', 'secreto'),
(2, 'user@user.com', '1234');


INSERT INTO `Devices` (`name`, `description`, `state`, `type`, `user_id`) VALUES
('Lampara', 'Living', 0, 1, 1), 
('Cortina', 'Habitacion', 60, 2, 1), 
('Aire', 'Living', 24, 3, 1),
('Lampara', 'Cocina', 1, 1, 2), 
('Cortina', 'Comedor', 20, 2, 2), 
('Aire', 'Comedor', 20, 3, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Devices`
--
ALTER TABLE `Devices`
  ADD PRIMARY KEY (`id`),
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Devices`
--
ALTER TABLE `Devices`
  MODIFY `id` INT AUTO_INCREMENT NOT NULL;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
