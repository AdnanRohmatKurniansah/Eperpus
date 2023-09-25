-- AlterTable
ALTER TABLE "Borrow" ALTER COLUMN "return_date" SET DEFAULT NOW() + INTERVAL '7 day';
