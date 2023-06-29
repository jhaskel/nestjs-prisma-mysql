-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.30 - MySQL Community Server - GPL
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
CREATE DATABASE IF NOT EXISTS `api` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `api`;

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
  `isAtivo` tinyint DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela api.config: ~1 rows (aproximadamente)
INSERT INTO `config` (`id`, `logo`, `name`, `endereco`, `site`, `fone`, `cnpj`, `email`, `isAtivo`) VALUES
	(1, 'logo1', 'Prefeitura de Braço do Trombudo', 'Praça da Independência,25', 'www.bracodotrombudo.gov.br', '47 35470179', '9595223000167', 'gabinete@braco.gov.br', 1);

-- Copiando estrutura para tabela api.declaracao
CREATE TABLE IF NOT EXISTS `declaracao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `documentoId` int DEFAULT NULL,
  `destinatario` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `codigo` int NOT NULL DEFAULT '0',
  `ano` int NOT NULL DEFAULT '0',
  `setor` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `assunto` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `descricao` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `assign` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cargo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `matricula` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
  `titulo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codigo` int DEFAULT NULL,
  `ano` int DEFAULT NULL,
  `isInterno` tinyint(1) DEFAULT '1',
  `isAtivo` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tipoId` (`tipoId`),
  KEY `userId` (`userId`),
  KEY `setorId` (`setorId`),
  CONSTRAINT `FK__tipos` FOREIGN KEY (`tipoId`) REFERENCES `tipos` (`id`),
  CONSTRAINT `FK_documentos_setores` FOREIGN KEY (`setorId`) REFERENCES `setores` (`id`),
  CONSTRAINT `FK_documentos_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela api.documentos: ~3 rows (aproximadamente)
INSERT INTO `documentos` (`id`, `tipoId`, `userId`, `setorId`, `titulo`, `codigo`, `ano`, `isInterno`, `isAtivo`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, NULL, 'Declaraçao Celesc', 125, 2023, 1, 1, '2023-06-17 01:29:32', '2023-06-17 01:29:32'),
	(2, 1, 1, NULL, 'Declaraçao Valor', 126, 2023, 1, 1, '2023-06-17 01:29:50', '2023-06-17 01:29:50'),
	(4, 1, 1, NULL, 'Declaraçao Postura', 234, 2023, 1, 1, '2023-06-17 03:49:02', '2023-06-17 03:49:02'),
	(5, 1, 1, NULL, ' Declaração de Conformidade ', 445, 2023, 1, 1, '2023-06-22 20:06:13', '2023-06-22 20:06:13'),
	(6, 1, 1, 1, ' Declaração de Conformidade ', 445, 2023, 1, 1, '2023-06-22 20:07:59', '2023-06-22 20:07:59'),
	(7, 1, 1, 1, ' Declaração de Conformidade ', 445, 2023, 1, 1, '2023-06-22 20:10:11', '2023-06-22 20:10:11'),
	(8, 1, 1, 1, ' Declaração de Conformidade ', 445, 2023, 1, 1, '2023-06-22 20:15:32', '2023-06-22 20:15:32'),
	(9, 1, 1, 1, ' Declaração de Conformidade ', 445, 2023, 1, 1, '2023-06-22 20:16:18', '2023-06-22 20:16:18'),
	(10, 1, 1, 1, ' Declaração de Conformidade ', 445, 2023, 1, 1, '2023-06-22 20:23:34', '2023-06-22 20:23:34'),
	(11, 1, 1, 1, ' Declaração de Conformidade ', 445, 2023, 1, 1, '2023-06-22 21:24:58', '2023-06-22 21:24:58'),
	(12, 1, 1, 1, ' Declaração de Conformidade ', 445, 2023, 1, 1, '2023-06-22 21:44:16', '2023-06-22 21:44:16');

-- Copiando estrutura para tabela api.docuser
CREATE TABLE IF NOT EXISTS `docuser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `docId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`) USING BTREE,
  KEY `docId` (`docId`),
  CONSTRAINT `FK_docuser_documentos` FOREIGN KEY (`docId`) REFERENCES `documentos` (`id`),
  CONSTRAINT `FK_docuser_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela api.docuser: ~0 rows (aproximadamente)
INSERT INTO `docuser` (`id`, `docId`, `userId`) VALUES
	(1, 12, 1),
	(2, 12, 13);

-- Copiando estrutura para tabela api.itensdocumentos
CREATE TABLE IF NOT EXISTS `itensdocumentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `documentoId` int DEFAULT NULL,
  `titulo` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantidade` decimal(10,2) DEFAULT NULL,
  `unidade` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `anexo` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isAtivo` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `documentoId` (`documentoId`),
  CONSTRAINT `FK_itensdocumentos_documentos` FOREIGN KEY (`documentoId`) REFERENCES `documentos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela api.itensdocumentos: ~2 rows (aproximadamente)
INSERT INTO `itensdocumentos` (`id`, `documentoId`, `titulo`, `quantidade`, `unidade`, `anexo`, `isAtivo`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 'Declaraçao Celesc', 34.67, 'm2', NULL, 1, '2023-06-17 02:02:54', '2023-06-17 02:02:54'),
	(2, 1, 'Declaraçao Postura', 14534.98, 'm2', NULL, 1, '2023-06-17 02:03:42', '2023-06-17 02:03:42');

-- Copiando estrutura para tabela api.setores
CREATE TABLE IF NOT EXISTS `setores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `responsavel` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secretario` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sigla` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela api.setores: ~2 rows (aproximadamente)
INSERT INTO `setores` (`id`, `name`, `email`, `responsavel`, `secretario`, `sigla`) VALUES
	(1, 'Setor de Planejamento', 'planejamento@bracodotrombudo.sc.gov.br', 'João Haskel', 'Odirlei Radol', 'DMPGU'),
	(2, 'Educação', 'educa@bracodotrombudo.gov.br', 'Joyce', 'Joyce', 'SED');

