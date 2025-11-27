-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('EVENT', 'VISITOR', 'MEETING', 'TRAVEL', 'CEREMONY');

-- AlterTable
ALTER TABLE "Chef" ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT;

-- CreateTable
CREATE TABLE "protocol" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "protocol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "category" "EventCategory" NOT NULL,
    "userId" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
