/*
  Warnings:

  - Made the column `titulo` on table `documentos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tipoId` on table `documentos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `documentos` DROP FOREIGN KEY `FK__tipos`;

-- AlterTable
ALTER TABLE `documentos` MODIFY `titulo` VARCHAR(50) NOT NULL,
    MODIFY `tipoId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `documentos` ADD CONSTRAINT `FK__tipos` FOREIGN KEY (`tipoId`) REFERENCES `tipos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
