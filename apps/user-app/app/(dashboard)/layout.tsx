import { SideBarItem } from "@/components/side-bar-item";
import { ReactElement } from "react";
import { HomeIcon } from "@/icons/home-icon";
import { TransferIcon } from "@/icons/transfer-icon";
import { TransactionsIcon } from "@/icons/transactions-icon";
import { P2PIcon } from "../icons/p2p-icon";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <div className="flex">
      <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
        <div>
          <SideBarItem
            href="/dashboard"
            title="Dashboard"
            icon={<HomeIcon />}
          />
          <SideBarItem
            href="/transfer"
            title="Transfer"
            icon={<TransferIcon />}
          />
          <SideBarItem
            href="/transactions"
            title="Transactions"
            icon={<TransactionsIcon />}
          />
          <SideBarItem href="/p2p" title="P2P Transfer" icon={<P2PIcon />} />
        </div>
      </div>
      {children}
    </div>
  );
}
