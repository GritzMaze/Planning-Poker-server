-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "assignedToId" INTEGER;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
