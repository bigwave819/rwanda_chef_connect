-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'CHEF', 'ADMIN');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CUSTOMER';
