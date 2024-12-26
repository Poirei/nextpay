"use client";

import { createOnRampTransaction } from "@/lib/actions/create-onramp-txn";
import { TextInput } from "@repo/ui/text-input";
import { Select } from "@repo/ui/select";
import { useRef, useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectURL: "https://netbanking.hdfc.com",
  },
  {
    name: "Axis Bank",
    redirectURL: "https://netbanking.axisbank.com",
  },
];

export const AddMoney = () => {
  const [redirectURL, setRedirectURL] = useState<string | undefined>(
    SUPPORTED_BANKS[0]?.redirectURL
  );
  const provider = SUPPORTED_BANKS.find(
    (bank) => bank.redirectURL === redirectURL
  )?.name as string;

  const amountRef = useRef<HTMLInputElement>(null);

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          placeholder="Enter amount"
          label="Amount"
          onChange={() => {}}
          ref={amountRef}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          options={SUPPORTED_BANKS.map((bank) => ({
            key: bank.name,
            value: bank.name,
          }))}
          onSelect={(value) => {
            setRedirectURL(
              SUPPORTED_BANKS.find((bank) => bank.name === value)
                ?.redirectURL || ""
            );
          }}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              const amount = amountRef.current?.value;
              if (amount && amount.trim() !== "") {
                await createOnRampTransaction(provider, +amount);

                window.location.href = redirectURL || "";
              }
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
