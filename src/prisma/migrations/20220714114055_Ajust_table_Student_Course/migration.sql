/*
  Warnings:

  - You are about to drop the `StudentCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentCourse" DROP CONSTRAINT "StudentCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "StudentCourse" DROP CONSTRAINT "StudentCourse_userId_fkey";

-- DropTable
DROP TABLE "StudentCourse";

-- CreateTable
CREATE TABLE "StudentCoursePeriodProgramme" (
    "userId" UUID NOT NULL,
    "courseId" UUID NOT NULL,
    "periodId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "StudentCoursePeriodProgramme_pkey" PRIMARY KEY ("userId","courseId","periodId")
);

-- AddForeignKey
ALTER TABLE "StudentCoursePeriodProgramme" ADD CONSTRAINT "StudentCoursePeriodProgramme_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCoursePeriodProgramme" ADD CONSTRAINT "StudentCoursePeriodProgramme_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCoursePeriodProgramme" ADD CONSTRAINT "StudentCoursePeriodProgramme_courseId_periodId_fkey" FOREIGN KEY ("courseId", "periodId") REFERENCES "CoursePeriodProgramme"("courseId", "periodId") ON DELETE RESTRICT ON UPDATE CASCADE;
