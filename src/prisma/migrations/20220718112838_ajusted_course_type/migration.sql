/*
  Warnings:

  - You are about to drop the column `courseType` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "courseType";

-- AlterTable
ALTER TABLE "CoursePeriodProgramme" ADD COLUMN     "courseType" "CourseType" NOT NULL DEFAULT E'CORE';
