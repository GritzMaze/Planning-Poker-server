/*
  Warnings:

  - You are about to drop the column `assignedToId` on the `Column` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Column" DROP CONSTRAINT "Column_assignedToId_fkey";

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "assignedToId" INTEGER;

-- AlterTable
ALTER TABLE "Column" DROP COLUMN "assignedToId",
ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
