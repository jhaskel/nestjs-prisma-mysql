-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `role` INTEGER NOT NULL DEFAULT 1,
    `image` VARCHAR(128) NOT NULL DEFAULT '0',
    `fone` VARCHAR(128) NOT NULL DEFAULT '0',
    `setorId` VARCHAR(128) NOT NULL DEFAULT '0',
    `matricula` VARCHAR(128) NOT NULL DEFAULT '0',
    `cargo` VARCHAR(128) NOT NULL DEFAULT '0',
    `token` VARCHAR(128) NOT NULL DEFAULT '0',
    `forget` VARCHAR(128) NOT NULL DEFAULT '0',
    `isAtivo` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `setores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL DEFAULT '0',
    `idUser` INTEGER NULL,

    INDEX `idUser`(`idUser`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `config` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logo` VARCHAR(250) NULL,
    `name` VARCHAR(120) NULL,
    `endereco` VARCHAR(120) NULL,
    `site` VARCHAR(120) NULL,
    `fone` VARCHAR(50) NULL,
    `cnpj` VARCHAR(50) NULL,
    `email` VARCHAR(50) NULL,
    `isAtivo` TINYINT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentos` (
    `id` INTEGER NOT NULL,
    `id_tipo` INTEGER NULL,
    `titulo` VARCHAR(50) NULL,
    `isInteno` BOOLEAN NULL DEFAULT true,
    `isAtivo` BOOLEAN NULL DEFAULT true,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `id_tipo`(`id_tipo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itensdocumentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idDocumento` INTEGER NULL,
    `titulo` VARCHAR(128) NULL,
    `quantidade` DECIMAL(10, 2) NULL,
    `unidade` VARCHAR(3) NULL,
    `anexo` VARCHAR(128) NULL,
    `isAtivo` BOOLEAN NULL DEFAULT true,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idDocumento`(`idDocumento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `setorId` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `codigo` VARCHAR(50) NOT NULL,

    INDEX `setorId`(`setorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usercargos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `isAtivo` BOOLEAN NULL DEFAULT true,

    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `setores` ADD CONSTRAINT `FK_setores_users` FOREIGN KEY (`idUser`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentos` ADD CONSTRAINT `FK__tipos` FOREIGN KEY (`id_tipo`) REFERENCES `tipos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `itensdocumentos` ADD CONSTRAINT `FK__documentos` FOREIGN KEY (`idDocumento`) REFERENCES `documentos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tipos` ADD CONSTRAINT `FK__setores` FOREIGN KEY (`setorId`) REFERENCES `setores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usercargos` ADD CONSTRAINT `FK_usercargos_users` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
