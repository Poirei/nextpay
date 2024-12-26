"use client";

import React, {
  type ReactNode,
  createContext,
  useContext,
  useRef,
} from "react";
import { createBalanceStore, BalanceStore } from "@repo/store/balance-store";
import { useStore } from "zustand";
import { SessionProvider } from "next-auth/react";

export type BalanceStoreApi = ReturnType<typeof createBalanceStore>;

export const BalanceStoreContext = createContext<BalanceStoreApi | undefined>(
  undefined
);

export interface BalanceStoreProviderProps {
  children: ReactNode;
}

export const BalanceStoreProvider = ({
  children,
}: BalanceStoreProviderProps) => {
  const storeRef = useRef<BalanceStoreApi>(null);

  if (!storeRef.current) {
    storeRef.current = createBalanceStore({
      balance: 1000,
    });
  }

  return (
    <BalanceStoreContext.Provider value={storeRef.current}>
      {children}
    </BalanceStoreContext.Provider>
  );
};

export const useBalanceStore = <T,>(
  selector: (store: BalanceStore) => T
): T => {
  const balanceStoreContext = useContext(BalanceStoreContext);

  if (!balanceStoreContext) {
    throw new Error("useBalanceStore must be used within BalanceStoreProvider");
  }

  return useStore(balanceStoreContext, selector);
};

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <BalanceStoreProvider>{children}</BalanceStoreProvider>
    </SessionProvider>
  );
};
