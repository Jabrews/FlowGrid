// useConfirmStore.ts
import { create } from "zustand";

type ConfirmResolver = (value: boolean) => void;

interface ConfirmStore {
  resolver: ConfirmResolver | null;

  ask: () => Promise<boolean>;
  confirm: () => void;
  cancel: () => void;
}

export const useConfirmStore = create<ConfirmStore>((set, get) => ({
  resolver: null,

  ask: () =>
    new Promise<boolean>((resolve) => {
      set({ resolver: resolve });   // store resolver only
    }),

  confirm: () => {
    get().resolver?.(true);
    set({ resolver: null });
  },

  cancel: () => {
    get().resolver?.(false);
    set({ resolver: null });
  }
}));
