/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "birthDate" TIMESTAMP,
ADD COLUMN     "firstName" VARCHAR,
ADD COLUMN     "lastName" VARCHAR;
