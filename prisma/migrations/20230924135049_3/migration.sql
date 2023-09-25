-- CreateTable
CREATE TABLE "Borrow" (
    "id" SERIAL NOT NULL,
    "borrow_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "return_date" TIMESTAMP(3),
    "id_book" INTEGER NOT NULL,

    CONSTRAINT "Borrow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Return" (
    "id" SERIAL NOT NULL,
    "return_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "denda" INTEGER,
    "id_book" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "Return_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Borrow" ADD CONSTRAINT "Borrow_id_book_fkey" FOREIGN KEY ("id_book") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Return" ADD CONSTRAINT "Return_id_book_fkey" FOREIGN KEY ("id_book") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Return" ADD CONSTRAINT "Return_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
