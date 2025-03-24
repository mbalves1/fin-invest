-- AlterTable
ALTER TABLE "user_investments" ADD COLUMN     "cryptoId" TEXT,
ADD COLUMN     "realEstateFundId" TEXT,
ADD COLUMN     "stockId" TEXT;

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

-- CreateIndex
CREATE UNIQUE INDEX "real_estate_funds_ticker_key" ON "real_estate_funds"("ticker");

-- CreateIndex
CREATE UNIQUE INDEX "stocks_ticker_key" ON "stocks"("ticker");

-- CreateIndex
CREATE UNIQUE INDEX "crypto_symbol_key" ON "crypto"("symbol");

-- AddForeignKey
ALTER TABLE "user_investments" ADD CONSTRAINT "user_investments_realEstateFundId_fkey" FOREIGN KEY ("realEstateFundId") REFERENCES "real_estate_funds"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_investments" ADD CONSTRAINT "user_investments_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stocks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_investments" ADD CONSTRAINT "user_investments_cryptoId_fkey" FOREIGN KEY ("cryptoId") REFERENCES "crypto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
