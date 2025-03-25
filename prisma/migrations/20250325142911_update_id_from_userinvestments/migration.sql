/*
  Warnings:

  - The primary key for the `user_investments` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "user_investments" DROP CONSTRAINT "user_investments_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_investments_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_investments_id_seq";
