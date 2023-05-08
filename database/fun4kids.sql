-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-05-2023 a las 22:56:58
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fun4kids`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--

CREATE TABLE `chat` (
  `idmsg` int(11) NOT NULL,
  `idChild` varchar(100) NOT NULL,
  `idRemitente` varchar(100) NOT NULL,
  `idDestinatario` varchar(100) NOT NULL,
  `msgText` text NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `respondido` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `chat`
--

INSERT INTO `chat` (`idmsg`, `idChild`, `idRemitente`, `idDestinatario`, `msgText`, `created_on`, `respondido`) VALUES
(4, '1qp2eolg0d5j1681835703128', 'l4t0mlgr4921681835142093', 'admin', 'Buenos días, quería avisarles que mañana esteban no podrá asistir a la guardería.', '2023-05-06 07:09:34', 0),
(5, '1qp2eolg0d5j1681835703128', 'admin', 'l4t0mlgr4921681835142093', 'Buenos días, ya lo he notificado a los profesores. Gracias por avisar.', '2023-05-06 07:10:17', 0),
(6, '1qp2eolg0d5j1681835703128', 'l4t0mlgr4921681835142093', 'admin', 'Creo que dejé el tetero de Esteban en la guardería', '2023-05-06 07:10:17', 0),
(7, '1qp2eolg0d5j1681835703128', 'l4t0mlgr4921681835142093', 'admin', 'Gracias', '2023-05-06 07:10:17', 0),
(8, '1qp2eolg0d5j1681835703128', 'admin', 'l4t0mlgr4921681835142093', 'De nada', '2023-05-06 07:10:17', 0),
(9, '1qp2eolg0d5j1681835703128', 'admin', 'l4t0mlgr4921681835142093', 'Mañana si es posible traer plastilina de colores para un taller de plastilina que habrá para los mayores de 2 años', '2023-05-06 07:10:17', 0),
(10, '1qp2eolg0d5j1681835703128', 'l4t0mlgr4921681835142093', 'admin', 'Gracias!', '2023-05-06 07:10:17', 0),
(11, 'f0i8clag1971681836379271', 'cdkf1q1fd9d1681835903188', 'admin', 'Buenos días, Quisiera saber si Lina tiene suficientes pañales para hoy.', '2023-05-06 07:10:57', 0),
(12, 'f0i8clag1971681836379271', 'admin', 'cdkf1q1fd9d1681835903188', 'Ya hemos revisado y tiene dos. Con esos creo que será suficiente. :)', '2023-05-06 07:10:57', 0),
(13, 'f0i8clag1971681836379271', 'cdkf1q1fd9d1681835903188', 'admin', 'Gracias', '2023-05-06 07:10:57', 0),
(14, 'f0i8clag1971681836379271', 'admin', 'cdkf1q1fd9d1681835903188', 'Sin problema.', '2023-05-06 07:10:57', 0),
(15, 'f0i8clag1971681836379271', 'cdkf1q1fd9d1681835903188', 'admin', 'Mañana no llevaremos a Lina porque tiene catarro.', '2023-05-06 07:10:57', 0),
(16, 'f0i8clag1971681836379271', 'admin', 'l4t0mlgr4921681835142093', 'Gracias por avisarnos! Esperamos que se recupere pronto', '2023-05-06 07:10:57', 0),
(17, 'mtpc4rhmbqe1681837125691', 'ieh4qdpsmsk1681836775915', 'admin', 'Buenos días, Camila se dejó ayer un saco azul en la guardería, lo podrían guardar por favor?', '2023-05-06 07:11:26', 0),
(19, 'mtpc4rhmbqe1681837125691', 'admin', 'ieh4qdpsmsk1681836775915', 'Ya le pregunte a su profesora Raquel, dice que se lo guardo en su bolsa. Saludos', '2023-05-06 07:11:26', 0),
(20, 'mtpc4rhmbqe1681837125691', 'ieh4qdpsmsk1681836775915', 'admin', 'Perfecto, muchas gracias!', '2023-05-06 07:11:26', 0),
(21, 'iq0pfocrge31681837220629', 'iq0pfocrge31681837220629', 'admin', 'Buenas tardes, ¿podrían decirme cómo siguió Nicolas?, le dolía el estómago esta mañana.', '2023-05-06 12:48:12', 0),
(22, 'iq0pfocrge31681837220629', 'admin', 'iq0pfocrge31681837220629', 'Ha estado jugando con otros niños y bebiendo mucha agua. No se ha quejado de dolor hasta el momento.', '2023-05-06 12:49:44', 0),
(23, 'jal5oq4iebg1681837956808', 'admin', 'eqcld479cgh1681837710331', 'Buenos días, a Paulina se le cayó un diente solito mientras comía un poco de manzana. :)', '2023-05-06 07:13:10', 0),
(24, 'jal5oq4iebg1681837956808', 'eqcld479cgh1681837710331', 'admin', 'Perfecto, muchas gracias por avisarnos!', '2023-05-06 07:13:10', 0),
(29, 'c50dp1g8s8a1682534619079', 'admin', 'el646s7t8ce1682534298648', 'Carla se dejó el biberón!', '2023-05-06 07:29:21', 0),
(30, 'hm4ne0fdbfr1681837532352', 'admin', 'iq0pfocrge31681837220629', 'A Nicolás se le cayó un diente!', '2023-05-06 07:29:42', 0),
(31, '1qp2eolg0d5j1681835703128', 'l4t0mlgr4921681835142093', 'admin', 'Buenos días, Esteban sigue con fiebre así que hoy no asistirá. Gracias', '2023-05-07 08:30:57', 0),
(32, 'f0i8clag1971681836379271', 'cdkf1q1fd9d1681835903188', 'admin', 'Buenos días', '2023-05-07 10:14:18', 0),
(33, 'mtpc4rhmbqe1681837125691', 'ieh4qdpsmsk1681836775915', 'admin', 'Camila no irá hoy a la guardería.', '2023-05-07 10:20:58', 0),
(34, 'hm4ne0fdbfr1681837532352', 'iq0pfocrge31681837220629', 'admin', 'Gracias por avisarnos!', '2023-05-07 18:19:41', NULL),
(35, '044tbn5d56fqf1683560354574', 'ibqio4tmt691682959546306', 'admin', 'Hola! buenos días, cómo siguió Liam?', '2023-05-08 15:41:19', NULL),
(36, '044tbn5d56fqf1683560354574', 'admin', 'ibqio4tmt691682959546306', 'Mucho mejor! ya esta jugando con otros niños.', '2023-05-08 15:49:21', NULL),
(37, '4ldn17s3i5b1683563309325', 'prm9hof3gf71683559834611', 'admin', 'Buenos dias! ', '2023-05-08 16:30:26', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `checkedin`
--

CREATE TABLE `checkedin` (
  `idIngreso` int(11) NOT NULL,
  `idChild` varchar(100) NOT NULL,
  `idMonitorCheckIn` varchar(100) NOT NULL,
  `sala` int(11) NOT NULL,
  `idTutorDrop` varchar(100) NOT NULL,
  `idAutorizadoDrop` varchar(100) NOT NULL,
  `horaIngreso` datetime NOT NULL,
  `horaSalida` datetime DEFAULT NULL,
  `idMonitorCheckOut` varchar(100) DEFAULT NULL,
  `idTutorPickUp` varchar(100) DEFAULT NULL,
  `idAutorizadoPickUp` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `checkedin`
--

INSERT INTO `checkedin` (`idIngreso`, `idChild`, `idMonitorCheckIn`, `sala`, `idTutorDrop`, `idAutorizadoDrop`, `horaIngreso`, `horaSalida`, `idMonitorCheckOut`, `idTutorPickUp`, `idAutorizadoPickUp`) VALUES
(108, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', 1, '', '9g0irdf2jfo1681835703128', '2023-04-30 12:32:30', '2023-05-07 20:21:21', 'angelica_gonzalez', '38n3baq42fqo1681835703128', '9g0irdf2jfo1681835703128'),
(109, 'f0i8clag1971681836379271', 'angelica_gonzalez', 1, 'ijbeirc8hao1681836379271', '', '2023-04-30 12:33:33', '2023-05-07 20:16:07', 'angelica_gonzalez', 'ijbeirc8hao1681836379271', 'otn9lf85q3n1681836379271'),
(110, 'hm4ne0fdbfr1681837532352', 'angelica_gonzalez', 1, 'hg303pg159a1681837532352', '', '2023-04-30 12:33:40', '2023-05-07 20:16:15', 'angelica_gonzalez', 'hg303pg159a1681837532352', 'bdg60hksne61681837532352'),
(111, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', 1, '38n3baq42fqo1681835703128', '', '2023-04-30 12:34:18', '2023-05-07 20:21:21', 'angelica_gonzalez', '38n3baq42fqo1681835703128', '9g0irdf2jfo1681835703128'),
(112, 'c50dp1g8s8a1682534619079', 'angelica_gonzalez', 1, '0kqd0g0hbakm1682534619079', '', '2023-04-30 12:34:26', '2023-05-07 20:21:26', 'angelica_gonzalez', '0kqd0g0hbakm1682534619079', 'tj3fhkttcnd1682534619079'),
(113, 'f0i8clag1971681836379271', 'angelica_gonzalez', 1, 'ijbeirc8hao1681836379271', '', '2023-04-30 12:34:39', '2023-05-07 20:16:07', 'angelica_gonzalez', 'ijbeirc8hao1681836379271', 'otn9lf85q3n1681836379271'),
(114, 'hm4ne0fdbfr1681837532352', 'angelica_gonzalez', 1, 'hg303pg159a1681837532352', '', '2023-04-30 12:37:03', '2023-05-07 20:16:15', 'angelica_gonzalez', 'hg303pg159a1681837532352', 'bdg60hksne61681837532352'),
(115, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', 1, '38n3baq42fqo1681835703128', '', '2023-04-30 12:37:41', '2023-05-07 20:21:21', 'angelica_gonzalez', '38n3baq42fqo1681835703128', '9g0irdf2jfo1681835703128'),
(116, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', 3, '38n3baq42fqo1681835703128', '', '2023-04-30 13:29:55', '2023-05-07 20:21:21', 'angelica_gonzalez', '38n3baq42fqo1681835703128', '9g0irdf2jfo1681835703128'),
(117, 'f0i8clag1971681836379271', 'angelica_gonzalez', 1, 'ijbeirc8hao1681836379271', '', '2023-04-30 13:31:29', '2023-05-07 20:16:07', 'angelica_gonzalez', 'ijbeirc8hao1681836379271', 'otn9lf85q3n1681836379271'),
(118, 'jal5oq4iebg1681837956808', 'angelica_gonzalez', 2, '', 'djra5q8km4n1681837956808', '2023-04-30 13:31:37', '2023-05-07 20:16:22', 'angelica_gonzalez', 'ko1kfe5o3nc1681837956808', 'djra5q8km4n1681837956808'),
(119, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', 3, '38n3baq42fqo1681835703128', '', '2023-04-30 20:27:34', '2023-05-07 20:21:21', 'angelica_gonzalez', '38n3baq42fqo1681835703128', '9g0irdf2jfo1681835703128'),
(120, 'c50dp1g8s8a1682534619079', 'angelica_gonzalez', 1, '0kqd0g0hbakm1682534619079', '', '2023-04-30 20:27:39', '2023-05-07 20:21:26', 'angelica_gonzalez', '0kqd0g0hbakm1682534619079', 'tj3fhkttcnd1682534619079'),
(121, 'f0i8clag1971681836379271', 'angelica_gonzalez', 1, '', 'otn9lf85q3n1681836379271', '2023-04-30 20:27:44', '2023-05-07 20:16:07', 'angelica_gonzalez', 'ijbeirc8hao1681836379271', 'otn9lf85q3n1681836379271'),
(122, 'hm4ne0fdbfr1681837532352', 'angelica_gonzalez', 1, '', 'bdg60hksne61681837532352', '2023-05-01 12:58:45', '2023-05-07 20:16:15', 'angelica_gonzalez', 'hg303pg159a1681837532352', 'bdg60hksne61681837532352'),
(123, 'mtpc4rhmbqe1681837125691', 'angelica_gonzalez', 3, '', 'fk146kc9d0r1681837125691', '2023-05-01 13:43:50', '2023-05-07 20:21:17', 'angelica_gonzalez', 'qh517fr65n51681837125691', 'fk146kc9d0r1681837125691'),
(124, 'c50dp1g8s8a1682534619079', 'angelica_gonzalez', 1, '0kqd0g0hbakm1682534619079', '', '2023-05-01 18:45:00', '2023-05-07 20:21:26', 'angelica_gonzalez', '0kqd0g0hbakm1682534619079', 'tj3fhkttcnd1682534619079'),
(125, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', 3, '38n3baq42fqo1681835703128', '', '2023-05-01 22:16:26', '2023-05-07 20:21:21', 'angelica_gonzalez', '38n3baq42fqo1681835703128', '9g0irdf2jfo1681835703128'),
(128, 'jal5oq4iebg1681837956808', 'angelica_gonzalez', 2, 'ko1kfe5o3nc1681837956808', '', '2023-05-01 22:23:24', '2023-05-07 20:16:22', 'angelica_gonzalez', 'ko1kfe5o3nc1681837956808', 'djra5q8km4n1681837956808'),
(130, 'mtpc4rhmbqe1681837125691', 'angelica_gonzalez', 3, 'qh517fr65n51681837125691', '', '2023-05-02 11:15:08', '2023-05-07 20:21:17', 'angelica_gonzalez', 'qh517fr65n51681837125691', 'fk146kc9d0r1681837125691'),
(131, 'c50dp1g8s8a1682534619079', 'angelica_gonzalez', 1, '0kqd0g0hbakm1682534619079', '', '2023-05-02 11:15:12', '2023-05-07 20:21:26', 'angelica_gonzalez', '0kqd0g0hbakm1682534619079', 'tj3fhkttcnd1682534619079'),
(132, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', 3, '38n3baq42fqo1681835703128', '', '2023-05-02 11:15:17', '2023-05-07 20:21:21', 'angelica_gonzalez', '38n3baq42fqo1681835703128', '9g0irdf2jfo1681835703128'),
(133, 'f0i8clag1971681836379271', 'angelica_gonzalez', 1, 'ijbeirc8hao1681836379271', '', '2023-05-02 11:15:22', '2023-05-07 20:16:07', 'angelica_gonzalez', 'ijbeirc8hao1681836379271', ''),
(134, 'hm4ne0fdbfr1681837532352', 'angelica_gonzalez', 1, 'hg303pg159a1681837532352', '', '2023-05-02 23:37:53', '2023-05-07 20:16:15', 'angelica_gonzalez', 'hg303pg159a1681837532352', 'bdg60hksne61681837532352'),
(135, 'jal5oq4iebg1681837956808', 'angelica_gonzalez', 2, '', 'djra5q8km4n1681837956808', '2023-05-02 23:38:00', '2023-05-07 20:16:22', 'angelica_gonzalez', 'ko1kfe5o3nc1681837956808', 'djra5q8km4n1681837956808'),
(136, 'c50dp1g8s8a1682534619079', 'angelica_gonzalez', 1, '0kqd0g0hbakm1682534619079', '', '2023-05-02 23:55:02', '2023-05-07 20:21:26', 'angelica_gonzalez', '0kqd0g0hbakm1682534619079', 'tj3fhkttcnd1682534619079'),
(137, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', 3, '38n3baq42fqo1681835703128', '', '2023-05-02 23:55:06', '2023-05-07 20:21:21', 'angelica_gonzalez', '38n3baq42fqo1681835703128', '9g0irdf2jfo1681835703128'),
(138, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', 3, '', '9g0irdf2jfo1681835703128', '2023-05-04 19:12:19', '2023-05-07 20:21:21', 'angelica_gonzalez', '38n3baq42fqo1681835703128', '9g0irdf2jfo1681835703128'),
(139, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', 3, '9qsende7rqr1681835703128', '', '2023-05-06 08:29:21', '2023-05-07 20:21:21', 'angelica_gonzalez', '38n3baq42fqo1681835703128', '9g0irdf2jfo1681835703128'),
(140, 'c50dp1g8s8a1682534619079', 'angelica_gonzalez', 1, '0kqd0g0hbakm1682534619079', '', '2023-05-06 11:06:26', '2023-05-07 20:21:26', 'angelica_gonzalez', '0kqd0g0hbakm1682534619079', ''),
(141, 'f0i8clag1971681836379271', 'angelica_gonzalez', 1, '', 'otn9lf85q3n1681836379271', '2023-05-06 11:06:33', '2023-05-07 20:16:07', 'angelica_gonzalez', 'ijbeirc8hao1681836379271', ''),
(142, 'hm4ne0fdbfr1681837532352', 'angelica_gonzalez', 1, 'hg303pg159a1681837532352', '', '2023-05-06 11:06:38', '2023-05-07 20:16:15', 'angelica_gonzalez', 'hg303pg159a1681837532352', ''),
(143, 'mtpc4rhmbqe1681837125691', 'angelica_gonzalez', 3, 'qh517fr65n51681837125691', '', '2023-05-06 11:06:50', '2023-05-07 20:21:17', 'angelica_gonzalez', 'qh517fr65n51681837125691', 'fk146kc9d0r1681837125691'),
(144, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', 3, '38n3baq42fqo1681835703128', '', '2023-05-06 11:10:48', '2023-05-07 20:21:21', 'angelica_gonzalez', '38n3baq42fqo1681835703128', '9g0irdf2jfo1681835703128'),
(145, 'jal5oq4iebg1681837956808', 'angelica_gonzalez', 2, 'ko1kfe5o3nc1681837956808', '', '2023-05-06 14:56:36', '2023-05-07 20:16:22', 'angelica_gonzalez', NULL, 'djra5q8km4n1681837956808'),
(146, 'mtpc4rhmbqe1681837125691', 'angelica_gonzalez', 3, 'qh517fr65n51681837125691', '', '2023-05-07 19:39:44', '2023-05-07 20:21:17', 'angelica_gonzalez', 'qh517fr65n51681837125691', 'fk146kc9d0r1681837125691'),
(147, 'mtpc4rhmbqe1681837125691', 'angelica_gonzalez', 3, 'qh517fr65n51681837125691', '', '2023-05-07 19:41:33', '2023-05-07 20:21:17', 'angelica_gonzalez', 'qh517fr65n51681837125691', ''),
(148, 'c50dp1g8s8a1682534619079', 'angelica_gonzalez', 1, '', 'tj3fhkttcnd1682534619079', '2023-05-07 19:41:56', '2023-05-07 20:21:26', 'angelica_gonzalez', '0kqd0g0hbakm1682534619079', ''),
(149, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', 3, '', '9g0irdf2jfo1681835703128', '2023-05-07 19:42:01', '2023-05-07 20:21:21', 'angelica_gonzalez', '38n3baq42fqo1681835703128', ''),
(150, 'mtpc4rhmbqe1681837125691', 'angelica_gonzalez', 3, 'qh517fr65n51681837125691', '', '2023-05-07 20:21:44', NULL, NULL, NULL, ''),
(151, 'c50dp1g8s8a1682534619079', 'angelica_gonzalez', 1, '0kqd0g0hbakm1682534619079', '', '2023-05-07 20:21:50', NULL, NULL, NULL, ''),
(152, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', 3, '38n3baq42fqo1681835703128', '', '2023-05-07 20:21:54', NULL, NULL, NULL, ''),
(153, 'f0i8clag1971681836379271', 'angelica_gonzalez', 1, 'ijbeirc8hao1681836379271', '', '2023-05-07 20:21:58', NULL, NULL, NULL, ''),
(154, 'jal5oq4iebg1681837956808', 'angelica_gonzalez', 2, '', 'djra5q8km4n1681837956808', '2023-05-07 20:22:07', NULL, NULL, NULL, ''),
(155, 'hm4ne0fdbfr1681837532352', 'angelica_gonzalez', 1, 'hg303pg159a1681837532352', '', '2023-05-07 20:56:24', NULL, NULL, NULL, ''),
(156, '044tbn5d56fqf1683560354574', 'angelica_gonzalez', 3, 'k9qdpsti9ds1683560354574', '', '2023-05-08 17:45:36', NULL, NULL, NULL, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `children`
--

CREATE TABLE `children` (
  `idChild` varchar(100) NOT NULL,
  `nombreBebe` varchar(50) NOT NULL,
  `apellido1Bebe` varchar(50) NOT NULL,
  `apellido2Bebe` varchar(50) NOT NULL,
  `genero` varchar(8) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `lugarNacimiento` varchar(50) NOT NULL,
  `isTakingMed` tinyint(1) NOT NULL,
  `medicamentoTomado` varchar(50) DEFAULT NULL,
  `isAllergicToMed` tinyint(1) NOT NULL,
  `medicamentoAlergia` varchar(50) DEFAULT NULL,
  `hasFoodAllergy` tinyint(1) NOT NULL,
  `alergeno` varchar(50) DEFAULT NULL,
  `alergias` varchar(100) DEFAULT NULL,
  `hasDisability` tinyint(1) NOT NULL,
  `discapacidad` varchar(150) DEFAULT NULL,
  `foto` varchar(250) NOT NULL,
  `checkedIn` tinyint(1) NOT NULL,
  `dailyReportReady` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `children`
--

INSERT INTO `children` (`idChild`, `nombreBebe`, `apellido1Bebe`, `apellido2Bebe`, `genero`, `fechaNacimiento`, `lugarNacimiento`, `isTakingMed`, `medicamentoTomado`, `isAllergicToMed`, `medicamentoAlergia`, `hasFoodAllergy`, `alergeno`, `alergias`, `hasDisability`, `discapacidad`, `foto`, `checkedIn`, `dailyReportReady`) VALUES
('044tbn5d56fqf1683560354574', 'Liam', 'Sanabria', 'Lozano', 'hombre', '2020-10-10', 'Madrid', 0, '', 0, '', 0, '', '', 0, '', '1683559949474alvin-mahmudov-D3H1opzzq68-unsplash.jpg', 1, 1),
('1qp2eolg0d5j1681835703128', 'Esteban', 'Duarte', 'Rodriguez', 'hombre', '2021-03-17', 'León', 1, 'aspirina', 0, '', 0, '', '', 0, '', '1681835187583rameez-remy-b.jpg', 1, 1),
('3ecb1p69oap1683562940299', 'Ariadne', 'Martinez', 'Sanchez', 'mujer', '2022-10-10', 'León', 0, '', 0, '', 0, '', '', 0, '', '1683562736088christian-bowen-luvoSGWkyX0-unsplash.jpg', 0, NULL),
('4ldn17s3i5b1683563309325', 'Carlos', 'Martinez', 'Sanchez', 'hombre', '2022-05-11', 'León', 0, '', 0, '', 0, '', '', 0, '', '1683563152320carlos-martinez-RemPPN_hEng-unsplash.jpg', 0, NULL),
('c50dp1g8s8a1682534619079', 'Carla', 'Sanchez ', 'Avila', 'mujer', '2022-10-10', 'León', 1, 'Aspirina', 0, '', 0, '', '', 0, '', '1682534392874pexels-shanice-mckenzie-774910.jpg', 1, 1),
('f0i8clag1971681836379271', 'Lina', 'Morris', 'Rubiano', 'mujer', '2023-01-01', 'León', 0, '', 1, 'penicilina', 0, '', '', 1, 'autismo', '1681835953208adele-morris-.jpg', 1, 1),
('hm4ne0fdbfr1681837532352', 'Nicolás', 'Martinez ', 'Diez', 'hombre', '2022-10-01', 'León', 1, 'jarabe para la tos', 0, '', 1, 'Nueces', 'ingestion, olfato, tacto', 0, '', '1681837365439hermes-rivera.jpg', 1, 1),
('jal5oq4iebg1681837956808', 'Paulina', 'Urrea Gónzalez', 'Acevedo', 'mujer', '2021-06-01', 'León', 0, '', 1, 'aspirina', 0, '', '', 1, 'Autismo', '1681837775751jen-theodore.jpg', 1, 1),
('mtpc4rhmbqe1681837125691', 'Camila', 'Hernandez', 'Pongutá', 'mujer', '2020-10-10', 'Málaga', 1, 'aspirina', 0, '', 1, 'fresas', 'ingestion', 0, '', '1681836962278barrett-.jpg', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deposiciones`
--

