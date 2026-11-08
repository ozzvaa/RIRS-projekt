-- CreateEnum
CREATE TYPE "Vloga" AS ENUM ('UPORABNIK', 'GLAVNI_UREDNIK', 'UREDNIK', 'TEHNIK', 'ADMIN');

-- AlterTable
ALTER TABLE "Uporabnik" ADD COLUMN     "vloge" "Vloga"[] DEFAULT ARRAY['UPORABNIK']::"Vloga"[];
