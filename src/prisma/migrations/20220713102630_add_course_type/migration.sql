-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('CORE', 'PRIMER', 'PROJECT', 'ELECTIVE');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "courseType" "CourseType" NOT NULL DEFAULT E'CORE';
