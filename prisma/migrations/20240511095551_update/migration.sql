/*
  Warnings:

  - You are about to drop the column `reserveId` on the `Room` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `Reserve` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_reserveId_fkey";

-- AlterTable
ALTER TABLE "Reserve" ADD COLUMN     "roomId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "reserveId";

-- AddForeignKey
ALTER TABLE "Reserve" ADD CONSTRAINT "Reserve_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
