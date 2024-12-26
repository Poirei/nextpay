"use client";

import { useRef } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/text-input";
import { p2pTransfer } from "@/lib/actions/p2p-transfer";

export function SendCard() {
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const handleSendMoney = async () => {
    const phoneNumber = phoneNumberRef.current?.value;
    const amount = amountRef.current?.value;

    if (!phoneNumber || !amount) {
      alert("Please enter both phone number and amount");
      return;
    }

    await p2pTransfer(phoneNumber, +amount);
  };

  return (
    <Card title="Send Money">
      <div className="min-w-72 pt-2">
        <TextInput
          placeholder="Enter phone number"
          label="Phone Number"
          ref={phoneNumberRef}
        />
        <TextInput placeholder="Enter amount" label="Amount" ref={amountRef} />
        <div className="pt-4 flex justify-center">
          <Button onClick={handleSendMoney}>Send</Button>
        </div>
      </div>
    </Card>
  );
}
