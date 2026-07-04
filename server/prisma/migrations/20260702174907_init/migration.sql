/*
  Warnings:

  - You are about to alter the column `status` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `status` BOOLEAN NOT NULL DEFAULT true;
