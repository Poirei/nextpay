import { createStore } from "zustand";

export type BalanceState = {
  balance: number;
};

export type BalanceStore = BalanceState;

export const defaultInitState: BalanceState = {
  balance: 100,
};

export const createBalanceStore = (
  initState: BalanceState = defaultInitState
) => {
  return createStore<BalanceStore>()(() => ({
    ...initState,
  }));
};
