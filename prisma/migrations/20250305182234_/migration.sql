-- AlterTable
ALTER TABLE "products" ADD COLUMN     "investmentHorizon" TEXT,
ADD COLUMN     "investmentType" TEXT,
ADD COLUMN     "risk" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "currentPortfolioValue" DOUBLE PRECISION,
ADD COLUMN     "investmentGoals" TEXT,
ADD COLUMN     "preferredInvestmentType" TEXT,
ADD COLUMN     "riskTolerance" TEXT;
