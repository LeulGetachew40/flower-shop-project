-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "items";

-- CreateTable
CREATE TABLE "items"."Items" (
    "itemID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "inStock" BOOLEAN NOT NULL,
    "itemCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "itemUpdatedAt" TIMESTAMP(3) NOT NULL,
    "itemSlug" TEXT,

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

-- CreateIndex
CREATE UNIQUE INDEX "Items_name_key" ON "items"."Items"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Items_itemSlug_key" ON "items"."Items"("itemSlug");

-- AddForeignKey
ALTER TABLE "items"."Discounts" ADD CONSTRAINT "Discounts_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "items"."Items"("itemID") ON DELETE RESTRICT ON UPDATE CASCADE;
