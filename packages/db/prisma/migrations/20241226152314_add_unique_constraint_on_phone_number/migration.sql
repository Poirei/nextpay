/*
  Warnings:

  - You are about to drop the column `userId` on the `balances` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `on_ramp_transaction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `on_ramp_transaction` table. All the data in the column will be lost.
  - You are about to drop the column `fromUserId` on the `p2p_transfer` table. All the data in the column will be lost.
  - You are about to drop the column `toUserId` on the `p2p_transfer` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone_number]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `balances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `on_ramp_transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `on_ramp_transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `from_user_id` to the `p2p_transfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to_user_id` to the `p2p_transfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "balances" DROP CONSTRAINT "balances_userId_fkey";

-- DropForeignKey
ALTER TABLE "on_ramp_transaction" DROP CONSTRAINT "on_ramp_transaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "p2p_transfer" DROP CONSTRAINT "p2p_transfer_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "p2p_transfer" DROP CONSTRAINT "p2p_transfer_toUserId_fkey";

-- DropIndex
DROP INDEX "balances_timestamp_idx";

-- DropIndex
DROP INDEX "user_phoneNumber_key";

-- AlterTable
ALTER TABLE "balances" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "on_ramp_transaction" DROP COLUMN "startTime",
DROP COLUMN "userId",
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "p2p_transfer" DROP COLUMN "fromUserId",
DROP COLUMN "toUserId",
ADD COLUMN     "from_user_id" INTEGER NOT NULL,
ADD COLUMN     "to_user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "phoneNumber",
ADD COLUMN     "phone_number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_number_key" ON "user"("phone_number");

-- AddForeignKey
ALTER TABLE "balances" ADD CONSTRAINT "balances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "on_ramp_transaction" ADD CONSTRAINT "on_ramp_transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p2p_transfer" ADD CONSTRAINT "p2p_transfer_from_user_id_fkey" FOREIGN KEY ("from_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "p2p_transfer" ADD CONSTRAINT "p2p_transfer_to_user_id_fkey" FOREIGN KEY ("to_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
