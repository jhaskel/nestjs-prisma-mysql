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

-- Copiando estrutura para tabela api.agenda
CREATE TABLE IF NOT EXISTS `agenda` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `setorId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isAtivo` tinyint(1) DEFAULT '1',
  `situacao` text,
  `local` varchar(250) DEFAULT NULL,
  `retornoAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `setorId` (`setorId`),
  CONSTRAINT `FK_agenda_tipos` FOREIGN KEY (`setorId`) REFERENCES `tipos` (`id`),
  CONSTRAINT `FK_agenda_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela api.agenda: ~0 rows (aproximadamente)

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

-- Copiando dados para a tabela api.anexo: ~0 rows (aproximadamente)
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
  `isAtivo` tinyint DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela api.config: ~0 rows (aproximadamente)
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
	(12, 1, 1, 1, 2, 1, ' Declaração de Conformidade ', 'Enviado', '15', '2023', 1, 1, '2023-06-22 21:44:16', '2023-06-22 21:44:16'),
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

-- Copiando dados para a tabela api.docuser: ~4 rows (aproximadamente)
INSERT INTO `docuser` (`id`, `docId`, `userId`, `createdAt`, `updatedAt`) VALUES
	(1, 12, 1, '2023-06-29 18:39:47', '2023-06-29 18:39:47'),
	(2, 12, 13, '2023-06-29 18:39:47', '2023-06-29 18:39:47'),
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
  `litros` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `veiculoId` (`veiculoId`),
  CONSTRAINT `FK__frotaveiculos` FOREIGN KEY (`veiculoId`) REFERENCES `frotaveiculos` (`id`),
  CONSTRAINT `FK__usersfrotaveiculos` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela api.frotaabastecimento: ~2 rows (aproximadamente)
INSERT INTO `frotaabastecimento` (`id`, `userId`, `veiculoId`, `createdAt`, `kmAt`, `litros`) VALUES
	(1, 1, 1, '2023-07-11 17:21:16', 47852, 55.00),
	(2, 1, 1, '2023-07-11 19:01:42', 48539, 56.00);

-- Copiando estrutura para tabela api.frotareservas
CREATE TABLE IF NOT EXISTS `frotareservas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `autorizationId` int DEFAULT NULL,
  `veiculoId` int DEFAULT NULL,
  `destino` varchar(250) DEFAULT NULL,
  `motivo` text,
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '''pendente'',''Autorizado'',''Não Autorizado''',
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela api.frotareservas: ~0 rows (aproximadamente)
INSERT INTO `frotareservas` (`id`, `userId`, `autorizationId`, `veiculoId`, `destino`, `motivo`, `status`, `reservedTo`, `createdAt`, `modifiedAt`, `isAtivo`) VALUES
	(1, 1, 2, 1, 'Rio do Sul', 'Reunião Amavi', 'pendente', '2023-07-11 18:57:16', '2023-07-11 17:19:34', '2023-07-11 17:19:35', 1),
	(2, 1, 2, 1, 'Rio do Sul', 'Reunião Amavi', 'pendente', '2023-07-11 18:57:16', '2023-07-12 21:50:55', '2023-07-12 21:50:55', 1);

-- Copiando estrutura para tabela api.frotaveiculos
CREATE TABLE IF NOT EXISTS `frotaveiculos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `setorId` int DEFAULT NULL,
  `marca` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `modelo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ano` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `placa` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `chassi` varchar(50) DEFAULT NULL,
  `km` int DEFAULT NULL,
  `image` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '''disponível'',''viagem'',''reservado'',''conserto'',''inativo''',
  `isAtivo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `setorId` (`setorId`) USING BTREE,
  CONSTRAINT `FK_frotaveiculos_setores` FOREIGN KEY (`setorId`) REFERENCES `setores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela api.frotaveiculos: ~3 rows (aproximadamente)
