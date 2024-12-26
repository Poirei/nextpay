import { Suspense } from "react";
import { P2PTransfers } from "@/components/p2p-transfers";
import { SendCard } from "@/components/send-money-card";
import { fetchP2PTransfers } from "@/lib/actions/fetch-p2p-transfers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Page() {
  const transactions = await fetchP2PTransfers();
  const session = await getServerSession(authOptions);

  return (
    <div className="h-[90vh] w-full">
      <div className="flex justify-center flex-col h-full">
        <div className="flex justify-center">
          <div className="flex gap-4 w-full justify-center">
            <SendCard />
            <div className="grow px-4 max-w-screen-md">
              <Suspense fallback={<div>Loading...</div>}>
                <P2PTransfers
                  transactions={transactions}
                  userId={session?.user?.id}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
