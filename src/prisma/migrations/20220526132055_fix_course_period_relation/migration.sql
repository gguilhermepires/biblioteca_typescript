-- CreateTable
CREATE TABLE "CoursePeriodProgramme" (
    "courseId" UUID NOT NULL,
    "periodId" UUID NOT NULL,
    "programmeId" UUID NOT NULL,

    CONSTRAINT "CoursePeriodProgramme_pkey" PRIMARY KEY ("courseId","periodId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CoursePeriodProgramme_courseId_periodId_programmeId_key" ON "CoursePeriodProgramme"("courseId", "periodId", "programmeId");

-- AddForeignKey
ALTER TABLE "CoursePeriodProgramme" ADD CONSTRAINT "CoursePeriodProgramme_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePeriodProgramme" ADD CONSTRAINT "CoursePeriodProgramme_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePeriodProgramme" ADD CONSTRAINT "CoursePeriodProgramme_programmeId_fkey" FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
