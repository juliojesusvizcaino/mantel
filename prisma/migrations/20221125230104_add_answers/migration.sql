/*
  Warnings:

  - Added the required column `correctOptionId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
DELETE FROM "QuestionOption";
DELETE FROM "Question";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "correctOptionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_correctOptionId_fkey" FOREIGN KEY ("correctOptionId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