CREATE TABLE `deposiciones` (
  `id_deposiciones` int(100) NOT NULL,
  `idChild` varchar(100) NOT NULL,
  `idMonitor` varchar(100) NOT NULL,
  `fechayhora` datetime DEFAULT NULL,
  `consistencia` varchar(20) DEFAULT NULL,
  `cambio_panal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `deposiciones`
--

INSERT INTO `deposiciones` (`id_deposiciones`, `idChild`, `idMonitor`, `fechayhora`, `consistencia`, `cambio_panal`) VALUES
(154, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-05-03 21:19:15', 'blanda', 1),
(155, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-05-03 21:19:19', 'blanda', 2),
(156, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-05-02 21:19:53', 'liquida', 1),
(157, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-05-02 21:19:56', 'liquida', 2),
(158, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-05-02 21:19:58', 'blanda', 3),
(159, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-05-01 10:20:48', 'blanda', 1),
(160, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-04-28 21:20:52', 'blanda', 2),
(161, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-04-28 21:20:54', 'liquida', 3),
(162, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-05-04 21:21:56', 'dura', 1),
(163, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-05-04 21:22:01', 'blanda', 2),
(164, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-05-04 21:22:03', 'blanda', 3),
(165, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-05-04 21:22:05', 'blanda', 4),
(166, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-05-06 08:29:31', 'blanda', 1),
(167, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-05-06 08:29:35', 'blanda', 2),
(168, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-05-05 08:29:42', 'blanda', 3),
(169, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-05-06 08:32:17', 'blanda', 1),
(170, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-05-05 08:32:19', 'blanda', 2),
(171, 'f0i8clag1971681836379271', 'angelica_gonzalez', '2023-05-06 11:15:04', 'blanda', 1),
(172, 'f0i8clag1971681836379271', 'angelica_gonzalez', '2023-05-06 11:15:21', 'blanda', 2),
(173, 'f0i8clag1971681836379271', 'angelica_gonzalez', '2023-05-07 10:15:04', 'dura', 1),
(174, 'mtpc4rhmbqe1681837125691', 'angelica_gonzalez', '2023-05-06 14:43:32', 'blanda', 1),
(175, 'mtpc4rhmbqe1681837125691', 'angelica_gonzalez', '2023-05-06 14:43:33', 'blanda', 2),
(176, 'c50dp1g8s8a1682534619079', 'angelica_gonzalez', '2023-05-06 14:43:47', 'liquida', 1),
(177, 'c50dp1g8s8a1682534619079', 'angelica_gonzalez', '2023-05-06 14:43:49', 'blanda', 2),
(179, 'hm4ne0fdbfr1681837532352', 'angelica_gonzalez', '2023-05-06 14:44:05', 'blanda', 2),
(180, 'jal5oq4iebg1681837956808', 'angelica_gonzalez', '2023-05-06 14:57:01', 'blanda', 1),
(181, 'jal5oq4iebg1681837956808', 'angelica_gonzalez', '2023-05-06 14:57:05', 'blanda', 2),
(184, 'mtpc4rhmbqe1681837125691', 'angelica_gonzalez', '2023-05-07 08:35:45', 'blanda', 1),
(185, 'mtpc4rhmbqe1681837125691', 'angelica_gonzalez', '2023-05-07 08:35:47', 'blanda', 2),
(187, 'c50dp1g8s8a1682534619079', 'angelica_gonzalez', '2023-05-07 08:36:33', 'blanda', 1),
(188, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-05-07 08:36:48', 'dura', 1),
(189, '1qp2eolg0d5j1681835703128', 'angelica_gonzalez', '2023-05-07 08:36:50', 'dura', 2),
(190, 'hm4ne0fdbfr1681837532352', 'angelica_gonzalez', '2023-05-07 08:37:02', 'blanda', 1),
(191, 'hm4ne0fdbfr1681837532352', 'angelica_gonzalez', '2023-05-07 08:37:04', 'dura', 2),
(192, 'jal5oq4iebg1681837956808', 'angelica_gonzalez', '2023-05-07 08:37:14', 'dura', 1),
(193, 'jal5oq4iebg1681837956808', 'angelica_gonzalez', '2023-05-07 08:37:16', 'dura', 2),
(194, 'jal5oq4iebg1681837956808', 'angelica_gonzalez', '2023-05-07 08:37:18', 'blanda', 3),
(195, 'c50dp1g8s8a1682534619079', 'angelica_gonzalez', '2023-05-07 08:44:36', 'blanda', 2),
(196, 'c50dp1g8s8a1682534619079', 'angelica_gonzalez', '2023-05-07 08:58:26', 'blanda', 3),
(199, 'mtpc4rhmbqe1681837125691', 'angelica_gonzalez', '2023-05-08 17:46:58', 'liquida', 1),
(200, 'mtpc4rhmbqe1681837125691', 'angelica_gonzalez', '2023-05-08 17:47:00', 'liquida', 2),
(201, 'mtpc4rhmbqe1681837125691', 'angelica_gonzalez', '2023-05-08 17:47:02', 'blanda', 3),
(202, 'c50dp1g8s8a1682534619079', 'angelica_gonzalez', '2023-05-08 17:47:11', '', 1),
(203, 'c50dp1g8s8a1682534619079', 'angelica_gonzalez', '2023-05-08 17:47:13', 'blanda', 2),
(204, '044tbn5d56fqf1683560354574', 'angelica_gonzalez', '2023-05-08 17:47:27', 'blanda', 1),
(205, '044tbn5d56fqf1683560354574', 'angelica_gonzalez', '2023-05-08 17:47:28', 'blanda', 2),
(206, 'f0i8clag1971681836379271', 'angelica_gonzalez', '2023-05-08 17:47:36', 'blanda', 2),
(207, 'f0i8clag1971681836379271', 'angelica_gonzalez', '2023-05-08 17:47:38', 'liquida', 1),
(208, 'hm4ne0fdbfr1681837532352', 'angelica_gonzalez', '2023-05-08 17:47:47', 'liquida', 1),
(209, 'hm4ne0fdbfr1681837532352', 'angelica_gonzalez', '2023-05-08 17:47:50', 'blanda', 2),
(210, 'hm4ne0fdbfr1681837532352', 'angelica_gonzalez', '2023-05-08 17:47:52', 'blanda', 3),
(211, 'jal5oq4iebg1681837956808', 'angelica_gonzalez', '2023-05-08 17:48:00', 'blanda', 1),
(212, 'jal5oq4iebg1681837956808', 'angelica_gonzalez', '2023-05-08 17:48:01', 'blanda', 2),
(213, 'jal5oq4iebg1681837956808', 'angelica_gonzalez', '2023-05-08 17:48:03', 'blanda', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matricula`
--

CREATE TABLE `matricula` (
  `idMatricula` int(11) NOT NULL,
  `idUsuario` varchar(100) NOT NULL,
  `idChild` varchar(100) NOT NULL,
  `idTutor1` varchar(100) NOT NULL,
  `idTutor2` varchar(100) DEFAULT NULL,
  `idAutorizado1` varchar(100) DEFAULT NULL,
  `idAutorizado2` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `matricula`
--

INSERT INTO `matricula` (`idMatricula`, `idUsuario`, `idChild`, `idTutor1`, `idTutor2`, `idAutorizado1`, `idAutorizado2`) VALUES
(17, 'l4t0mlgr4921681835142093', '1qp2eolg0d5j1681835703128', '38n3baq42fqo1681835703128', '9qsende7rqr1681835703128', '9g0irdf2jfo1681835703128', 'tj3fhkttcnd1682534619079'),
(18, 'cdkf1q1fd9d1681835903188', 'f0i8clag1971681836379271', 'ijbeirc8hao1681836379271', NULL, 'otn9lf85q3n1681836379271', NULL),
(19, 'ieh4qdpsmsk1681836775915', 'mtpc4rhmbqe1681837125691', 'qh517fr65n51681837125691', 'lkmc9qg3bdl1681837125691', 'fk146kc9d0r1681837125691', NULL),
(20, 'iq0pfocrge31681837220629', 'hm4ne0fdbfr1681837532352', 'hg303pg159a1681837532352', '5iqkf7erca8l1681837532352', 'bdg60hksne61681837532352', NULL),
(21, 'eqcld479cgh1681837710331', 'jal5oq4iebg1681837956808', 'ko1kfe5o3nc1681837956808', 'scre381foda1681837956808', 'djra5q8km4n1681837956808', NULL),
(22, 'el646s7t8ce1682534298648', 'c50dp1g8s8a1682534619079', '0kqd0g0hbakm1682534619079', 'n2gfrnq4me71682534619079', 'tj3fhkttcnd1682534619079', NULL),
(49, 'ibqio4tmt691682959546306', '044tbn5d56fqf1683560354574', 'k9qdpsti9ds1683560354574', NULL, '191mjk5a56gp1683560354574', NULL),
(50, 'shaqepoqj21683561354717', '3ecb1p69oap1683562940299', '0nb0gf6atmhc1683562940299', NULL, 'bh89ra7lfs91683562940299', NULL),
(51, 'prm9hof3gf71683559834611', '4ldn17s3i5b1683563309325', '067rnd42jfs1c1683563309325', '08l184lr3q451683563309325', 'cf9ql3mk3251683563309325', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `monitores`
--

CREATE TABLE `monitores` (
  `idMonitor` varchar(100) NOT NULL,
  `nombreMonitor` varchar(50) NOT NULL,
  `apellidoMonitor` varchar(50) NOT NULL,
  `passwordMonitor` varchar(256) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `monitores`
--

INSERT INTO `monitores` (`idMonitor`, `nombreMonitor`, `apellidoMonitor`, `passwordMonitor`, `activo`) VALUES
('angelica_gonzalez', 'Angelica', 'Gonzalez', '6112e4880750c5c85f47839c91a2502f291a2657d715d2ab4fdc06e14dfa82f152f234dd1db93d646434a5bfdce807e1e79cf031a54f969f84b47ebe5273dad0', 1),
('raquel_beltran', 'Raquel', 'Beltran Acevedo', '6112e4880750c5c85f47839c91a2502f291a2657d715d2ab4fdc06e14dfa82f152f234dd1db93d646434a5bfdce807e1e79cf031a54f969f84b47ebe5273dad0', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pickuplist`
--

CREATE TABLE `pickuplist` (
  `idAutorizado` varchar(100) NOT NULL,
  `nombreAutorizado` varchar(50) DEFAULT NULL,
  `apellidosAutorizado` varchar(50) DEFAULT NULL,
  `relacionAutorizado` varchar(20) DEFAULT NULL,
  `dniAutorizado` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pickuplist`
--

INSERT INTO `pickuplist` (`idAutorizado`, `nombreAutorizado`, `apellidosAutorizado`, `relacionAutorizado`, `dniAutorizado`) VALUES
('191mjk5a56gp1683560354574', 'Marcela', 'Sarmiento', 'Abuela', '99999999B'),
('7ogso0k2k2i1682968191337', 'a', 'a', 'a', '22222222A'),
('9g0irdf2jfo1681835703128', 'Amalia', 'Duarte', 'abuela', '78787876S'),
('bdg60hksne61681837532352', 'Andrea', 'Martinez Lopez', 'tia', '76765544E'),
('bh89ra7lfs91683562940299', 'Sara', 'Sanchez', 'prima', '88877766A'),
('cf9ql3mk3251683563309325', 'Clara ', 'Martinez', 'tia', '77778899S'),
('djra5q8km4n1681837956808', 'Marta', 'Urrea Perez', 'abuela', '77665566R'),
('fk146kc9d0r1681837125691', 'Aurora', 'Pongutá', 'tia', '89876767A'),
('gbi18fiot361682968869380', 'W', 'W', 'W', '33333333A'),
('ne3f5m5earj1682968737823', 'a', 'a', 'a', '22222222A'),
('otn9lf85q3n1681836379271', 'Carmen', 'Morris', 'Abuela', '89897766A'),
('qpi83qeknbo1682971483339', 'A', 'A', 'A', 'Y7675656A'),
('taag17rid4a1682972536673', 'Adriana', 'Sarmiento', 'tia', '99999999A'),
('thfd2ot7rem1682971210355', 'Carolina', 'Pedraza', 'amiga', 'Y6665656A'),
('tj3fhkttcnd1682534619079', 'Marcela ', 'Sanchez Espinosa', 'tía', '78765555A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportediario`
--

CREATE TABLE `reportediario` (
  `idreporte` varchar(100) NOT NULL,
  `fechayhora` datetime DEFAULT NULL,
  `idMonitor` varchar(100) NOT NULL,
  `idChild` varchar(100) NOT NULL,
  `desayuno` varchar(11) DEFAULT NULL,
  `merienda` varchar(11) DEFAULT NULL,
  `comida` varchar(11) DEFAULT NULL,
  `siesta` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reportediario`
--

INSERT INTO `reportediario` (`idreporte`, `fechayhora`, `idMonitor`, `idChild`, `desayuno`, `merienda`, `comida`, `siesta`) VALUES
('DuarteEsteban2023-5-1', '2023-05-01 23:36:19', 'angelica_gonzalez', '1qp2eolg0d5j1681835703128', 'mucho', 'bastante', 'bastante', '15'),
('DuarteEsteban2023-5-2', '2023-05-02 23:36:19', 'angelica_gonzalez', '1qp2eolg0d5j1681835703128', 'bastante', 'poco', 'bastante', '30'),
('DuarteEsteban2023-5-3', '2023-05-03 00:03:12', 'angelica_gonzalez', '1qp2eolg0d5j1681835703128', 'poco', 'bastante', 'mucho', '40'),
('DuarteEsteban2023-5-4', '2023-05-04 21:16:50', 'angelica_gonzalez', '1qp2eolg0d5j1681835703128', 'poco', 'bastante', 'mucho', '40'),
('DuarteEsteban2023-5-5', '2023-05-05 08:29:57', 'angelica_gonzalez', '1qp2eolg0d5j1681835703128', 'todo', 'todo', 'mucho', '15'),
('DuarteEsteban2023-5-6', '2023-05-06 08:36:19', 'angelica_gonzalez', '1qp2eolg0d5j1681835703128', 'poco', 'bastante', 'mucho', '15'),
('DuarteEsteban2023-5-7', '2023-05-07 20:47:13', 'angelica_gonzalez', '1qp2eolg0d5j1681835703128', 'mucho', 'mucho', 'todo', '15'),
('DuarteEsteban2023-5-8', '2023-05-08 17:47:23', 'angelica_gonzalez', '1qp2eolg0d5j1681835703128', 'poco', 'bastante', 'poco', '15'),
('HernandezCamila2023-5-2', '2023-05-02 23:39:50', 'angelica_gonzalez', 'mtpc4rhmbqe1681837125691', 'bastante', 'mucho', 'mucho', '60'),
('HernandezCamila2023-5-6', '2023-05-06 14:43:42', 'angelica_gonzalez', 'mtpc4rhmbqe1681837125691', 'poco', 'bastante', 'mucho', '30'),
('HernandezCamila2023-5-7', '2023-05-07 20:32:10', 'angelica_gonzalez', 'mtpc4rhmbqe1681837125691', 'poco', 'bastante', 'poco', '30'),
('HernandezCamila2023-5-8', '2023-05-08 17:47:06', 'angelica_gonzalez', 'mtpc4rhmbqe1681837125691', 'bastante', 'bastante', 'poco', '30'),
('Martinez Nicolás2023-5-2', '2023-05-02 23:38:24', 'angelica_gonzalez', 'hm4ne0fdbfr1681837532352', 'poco', 'bastante', 'bastante', '40'),
('Martinez Nicolás2023-5-6', '2023-05-06 14:44:08', 'angelica_gonzalez', 'hm4ne0fdbfr1681837532352', 'poco', 'poco', 'bastante', '60'),
('Martinez Nicolás2023-5-7', '2023-05-07 19:19:21', 'angelica_gonzalez', 'hm4ne0fdbfr1681837532352', 'poco', 'poco', 'poco', '90'),
('Martinez Nicolás2023-5-8', '2023-05-08 17:47:56', 'angelica_gonzalez', 'hm4ne0fdbfr1681837532352', 'bastante', 'mucho', 'todo', '40'),
('MorrisLina2023-5-2', '2023-05-02 23:37:02', 'angelica_gonzalez', 'f0i8clag1971681836379271', 'bastante', 'mucho', 'todo', '30'),
('MorrisLina2023-5-6', '2023-05-06 11:15:50', 'angelica_gonzalez', 'f0i8clag1971681836379271', 'poco', 'mucho', 'todo', '60'),
('MorrisLina2023-5-7', '2023-05-07 20:12:08', 'angelica_gonzalez', 'f0i8clag1971681836379271', 'mucho', 'poco', 'poco', '15'),
('MorrisLina2023-5-8', '2023-05-08 17:47:42', 'angelica_gonzalez', 'f0i8clag1971681836379271', 'poco', 'poco', 'poco', '60'),
('SanabriaLiam2023-5-8', '2023-05-08 17:47:32', 'angelica_gonzalez', '044tbn5d56fqf1683560354574', 'mucho', 'mucho', 'todo', '60'),
('Sanchez Carla2023-5-2', '2023-05-02 23:39:41', 'angelica_gonzalez', 'c50dp1g8s8a1682534619079', 'poco', 'bastante', 'bastante', '30'),
('Sanchez Carla2023-5-3', '2023-05-03 00:03:03', 'angelica_gonzalez', 'c50dp1g8s8a1682534619079', 'poco', 'bastante', 'poco', '30'),
('Sanchez Carla2023-5-6', '2023-05-06 14:43:55', 'angelica_gonzalez', 'c50dp1g8s8a1682534619079', 'todo', 'todo', 'mucho', '90'),
('Sanchez Carla2023-5-7', '2023-05-07 08:36:42', 'angelica_gonzalez', 'c50dp1g8s8a1682534619079', 'bastante', 'todo', 'poco', '60'),
('Sanchez Carla2023-5-8', '2023-05-08 17:47:17', 'angelica_gonzalez', 'c50dp1g8s8a1682534619079', 'bastante', 'bastante', 'todo', '90'),
('Urrea GónzalezPaulina2023-5-2', '2023-05-02 23:39:03', 'angelica_gonzalez', 'jal5oq4iebg1681837956808', 'poco', 'bastante', 'mucho', '30'),
('Urrea GónzalezPaulina2023-5-6', '2023-05-06 14:57:13', 'angelica_gonzalez', 'jal5oq4iebg1681837956808', 'mucho', 'bastante', 'poco', '60'),
('Urrea GónzalezPaulina2023-5-7', '2023-05-07 20:53:03', 'angelica_gonzalez', 'jal5oq4iebg1681837956808', 'mucho', 'todo', 'bastante', '30'),
('Urrea GónzalezPaulina2023-5-8', '2023-05-08 17:48:07', 'angelica_gonzalez', 'jal5oq4iebg1681837956808', 'poco', 'poco', 'mucho', '40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutors`
--

CREATE TABLE `tutors` (
  `idTutor` varchar(100) NOT NULL,
  `nombreTutor` varchar(50) NOT NULL,
  `apellidosTutor` varchar(100) NOT NULL,
  `relacion` varchar(25) NOT NULL,
  `lugarNacimientoTutor` varchar(50) NOT NULL,
  `fechaNacimientoTutor` date NOT NULL,
  `dni` varchar(9) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tutors`
--

INSERT INTO `tutors` (`idTutor`, `nombreTutor`, `apellidosTutor`, `relacion`, `lugarNacimientoTutor`, `fechaNacimientoTutor`, `dni`, `direccion`, `telefono`) VALUES
('067rnd42jfs1c1683563309325', 'Catalina', 'Ortega Jimenez', 'madre', 'Leon', '2000-12-12', '99887766A', 'Av 1.', 647484848),
('08l184lr3q451683563309325', 'Carlos', 'Sanchez Saavedra', 'padre', 'León', '2000-02-10', '99998877S', 'Av Nocedo 2', 65677777),
('0kqd0g0hbakm1682534619079', 'Juan Carlos', 'Sanchez Perez', 'padre', 'León', '1988-10-10', '78765656A', 'Av Real 2', 998788878),
('0nb0gf6atmhc1683562940299', 'Ernesto', 'Diez Alonso', 'padre', 'León', '1989-09-06', '99999999A', 'Av 1', 656671122),
('38n3baq42fqo1681835703128', 'Felipe', 'Duarte', 'padre', 'León', '2000-01-18', '98987676A', 'Av Nocedo 2', 647876754),
('5iqkf7erca8l1681837532352', 'Maria Camila', 'Diez Rubio', 'madre', 'Valladolid', '1999-05-10', '76765545S', 'Calle Mayor 2', 647886655),
('9qsende7rqr1681835703128', 'Luz', 'Rodriguez', 'madre', 'León', '2000-02-18', '98675644B', 'Av Nocedo 2', 648767657),
('cd320lqcjfb1682971210355', 'Cesar', 'Sarmiento', 'padre', 'León', '2001-10-10', '99999999A', 'Av Real 2', 2147483647),
('hdbmn73kqop1682971483339', 'Cesar', 'Sarmiento', 'padre', 'León', '2001-10-10', '88888888A', 'A', 343434343),
('hg303pg159a1681837532352', 'Pedro', 'Martinez Lopez', 'padre', 'León', '1985-10-10', '88774433A', 'Calle Mayor 2', 647887767),
('ijbeirc8hao1681836379271', 'Mónica ', 'Rubiano Sanchez', 'madre', 'Valladolid', '2000-10-02', '87876767A', 'Calle Real 4', 648765656),
('k9qdpsti9ds1683560354574', 'Cesar', 'Sarmiento Gonzakez', 'padre', 'León', '2001-10-10', 'Y9998888S', 'Av Jimenez', 676776767),
('ko1kfe5o3nc1681837956808', 'Julian ', 'Urrea Duarte', 'padre', 'León', '1987-02-03', '66554888S', 'Calle Albornoz 33', 647887676),
('ljn9obrfnef1681836379271', 'Anders', 'Morris', 'padre', 'Madrid', '1988-10-10', '67675645D', 'Calle Real 4', 648776654),
('lkmc9qg3bdl1681837125691', 'Marcos', 'Hernandez Sanabria', 'padre', 'Málaga', '2001-10-10', '87876655S', 'calle Benavides 3', 648767655),
('n2gfrnq4me71682534619079', 'Carolina', 'Avila Vega', 'madre', 'León', '1999-10-10', '87878888A', 'Av Real 2', 648786766),
('qh517fr65n51681837125691', 'Viviana', 'Pongutá Saavedra', 'madre', 'Sevilla', '2000-10-10', '76767655A', 'Calle Benavides 3', 648765656),
('scre381foda1681837956808', 'Vanessa', 'Gónzalez', 'madre', 'Sevilla', '1999-04-10', 'Y6563453S', 'Calle Albornoz 33', 648765544),
('t9iln32850t1682972536673', 'Cesar', 'Sarmiento', 'padre', 'León', '2001-10-10', '99999999A', 'A', 2323232);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idUsuario` varchar(100) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(70) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `lugarNacimiento` varchar(20) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `email` varchar(80) NOT NULL,
  `contrasena` varchar(260) NOT NULL,
  `tipo_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idUsuario`, `nombre`, `apellidos`, `fechaNacimiento`, `lugarNacimiento`, `usuario`, `email`, `contrasena`, `tipo_usuario`) VALUES
('admin', 'Andrea', 'Duarte', '2000-10-20', 'León', 'admin', 'admin@gmail.com', '9219866c5312d2d6e42847ae554952e378b0edca9731ff715d470586cce1657eefa73f2cc6a20c717de8170ac9001b054fe08d1dd830cf2b9adc8d65e28f1090', 0),
('cdkf1q1fd9d1681835903188', 'Mónica', 'Rubiano Sanchez', '2000-02-10', 'Valladolid', 'usuario2', 'correonuevo@gmail.com', 'd9a5608e0579a86a59db3f188e54a554a5c0184868464ca279d76f47a7afa6c6fd9d6e2e5d22665c424219ecc4c42966e99038abd6774d33c1c9f70f5669913d', 2),
('el646s7t8ce1682534298648', 'Juan Carlos', 'Sanchez Pedraza', '1999-10-10', 'León', 'usuario6', 'correonuevo@gmail.com', 'fd4244e7bc5d0da0dc883d06f5a54db14a347872a242d16fc0c02b2795fbf9bd5c2c7d89255ea08325f7a833fe60a1166b5bccbc30e1ba102d5546b937712bf1', 0),
('eqcld479cgh1681837710331', 'Julián', 'Urrea Duarte', '1987-03-02', 'Bogotá', 'usuario5', 'correonuevo@gmail.com', 'ba0da8cf9698dc96cf1322c895d609df83cfc467e81905c20eb407e56f4199d91c3278d8547dbc3a16e222891c60f32717db153a3ed2757f8d71696b2b9ad081', 2),
('i34oph3g98n1682856820923', 'Lorenzo', 'Acevedo', '1988-10-10', 'Leon', 'usuario10', 'maria@gmail.com', 'fb5d5c298eda80b71f14d0047389b6f102353ef30c286155e73377a06de3a2316b0d4ec89658048aec3878f8a81b2563ef180619207817da9afe0695c4762500', 0),
('ibqio4tmt691682959546306', 'Cesar', 'Sarmiento', '2001-10-10', 'León', 'usuario7', 'correonuevo@gmail.com', 'ef606f89e1b4600e3846e0882021dd3f9d208f588807755b481704cd43872f74d9965134899b2d10cbf92cbc9443ba78261f64b09896d10a078a3b2eeafade08', 0),
('ieh4qdpsmsk1681836775915', 'Viviana', 'Pongutá Saavedra', '1987-10-10', 'Sevilla', 'usuario3', 'pepi@example.com', '8092e9f622db3e7e19fc2d727406f8654b5396ae482ca91628e11e1617b7c51799b95b0afe1b9cb7d798c0ffc94b05057fe4ed800fde6b890a01278f220af589', 2),
('iq0pfocrge31681837220629', 'Pedro', 'Martinez Lopez', '1988-10-10', 'León', 'usuario4', 'correonuevo@gmail.com', 'cfc063d2c4c35792dbc3b1769e842120888b09b96255b05b440ec4eafd580574b771b4b4c7cc8d0e5119a3b1add129672e62650940f393d3dd32092b43b01199', 2),
('l4t0mlgr4921681835142093', 'Felipe', 'Duarte', '1988-10-10', 'Leon', 'usuario1', 'user1@gmail.com', 'e193af76063d59b27a79db5b6bd14a20e402ea56624f93cc7d953297d03c0deed684075df9be8986b34e80586e3fcfc6710b529b7d1d3c670bc1fb028d7e4904', 2),
('prm9hof3gf71683559834611', 'Catalina', 'Ortega', '2000-12-12', 'Leon', 'usuario8', 'hu@gmail.com', '88eb840f34c2f26d2f6b2b7400fce6545230f25263982f4905b6776b2afa54f697e8fe70cfaf99deccc00554578d1c5fc7acc686463fc083f869f774300be0b3', 0),
('shaqepoqj21683561354717', 'Ernesto', 'Diez Alonso', '1989-09-06', 'León', 'usuario11', 'ernes@gmail.com', '1fdd85229397e6522426b86858d11656db8af54870686835ece9f7d70821f658cb81da0a977764c5bd087b7f9493c9e546803ea7c1286e6a73ec8a281b7ac01f', 0),
('trendrff0ph1683559603878', 'Sara', 'Martinez', '2001-05-05', 'León', 'usuario9', 'us@gmail.com', '26347d6258cc6dfe137dccc1a3e8fad7414612a9af7a9324317416ae610391f44fb5196b603aed0bb59afecd8fb248201aec48c167a3f53359f0cae2b66f820a', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`idmsg`),
  ADD KEY `rs1` (`idRemitente`);

--
-- Indices de la tabla `checkedin`
--
ALTER TABLE `checkedin`
  ADD PRIMARY KEY (`idIngreso`),
  ADD KEY `r2` (`idTutorDrop`),
  ADD KEY `r6` (`idAutorizadoPickUp`),
  ADD KEY `r1` (`idChild`),
  ADD KEY `r3` (`idTutorPickUp`),
  ADD KEY `r4` (`idMonitorCheckIn`),
  ADD KEY `r5` (`idMonitorCheckOut`);

--
-- Indices de la tabla `children`
--
ALTER TABLE `children`
  ADD PRIMARY KEY (`idChild`);

--
-- Indices de la tabla `deposiciones`
--
ALTER TABLE `deposiciones`
  ADD PRIMARY KEY (`id_deposiciones`),
  ADD KEY `res_ch` (`idChild`),
  ADD KEY `res_mo` (`idMonitor`);

--
-- Indices de la tabla `matricula`
--
ALTER TABLE `matricula`
  ADD PRIMARY KEY (`idMatricula`),
  ADD KEY `res5` (`idUsuario`),
  ADD KEY `res1` (`idAutorizado1`),
  ADD KEY `res2` (`idChild`),
  ADD KEY `res3` (`idTutor1`),
  ADD KEY `res4` (`idTutor2`),
  ADD KEY `res6` (`idAutorizado2`);

--
-- Indices de la tabla `monitores`
--
ALTER TABLE `monitores`
  ADD PRIMARY KEY (`idMonitor`);

--
-- Indices de la tabla `pickuplist`
--
ALTER TABLE `pickuplist`
  ADD PRIMARY KEY (`idAutorizado`);

--
-- Indices de la tabla `reportediario`
--
ALTER TABLE `reportediario`
  ADD PRIMARY KEY (`idreporte`),
  ADD KEY `res_monitor` (`idMonitor`),
  ADD KEY `res_child` (`idChild`);

--
-- Indices de la tabla `tutors`
--
ALTER TABLE `tutors`
  ADD PRIMARY KEY (`idTutor`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `chat`
--
ALTER TABLE `chat`
  MODIFY `idmsg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `checkedin`
--
ALTER TABLE `checkedin`
  MODIFY `idIngreso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT de la tabla `deposiciones`
--
ALTER TABLE `deposiciones`
  MODIFY `id_deposiciones` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=214;

--
-- AUTO_INCREMENT de la tabla `matricula`
--
ALTER TABLE `matricula`
  MODIFY `idMatricula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `rs1` FOREIGN KEY (`idRemitente`) REFERENCES `users` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `checkedin`
--
ALTER TABLE `checkedin`
  ADD CONSTRAINT `r1` FOREIGN KEY (`idChild`) REFERENCES `children` (`idChild`) ON UPDATE CASCADE,
  ADD CONSTRAINT `r3` FOREIGN KEY (`idTutorPickUp`) REFERENCES `tutors` (`idTutor`) ON UPDATE CASCADE,
  ADD CONSTRAINT `r4` FOREIGN KEY (`idMonitorCheckIn`) REFERENCES `monitores` (`idMonitor`) ON UPDATE CASCADE,
  ADD CONSTRAINT `r5` FOREIGN KEY (`idMonitorCheckOut`) REFERENCES `monitores` (`idMonitor`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `deposiciones`
--
ALTER TABLE `deposiciones`
  ADD CONSTRAINT `res_ch` FOREIGN KEY (`idChild`) REFERENCES `children` (`idChild`),
  ADD CONSTRAINT `res_mo` FOREIGN KEY (`idMonitor`) REFERENCES `monitores` (`idMonitor`);

--
-- Filtros para la tabla `matricula`
--
ALTER TABLE `matricula`
  ADD CONSTRAINT `res1` FOREIGN KEY (`idAutorizado1`) REFERENCES `pickuplist` (`idAutorizado`) ON UPDATE CASCADE,
  ADD CONSTRAINT `res2` FOREIGN KEY (`idChild`) REFERENCES `children` (`idChild`) ON UPDATE CASCADE,
  ADD CONSTRAINT `res3` FOREIGN KEY (`idTutor1`) REFERENCES `tutors` (`idTutor`) ON UPDATE CASCADE,
  ADD CONSTRAINT `res4` FOREIGN KEY (`idTutor2`) REFERENCES `tutors` (`idTutor`) ON UPDATE CASCADE,
  ADD CONSTRAINT `res5` FOREIGN KEY (`idUsuario`) REFERENCES `users` (`idUsuario`) ON UPDATE CASCADE,
  ADD CONSTRAINT `res6` FOREIGN KEY (`idAutorizado2`) REFERENCES `pickuplist` (`idAutorizado`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `reportediario`
--
ALTER TABLE `reportediario`
  ADD CONSTRAINT `res_child` FOREIGN KEY (`idChild`) REFERENCES `children` (`idChild`),
  ADD CONSTRAINT `res_monitor` FOREIGN KEY (`idMonitor`) REFERENCES `monitores` (`idMonitor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
