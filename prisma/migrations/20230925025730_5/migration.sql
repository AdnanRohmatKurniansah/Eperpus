/*
  Warnings:

  - You are about to drop the column `denda` on the `Return` table. All the data in the column will be lost.
  - Made the column `return_date` on table `Borrow` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Borrow" ALTER COLUMN "return_date" SET NOT NULL,
ALTER COLUMN "return_date" SET DEFAULT CURRENT_TIMESTAMP + INTERVAL '7 day';

-- AlterTable
ALTER TABLE "Return" DROP COLUMN "denda",
ADD COLUMN     "forfeit" INTEGER;
