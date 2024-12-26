import { BalanceCard } from "@/components/balance-card";
import { AddMoney } from "@/components/add-money-card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@repo/db";
import {
  OnRampTransactions,
  Transaction,
} from "@/components/on-ramp-transactions";
import { Suspense } from "react";

async function getBalance(): Promise<{
  amount: number;
  locked: number;
} | null> {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const balance = await prisma.balances.findFirst({
      where: {
        userId: +session?.user?.id,
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    const avg_week = await prisma.$queryRaw`
      SELECT time_bucket('1 week'::interval, timestamp, '2024-12-22'::date) AS week,
      AVG(amount) AS avg_balance
      FROM balances
      GROUP BY week
      ORDER BY week;
      `;
    console.log(avg_week);

    return {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0,
    };
  }

  return null;
}

async function getOnRampTransactions(): Promise<Transaction[]> {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const txns = await prisma.onRampTransaction.findMany({
      where: {
        userId: +session?.user?.id,
      },
      orderBy: {
        startTime: "desc",
      },
    });

    return txns.map((txn) => ({
      time: txn.startTime,
      amount: txn.amount,
      status: txn.status,
      provider: txn.provider,
    }));
  }

  return [];
}

const BalanceSection = async () => {
  const balance = await getBalance();

  return (
    <BalanceCard amount={balance?.amount || 0} locked={balance?.locked || 0} />
  );
};

const TransactionSection = async () => {
  const transactions = await getOnRampTransactions();

  return <OnRampTransactions transactions={transactions} />;
};

export default async function Page() {
  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <BalanceSection />
          </Suspense>
          <div className="pt-4">
            <Suspense fallback={<div>Loading...</div>}>
              <TransactionSection />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
