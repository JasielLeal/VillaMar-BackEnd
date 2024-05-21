/*
  Warnings:

  - You are about to drop the column `cratedAt` on the `Expense` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "cratedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
