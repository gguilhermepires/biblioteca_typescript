/*
  Warnings:

  - The primary key for the `CourseCohort` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `periodId` to the `CourseCohort` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseCohort" DROP CONSTRAINT "CourseCohort_pkey",
ADD COLUMN     "periodId" UUID NOT NULL,
ADD CONSTRAINT "CourseCohort_pkey" PRIMARY KEY ("courseId", "cohortId", "periodId");

-- AddForeignKey
ALTER TABLE "CourseCohort" ADD CONSTRAINT "CourseCohort_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
