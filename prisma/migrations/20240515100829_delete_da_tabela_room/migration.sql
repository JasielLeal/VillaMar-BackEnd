/*
  Warnings:

  - You are about to drop the column `roomId` on the `Reserve` table. All the data in the column will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reserve" DROP CONSTRAINT "Reserve_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_userId_fkey";

-- AlterTable
ALTER TABLE "Reserve" DROP COLUMN "roomId";

-- DropTable
DROP TABLE "Room";