INSERT INTO `frotaveiculos` (`id`, `setorId`, `marca`, `modelo`, `name`, `ano`, `placa`, `chassi`, `km`, `image`, `status`, `isAtivo`) VALUES
	(1, 3, 'VW', 'Gol 1.0 plus', 'Gol', '1999', 'mbx3456', '4547851266523', 78852, '798987879897', 'viagem', 1),
	(2, 6, 'Mercedes', 'Caçamba 1113', 'Caçamba 2', '2005', 'opkhjghj', '45455454544', 650523, '87989879987', 'disponível', 1),
	(3, 3, 'Fiat', 'Doblo 1.8 ', 'Doblo', '2020', 'lop9089', '4545454545445', 125896, '78555', 'viagem', 1);

-- Copiando estrutura para tabela api.frotaveiculouser
CREATE TABLE IF NOT EXISTS `frotaveiculouser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `veiculoId` int DEFAULT NULL,
  `autorizationId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `isAtivo` tinyint(1) DEFAULT '1',
  `isResponsavel` tinyint(1) DEFAULT '0',
  `isOcupando` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `veiculoId` (`veiculoId`),
  KEY `autorizationId` (`autorizationId`),
  CONSTRAINT `FK_frotaveiculouser_frotaveiculos` FOREIGN KEY (`veiculoId`) REFERENCES `frotaveiculos` (`id`),
  CONSTRAINT `FK_frotaveiculouser_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_frotaveiculouser_users_2` FOREIGN KEY (`autorizationId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela api.frotaveiculouser: ~2 rows (aproximadamente)
INSERT INTO `frotaveiculouser` (`id`, `userId`, `veiculoId`, `autorizationId`, `createdAt`, `updatedAt`, `isAtivo`, `isResponsavel`, `isOcupando`) VALUES
	(1, 1, 1, 13, '2023-07-11 17:19:03', '2023-07-11 17:19:04', 1, 1, 0),
	(2, 1, 2, 13, '2023-07-11 17:19:03', '2023-07-11 17:19:04', 1, 0, 0);

-- Copiando estrutura para tabela api.frotaviagem
CREATE TABLE IF NOT EXISTS `frotaviagem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `veiculoId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `reservaId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `finalAt` timestamp NULL DEFAULT NULL,
  `isAtivo` tinyint(1) DEFAULT '1',
  `isIniciada` tinyint(1) DEFAULT '1',
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela api.frotaviagem: ~0 rows (aproximadamente)
INSERT INTO `frotaviagem` (`id`, `veiculoId`, `userId`, `reservaId`, `createdAt`, `finalAt`, `isAtivo`, `isIniciada`, `kmInicial`, `kmFinal`, `destino`, `motivo`) VALUES
	(1, 1, 11, 1, '2023-07-11 19:00:52', '2023-07-11 19:00:54', 1, 0, 74523, 74589, 'Rio do Sul', 'REunião Amavi'),
	(2, 1, 1, NULL, '2023-07-14 14:43:56', '2023-07-14 14:43:56', 1, 1, 47855, NULL, 'Rio do Sul', 'Reunião Amavi'),
	(3, 1, 1, NULL, '2023-07-14 14:49:42', '2023-07-14 11:49:42', 1, 1, 47855, NULL, 'Rio do Sul', 'Reunião Amavi'),
	(4, 1, 1, NULL, '2023-07-14 14:50:05', NULL, 1, 1, 47855, NULL, 'Rio do Sul', 'Reunião Amavi'),
	(5, 1, 1, NULL, '2023-07-14 15:01:05', NULL, 1, 1, 47855, NULL, 'Rio do Sul', 'Reunião Amavi'),
	(6, 1, 1, NULL, '2023-07-14 15:09:30', NULL, 1, NULL, 78852, NULL, 'Blumenau', 'registro'),
	(7, 1, 1, NULL, '2023-07-14 16:22:16', NULL, 1, 1, 47855, NULL, 'Rio do Sul', 'Reunião Amavi'),
	(8, 1, 1, NULL, '2023-07-14 16:31:44', NULL, 1, 1, 47855, NULL, 'Rio do Sul', 'Reunião Amavi');

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

-- Copiando dados para a tabela api.messages: ~2 rows (aproximadamente)
INSERT INTO `messages` (`id`, `documentoId`, `remetente`, `destinatario`, `message`, `createdAt`, `updatedAt`) VALUES
	(1, 12, 14, 8, 'Teste de mensagem', '2023-06-29 19:05:36', '2023-06-29 19:05:37'),
	(2, 12, 8, 14, 'Resposta', '2023-06-30 15:33:48', '2023-06-30 15:33:48');

-- Copiando estrutura para tabela api.setores
CREATE TABLE IF NOT EXISTS `setores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `responsavel` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secretario` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sigla` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela api.setores: ~17 rows (aproximadamente)
INSERT INTO `setores` (`id`, `name`, `email`, `responsavel`, `secretario`, `sigla`, `image`) VALUES
	(1, 'Planejamento', 'planejamento@bracodotrombudo.sc.gov.br', 'João Haskel', 'Odirlei Radol', 'D.M.P.G.U', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(2, 'Educação', 'educa@bracodotrombudo.gov.br', 'Joyce', 'Joyce', 'S.ED', 'https://cdn-icons-png.flaticon.com/512/4207/4207253.png'),
	(3, 'Administração', 'educa@bracodotrombudo.gov.br', 'Joyce', 'Joyce', 'S.AD', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(4, 'Finanças', 'educa@bracodotrombudo.gov.br', 'Joyce', 'Joyce', 'S.FI', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(5, 'Controle Interno', 'educa@bracodotrombudo.gov.br', 'Joyce', 'Joyce', 'S.C.I', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(6, 'Obras', 'educa@bracodotrombudo.gov.br', 'Joyce', 'Joyce', 'S.OB', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(7, 'Agricultura', 'educa@bracodotrombudo.gov.br', 'Joyce', 'Joyce', 'S.AG', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(8, 'Contabilidade', 'educa@bracodotrombudo.gov.br', 'Joyce', 'Joyce', 'S.CO', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(9, 'Pessoal', 'educa@bracodotrombudo.gov.br', 'Joyce', 'Joyce', 'S.PE', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(10, 'Gabinete', 'educa@bracodotrombudo.gov.br', 'Joyce', 'Joyce', 'GAB', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(11, 'Licitação', 'educa@bracodotrombudo.gov.br', 'Joyce', 'Joyce', 'S.LI', 'https://cdn-icons-png.flaticon.com/512/3301/3301591.png'),
	(12, 'Tributos', 'educa@bracodotrombudo.gov.br', 'Joyce', 'Joyce', 'S.TR', NULL),
	(13, 'Meio Ambiente', 'educa@bracodotrombudo.gov.br', 'Joyce', 'Joyce', 'D.M.M.A', NULL),
	(14, 'Conselhos', 'educa@bracodotrombudo.gov.br', 'Joyce', 'Joyce', 'C.M', NULL),
	(15, 'Cultura', 'educa@bracodotrombudo.gov.br', 'Joyce', 'Joyce', 'S.C.T', NULL),
	(16, 'CME', 'educa@bracodotrombudo.gov.br', 'Joyce', 'Joyce', 'C.M.E', NULL),
	(17, 'Saúde', 'educa@bracodotrombudo.gov.br', 'Joyce', 'Joyce', 'S.SA', NULL);

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
	(2, 1, 'Oficio', 'OF', 'https://cdn-icons-png.flaticon.com/512/3378/3378913.png'),
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
  `matricula` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `cargo` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `token` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `forget` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
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
	(2, 'Renato Sá', 'renato@gmail.com', '$2b$10$JuSmMDLjsqp/Z.6VCzpECurl8fz3xo.w8.HEmnNHINUnykeAnUOvy', 2, '0', '0', 2, '0', '0', '0', '0', 1, '2023-06-18 16:58:48', '2023-06-18 16:58:48'),
	(3, 'Nelson Almeida', 'nelson@gmail.com', '$2b$10$Xj2b4CgAESwWrF8Qw5QKlOZIpmekl.hHNPm.BfozZc3TxIYUOe87C', 2, '0', '0', 1, '0', '0', '0', '0', 1, '2023-06-18 17:56:37', '2023-06-18 17:56:37'),
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
