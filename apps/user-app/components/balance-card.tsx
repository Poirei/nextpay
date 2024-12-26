import { formatINR } from "@/util/currency-formatter";
import { Card } from "@repo/ui/card";

type BalanceCardProps = {
  amount: number;
  locked: number;
};

export const BalanceCard = ({ amount, locked }: BalanceCardProps) => {
  return (
    <Card title="Balance">
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>Unlocked Balance</div>
        <div>{formatINR(amount)}</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Total Locked Balance</div>
        <div>{formatINR(locked)}</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Total Balance</div>
        <div>{formatINR(locked + amount)}</div>
      </div>
    </Card>
  );
};
