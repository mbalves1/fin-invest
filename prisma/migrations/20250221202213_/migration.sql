/*
  Warnings:

  - You are about to drop the column `authorId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - Added the required column `bank` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentValue` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initialInvestment` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `investmentDate` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isLiquid` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rateType` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `users` table without a default value. This is not possible if the table is not empty.
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
ADD COLUMN     "isLiquid" BOOLEAN NOT NULL,
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rateType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN,
ADD COLUMN     "lastName" TEXT NOT NULL;
