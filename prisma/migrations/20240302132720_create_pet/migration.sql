-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "breed" TEXT,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);
