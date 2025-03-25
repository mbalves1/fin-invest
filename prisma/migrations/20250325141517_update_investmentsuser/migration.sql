-- DropForeignKey
ALTER TABLE "user_investments" DROP CONSTRAINT "user_investments_productId_fkey";

-- AlterTable
ALTER TABLE "user_investments" ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user_investments" ADD CONSTRAINT "user_investments_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
