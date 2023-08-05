-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.29 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para api
CREATE DATABASE IF NOT EXISTS `api` /*!40100 DEFAULT CHARACTER SET latin1 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `api`;

-- Copiando estrutura para tabela api.agenda
CREATE TABLE IF NOT EXISTS `agenda` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `setorId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isAtivo` tinyint(1) DEFAULT '1',
  `situacao` text,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'trabalhando' COMMENT 'trabalhando,ferias,licença,afastado,demitido',
  `local` varchar(250) DEFAULT NULL,
  `retornoAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `setorId` (`setorId`),
  CONSTRAINT `FK_agenda_setores` FOREIGN KEY (`setorId`) REFERENCES `setores` (`id`),
  CONSTRAINT `FK_agenda_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela api.agenda: ~9 rows (aproximadamente)
INSERT INTO `agenda` (`id`, `userId`, `setorId`, `createdAt`, `modifiedAt`, `isAtivo`, `situacao`, `status`, `local`, `retornoAt`) VALUES
	(1, 1, 1, '2023-07-31 19:57:46', '2023-07-31 19:57:46', 1, 'Reunião Prefeitura', 'trabalhando', 'Trombudo Central', '2023-07-31 19:57:46'),
	(3, 28, 13, '2023-08-01 18:52:59', '2023-08-01 18:52:59', 1, '', 'trabalhando', '', '2023-08-01 18:52:59'),
	(4, 29, 7, '2023-08-01 19:13:40', '2023-08-01 19:13:40', 1, '', 'trabalhando', '', '2023-08-01 19:13:40'),
	(5, 2, 2, '2023-08-01 22:44:30', '2023-08-01 22:44:30', 1, NULL, 'trabalhando', NULL, '2023-08-01 22:44:30'),
	(6, 16, 6, '2023-08-01 22:45:16', '2023-08-01 22:45:16', 1, NULL, 'trabalhando', NULL, '2023-08-01 22:45:16'),
	(7, 15, 3, '2023-08-01 22:45:32', '2023-08-01 22:45:32', 1, NULL, 'trabalhando', NULL, '2023-08-01 22:45:32'),
	(8, 30, 1, '2023-08-02 01:47:32', '2023-08-02 01:47:32', 1, '', 'trabalhando', '', '2023-08-02 01:47:32'),
	(9, 31, 12, '2023-08-03 13:14:11', '2023-08-03 13:14:11', 1, '', 'trabalhando', '', '2023-08-03 13:14:11'),
	(10, 32, 10, '2023-08-04 02:58:54', '2023-08-04 02:58:54', 1, '', 'trabalhando', '', '2023-08-04 02:58:54');

-- Copiando estrutura para tabela api.anexo
CREATE TABLE IF NOT EXISTS `anexo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `documentoId` int NOT NULL DEFAULT '0',
  `titulo` varchar(120) NOT NULL DEFAULT '0',
  `local` varchar(256) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `documentoId` (`documentoId`),
  CONSTRAINT `FK__documentos2` FOREIGN KEY (`documentoId`) REFERENCES `documentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela api.anexo: ~1 rows (aproximadamente)
INSERT INTO `anexo` (`id`, `documentoId`, `titulo`, `local`, `createdAt`, `updatedAt`) VALUES
	(2, 12, 'teste', '0', '2023-06-29 19:03:11', '2023-06-29 19:03:12');

-- Copiando estrutura para tabela api.config
CREATE TABLE IF NOT EXISTS `config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `logo` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `endereco` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `site` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cnpj` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isAtivo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela api.config: ~1 rows (aproximadamente)
INSERT INTO `config` (`id`, `logo`, `name`, `endereco`, `site`, `fone`, `cnpj`, `email`, `isAtivo`) VALUES
	(1, 'logo1', 'Prefeitura de Braço do Trombudo', 'Praça da Independência,25', 'www.bracodotrombudo.gov.br', '47 35470179', '9595223000167', 'gabinete@braco.gov.br', 1);

-- Copiando estrutura para tabela api.declaracao
CREATE TABLE IF NOT EXISTS `declaracao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `documentoId` int DEFAULT NULL,
  `destinatario` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `codigo` int NOT NULL DEFAULT '0',
  `ano` int NOT NULL DEFAULT '0',
  `setor` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `assunto` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `descricao` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `assign` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cargo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `matricula` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `documentoId` (`documentoId`),
  CONSTRAINT `FK_1dc_documentos` FOREIGN KEY (`documentoId`) REFERENCES `documentos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela api.declaracao: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela api.documentos
CREATE TABLE IF NOT EXISTS `documentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipoId` int NOT NULL,
  `userId` int DEFAULT NULL,
  `setorId` int DEFAULT NULL,
  `anexoId` int DEFAULT NULL,
  `messageId` int DEFAULT NULL,
  `titulo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codigo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ano` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isInterno` tinyint(1) DEFAULT '1',
  `isAtivo` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tipoId` (`tipoId`),
  KEY `userId` (`userId`),
  KEY `setorId` (`setorId`),
  KEY `FK_documentos_anexo` (`anexoId`),
  KEY `FK_documentos_messages` (`messageId`),
  CONSTRAINT `FK__tipos` FOREIGN KEY (`tipoId`) REFERENCES `tipos` (`id`),
  CONSTRAINT `FK_documentos_anexo` FOREIGN KEY (`anexoId`) REFERENCES `anexo` (`id`),
  CONSTRAINT `FK_documentos_messages` FOREIGN KEY (`messageId`) REFERENCES `messages` (`id`),
  CONSTRAINT `FK_documentos_setores` FOREIGN KEY (`setorId`) REFERENCES `setores` (`id`),
  CONSTRAINT `FK_documentos_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela api.documentos: ~3 rows (aproximadamente)
INSERT INTO `documentos` (`id`, `tipoId`, `userId`, `setorId`, `anexoId`, `messageId`, `titulo`, `status`, `codigo`, `ano`, `isInterno`, `isAtivo`, `createdAt`, `updatedAt`) VALUES
	(12, 1, 1, 1, 2, 1, 'Declaraçao Celesc', 'Enviado', '1dc', '2023', 1, 1, '2023-06-22 21:44:16', '2023-06-22 21:44:16'),
	(13, 2, 1, 2, 2, 1, 'Documentos REurb', 'Lido', '12', '2022', 0, 1, '2023-06-21 21:44:16', '2023-06-22 21:44:16'),
	(14, 6, 1, 2, 2, 1, 'Requerimento Prefeito', 'Analisando', '127', '2023', 1, 1, '2023-06-23 21:44:16', '2023-06-22 21:44:16');

-- Copiando estrutura para tabela api.docuser
CREATE TABLE IF NOT EXISTS `docuser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `docId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`) USING BTREE,
  KEY `docId` (`docId`),
  CONSTRAINT `FK_docuser_documentos` FOREIGN KEY (`docId`) REFERENCES `documentos` (`id`),
  CONSTRAINT `FK_docuser_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela api.docuser: ~3 rows (aproximadamente)
INSERT INTO `docuser` (`id`, `docId`, `userId`, `createdAt`, `updatedAt`) VALUES
	(1, 12, 1, '2023-06-29 18:39:47', '2023-06-29 18:39:47'),
	(3, 13, 1, '2023-07-03 10:47:02', '2023-07-03 10:47:02'),
	(4, 14, 1, '2023-07-03 10:47:02', '2023-07-03 10:47:02');

-- Copiando estrutura para tabela api.favoritos
CREATE TABLE IF NOT EXISTS `favoritos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL DEFAULT '0',
  `documentoId` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `documentoId` (`documentoId`),
  CONSTRAINT `FK1__documentos` FOREIGN KEY (`documentoId`) REFERENCES `documentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK1__users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela api.favoritos: ~2 rows (aproximadamente)
INSERT INTO `favoritos` (`id`, `userId`, `documentoId`) VALUES
	(3, 1, 12),
	(5, 1, 14);

-- Copiando estrutura para tabela api.frotaabastecimento
CREATE TABLE IF NOT EXISTS `frotaabastecimento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `veiculoId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `kmAt` int DEFAULT NULL,
  `litros` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `veiculoId` (`veiculoId`),
  CONSTRAINT `FK__frotaveiculos` FOREIGN KEY (`veiculoId`) REFERENCES `frotaveiculos` (`id`),
  CONSTRAINT `FK__usersfrotaveiculos` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela api.frotaabastecimento: ~13 rows (aproximadamente)
INSERT INTO `frotaabastecimento` (`id`, `userId`, `veiculoId`, `createdAt`, `kmAt`, `litros`) VALUES
	(1, 1, 1, '2023-07-11 17:21:16', 47852, 55),
	(2, 1, 1, '2023-07-11 19:01:42', 48539, 56),
	(3, 1, 1, '2023-07-11 17:21:16', 48952, 52),
	(4, 1, 1, NULL, 47800, 55),
	(5, 1, 1, '2023-07-20 21:01:49', 85500, 44.69),
	(6, 1, 1, '2023-07-20 21:03:19', 85500, 77.85),
	(7, 1, 1, NULL, 5263, 78.63),
	(8, 1, 1, '2023-07-20 21:04:44', 745222, 25.96),
	(9, 1, 1, '2023-07-20 21:05:14', 75555, 14.96),
	(10, 1, 1, '2023-07-20 21:06:26', 5654656, 44.96),
	(11, 1, 1, '2023-07-20 21:07:41', 45557, 44.96),
	(12, 1, 1, '2023-07-21 18:45:46', 45900, 32),
	(13, 1, 1, '2023-07-23 19:52:53', 47822, 55);

-- Copiando estrutura para tabela api.frotareservas
CREATE TABLE IF NOT EXISTS `frotareservas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `autorizationId` int DEFAULT NULL,
  `veiculoId` int DEFAULT NULL,
  `destino` varchar(250) DEFAULT NULL,
  `motivo` text,
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '''pendente'',''aprovado'',''reprovado''',
  `reservedTo` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isAtivo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `veiculoId` (`veiculoId`),
  KEY `autorizationId` (`autorizationId`),
  CONSTRAINT `FK_frotareserva_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_frotareserva_veiculos` FOREIGN KEY (`veiculoId`) REFERENCES `frotaveiculos` (`id`),
  CONSTRAINT `FK_frotareservas_autorization_users` FOREIGN KEY (`autorizationId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela api.frotareservas: ~16 rows (aproximadamente)
INSERT INTO `frotareservas` (`id`, `userId`, `autorizationId`, `veiculoId`, `destino`, `motivo`, `status`, `reservedTo`, `createdAt`, `modifiedAt`, `isAtivo`) VALUES
	(19, 1, 15, 1, '4544554', '45454545', 'pendente', '2023-07-25 12:08:12', '2023-07-24 00:34:38', '2023-07-24 00:34:38', 1),
	(20, 1, NULL, 3, 'Rio do Sul', 'Amavi', 'reprovado', '2023-07-25 16:00:00', '2023-07-25 01:56:48', '2023-07-25 01:56:48', 1),
	(21, 1, NULL, 3, 'Florianópolis', 'Assembléia', 'reprovado', '2023-07-26 23:00:00', '2023-07-25 02:06:08', '2023-07-25 02:06:08', 1),
	(22, 1, NULL, 3, 'jkkkkkkkkkk', 'jkkkkkkk', 'reprovado', '2023-07-25 12:26:00', '2023-07-25 15:20:02', '2023-07-25 15:20:02', 1),
	(23, 1, NULL, 1, '99990909', '090909090', 'aprovado', '2023-07-26 12:20:00', '2023-07-25 15:20:14', '2023-07-25 15:20:14', 1),
	(24, 1, NULL, 1, 'Trombudo Central', 'Prefeitura', 'pendente', '2023-07-27 12:26:00', '2023-07-25 15:26:06', '2023-07-25 15:26:06', 1),
	(25, 1, NULL, 1, 'Rio do Sul', 'Amavi', 'reprovado', '2023-07-31 16:00:00', '2023-07-31 14:38:56', '2023-07-31 14:38:56', 0),
	(26, 2, NULL, 1, 'trombudo central', 'escola', 'reprovado', '2023-08-01 12:17:00', '2023-07-31 15:17:50', '2023-07-31 15:17:50', 1),
	(27, 2, NULL, 3, 'Floripa', 'jjkdsakdsakl', 'pendente', '2023-07-31 17:33:00', '2023-07-31 18:33:14', '2023-07-31 18:33:14', 1),
	(28, 1, NULL, 1, 'POuso Redondo', 'viagem', 'reprovado', '2023-08-01 18:47:00', '2023-07-31 21:47:07', '2023-07-31 21:47:07', 0),
	(29, 1, NULL, 1, 'Flrianópolis', 'Assembléia', 'aprovado', '2023-07-31 19:47:00', '2023-07-31 21:48:00', '2023-07-31 21:48:00', 0),
	(30, 1, NULL, 3, 'Balneario Camboriu', 'Federação catarinense', 'aprovado', '2023-08-02 19:49:00', '2023-07-31 22:49:17', '2023-07-31 22:49:17', 1),
	(31, 1, NULL, 3, 'Joinvile', 'Prefeitura', 'pendente', '2023-08-01 21:07:00', '2023-08-01 00:07:09', '2023-08-01 00:07:09', 1),
	(32, 1, NULL, 2, 'Interior', 'cascalho', 'pendente', '2023-08-02 21:07:00', '2023-08-01 00:07:46', '2023-08-01 00:07:46', 1),
	(33, 1, NULL, 1, 'Trombudo Central', 'Algo', 'aprovado', '2023-07-31 23:08:00', '2023-08-01 00:08:22', '2023-08-01 00:08:22', 1),
	(34, 1, NULL, 1, 'Blumenau', 'Escola Técnica', 'aprovado', '2023-08-04 16:00:00', '2023-08-01 19:20:01', '2023-08-01 19:20:01', 1);

-- Copiando estrutura para tabela api.frotaveiculos
CREATE TABLE IF NOT EXISTS `frotaveiculos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `setorId` int DEFAULT NULL,
  `responsavelId` int DEFAULT NULL,
  `marca` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `modelo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ano` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `placa` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `chassi` varchar(50) DEFAULT NULL,
  `km` int DEFAULT NULL,
  `litros` int DEFAULT NULL,
  `image` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `isViagem` tinyint(1) DEFAULT '0',
  `isAtivo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `setorId` (`setorId`) USING BTREE,
  KEY `responsavelId` (`responsavelId`),
  CONSTRAINT `FK_frotaveiculos_setores` FOREIGN KEY (`setorId`) REFERENCES `setores` (`id`),
  CONSTRAINT `FK_frotaveiculos_users` FOREIGN KEY (`responsavelId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela api.frotaveiculos: ~3 rows (aproximadamente)
INSERT INTO `frotaveiculos` (`id`, `setorId`, `responsavelId`, `marca`, `modelo`, `name`, `ano`, `placa`, `chassi`, `km`, `litros`, `image`, `isViagem`, `isAtivo`) VALUES
	(1, 3, 1, 'VW', 'Gol 1.0 plus', 'Gol', '1999', 'mbx3456', '4547851266523', 49040, NULL, 'https://w7.pngwing.com/pngs/522/870/png-transparent-volkswagen-gol-car-vw-saveiro-volkswagen-up-volkswagen-compact-car-sedan-car.png', 0, 1),
	(2, 6, 16, 'Mercedes', 'Caçamba 1113', 'Caçamba 2', '2005', 'opkhjghj', '45455454544', 650523, NULL, 'https://img.favpng.com/17/23/6/mercedes-benz-actros-car-dump-truck-png-favpng-bHPLweA84vdBGcvnQyj1uLi7T.jpg', 0, 1),
	(3, 3, 15, 'Fiat', 'Doblo 1.8 ', 'Doblo', '2020', 'lop9089', '4545454545445', 546655, NULL, 'https://cdn.awsli.com.br/600x450/562/562407/produto/40079707/be82759c53.jpg', 0, 1);

-- Copiando estrutura para tabela api.frotaveiculouser
CREATE TABLE IF NOT EXISTS `frotaveiculouser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `veiculoId` int DEFAULT NULL,
  `isAtivo` tinyint(1) DEFAULT '1',
  `isTitular` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `veiculoId` (`veiculoId`),
  CONSTRAINT `FK_frotaveiculouser_frotaveiculos` FOREIGN KEY (`veiculoId`) REFERENCES `frotaveiculos` (`id`),
  CONSTRAINT `FK_frotaveiculouser_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela api.frotaveiculouser: ~6 rows (aproximadamente)
INSERT INTO `frotaveiculouser` (`id`, `userId`, `veiculoId`, `isAtivo`, `isTitular`) VALUES
	(1, 1, 1, 1, 1),
	(2, 1, 2, 1, 0),
	(3, 2, 3, 1, 1),
	(4, 2, 1, 1, 1),
	(5, 1, 3, 1, 0),
	(6, 15, 3, 1, 1);

-- Copiando estrutura para tabela api.frotaviagem
CREATE TABLE IF NOT EXISTS `frotaviagem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `veiculoId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `reservaId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `finalAt` timestamp NULL DEFAULT NULL,
  `isAtivo` tinyint(1) DEFAULT '1',
  `isAtiva` tinyint(1) DEFAULT '1',
  `kmInicial` int DEFAULT NULL,
  `kmFinal` int DEFAULT NULL,
  `destino` varchar(250) DEFAULT NULL,
  `motivo` text,
  PRIMARY KEY (`id`),
  KEY `veiculoId` (`veiculoId`),
  KEY `userId` (`userId`),
  KEY `reservaId` (`reservaId`),
  CONSTRAINT `FK_frotaviagem_frotareserva` FOREIGN KEY (`reservaId`) REFERENCES `frotareservas` (`id`),
  CONSTRAINT `FK_frotaviagem_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_frotaviagem_veiculos` FOREIGN KEY (`veiculoId`) REFERENCES `frotaveiculos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela api.frotaviagem: ~17 rows (aproximadamente)
INSERT INTO `frotaviagem` (`id`, `veiculoId`, `userId`, `reservaId`, `createdAt`, `finalAt`, `isAtivo`, `isAtiva`, `kmInicial`, `kmFinal`, `destino`, `motivo`) VALUES
	(66, 1, 1, NULL, '2023-07-25 01:50:52', '2023-07-25 01:51:02', 1, 0, 47822, 47852, 'Trombudo Central', 'Prefeitura'),
	(67, 1, 2, NULL, '2023-07-25 02:07:10', '2023-07-25 14:42:21', 1, 0, 47852, 47952, 'Trombudo Central', 'Registro de Imóveis'),
	(68, 1, 1, NULL, '2023-07-31 14:38:20', '2023-07-31 14:38:27', 1, 0, 47952, 48100, 'Rio do Sul', 'Amavi'),
	(69, 1, 1, 29, '2023-07-31 21:48:24', '2023-07-31 21:48:30', 1, 0, 48100, 48500, 'Flrianópolis', 'Assembléia'),
	(70, 3, 15, NULL, '2023-08-01 01:57:52', '2023-08-01 02:14:47', 1, 0, 546546, 546555, 'Centro', 'Eta est'),
	(71, 1, 1, NULL, '2023-08-01 02:16:14', '2023-08-01 02:16:25', 1, 0, 48500, 48599, 'Blumenau', 'aeroporto'),
	(72, 3, 15, NULL, '2023-08-01 13:11:35', '2023-08-01 13:11:57', 1, 0, 546555, 546655, 'Rio do Sul', 'Amavi'),
	(73, 1, 1, NULL, '2023-08-01 13:13:19', '2023-08-01 13:13:28', 1, 0, 48599, 48699, 'Trombudo', 'Reunião'),
	(74, 1, 1, NULL, '2023-08-01 13:20:33', '2023-08-01 13:20:45', 1, 0, 48699, 48799, 'Centro', 'Fiscalização'),
	(75, 1, 1, NULL, '2023-08-01 13:23:26', '2023-08-01 13:23:31', 1, 0, 48799, 48899, 'jkjjkjk', 'jkjkjkjk'),
	(76, 1, 1, NULL, '2023-08-01 13:24:19', '2023-08-01 13:24:26', 1, 0, 48899, 48950, '78787878', '78788787'),
	(77, 1, 1, NULL, '2023-08-01 13:25:39', '2023-08-01 13:25:43', 1, 0, 48950, 49000, '787878787', '787878'),
	(78, 1, 1, NULL, '2023-08-01 13:26:33', '2023-08-01 13:26:39', 1, 0, 49000, 49020, '7878787878', '78787878'),
	(79, 1, 1, NULL, '2023-08-01 13:32:28', '2023-08-01 13:32:33', 1, 0, 49020, 49025, 'opqopeqweopqwop', 'ooppoopo'),
	(80, 1, 1, NULL, '2023-08-01 13:34:11', '2023-08-01 13:34:16', 1, 0, 49025, 49030, '89898989', '89898998'),
	(81, 1, 1, NULL, '2023-08-01 13:37:58', '2023-08-01 13:38:03', 1, 0, 49030, 49035, '78878778', '78787878'),
	(82, 1, 1, NULL, '2023-08-01 13:38:42', '2023-08-01 13:38:47', 1, 0, 49035, 49040, '6555656', '56566556');

-- Copiando estrutura para tabela api.messages
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `documentoId` int NOT NULL DEFAULT '0',
  `remetente` int NOT NULL DEFAULT '0',
  `destinatario` int NOT NULL DEFAULT '0',
  `message` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `documentoId` (`documentoId`),
  KEY `remetente` (`remetente`),
  KEY `destinatário` (`destinatario`) USING BTREE,
  CONSTRAINT `FK__documentos` FOREIGN KEY (`documentoId`) REFERENCES `documentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK__users` FOREIGN KEY (`remetente`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_messages_users` FOREIGN KEY (`destinatario`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela api.messages: ~1 rows (aproximadamente)
INSERT INTO `messages` (`id`, `documentoId`, `remetente`, `destinatario`, `message`, `createdAt`, `updatedAt`) VALUES
	(1, 12, 15, 2, 'Teste de mensagem', '2023-06-29 19:05:36', '2023-06-29 19:05:37');

-- Copiando estrutura para tabela api.setores
CREATE TABLE IF NOT EXISTS `setores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `secretarioId` int DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `responsavel` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secretario` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sigla` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_setores_users` (`secretarioId`),
  CONSTRAINT `FK_setores_users` FOREIGN KEY (`secretarioId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela api.setores: ~19 rows (aproximadamente)
INSERT INTO `setores` (`id`, `secretarioId`, `name`, `responsavel`, `email`, `secretario`, `sigla`, `image`) VALUES
	(1, 15, 'Planejamento', 'João Haskel', 'planejamento@bracodotrombudo.sc.gov.br', 'Odirlei Radol', 'D.M.P.G.U', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(2, 2, 'Educação', 'Joyce', 'educa@bracodotrombudo.gov.br', 'Joyce', 'S.ED', 'https://cdn-icons-png.flaticon.com/512/4207/4207253.png'),
	(3, 15, 'Administração', 'Joyce', 'educa@bracodotrombudo.gov.br', 'Joyce', 'S.AD', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(4, 15, 'Finanças', 'Joyce', 'educa@bracodotrombudo.gov.br', 'Joyce', 'S.FI', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(5, 15, 'Controle Interno', 'Joyce', 'educa@bracodotrombudo.gov.br', 'Joyce', 'S.C.I', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(6, 16, 'Obras', 'Joyce', 'educa@bracodotrombudo.gov.br', 'Joyce', 'S.OB', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(7, 16, 'Agricultura', 'Joyce', 'educa@bracodotrombudo.gov.br', 'Joyce', 'S.AG', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(8, 15, 'Contabilidade', 'Joyce', 'educa@bracodotrombudo.gov.br', 'Joyce', 'S.CO', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(9, 15, 'Pessoal', 'Joyce', 'educa@bracodotrombudo.gov.br', 'Joyce', 'S.PE', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(10, 16, 'Gabinete', 'Joyce', 'educa@bracodotrombudo.gov.br', 'Joyce', 'GAB', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(11, 15, 'Licitação', 'Joyce', 'educa@bracodotrombudo.gov.br', 'Joyce', 'S.LI', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(12, 15, 'Tributos', 'Joyce', 'educa@bracodotrombudo.gov.br', 'Joyce', 'S.TR', NULL),
	(13, 15, 'Meio Ambiente', 'Joyce', 'educa@bracodotrombudo.gov.br', 'Joyce', 'D.M.M.A', NULL),
	(14, 15, 'Conselhos', 'Joyce', 'educa@bracodotrombudo.gov.br', 'Joyce', 'C.M', NULL),
	(15, 2, 'Cultura', 'Joyce', 'educa@bracodotrombudo.gov.br', 'Joyce', 'S.C.T', NULL),
	(16, 2, 'CME', 'Joyce', 'educa@bracodotrombudo.gov.br', 'Joyce', 'C.M.E', NULL),
	(17, 2, 'Saúde', 'Joyce', 'educa@bracodotrombudo.gov.br', 'Joyce', 'S.SA', NULL),
	(18, 28, 'Assitencia Social', NULL, NULL, NULL, 'A.SO', NULL),
	(19, 15, 'Correio', NULL, NULL, NULL, 'COR', NULL);

-- Copiando estrutura para tabela api.setoruser
CREATE TABLE IF NOT EXISTS `setoruser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `setorId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_setoruser_setores` (`setorId`),
  KEY `FK_setoruser_users` (`userId`),
  CONSTRAINT `FK_setoruser_setores` FOREIGN KEY (`setorId`) REFERENCES `setores` (`id`),
  CONSTRAINT `FK_setoruser_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela api.setoruser: ~9 rows (aproximadamente)
INSERT INTO `setoruser` (`id`, `userId`, `setorId`) VALUES
	(1, 1, 1),
	(2, 2, 2),
	(6, 1, 13),
	(7, 1, 13),
	(16, 28, 13),
	(17, 29, 7),
	(18, 30, 1),
	(19, 31, 12),
	(20, 32, 10);

-- Copiando estrutura para tabela api.tipos
CREATE TABLE IF NOT EXISTS `tipos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `setorId` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `codigo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(350) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `setorId` (`setorId`),
  CONSTRAINT `FK__setores` FOREIGN KEY (`setorId`) REFERENCES `setores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela api.tipos: ~8 rows (aproximadamente)
INSERT INTO `tipos` (`id`, `setorId`, `name`, `codigo`, `image`) VALUES
	(1, 1, 'Declaraçao ', 'DEC', 'https://cdn-icons-png.flaticon.com/512/1193/1193297.png'),
	(2, 1, 'Oficio', 'OFI', 'https://cdn-icons-png.flaticon.com/512/3378/3378913.png'),
	(4, 1, 'Memorando', 'MEM', 'https://sites.ufca.edu.br/rp/wp-content/uploads/sites/110/2018/08/document_icon-icons.com_66534.png'),
	(5, 1, 'Certidão', 'CER', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF19zFGK3wxbpMm8QN-ZMC8zJUbo3YNuE66aoCwIcVLZZdzPDsR3qg_podXYNVgrGeE6g&usqp=CAU'),
	(6, 1, 'Requerimento', 'REQ', 'https://www.2oficiolagodapedra.com.br/wp-content/uploads/2021/10/File-edit.png'),
	(7, 1, 'Atestado Cap. Técnica', 'ATC', 'https://static.wixstatic.com/media/bb9a34cdbbb94cfa828fef9d549eefde.png/v1/fill/w_260,h_260,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/bb9a34cdbbb94cfa828fef9d549eefde.png'),
	(8, 1, 'Relatório', 'REL', 'https://static.wixstatic.com/media/bb9a34cdbbb94cfa828fef9d549eefde.png/v1/fill/w_260,h_260,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/bb9a34cdbbb94cfa828fef9d549eefde.png'),
	(9, 2, 'Declaraçao ', 'DEC', 'https://cdn-icons-png.flaticon.com/512/1193/1193297.png');

-- Copiando estrutura para tabela api.usercargos
CREATE TABLE IF NOT EXISTS `usercargos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isAtivo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `FK_usercargos_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela api.usercargos: ~4 rows (aproximadamente)
INSERT INTO `usercargos` (`id`, `userId`, `name`, `isAtivo`) VALUES
	(1, 1, 'Fiscal de Obras', 1),
	(2, 1, 'Engenheiro Civil', 1),
	(3, 1, 'Responsável Iluminação Publica', 1),
	(4, 15, 'Secretário da Administração', 1);

-- Copiando estrutura para tabela api.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` int NOT NULL DEFAULT '1',
  `idSetor` int NOT NULL DEFAULT '1',
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `fone` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `matricula` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `cargo` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `token` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `forget` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `isAtivo` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`),
  UNIQUE KEY `matricula` (`matricula`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela api.users: ~9 rows (aproximadamente)
INSERT INTO `users` (`id`, `role`, `idSetor`, `name`, `email`, `password`, `image`, `fone`, `matricula`, `cargo`, `token`, `forget`, `isAtivo`, `createdAt`, `updatedAt`) VALUES
	(1, 2, 1, 'João Haskel', 'johaskel@gmail.com', '$2b$10$1bEaeNhdkG9qGosjjU.kie2.j2yKjTHrS9TkKnRdK/j5pUg7dCwRi', '123456', '0', '2295', '0', '0', '0', 1, '2023-06-17 00:57:43', '2023-07-25 15:52:31'),
	(2, 2, 1, 'Joice Marangoni', 'joice@gmail.com', '$2b$10$JuSmMDLjsqp/Z.6VCzpECurl8fz3xo.w8.HEmnNHINUnykeAnUOvy', '0', '0', '2296', '0', '0', '0', 1, '2023-06-18 16:58:48', '2023-06-18 16:58:48'),
	(15, 3, 1, 'Odirlei Radoll', 'odirlei@email.com', '$2b$10$ko1PInDfdksLwq5DKQmT6.LbUduMUvSlgfVnq6UhnFpUoM6mNwCya', '0', '0', '2297', '0', '0', '0', 1, '2023-07-25 15:27:08', '2023-07-25 15:27:08'),
	(16, 3, 1, 'Jean Hadlich', 'jean@email.com', '$2b$10$ko1PInDfdksLwq5DKQmT6.LbUduMUvSlgfVnq6UhnFpUoM6mNwCya', '0', '0', '2298', '0', '0', '0', 1, '2023-07-25 15:27:08', '2023-07-25 15:27:08'),
	(28, 2, 13, 'Mara Eliza Schaade', 'mara@email.com', '$2b$10$P1l.EKtqgR/sJ5gsyDRJRe3zgqOQNwnBC.C6S77aP6PPy9tnfurPS', '0', '47996745860', '4452', 'Assessor meio ambiente', '0', '0', 1, '2023-08-01 18:52:59', '2023-08-01 18:52:59'),
	(29, 2, 7, 'Arlei Larsen', 'arlei@email.com', '$2b$10$sPM8NhGkwu8R7WkDSLJds..4jRMHfyKta/VWIzYnW/GX00WKu1Ugi', '0', '478525696633', '8742', 'Assessor Agricultura', '0', '0', 1, '2023-08-01 19:13:40', '2023-08-01 19:13:40'),
	(30, 1, 1, 'Taise Perini', 'taise@email.com', '$2b$10$2j6tEnPm92qdcQ1c.eF/seZ0vhELIVNMMa5X.72dZ.Hk6JEjwT27G', '0', '479666666', '4563', 'Engenheira Civil', '0', '0', 1, '2023-08-02 01:47:32', '2023-08-02 01:47:32'),
	(31, 1, 12, 'Giovanni Carneir dos Santos', 'giovanni@email.com', '$2b$10$rilxYIGGXINP0kDaNqCZh.sbSiN3vVJPfNSenyfjmmbsuxnG/gFBy', '0', '4799652566', '4789', 'Fiscal de Tributos', '0', '0', 1, '2023-08-03 13:14:11', '2023-08-03 13:14:11'),
	(32, 1, 10, 'Valdirene dos Santos', 'valdirene@email.com', '$2b$10$ARqAPsTmHjkw5SY7Kxbia.0QFXhDvYd88y9DAGQ66TlEmg3LBWoiK', '0', '47987744125', '7896', 'Chefe de Gabinete', '0', '0', 1, '2023-08-04 02:58:54', '2023-08-04 02:58:54');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
