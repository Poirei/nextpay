"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db";

export const p2pTransfer = async (to: string, amount: number) => {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;

  if (!from) {
    return {
      message: "You must be logged in to transfer money",
    };
  }

  const toUser = await prisma.user.findUnique({
    where: {
      phoneNumber: to,
    },
  });

  if (!toUser) {
    return {
      message: "User not found",
    };
  }

  await prisma.$transaction(async (txn) => {
    await txn.$queryRaw`SELECT * from "Balances" where "userId" = ${+from} FOR UPDATE`;

    const fromBalance = await txn.balances.findUnique({
      where: {
        userId: +from,
      },
    });

    const actualAmount = amount * 100;

    if (!fromBalance || fromBalance.amount < actualAmount) {
      throw new Error("Insufficient balance");
    }

    await txn.balances.update({
      where: {
        userId: +from,
      },
      data: {
        amount: {
          decrement: actualAmount,
        },
      },
    });

    await txn.balances.update({
      where: {
        userId: +toUser.id,
      },
      data: {
        amount: {
          increment: actualAmount,
        },
      },
    });

    await txn.p2pTransfer.create({
      data: {
        fromUserId: +from,
        toUserId: +toUser.id,
        amount: actualAmount,
        timestamp: new Date(),
      },
    });
  });
};
