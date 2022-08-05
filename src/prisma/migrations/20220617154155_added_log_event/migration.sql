-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('INFO', 'ERROR', 'WARNING');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('SEND_EMAIL');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('WAITING', 'EXECUTED');

-- CreateTable
CREATE TABLE "Log" (
    "id" UUID NOT NULL,
    "code" TEXT,
    "type" "LogType" NOT NULL,
    "message" TEXT,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" UUID NOT NULL,
    "displayName" TEXT,
    "status" "EventStatus" NOT NULL,
    "type" "EventType" NOT NULL,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
