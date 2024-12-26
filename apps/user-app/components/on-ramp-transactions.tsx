import { formatINR } from "@/util/currency-formatter";
import { Card } from "@repo/ui/card";

export type Transaction = {
  time: Date;
  amount: number;
  status: string;
  provider: string;
};

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center py-8">No recent transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions?.map((transaction) => (
          <div
            className="flex justify-between"
            key={transaction.time.getTime()}
          >
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {transaction.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + {formatINR(transaction.amount)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
