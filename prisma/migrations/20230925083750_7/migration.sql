/*
  Warnings:

  - You are about to drop the column `id_book` on the `Return` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `Return` table. All the data in the column will be lost.
  - Added the required column `id_borrow` to the `Return` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Return" DROP CONSTRAINT "Return_id_book_fkey";

-- DropForeignKey
ALTER TABLE "Return" DROP CONSTRAINT "Return_id_user_fkey";

-- AlterTable
ALTER TABLE "Borrow" ADD COLUMN     "returned" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "return_date" SET DEFAULT NOW() + '168:00:00'::interval;

-- AlterTable
ALTER TABLE "Return" DROP COLUMN "id_book",
DROP COLUMN "id_user",
ADD COLUMN     "id_borrow" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Return" ADD CONSTRAINT "Return_id_borrow_fkey" FOREIGN KEY ("id_borrow") REFERENCES "Borrow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
