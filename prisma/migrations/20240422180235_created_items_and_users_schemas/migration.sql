-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "items";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "users";

-- CreateTable
CREATE TABLE "items"."Items" (
    "itemID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "inStock" BOOLEAN NOT NULL,
    "itemCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "itemUpdatedAt" TIMESTAMP(3) NOT NULL,
    "itemSlug" TEXT NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("itemID")
);

-- CreateTable
CREATE TABLE "items"."Discounts" (
    "discountID" TEXT NOT NULL,
    "discountValue" DOUBLE PRECISION NOT NULL,
    "itemID" TEXT NOT NULL,
    "promoCode" TEXT NOT NULL,

    CONSTRAINT "Discounts_pkey" PRIMARY KEY ("discountID")
);

-- CreateTable
CREATE TABLE "users"."User" (
    "userID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Items_name_key" ON "items"."Items"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "users"."User"("email");

-- AddForeignKey
ALTER TABLE "items"."Discounts" ADD CONSTRAINT "Discounts_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "items"."Items"("itemID") ON DELETE RESTRICT ON UPDATE CASCADE;
