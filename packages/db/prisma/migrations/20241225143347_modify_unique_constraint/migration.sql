/*
  Warnings:

  - The primary key for the `balances` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id,timestamp]` on the table `balances` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "balances_timestamp_key";

-- DropIndex
DROP INDEX "p2p_transfer_timestamp_key";

-- AlterTable
ALTER TABLE "balances" DROP CONSTRAINT "balances_pkey",
ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "balances_id_timestamp_key" ON "balances"("id", "timestamp");