-- Copiando estrutura para tabela api.tipos
CREATE TABLE IF NOT EXISTS `tipos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `setorId` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `codigo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `setorId` (`setorId`),
  CONSTRAINT `FK__setores` FOREIGN KEY (`setorId`) REFERENCES `setores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela api.tipos: ~3 rows (aproximadamente)
INSERT INTO `tipos` (`id`, `setorId`, `name`, `codigo`) VALUES
	(1, 1, 'Declaraçao Celesc', 'logo1'),
	(2, 1, 'Declaraçao Diversas', 'dev5'),
	(4, 1, 'Declaraçao Celesc', 'dev5@email.com');

-- Copiando estrutura para tabela api.usercargos
CREATE TABLE IF NOT EXISTS `usercargos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isAtivo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `FK_usercargos_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela api.usercargos: ~3 rows (aproximadamente)
INSERT INTO `usercargos` (`id`, `userId`, `name`, `isAtivo`) VALUES
	(1, 1, 'Fiscal de Obras', 1),
	(2, 1, 'Engenheiro Civil', 1),
	(3, 1, 'Responsável Iluminação Publica', 1);

-- Copiando estrutura para tabela api.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` int NOT NULL DEFAULT '1',
  `image` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `fone` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `setorId` int NOT NULL DEFAULT '1',
  `matricula` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `cargo` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `token` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `forget` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `isAtivo` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`),
  KEY `setorId` (`setorId`),
  CONSTRAINT `FK_users_setores` FOREIGN KEY (`setorId`) REFERENCES `setores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela api.users: ~14 rows (aproximadamente)
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `image`, `fone`, `setorId`, `matricula`, `cargo`, `token`, `forget`, `isAtivo`, `createdAt`, `updatedAt`) VALUES
	(1, 'João Haskel2', 'johaskel@gmail.com', '$2b$10$Vqs0VEYETRR0.AznkBEMy.Uo.DPuM51HimbWl5YLN/3g5ChQXOX42', 2, '123456', '0', 1, '0', '0', '0', '0', 1, '2023-06-17 00:57:43', '2023-06-20 13:09:00'),
	(2, 'Renato Sá', 'renato@gmail.com', '$2b$10$JuSmMDLjsqp/Z.6VCzpECurl8fz3xo.w8.HEmnNHINUnykeAnUOvy', 1, '0', '0', 1, '0', '0', '0', '0', 1, '2023-06-18 16:58:48', '2023-06-18 16:58:48'),
	(3, 'Nelson Almeida', 'nelson@gmail.com', '$2b$10$Xj2b4CgAESwWrF8Qw5QKlOZIpmekl.hHNPm.BfozZc3TxIYUOe87C', 1, '0', '0', 1, '0', '0', '0', '0', 1, '2023-06-18 17:56:37', '2023-06-18 17:56:37'),
	(4, 'Reni de Oliveira', 'reni@gmail.com', '$2b$10$fFdxc0o81APLZj36d/f4f.FJOfEK8SgHzrTpFjqZgqU.kjldcPnXO', 1, '0', '0', 1, '0', '0', '0', '0', 1, '2023-06-18 17:57:19', '2023-06-19 20:43:27'),
	(5, 'Paulo massadas', 'paulo@gmail.com', '$2b$10$Dly/fRnp6TmSWKNOylUv8.BCN9Saq1ZnkDcTynb3BsTVEJVP/F/Na', 1, '0', '0', 1, '0', '0', '0', '0', 1, '2023-06-18 18:12:59', '2023-06-18 18:12:59'),
	(6, 'Flavio massadas', 'flavio@gmail.com', '$2b$10$DdUqlpNxxTzky2sERb0s6eZMEulq6cxtD1.becyLqCQsIei.9wwcK', 1, '0', '0', 1, '0', '0', '0', '0', 1, '2023-06-18 18:16:08', '2023-06-18 18:16:08'),
	(7, 'Salvio massadas', 'salvio@gmail.com', '$2b$10$GJ0Z4yJAE8D3nWykQJQ7hut8W30jrQsnj6UJz5HqG.57Gwc2doh6a', 1, '0', '0', 1, '0', '0', '0', '0', 1, '2023-06-18 18:25:07', '2023-06-18 18:25:07'),
	(8, 'Claudio massadas', 'claudio@gmail.com', '$2b$10$5nPGNNJNS9fj4WMrNWN1Lu6fgNkEe0iuFeSGoJaeqX10XYqJTeBXC', 1, '0', '0', 1, '0', '0', '0', '0', 1, '2023-06-18 18:36:49', '2023-06-18 18:36:49'),
	(9, 'Paulo Bento', 'bento@email.com', '$2b$10$HTd4SHIVC/B4zb.4CrpBF.VXH3u1UFa5.yX5oIdogv.SsRnwKeFYu', 1, '0', '0', 1, '0', '0', '0', '0', 1, '2023-06-18 18:44:30', '2023-06-18 18:44:30'),
	(10, 'Paulo Bento jr', 'bentojr@email.com', '$2b$10$vemkaDXTDM7zhVUMb7OWD.8Bbkgj5MssinxXdm6KyYwZyfy.SyvbC', 1, '0', '0', 1, '0', '0', '0', '0', 1, '2023-06-18 18:52:06', '2023-06-18 18:52:06'),
	(11, 'mario arruda', 'mario@email.com', '$2b$10$lTTAdp2ZK8ebRrOS5/CRpeiSHLJFM3vhiI2smzJUZUP8JnkythlxC', 1, '0', '0', 1, '0', '0', '0', '0', 1, '2023-06-18 19:06:28', '2023-06-18 19:06:28'),
	(12, 'Marcos Assunção', 'marcos@email.com', '$2b$10$3aG9l8TMAqeGq4EGDcVcauH4GXXJl.kkmxTuNAU2zc771g9UEv47q', 1, '0', '0', 1, '0', '0', '0', '0', 1, '2023-06-20 13:10:25', '2023-06-20 13:10:25'),
	(13, 'Augusto Moreira', 'augusto@email.com', '$2b$10$.HKfB15vdamijkudHlWw5O2CpdcAVbK1gKlzs5elBDoxPF0XpNEhq', 1, '0', '0', 1, '0', '0', '0', '0', 1, '2023-06-20 13:26:16', '2023-06-20 13:26:16'),
	(14, 'Augusto Pereira', 'pereira@email.com', '$2b$10$RqMngnHFs5P38wXLOWk4R.NI5oTh3WveNN4QMYPk4AibDihL9y8hi', 1, '0', '0', 1, '0', '0', '0', '0', 1, '2023-06-20 14:05:50', '2023-06-20 14:05:50');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
