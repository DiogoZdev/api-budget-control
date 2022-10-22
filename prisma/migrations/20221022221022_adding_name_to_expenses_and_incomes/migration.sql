/*
  Warnings:

  - Added the required column `name` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Expense` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Income` ADD COLUMN `name` VARCHAR(191) NOT NULL;
