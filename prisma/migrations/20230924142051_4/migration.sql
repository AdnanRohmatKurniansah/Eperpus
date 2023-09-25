/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_user` to the `Borrow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Borrow" ADD COLUMN     "id_user" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'member';

-- CreateIndex
CREATE UNIQUE INDEX "Book_code_key" ON "Book"("code");

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
