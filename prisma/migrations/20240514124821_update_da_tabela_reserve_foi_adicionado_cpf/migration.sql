/*
  Warnings:

  - Added the required column `cpf` to the `Reserve` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reserve" ADD COLUMN     "cpf" TEXT NOT NULL;
