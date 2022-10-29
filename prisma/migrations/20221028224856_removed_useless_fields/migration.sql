/*
  Warnings:

  - You are about to drop the column `expenses_sum` on the `Month` table. All the data in the column will be lost.
  - You are about to drop the column `incomes_sum` on the `Month` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Month` DROP COLUMN `expenses_sum`,
    DROP COLUMN `incomes_sum`;
