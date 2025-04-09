/*
  Warnings:

  - You are about to drop the column `quantity` on the `user_investments` table. All the data in the column will be lost.
  - Added the required column `investedAmount` to the `user_investments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "fixed_income_investments" ADD COLUMN     "investedAmount" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "user_investments" DROP COLUMN "quantity",
ADD COLUMN     "investedAmount" DOUBLE PRECISION NOT NULL;
