/*
  Warnings:

  - A unique constraint covering the columns `[itemSlug]` on the table `Items` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "items"."Items" ALTER COLUMN "itemSlug" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Items_itemSlug_key" ON "items"."Items"("itemSlug");
