-- CreateTable
CREATE TABLE "Items" (
    "itemID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "inStock" BOOLEAN NOT NULL,
    "itemCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "itemUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("itemID")
);

-- CreateTable
CREATE TABLE "Discounts" (
    "discountID" TEXT NOT NULL,
    "discountValue" DOUBLE PRECISION NOT NULL,
    "itemID" TEXT NOT NULL,
    "promoCode" TEXT NOT NULL,

    CONSTRAINT "Discounts_pkey" PRIMARY KEY ("discountID")
);

-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Items_name_key" ON "Items"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Discounts" ADD CONSTRAINT "Discounts_itemID_fkey" FOREIGN KEY ("itemID") REFERENCES "Items"("itemID") ON DELETE RESTRICT ON UPDATE CASCADE;
