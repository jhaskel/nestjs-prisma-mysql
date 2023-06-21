/*
  Warnings:

  - You are about to drop the column `id_tipo` on the `documentos` table. All the data in the column will be lost.
  - You are about to drop the column `idUser` on the `setores` table. All the data in the column will be lost.
  - You are about to alter the column `setorId` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(128)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `documentos` DROP FOREIGN KEY `FK__tipos`;

-- DropForeignKey
ALTER TABLE `setores` DROP FOREIGN KEY `FK_setores_users`;

-- AlterTable
ALTER TABLE `documentos` DROP COLUMN `id_tipo`,
    ADD COLUMN `tipoId` INTEGER NULL;

-- AlterTable
ALTER TABLE `setores` DROP COLUMN `idUser`,
    ADD COLUMN `email` VARCHAR(50) NULL,
    ADD COLUMN `responsavel` VARCHAR(50) NULL,
    ADD COLUMN `secretario` VARCHAR(50) NULL,
    ADD COLUMN `sigla` VARCHAR(10) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `setorId` INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX `tipoId` ON `documentos`(`tipoId`);

-- CreateIndex
CREATE INDEX `setorId` ON `users`(`setorId`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `FK_users_setores` FOREIGN KEY (`setorId`) REFERENCES `setores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `documentos` ADD CONSTRAINT `FK__tipos` FOREIGN KEY (`tipoId`) REFERENCES `tipos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
