-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-10-2023 a las 04:58:13
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dcompras`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `price` varchar(10) NOT NULL,
  `quantity` int(11) NOT NULL,
  `promo` int(11) DEFAULT NULL,
  `img` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `price`, `quantity`, `promo`, `img`) VALUES
(1, 'VINAGRE SAN JORGE BLANCO 500ML', '1009249', '4.100', 6, 0, 'vinagre.jpg'),
(2, 'CERVEZA HEINEKEN LATA 6UNDX269ML', '2004341', '12.990', 138, 15, 'cerveza.jpg'),
(3, 'GALLETAS NESTLE SALTINAS DORE 351GRS', '1004495', '7.413', 6, 0, 'saltinas.jpg'),
(4, 'ARROZ DIANA 3KG', '2007570', '14.401', 10, 15, 'arroz.jpg'),
(5, 'PONQUE RAMO GALA MITI 384GRS', '1100535', '13.300', 15, 0, 'gala.jpg'),
(6, 'QTA MNCHS LIQ BLANCOX ROPA COLOR FLORAL 500ML', 'Blancox - 1000858', '3.550', 10, 5, 'blancox.jpg'),
(7, 'TOALLA COCINA FAMILIA PRACTIDIARIA 1RLL 150HJ', '1400994', '6.657', 7, 0, 'rollo.jpg'),
(8, 'DETERGENTE LIQUIDO ARIEL CONCENTRADO DP 12LT', '1405943', '23.600', 21, 20, 'ariel.jpg'),
(9, 'CARNE RES MOLIDA 1KG', '2005137', '24.675', 94, 0, 'carne.jpg'),
(10, 'BEBIDA ACHOCOLATADA MILO ACTIV GO 500GR GT 75GR', '1102198', '24.113', 11, 25, 'milo.jpg'),
(11, 'PAPAS FRITO LAY SRTDO SUPER LONCHERA 12 PAQ X 271G', '2000431', '12.394', 7, 10, 'lonchera.jpg'),
(12, 'SNACKS DORITOS MEGA QUESO 185GR', '1400208', '7.990', 38, 0, 'doritos.jpg'),
(13, 'AVENA DON PANCHO HOJUELAS 600GR', '1406433', '6.775', 21, 0, 'avena.jpg'),
(14, 'CAFE INST COLCAFE CLASICO SUAVE 85GRS', '1010077', '11.300', 18, 5, 'cafe.jpg'),
(15, 'CREMA DENTAL COLGATE MAX PROTEC ANTICARIES 60ML', '1400277', '3.990', 73, 0, 'colgate.jpg'),
(16, 'BEBIDA ENERGIZANTE SPEED MAX 1LT', '1407837', '3.250', 16, 0, 'speed.jpg'),
(17, 'CAPSULA VAPEADOR VUSE WATERMELON 0VOL 2UND', '2010264', '23.990', 2, 15, 'vaper.jpg'),
(18, 'MIX MADURADOS VILASECA LOMO SALAMI PEPERONI SERRANO 125GR', '2007189', '26.400', 1, 0, 'mix.jpg'),
(19, 'GOMITAS SUPER TRULULU AROS 90GRS', '1403775', '2.346', 18, 5, 'gomas.jpg'),
(20, 'BUÑUELOS PLV MAIZENA 300GRS', '1404027', '7.854', 4, 0, 'maizena.jpg'),
(21, 'RPT GILLETTE MACH3 2UND', '1007445', '26.701', 6, 50, 'gillete.jpg'),
(22, 'TRIDENT EVUP WATERMELON TIII', '1102290', '3.800 ', 23, 15, 'chicle.jpg'),
(23, 'CHOCOLATE JET BURBUJAS 12UNDS\r\n', '1108928', '7.990', 46, 0, 'jet.jpg'),
(24, 'CEREAL KELLOGGS FROOT LOOPS 315GR', '1402603', '19.100', 23, 10, 'cereal.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `user` varchar(24) NOT NULL,
  `pass` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `user`, `pass`) VALUES
(1, 'admin', 'pass');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
