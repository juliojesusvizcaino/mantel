-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_answerId_fkey";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "answerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
