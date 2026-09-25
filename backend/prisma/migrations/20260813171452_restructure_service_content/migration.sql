/*
  Warnings:

  - You are about to drop the column `description` on the `services` table. All the data in the column will be lost.
  - The `features` column on the `services` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `problem` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solution` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "description",
ADD COLUMN     "benefits" TEXT[],
ADD COLUMN     "problem" TEXT NOT NULL,
ADD COLUMN     "solution" TEXT NOT NULL,
ADD COLUMN     "technologies" TEXT[],
DROP COLUMN "features",
ADD COLUMN     "features" TEXT[];
