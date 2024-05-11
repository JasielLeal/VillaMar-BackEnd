/*
  Warnings:

  - You are about to drop the column `scheduleId` on the `Room` table. All the data in the column will be lost.
  - Added the required column `reserveId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_scheduleId_fkey";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "scheduleId",
ADD COLUMN     "reserveId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_reserveId_fkey" FOREIGN KEY ("reserveId") REFERENCES "Reserve"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
