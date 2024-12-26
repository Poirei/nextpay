"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      message: "Unauthorized",
    };
  }

  const token = `token_${Math.random() * 100}`;

  try {
    await prisma.onRampTransaction.create({
      data: {
        userId: +session?.user?.id,
        provider,
        amount: amount * 100,
        status: "PROCESSING",
        token,
        startTime: new Date(),
      },
    });

    return {
      message: "Done",
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Error",
    };
  }
}
