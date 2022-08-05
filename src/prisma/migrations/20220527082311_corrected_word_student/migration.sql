/*
  Warnings:

  - You are about to drop the `StuentExamGrade` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StuentExamGrade" DROP CONSTRAINT "StuentExamGrade_examId_fkey";

-- DropForeignKey
ALTER TABLE "StuentExamGrade" DROP CONSTRAINT "StuentExamGrade_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "StuentExamGrade" DROP CONSTRAINT "StuentExamGrade_userId_fkey";

-- DropTable
DROP TABLE "StuentExamGrade";

-- CreateTable
CREATE TABLE "StudentExamGrade" (
    "userId" UUID NOT NULL,
    "examId" UUID NOT NULL,
    "gradeId" UUID NOT NULL,

    CONSTRAINT "StudentExamGrade_pkey" PRIMARY KEY ("userId","examId")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentExamGrade_userId_examId_gradeId_key" ON "StudentExamGrade"("userId", "examId", "gradeId");

-- AddForeignKey
ALTER TABLE "StudentExamGrade" ADD CONSTRAINT "StudentExamGrade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentExamGrade" ADD CONSTRAINT "StudentExamGrade_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentExamGrade" ADD CONSTRAINT "StudentExamGrade_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
