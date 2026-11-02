-- CreateEnum
CREATE TYPE "ConsultMode" AS ENUM ('IN_PERSON', 'ONLINE');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "mode" "ConsultMode" NOT NULL DEFAULT 'IN_PERSON';
