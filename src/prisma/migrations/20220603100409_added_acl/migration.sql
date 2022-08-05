/*
  Warnings:

  - A unique constraint covering the columns `[ssoid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "ssoid" SET DATA TYPE VARCHAR;

-- CreateTable
CREATE TABLE "AclGrant" (
    "id" UUID NOT NULL,
    "role" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "attributes" TEXT NOT NULL,

    CONSTRAINT "AclGrant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AclUserRole" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "AclGrantId" UUID NOT NULL,

    CONSTRAINT "AclUserRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_ssoid_key" ON "User"("ssoid");

-- AddForeignKey
ALTER TABLE "AclUserRole" ADD CONSTRAINT "AclUserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AclUserRole" ADD CONSTRAINT "AclUserRole_AclGrantId_fkey" FOREIGN KEY ("AclGrantId") REFERENCES "AclGrant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
