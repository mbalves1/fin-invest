/*
  Warnings:

  - You are about to drop the `user_products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_products" DROP CONSTRAINT "user_products_productId_fkey";

-- DropForeignKey
ALTER TABLE "user_products" DROP CONSTRAINT "user_products_userId_fkey";

-- DropTable
DROP TABLE "user_products";

-- CreateTable
CREATE TABLE "fixed_income_investments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL,
    "interestType" TEXT NOT NULL,
    "indexer" TEXT,
    "maturityDate" TIMESTAMP(3) NOT NULL,
    "liquidity" TEXT NOT NULL,
    "minimumInvestment" DOUBLE PRECISION NOT NULL,
    "taxation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "fixed_income_investments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_investments" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fixedIncomeId" TEXT,

    CONSTRAINT "user_investments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fixed_income_investments" ADD CONSTRAINT "fixed_income_investments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_investments" ADD CONSTRAINT "user_investments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_investments" ADD CONSTRAINT "user_investments_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_investments" ADD CONSTRAINT "user_investments_fixedIncomeId_fkey" FOREIGN KEY ("fixedIncomeId") REFERENCES "fixed_income_investments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
