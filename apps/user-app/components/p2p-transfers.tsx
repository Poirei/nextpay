import { type P2PTransactions } from "@/lib/actions/fetch-p2p-transfers";
import { formatINR } from "@/util/currency-formatter";
import { Card } from "@repo/ui/card";

export const P2PTransfers = ({
  transactions,
  userId,
}: {
  transactions: P2PTransactions;
  userId: string | undefined;
}) => {
  if (!Array.isArray(transactions) || !userId) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center py-8">
          Please log in to see your transactions
        </div>
      </Card>
    );
  }

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
          <div className="flex justify-between" key={transaction.id}>
            <div>
              <div className="text-sm">
                {transaction.fromUserId === +userId ? "Sent" : "Received"} INR
              </div>
              <div className="text-slate-400 text-xs">
                {transaction.timestamp.toDateString()} •{" "}
                {transaction.fromUserId === +userId
                  ? `To ${transaction.toUser.name}`
                  : `From ${transaction.fromUser.name}`}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              {transaction.fromUserId === +userId ? "-" : "+"}{" "}
              {formatINR(transaction.amount)}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
