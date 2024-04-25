-- CreateEnum
CREATE TYPE "USERTYPE" AS ENUM ('CUSTOMER', 'ADMIN', 'CLERK');

-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" "USERTYPE" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
