/*
  Warnings:

  - You are about to drop the column `authorId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `products` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - Added the required column `bank` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentValue` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initialInvestment` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `investmentDate` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isLiquid` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rateType` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_authorId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "authorId",
DROP COLUMN "content",
DROP COLUMN "published",
DROP COLUMN "title",
ADD COLUMN     "bank" TEXT NOT NULL,
ADD COLUMN     "currentValue" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "initialInvestment" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "investmentDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "investmentHorizon" TEXT,
ADD COLUMN     "investmentType" TEXT,
ADD COLUMN     "isLiquid" BOOLEAN NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "quantityRemaining" INTEGER,
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rateType" TEXT NOT NULL,
ADD COLUMN     "risk" TEXT;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "name",
ADD COLUMN     "birthday" TIMESTAMP(3),
ADD COLUMN     "currentPortfolioValue" DOUBLE PRECISION,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "investmentGoals" TEXT,
ADD COLUMN     "isActive" BOOLEAN,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "preferredInvestmentType" TEXT,
ADD COLUMN     "riskTolerance" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

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
CREATE TABLE "real_estate_funds" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "dividendYield" DOUBLE PRECISION NOT NULL,
    "netWorth" DOUBLE PRECISION NOT NULL,
    "lastDividend" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "real_estate_funds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stocks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "marketCap" DOUBLE PRECISION NOT NULL,
    "dividendYield" DOUBLE PRECISION,
    "lastPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crypto" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "marketCap" DOUBLE PRECISION NOT NULL,
    "circulatingSupply" DOUBLE PRECISION NOT NULL,
    "lastPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crypto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_investments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fixedIncomeId" TEXT,
    "realEstateFundId" TEXT,
    "stockId" TEXT,
    "cryptoId" TEXT,
    "productId" INTEGER,

    CONSTRAINT "user_investments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "real_estate_funds_ticker_key" ON "real_estate_funds"("ticker");

-- CreateIndex
CREATE UNIQUE INDEX "stocks_ticker_key" ON "stocks"("ticker");

-- CreateIndex
CREATE UNIQUE INDEX "crypto_symbol_key" ON "crypto"("symbol");

-- AddForeignKey
ALTER TABLE "fixed_income_investments" ADD CONSTRAINT "fixed_income_investments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_investments" ADD CONSTRAINT "user_investments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_investments" ADD CONSTRAINT "user_investments_fixedIncomeId_fkey" FOREIGN KEY ("fixedIncomeId") REFERENCES "fixed_income_investments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_investments" ADD CONSTRAINT "user_investments_realEstateFundId_fkey" FOREIGN KEY ("realEstateFundId") REFERENCES "real_estate_funds"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_investments" ADD CONSTRAINT "user_investments_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stocks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_investments" ADD CONSTRAINT "user_investments_cryptoId_fkey" FOREIGN KEY ("cryptoId") REFERENCES "crypto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_investments" ADD CONSTRAINT "user_investments_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
