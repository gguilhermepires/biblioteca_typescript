/*
  Warnings:

  - The values [SEND_EMAIL] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "EventStatus" ADD VALUE 'ERROR';

-- AlterEnum
BEGIN;
CREATE TYPE "EventType_new" AS ENUM ('SEND_EMAIL_GRADE_REPORT');
ALTER TABLE "Event" ALTER COLUMN "type" TYPE "EventType_new" USING ("type"::text::"EventType_new");
ALTER TYPE "EventType" RENAME TO "EventType_old";
ALTER TYPE "EventType_new" RENAME TO "EventType";
DROP TYPE "EventType_old";
COMMIT;
