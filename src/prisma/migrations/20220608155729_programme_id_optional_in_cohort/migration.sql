-- DropForeignKey
ALTER TABLE "Cohort" DROP CONSTRAINT "Cohort_programmeId_fkey";

-- AlterTable
ALTER TABLE "Cohort" ALTER COLUMN "programmeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Cohort" ADD CONSTRAINT "Cohort_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE SET NULL ON UPDATE CASCADE;
