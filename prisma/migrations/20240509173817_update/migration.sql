/*
  Warnings:

  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `room` to the `Reserve` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_reserveId_fkey";

-- AlterTable
ALTER TABLE "Reserve" ADD COLUMN     "room" TEXT NOT NULL;

-- DropTable
DROP TABLE "Room";
