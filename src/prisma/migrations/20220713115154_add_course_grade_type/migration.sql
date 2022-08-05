-- CreateEnum
CREATE TYPE "GradeType" AS ENUM ('GRADE', 'LABEL');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "gradeType" "GradeType" NOT NULL DEFAULT E'GRADE';
