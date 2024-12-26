"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db";

export const fetchP2PTransfers = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return {
      message: "You must be logged in to view your transactions",
    };
  }

  const transfers = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        {
          fromUserId: +userId,
        },
        {
          toUserId: +userId,
        },
      ],
    },
    include: {
      fromUser: {
        select: {
          name: true,
        },
      },
      toUser: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      timestamp: "desc",
    },
  });

  return transfers;
};

export type P2PTransactions = Awaited<ReturnType<typeof fetchP2PTransfers>>;
