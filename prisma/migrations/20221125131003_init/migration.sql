-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "img" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
