-- AlterTable
ALTER TABLE `product` ADD COLUMN `status` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo';
